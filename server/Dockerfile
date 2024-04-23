FROM node:18

# Set the working directory inside the container
WORKDIR /ci_practice/server

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to container
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the server
CMD ["npm", "start"]
