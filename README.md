# Goober

Goober is a hangout app that simplifies how people connect for spontaneous events. Unlike traditional hangout apps, Goober eliminates the endless event scrolling by automatically matching users for you, prioritizing spontaneous connections.

## Features

- **Create Events**: Goobers (users) can easily create events.
- **Automatic Invitations**: When a Goober creates an event, Goober automatically sends out invitations to potential attendees.
- **Intelligent Matching**: OpenAI is used to match hosts and attendees based on their profiles, ensuring compatibility and a fun experience.
- **Spontaneous Hangouts**: We focus on creating spontaneous, fun events without overwhelming users with too many choices.
- **Personalize your profile: Your profile will determine whether you are compatible with the host user, so make it fun!

## Tech Stack

- **Backend**: Express.js for creating APIs and managing event/invitation/personal data.
- **Frontend**: React.js for building the user interface and interactions.
- **AI Integration**: OpenAI's API is utilized to evaluate profile compatibility between event hosts and potential attendees.

## Developers


- Node.js installed on your machine
- A running instance of OpenAI API (with valid API keys)
- .env file for both server (`OPEN_AI_KEY`, `PSQL_USR`, `PSQL_PW`) and client (`REACT_APP_BACKEND_API`)

To start, please cd into the `scripts` folder and run:

- `./install_pg_ubuntu.sh` (for Ubuntu systems)
  - or `./install_pg_macos.sh` (for MacOS systems)
- `./setup_pg.sh`

Skip the install steps if postgres is already installed and running.
The `goober` database will be created.

When changing the `setup/schema.sql` file, please run:

- `./drop_all.sh`
- `./setup_pg.sh`

Which will drop the `goober` database and set it up again.


## Running the Client Application with a Remote Server


To run the application locally, follow these steps:

1. **Navigate to the Client Directory**  
   Open your terminal and run the following command to change to the client directory:  
   ```bash
   cd client
   ```

2. **Create a `.env` File**  
   In the `client` directory, create a file named `.env` and paste the following line into it:  
   `REACT_APP_BACKEND_API=http://goober.jzydeng.com:8003`

3. **Install Dependencies and Start the Application**  
   Run the following command to install the necessary dependencies:  
   ```bash
   npm install
   npm start
   ```

4. **Log in with these credentials:**

   Usernames: `bicwang`, `micahdb`, `nakulbansal727`, `simon` 
   Password: `1234` (for all accounts)
   
Your application should now be running locally, and it connected to an extern server.
Passwords you can you are 

