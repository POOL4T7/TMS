# Task Management App

## Overview

This Task Management App is designed to help individuals and teams organize, prioritize, and track their tasks efficiently. Whether you're managing personal projects or collaborating on work tasks, this app provides a user-friendly interface to streamline your workflow. The project aims to create a centralized platform for team task management, enhancing collaboration and productivity through real-time updates and notifications.

## Technologies Used

- **Frontend**:

  - **React.js**: A JavaScript library for building user interfaces.
  - **RTK Query**: A data fetching and caching tool for Redux.
  - **Redux**: A state management library.
  - **socket.io**: A library for real-time web applications.
  - **MUI (Material-UI)**: A popular React UI framework.

- **Backend**:

  - **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - **Express.js**: A minimal and flexible Node.js web application framework.
  - **MongoDB**: A NoSQL database for storing task and project data.
  - **Redis**: An in-memory data structure store, used as a database, cache, and message broker.
  - **socket.io**: Enables real-time, bidirectional, and event-based communication.
  - **OneSignal**: A service for sending push notifications.
  - **Winston**: A logging library.

- **Authentication**:
  - **JSON Web Tokens (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties.

## Installation

1. Clone the repository: `git clone https://github.com/POOL4T7/TMS.git`
2. Navigate to the project directory: `cd TMS`
3. Install dependencies for server: `npm install --prefix server`
4. Install dependencies for client: `npm install --prefix client`
5. Create a .env file in both server and client directories.
6. Set up environment variables in their root directory (refrence from example.env)
7. RUN `npm run dev` in both root folder to start the backend and client server
8. Access the app in your browser: `http://localhost:5173`

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
