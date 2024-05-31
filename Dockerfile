# Use the official Node.js image as base
FROM node:latest

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

RUN npx prisma generate

# Command to run the application
CMD ["npm", "start"]
