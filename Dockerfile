FROM node:12.5-alpine
WORKDIR /mock-api
ADD package.json .
COPY dist/ dist/
RUN npm install --production --only=prod
EXPOSE 3000 3001
CMD [ "npm", "run", "start:prod" ]