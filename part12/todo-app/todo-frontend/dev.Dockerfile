FROM node:16.17.0-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN CI=true npm test

ENV REACT_APP_BACKEND_URL http://localhost:3000

CMD ["npm", "start"]