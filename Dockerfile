FROM node:lts-alpine

WORKDIR /app
COPY . /app

RUN rm -f package-lock.json \
    ; rm -rf .idea \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm i -f

EXPOSE 3000
CMD ["node", "./src/server/app.js"]
