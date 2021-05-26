import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
  -- Enable pgcrypto to hash password
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  -- Case-insensitive for comparisons, maintain capitalization when read
  CREATE EXTENSION IF NOT EXISTS "citext";

  -- Create schemas
  CREATE SCHEMA curios;
  CREATE SCHEMA curios_private;

  -- Create roles
  CREATE ROLE curios_postgraphile LOGIN PASSWORD '(9+f"M=(=-.x.Nd$';
  CREATE ROLE curios_admin;
  CREATE ROLE curios_anonymous;
  GRANT curios_anonymous TO curios_postgraphile;
  GRANT curios_anonymous TO curios_admin;
  CREATE ROLE curios_user;
  GRANT curios_user TO curios_postgraphile;
  GRANT curios_user TO curios_admin;

  CREATE TABLE curios.user (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE curios_private.user_account (
    user_id UUID PRIMARY KEY REFERENCES curios.user(user_id) ON DELETE CASCADE,
    email citext CHECK(LENGTH(email) <= 255 AND email ~ '[^@]+@[^@]+\.[^@]+') UNIQUE,
    password TEXT NOT NULL
  );

  CREATE TYPE curios.jwt_token as (
    role TEXT,
    user_id UUID,
    exp BIGINT
  );

  CREATE TABLE curios.class (
    class_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_number VARCHAR(255),
    course_name VARCHAR(255) NOT NULL,
    class_term VARCHAR(255),
    status BOOLEAN DEFAULT 'on', -- 'on' represents active, 'off' represents inactive
    private_posts BOOLEAN DEFAULT 'on',
    student_polls BOOLEAN DEFAULT 'on',
    description TEXT
  );

  CREATE TYPE user_role AS ENUM ('instructor','student','teaching assistant');

  CREATE TABLE curios.user_class (
    user_id UUID NOT NULL,
    class_id UUID NOT NULL,
    user_role USER_ROLE,  -- defines what kind of role that user has in a particular class
    PRIMARY KEY (user_id, class_id),
    CONSTRAINT fk_user_class_user
      FOREIGN KEY (user_id) REFERENCES curios.user(user_id),
    CONSTRAINT fk_user_class_class
      FOREIGN KEY (class_id) REFERENCES curios.class(class_id)
  );

  CREATE FUNCTION curios.current_user_id() RETURNS UUID AS $$
    SELECT current_setting('jwt.claims.user_id', true)::uuid;
  $$ LANGUAGE sql STABLE;

  CREATE FUNCTION curios.current_user_role() RETURNS TEXT AS $$
    SELECT current_setting('jwt.claims.role', true)::text;
  $$ LANGUAGE sql STABLE;

  ALTER TABLE curios.user ENABLE ROW LEVEL SECURITY;
  CREATE POLICY select_user ON curios.user FOR SELECT USING (true);
  CREATE POLICY update_user ON curios.user FOR UPDATE TO curios_user USING (user_id = curios.current_user_id() OR curios.current_user_role() = 'curios_admin');
  CREATE POLICY delete_user ON curios.user FOR DELETE TO curios_user USING (user_id = curios.current_user_id() OR curios.current_user_role() = 'curios_admin');

  CREATE FUNCTION curios.register_user(
    name VARCHAR(255),
    username VARCHAR(255),
    email citext,
    password TEXT
  ) RETURNS curios.user AS $$
  DECLARE
    new_user curios.user;
  BEGIN
    INSERT INTO curios.user (name, username) VALUES
      (name, username)
      RETURNING * INTO new_user;

    INSERT INTO curios_private.user_account (user_id, email, password) VALUES
      (new_user.user_id, email, crypt(password, gen_salt('bf')));

    return new_user;
  END;
  $$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

  CREATE FUNCTION curios.register_admin(
    name VARCHAR(255),
    username VARCHAR(255),
    email citext,
    password TEXT
  ) RETURNS curios.user AS $$
  DECLARE
    new_user curios.user;
  BEGIN
    INSERT INTO curios.user (name, username, account_verified, is_admin) VALUES
      (name, username, true, true)
      RETURNING * INTO new_user;

    INSERT INTO curios_private.admin_account (admin_id, email, password) VALUES
      (new_user.user_id, email, crypt(password, gen_salt('bf')));

    return new_user;
  END;
  $$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

  CREATE FUNCTION curios.authenticate(
    email citext,
    password TEXT
  ) RETURNS curios.jwt_token AS $$
  DECLARE
    account curios_private.user_account;
  BEGIN
    SELECT o.* INTO account
    FROM curios_private.user_account as o
    WHERE o.email = $1;

    if account.password = crypt(password, account.password) then
      return ('curios_user', account.user_id, 60)::curios.jwt_token;
    else
      return null;
    end if;
  END;
  $$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

  CREATE FUNCTION curios.authenticate_admin(
    email citext,
    password TEXT
  ) RETURNS curios.jwt_token AS $$
  DECLARE
    account curios_private.user_account;
  BEGIN
    SELECT o.* INTO account
    FROM curios_private.admin_account as o
    WHERE o.email = $1;

    if account.password = crypt(password, account.password) then
      return ('curios_admin', account.user_id, 60)::curios.jwt_token;
    else
      return null;
    end if;
  END;
  $$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

  CREATE FUNCTION curios.current_user() RETURNS curios.user AS $$
    SELECT *
    FROM curios.user
    WHERE user_id = curios.current_user_id()
  $$ LANGUAGE sql STABLE;

  GRANT USAGE ON SCHEMA curios TO curios_anonymous, curios_user, curios_admin;
  GRANT SELECT ON TABLE curios.user TO curios_anonymous, curios_user, curios_admin;
  GRANT UPDATE, DELETE ON TABLE curios.user TO curios_user, curios_admin;
  GRANT EXECUTE ON FUNCTION curios.authenticate(citext, text) TO curios_anonymous, curios_user;
  GRANT EXECUTE ON FUNCTION curios.authenticate_admin(citext, text) TO curios_anonymous, curios_admin;
  GRANT EXECUTE ON FUNCTION curios.register_user(VARCHAR(255), VARCHAR(255), citext, text) TO curios_anonymous, curios_admin;
  GRANT EXECUTE ON FUNCTION curios.register_admin(VARCHAR(255), VARCHAR(255), citext, text) TO curios_admin;
  GRANT EXECUTE ON FUNCTION curios.current_user() TO curios_anonymous, curios_user;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
  DROP TABLE curios_private.admin_account, curios_private.user_account, curios.user CASCADE; 
    DROP SCHEMA curios_private, curios CASCADE;
    DROP ROLE IF EXISTS curios_anonymous;
    DROP ROLE IF EXISTS curios_user;
    DROP ROLE IF EXISTS curios_admin;
    DROP ROLE IF EXISTS curios_postgraphile;`);
}
