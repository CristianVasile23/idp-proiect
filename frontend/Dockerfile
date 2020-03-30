FROM node:latest

RUN npm install npm@latest -g

COPY /src /frontend
WORKDIR /frontend
EXPOSE 3000

RUN npm install
CMD ["npm", "start"]