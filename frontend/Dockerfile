FROM node:latest

RUN npm install npm@latest -g

COPY /src /frontend
WORKDIR /frontend

RUN npm install
CMD ["npm", "start"]