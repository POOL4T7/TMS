# Build the client app
FROM node:18-alpine as clientWorker

WORKDIR /usr/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./
ENV VITE_SERVER_URL="http://localhost:9876"
RUN npm run build

# basic setup of nginx for client app
FROM nginx:alpine

WORKDIR /usr/share/nginx/html/tms
RUN rm -rf ./*
# RUN rm -rf /etc/nginx/conf.d/*
COPY --from=clientWorker /usr/app/dist/ . /usr/share/nginx/html/tms/

COPY ./nginx.conf /etc/nginx/conf.d/tms-client.conf
EXPOSE 8000
ENTRYPOINT [ "nginx","-g", "daemon off;" ]