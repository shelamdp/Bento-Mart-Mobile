FROM node:18.15.0

WORKDIR /app

ENV PORT=4001

ENV MONGODB_URL="mongodb+srv://shelamdp:LuJzcx8me1HW1g8Q@shelamdp.2rqaiul.mongodb.net/?retryWrites=true&w=majority"

COPY package.json package-lock.json /app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]