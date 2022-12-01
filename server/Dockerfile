FROM node:18.12

WORKDIR /app

COPY ./const ./const
COPY ./mailer ./mailer
COPY ./middleware ./middleware
COPY ./models ./models
COPY ./routes ./routes
COPY ./seed ./seed
COPY ./validation ./validation
COPY ./.env ./.env
COPY ./package.json ./package.json
COPY ./server.js ./server.js

RUN npm install --silent

EXPOSE 5000

CMD npm run seed && npm start
