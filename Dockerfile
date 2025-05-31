# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Run tests  When the container runs, this command will execute tests using Jest.
CMD ["npm", "test"]
