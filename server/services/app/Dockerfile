FROM node:18.15.0

WORKDIR /app

ENV PORT=4002

ENV NODE_ENV=production

ENV DATABASE_URL="postgresql://postgres:7XaV9tF4tMP2shB0@db.zsjwavjshqtuiyibcjwc.supabase.co:5432/postgres"

COPY package.json package-lock.json /app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]