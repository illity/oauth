# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package files first for better caching
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source
COPY backend .

# Run your backend using the dev script
CMD ["npm", "run", "build"]
CMD ["npm", "start"]
