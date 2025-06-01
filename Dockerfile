# Use Node 20 base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install all dependencies (prod + dev)
RUN npm install

# Optional: ensure Jest binary is executable (not always needed but safe)
RUN chmod +x ./node_modules/.bin/jest

# Copy application source code
COPY . .

# Run tests using the npm script (uses Jest via CommonJS)
CMD ["npm", "test"]
