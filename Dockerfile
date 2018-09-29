FROM node:8.5
COPY . /app
WORKDIR /app
RUN npm install --registry=http://10.10.32.177
EXPOSE 4000
CMD npm run online --
