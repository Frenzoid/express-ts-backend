FROM  node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV APPPORT=8001
ENV APPNAME="express template app"

ENV LOGGERPATH="./log/access.log"

ENV DBPASSWORD=example
ENV DBUSER=postgres
ENV DBHOST=database
ENV DBPORT=5432
ENV DBNAME=db

ENV JWTSECRET=secret
ENV TZ=Europe/Madrid

RUN npm install -g nodemon
RUN npm install -g typescript

COPY package.json /usr/src/app/

RUN npm install
RUN apt-get update
RUN apt-get install nano

COPY ./dist /usr/src/app/dist

# CHANGE THIS IF YOU WANT TO BUILD FOR PRODUCTION (DMD ["npm", "start"]).
CMD [ "npm", "run", "dev" ]