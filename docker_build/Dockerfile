FROM alpine

ARG CODE=code
ARG SRC=${CODE}/src

RUN apk update && apk upgrade 
RUN apk add nodejs npm
WORKDIR /var/pumpkin/src 
RUN npm init -y
RUN npm install --save vue vue-router vuex vue-numeric-input vue-material core-js global 
RUN npm install --save-dep webpack webpack-cli
RUN npm install --save-dev vue-loader vue-template-compiler vue-style-loader css-loader
RUN mkdir -p components  build /output/dist

COPY ${SRC}/App.vue App.vue
COPY ${SRC}/router.js router.js
COPY ${SRC}/store.js store.js
COPY ${SRC}/main.js main.js

COPY ${SRC}/components/CardPage.vue components/
COPY ${SRC}/components/Row.vue components/

COPY ${SRC}/components/Gourds.vue components/
COPY ${SRC}/components/Other.vue components/
COPY ${SRC}/components/Pumpkins.vue components/
COPY ${SRC}/components/Total.vue components/
COPY ${SRC}/components/Home.vue components/


COPY ${CODE}/webpack.config.dev.js build/webpack.config.dev.js
COPY ${CODE}/index.html index.html
COPY addbuild.sed addbuild.sed
RUN sed -f addbuild.sed package.json > package.json.1
RUN mv package.json.1 package.json
RUN npm run build

RUN cp index.html /output
RUN cp dist/main.js /output/dist
