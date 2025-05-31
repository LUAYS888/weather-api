FROM node:20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Add execution permission to jest binary (important in some runners)
RUN chmod +x ./node_modules/.bin/jest

COPY . .

# Default command
CMD ["npm", "test"]
