FROM node:20 as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
COPY nginx.conf /etc/nginx/sites-available/default 
EXPOSE 80
COPY run_server.sh /usr/local/bin
RUN chmod +x /usr/local/bin/run_server.sh
CMD ["run_server.sh"]