# Use the official RabbitMQ image from the Docker Hub
FROM rabbitmq:3-management

# Expose the default RabbitMQ port
EXPOSE 5672

# Expose the RabbitMQ management plugin port
EXPOSE 15672

# Set default environment variables (optional)
# These are useful if you want to set default credentials and virtual host
ENV RABBITMQ_DEFAULT_USER=user
ENV RABBITMQ_DEFAULT_PASS=password
ENV RABBITMQ_DEFAULT_VHOST=/

# Command to run RabbitMQ server
CMD ["rabbitmq-server"]
