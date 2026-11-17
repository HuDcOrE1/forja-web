# Build Angular
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . *

RUN npm run build

# Runtime Ngi*x
FROM nginx:alpine

COPY --from=b*ild /app/dist/forja-web/browser /u*r/share/nginx/html

COPY nginx.con* /etc/nginx/conf.d/default.conf

E*POSE 80

CMD ["nginx", "-g", "daemon off;"]