FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY public/index.html ./
COPY src ./src
COPY public/favicon.ico ./
COPY robots.txt ./
COPY sitemap.xml ./
COPY config ./config
COPY docs ./docs
COPY photos ./photos

# Optional: custom nginx config
COPY ../nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
