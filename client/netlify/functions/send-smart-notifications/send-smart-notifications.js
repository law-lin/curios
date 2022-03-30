require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.REACT_APP_PUBLIC_SUPABASE_URL, process.env.REACT_APP_PUBLIC_SUPABASE_KEY);
const { schedule } = require('@netlify/functions');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const fetchAll = async () => {
  let date = moment().subtract(1, 'day').utc().format("YYYY-MM-DD HH:mm:ss");
  const { data, error } = await supabase
    .from('classes')
    .select(
      `id, class_name, class_number,
      posts!class_id (id, title, content, class_id, created_at),
      users_classes(users(email))
      `
    ).gte('posts.created_at', date).eq('users_classes.smart_digest', true);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    return (data);
  }
}

// const fetchClasses = async () => {
//   const { data, error } = await supabase
//     .from('classes')
//     .select(
//       'id, class_name, class_number'
//     );
//   if (error) {
//     throw new Error(error.message);
//   }
//   if (data) {
//     return (data);
//   }
// };

// const fetchPosts = async (classId) => {
//   // let date = moment().subtract(1, 'hour').utc().format("YYYY-MM-DD HH:mm:ss");
//   let date = moment().subtract(10, 'minutes').utc().format("YYYY-MM-DD HH:mm:ss");
//   const { data, error } = await supabase
//     .from('posts')
//     .select(
//       'id, title, content, class_id'
//     )
//     .eq('class_id', classId).gte('created_at', date);
//   //"(NOW() - INTERVAL '1 HOUR')"
//   if (error) {
//     throw new Error(error.message);
//   }
//   if (data) {
//     return (data);
//   }
// }

// const fetchUserClasses = async (classId) => {
//   const { data, error } = await supabase
//     .from('users_classes')
//     .select(
//       `
//       users (
//         email
//       )
//       `
//     )
//     .eq('class_id', classId);
//   // modify table to have a smart digest column and check if eq true? or of one of the various types
//   // we'll have another .eq appended to the supabase querystring for checking that their digest is set to something
//   if (error) {
//     throw new Error(error.message);
//   }
//   if (data) {
//     return (classes);
//   }
// };

// We follow posts and have that in user_posts to get notifications for a specific post. By default, you follow a post that you create and get notifications for it.
// For a class that you are enrolled in, we have smart digest which aggregates posts within a specific interval and notifies you of this aggregate.

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
module.exports.handler = schedule('@daily', async (event) => {
  const eventBody = JSON.parse(event.body)
  const all = await fetchAll();
  console.log(all);

  for (let c of all) {
    if (c.users_classes.length === 0 || c.posts.length === 0) {
      break;
    }
    let personalizations = []
    for (let user of c.users_classes) {
      personalizations.push({
        "to": [{ "email": user.users.email }]
      })
    }
    let plaintext = `
    Here is all that has happened in ${c.class_number} on Curios in the past day:\n\n
    ------------------------------------------------------------\n
    `;
    let html = `
    <p>Here is all that has happened in ${c.class_number} on Curios in the past day:</p><br>
    ------------------------------------------------------------<br>
    `;
    for (let posts of c.posts) {
      if (c.users_classes.length > 0) {
        console.log(posts);
        let time = moment(posts.created_at);
        plaintext = plaintext + `
        ${posts.title} (${time})\n\n

        ${posts.content}\n\n\n
        ------------------------------------------------------------
        `;
        html = html + `
        <strong>${posts.title}</strong> (${time})<br><br>

        ${posts.content}<br><br><br>
        <a href='https://curiossbu.netlify.app/c/${posts.class_id}/${posts.id}'>Click here</a> to view.<br>
        ------------------------------------------------------------<br>
        `;
      }
    }
    console.log(plaintext);
    const msg = {
      //to: `qqcjustin@gmail.com`, // Change to your recipient
      from: `curiossbu@gmail.com`, // Change to your verified sender
      subject: `Activity Digest for ${c.class_number}`,
      personalizations: personalizations,
      text: plaintext,
      html: html,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }
  console.log(`Next function run at ${eventBody.next_run}.`)

  return {
    statusCode: 200,
  }
})
