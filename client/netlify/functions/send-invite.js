require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.REACT_APP_PUBLIC_SUPABASE_URL, process.env.REACT_APP_PUBLIC_SUPABASE_KEY);
//const { schedule } = require('@netlify/functions');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//send email to list of invited users, once invite button is hit
let plaintext = `Invite link here`
let html = `<p>Invite link here</p>`

module.exports.handler = async (event, context) => {
  //let personalizationNames = ["kevinchao2011@gmail.com", "kevin.chao@stonybrook.edu"] // multiple users
  let params = JSON.parse(event.body)
  let personalizationNames = params.name.toLowerCase().replaceAll(" ", "").split(",")
  let personalizations = []
  for (let p of personalizationNames) {
    personalizations.push({
      "to": [{ "email": p }]
    })
  }
  const msg = {
    //to: `kevinchao2011@gmail.com`, // Change to your recipient
    from: `curiossbu@gmail.com`, // Change to your verified sender
    subject: `Activity Digest for USER here`,
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

  console.log("Emails Sending...")
  return {
    statusCode: 200,
    //body: "Emails Sent"
  };
};