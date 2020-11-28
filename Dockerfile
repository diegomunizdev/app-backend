FROM node:alpine

# create app-backend directory
RUN mkdir -p /usr/src/app-backend
WORKDIR /usr/src/app-backend

# copy app source
COPY . /usr/src/app-backend

# install dependencies
RUN npm install

EXPOSE 3001

# start app-backend
CMD [ "npm", "start" ]