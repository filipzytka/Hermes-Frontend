FROM node:20 as build 
WORKDIR /app/react-app 

COPY package.json . /app/react-app/

RUN npm install

COPY . . 

RUN npm run build

FROM node:20 as production 
WORKDIR /app/react-app 

COPY --from=build /app/react-app/dist/ /app/react-app/dist/