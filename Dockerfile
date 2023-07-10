FROM node:14
WORKDIR /forward-authentication
COPY package.json package-lock.json ./
COPY src ./src
RUN npm install
EXPOSE 80
CMD ["node", "src/app.js"]
