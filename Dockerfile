# Use a Node.js base image
FROM node:14-alpine

# Set the work directory in the container
WORKDIR /app

#Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the desired port (e.g., 3000 for React)
EXPOSE 3000

# Run the React app when the container starts
CMD ["npm", "start"]