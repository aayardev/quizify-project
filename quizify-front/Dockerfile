FROM node:18-alpine

WORKDIR /quizify-front

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

EXPOSE 5555

CMD ["npm", "run", "dev"]