FROM node:8.7-alpine
WORKDIR /opt/app

COPY *.js /opt/app/
COPY *.json /opt/app/
COPY entrypoint.sh /opt/app/
COPY api /opt/app/api/
COPY lib /opt/app/lib/
COPY mongo /opt/app/mongo/
COPY scripts /opt/app/scripts/
RUN ["chmod", "+x", "/opt/app/entrypoint.sh"]

RUN npm install --only=prod
EXPOSE 3000
ENTRYPOINT /opt/app/entrypoint.sh


