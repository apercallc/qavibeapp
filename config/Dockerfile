FROM node:18-alpine

WORKDIR /app

# Install curl for health check
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application code
COPY public/ ./public/
COPY src/ ./src/
COPY server/ ./server/
COPY scripts/ ./scripts/
COPY documentation/ ./documentation/

# Install documentation dependencies
WORKDIR /app/documentation
RUN npm install --only=production

# Return to main directory
WORKDIR /app

# Create volume mount point for database
VOLUME ["/app/data"]

# Expose ports for all services
EXPOSE 3001 3002 3003 8002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/api/posts || exit 1

# Create startup script
RUN echo '#!/bin/sh\n\
# Start blog server\n\
node server/blog-server-db.js &\n\
\n\
# Start API server\n\
node server/api-server.js &\n\
\n\
# Start documentation server\n\
cd documentation && npx docusaurus start --port 3003 --host 0.0.0.0 &\n\
cd ..\n\
\n\
# Start frontend server\n\
cd public && python3 -m http.server 8002 --bind 0.0.0.0 &\n\
\n\
# Wait for all processes\n\
wait' > /app/start-all.sh && chmod +x /app/start-all.sh

# Start application
CMD ["/app/start-all.sh"]
