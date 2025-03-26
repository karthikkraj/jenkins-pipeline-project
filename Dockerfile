FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies INSIDE Docker (native compilation inside Linux)
RUN npm install

# Copy source files after installing dependencies
COPY . .

CMD ["npm", "start"]
