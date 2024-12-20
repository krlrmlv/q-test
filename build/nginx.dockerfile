ARG NGINX_VERSION=1.22.1

FROM nginx:$NGINX_VERSION-alpine as build

ARG NGINX_VERSION=1.22.1
ARG GEOIP2_VERSION=3.4

RUN apk --update --no-cache add \
        gcc \
        make \
        libc-dev \
        g++ \
        openssl-dev \
        linux-headers \
        pcre-dev \
        zlib-dev \
        libtool \
        automake \
        autoconf \
        libmaxminddb-dev \
        git

RUN cd /opt \
    && git clone --depth 1 -b $GEOIP2_VERSION --single-branch https://github.com/leev/ngx_http_geoip2_module.git \
    && wget -O - http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz | tar zxfv - \
    && mv /opt/nginx-$NGINX_VERSION /opt/nginx \
    && cd /opt/nginx \
    && ./configure --with-compat --add-dynamic-module=/opt/ngx_http_geoip2_module \
    && make modules 

FROM nginx:$NGINX_VERSION-alpine as production

COPY --from=0 /opt/nginx/objs/ngx_http_geoip2_module.so /usr/lib/nginx/modules

RUN apk --update --no-cache add libmaxminddb \
    && chmod -R 644 /usr/lib/nginx/modules/ngx_http_geoip2_module.so

WORKDIR /usr/src/app
COPY ./ ./

COPY ./build/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./build/nginx/ekfgroup.conf /etc/nginx/conf.d/ekfgroup.conf
COPY ./build/nginx/ekfgroup.com.rewrites /etc/nginx/conf.d/ekfgroup.com.rewrites
COPY ./build/nginx/ssl /ssl

ENTRYPOINT ["nginx", "-g", "daemon off;"]

