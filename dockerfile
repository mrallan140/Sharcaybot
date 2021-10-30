FROM node:latest

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json


RUN npm install

COPY . /code

CMD [ "node", "main.js"]