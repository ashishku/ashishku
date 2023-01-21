#-----------------------------------------
# NodeJS
#-----------------------------------------
FROM node:18.13.0-alpine as nodejs

WORKDIR /web
COPY . ./

RUN npm install 

#-----------------------------------------
# HUGO
#-----------------------------------------
FROM klakegg/hugo:0.107.0-ext-alpine-ci as hugo

WORKDIR /web

COPY --from=nodejs /web /web
RUN hugo 

#-----------------------------------------
# Deployment
#-----------------------------------------
FROM nginx:alpine-slim

WORKDIR /web

RUN mkdir -p /web

COPY --from=hugo /web/public /web
COPY --from=nodejs   /web/docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]
