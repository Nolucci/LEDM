# Use official Nginx image
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy static site files
COPY public/ /usr/share/nginx/html/
COPY src/pages/ /usr/share/nginx/html/
COPY src/assets/ /usr/share/nginx/html/assets/
COPY src/styles/ /usr/share/nginx/html/styles/
COPY src/scripts/ /usr/share/nginx/html/scripts/
COPY favicon.ico /usr/share/nginx/html/

# Copy custom nginx config if present
COPY docs/nginx-ledm-subdomain.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]