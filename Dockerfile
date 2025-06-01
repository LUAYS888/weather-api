FROM node:20

WORKDIR /app

# Copy dependencies config
COPY package*.json ./

# Install all dependencies including dev
RUN npm install

#  Fix jest permission
RUN chmod +x ./node_modules/.bin/jest

# Copy the rest of the code
COPY . .

# Use npx to run jest to avoid PATH or permission issues
CMD ["npm", "test"]
