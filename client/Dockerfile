FROM node:18.12

WORKDIR /app

COPY ./package.json ./package.json
COPY ./public ./public
COPY ./src ./src

RUN npm install --silent

EXPOSE 3000

CMD npm start