FROM nginx:alpine

COPY app.js /var/www/
COPY index.html /var/www/
COPY scripts /var/www/scripts
COPY styles /var/www/styles
COPY libs /var/www/libs
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY entrypoint.sh /
RUN ["chmod", "+x", "/entrypoint.sh"]
EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]


