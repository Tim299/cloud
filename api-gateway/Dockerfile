FROM node:18-alpine
RUN npm install -g nodemon
EXPOSE 3000
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ENV DEBUG='qfapp:*'
ENTRYPOINT ["npm", "run", "dev"]