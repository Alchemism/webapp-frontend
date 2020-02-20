FROM node:13.8.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY ./public /app/public
COPY ./src /app/src

RUN npm install 
RUN npm install react-scripts@3.0.1 -g 

ENV url=localhost

CMD ["npm", "start"]