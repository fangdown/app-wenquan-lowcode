FROM node:18-alpine
WORKDIR /app
COPY package*.json /app/
RUN yarn
COPY . .
EXPOSE 11011
CMD yarn start
