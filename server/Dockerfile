FROM node:18

RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /ci_practice/server

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application files to container
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the server
CMD ["pnpm", "start"]
