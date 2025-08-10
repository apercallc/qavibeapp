FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application code
COPY public/ ./public/
COPY src/ ./src/
COPY server/ ./server/
COPY scripts/ ./scripts/

# Create volume mount point for database
VOLUME ["/app/data"]

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/api/posts || exit 1

# Start application
CMD ["node", "server/blog-server-db.js"]
