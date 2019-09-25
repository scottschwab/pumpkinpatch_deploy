FROM nginx

RUN mkdir -p /usr/share/nginx/html/dist
COPY site/index.html /usr/share/nginx/html
COPY site/main.tar /usr/share/nginx/html/main.tar
RUN cd /usr/share/nginx/html; tar xvf main.tar; rm main.tar
