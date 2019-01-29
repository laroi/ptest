FROM nginx:alpine

COPY app.js /var/www/
COPY index.html /var/www/
COPY scripts /var/www/
COPY styles /var/www/
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


