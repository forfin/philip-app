# FROM nginx:stable-alpine

# ENV TZ=Asia/Bangkok

# COPY ./.docker/nginx/nginx.conf /etc/nginx/nginx.conf
# COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# # Make Directory - Workspace
# RUN mkdir -p /var/www/html

# # ADD and set Group
# RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel

# # Set Group to Workspace
# RUN chown laravel:laravel /var/www/html

FROM nginx:stable-alpine

# Set the timezone (optional)
ENV TZ=Asia/Bangkok

# Copy the Nginx configuration files into the container

COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Create the directory for the web root (workspace)
RUN mkdir -p /var/www/html

# Add a new group and user for running Nginx
RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel

# Set ownership of the /var/www/html directory to the laravel user
RUN chown laravel:laravel /var/www/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx (default command in nginx:stable-alpine image)
CMD ["nginx", "-g", "daemon off;"]
