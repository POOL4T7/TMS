# Task Management App

## Overview

This task management app is designed to help individuals and teams organize, prioritize, and track their tasks efficiently. Whether you're managing personal projects or collaborating on work tasks, this app provides a user-friendly interface to streamline your workflow. The project aimed to create a centralized platform for team task management, enhancing collaboration and productivity.

## Technologies Used

- **Frontend**: React.js, RTKQuery, Redux, socket.io, MUI.
- **Backend**: Node.js, Express.js, MongoDB, Redis, socket.io, onesignal, winston
- **Authentication**: JSON Web Tokens (JWT)
- **Real-Time Communication**: socket.io (for real-time updates)

## Installation

1. Clone the repository: `git clone https://github.com/POOL4T7/TMS.git`
2. Navigate to the project directory: `cd TMS`
3. Install dependencies for server: `npm install --prefix server`
4. Install dependencies for client: `npm install --prefix client`
5. Set up environment variables in their root directory (e.g., MongoDB connection URI, JWT secret)
6. RUN `npm run dev` in both root folder to start the backend and client server
7. Access the app in your browser: `http://localhost:5173`

## Usage

1. Sign up for an account or log in if you already have one.
2. Create projects and add tasks to them.
3. Assign tasks to team members and set due dates.
4. Monitor task progress, make updates, and communicate with team members.
5. Receive notifications for important updates and deadlines.

## Contributing

Contributions are welcome! Feel free to open issues for bugs or feature requests, and submit pull requests to contribute improvements.

## Deployment

1. Vagrant Virtual Machine (ubuntu) script added
2. Docker Setup ✅
