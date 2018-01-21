FROM node:8.6.0

WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY tsconfig.json .
COPY .angular-cli.json .
COPY src src

RUN yarn build -prod

FROM nginx:1.13.8

COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
