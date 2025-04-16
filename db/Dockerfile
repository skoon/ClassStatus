FROM alpine:latest AS build-backend
ARG PB_VERSION=0.25.9
RUN mkdir -p /app/pb
RUN apk add --no-cache \
    unzip \
    ca-certificates

# Download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /app/pb/

# Uncomment to copy the local pb_migrations dir into the image
# COPY ./db/pb_migrations/StudentLogEntries_initialize /app/pb/pb_migrations/1731966407_created_StudenLogEntries

# Set the working directory
WORKDIR /app/pb

# Start PocketBase
CMD ["/app/pb/pocketbase", "serve", "--http=0.0.0.0:8091"]