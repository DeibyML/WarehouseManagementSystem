FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i --production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
