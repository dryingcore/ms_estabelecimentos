FROM node:18

ENV NODE_ENV=production

# Instalar o cliente MySQL
RUN apt-get update && apt-get install -y mysql-client

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 4321

CMD ["npm run start:production"]
