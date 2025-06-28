# Use official Node.js LTS image
FROM node:18-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

# Build the code during image build
RUN npm run build

# Then start the compiled code at runtime
CMD ["npm", "start"]
