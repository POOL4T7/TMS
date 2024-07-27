# Use the Node.js Alpine image as base
FROM node:18-alpine

# Set the working directory
WORKDIR /tms-server

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the source files and folders
COPY . .

# Build the server
RUN npm run build

# import the data to mongodb
# RUN npm run importData

# Expose port 8080 for Node.js

EXPOSE 9876
CMD [ "npm", "start"]

