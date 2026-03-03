FROM node:18-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --production && mkdir -p /app/logs

# Copy source
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/index.js"]
