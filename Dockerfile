# Stage 1: Build the Nuxt app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the generate command to create static files
RUN npm run generate
RUN ls -l

# Stage 2: Serve the static files with Nginx
FROM nginx:stable-alpine AS production

# Copy the generated static files from the builder stage to the Nginx public directory
COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d

# Expose port 80 (default for Nginx)
EXPOSE 80

# The default Nginx CMD will start the server
CMD ["nginx", "-g", "daemon off;"]