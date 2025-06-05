# Use the official Node 22 Alpine image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy app source code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose app port (change if needed)
EXPOSE 3000

# Start the application
CMD ["node", "src/app.js"]
