FROM node:7.7.4-alpine

RUN mkdir /src
COPY app.js /src
WORKDIR /src
EXPOSE 3000
CMD node app.js