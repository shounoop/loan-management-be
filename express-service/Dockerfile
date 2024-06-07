FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --production


COPY . .

EXPOSE 3000

# CMD ["node", "app.js"]


# CMD ["npx", "sequelize-cli", "db:migrate"]
# CMD ["npm", "start"]

# how to run two commands in CMD
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]
