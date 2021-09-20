# Curios

## Goals
Provide a platform for:
- Course scheduling and viewing
- Course-specific Q&A system for students to ask questions and instructors to answer them

## Dependencies
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Chakra UI](https://chakra-ui.com/)

## Installation
1. Clone the repository `git clone git@github.com:VIP-Tech-Business-in-Development/curios.git`. Note: If you don't have an SSH key added, please [generate a new SSH key](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and [add it to your GitHub account](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).
2. Change your working directory to the `curios` directory by running `cd curios`.
3. Run `cd client` and create a .env file in the `client` directory.

### .env file
env files are a safe way to store project configurations and sensitive data across machines while still having a flexible way to configure your project per environment.

The `.env` file is nothing more than a simple hidden text file that you should create on the target deploy containing `KEY=VALUE` pairs separated by row breaks.

The `curios` project should have an `.env` file in the root directory with the following keys:
```
REACT_APP_PUBLIC_SUPABASE_URL=<SUPABASE PUBLIC URL>
REACT_APP_PUBLIC_SUPABASE_KEY=<SUPABASE PUBLIC KEY>
```
Make sure to replace `REACT_APP_PUBLIC_SUPABASE_URL`, `REACT_APP_PUBLIC_SUPABASE_KEY`.

4. Run `yarn` to install client dependencies.
5. By now, you should everything needed to setup the app. In one terminal, run `yarn start` in the `client` directory.

## Commands
`yarn start` - starts the client. It should automatically launch a new tab in your browser and be hosted at http://localhost:3000.
