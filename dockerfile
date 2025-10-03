# Frontend build stage
FROM node:18-alpine AS frontend-build

# Set working directory
WORKDIR /frontend

# Copy frontend package files
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend files
COPY . .

# Build the frontend
RUN npm run build

# Backend build stage
FROM node:18-alpine AS backend-build

# Set working directory
WORKDIR /backend

# Clone backend repository
RUN apk add --no-cache git
RUN git clone https://github.com/MilanRamadhan/milano-sport-backend.git .

# Install backend dependencies
RUN npm install

# Create .env file for backend
RUN echo "PORT=5000\nMONGODB_URI=\${MONGODB_URI}\nJWT_SECRET=\${JWT_SECRET}" > .env

# Production stage
FROM nginx:alpine

# Install Node.js
RUN apk add --no-cache nodejs npm

# Create app directory
WORKDIR /app

# Copy backend files
COPY --from=backend-build /backend ./backend

# Copy frontend build
COPY --from=frontend-build /frontend/dist ./frontend/dist

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Install PM2 globally
RUN npm install -g pm2

# Expose port
EXPOSE 80

# Copy start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Start services
CMD ["/app/start.sh"]