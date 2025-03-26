# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the Vite default port (5173)
EXPOSE 5173

# Start Vite with --host to allow network access
CMD ["npm", "run", "dev", "--", "--host"]
