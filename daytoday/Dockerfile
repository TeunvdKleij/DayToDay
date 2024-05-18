FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/out /app/out
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "out", "-l", "3000"]