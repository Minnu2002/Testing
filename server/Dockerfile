# Use a base image with Node.js pre-installed
FROM node:20.11.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild all dependencies
# RUN npm rebuild

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express app runs on
EXPOSE 9000

# Command to run your application
CMD ["node", "server.js"]
