FROM nginx
MAINTAINER zhb
COPY dist  /usr/share/nginx/html/ 
COPY config  /etc/nginx/conf.d/