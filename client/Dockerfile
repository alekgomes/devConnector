FROM node

WORKDIR /usr/app

COPY package*.json ./

ENV PATH /usr/app/client/node_modules/.bin:$PATH

RUN npm install

COPY . ./

EXPOSE 3000

CMD npm start