FROM node:latest

RUN npm install -g nodemon

ADD . /opt/src
WORKDIR /opt/src

RUN npm install

CMD node server.js
