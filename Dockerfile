# Stage 1: Build React Assets
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf
# Copy custom SPA nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 8080 required by Cloud Run
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
