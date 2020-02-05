#
# ---- Base ----
FROM centos:7.7.1908 as base

# Change shell from 'sh' to 'bash'
SHELL [ "/bin/bash", "-c" ]

# Install required system dependencies
RUN yum install --quiet --assumeyes \
    bzip2 \
    gcc \
    g++ \
    gcc-c++ \
    make


#
# ---- Node Version Manager ----
FROM base as nvm

# Specify the required versions of NodeJS and Node Version Manager
ENV NVM_VERSION=v0.35.2
ENV NODE_VERSION=12.14.1

# Specifiy the NVM install directory
ENV NVM_DIR=/root/.nvm

# Installs NVM which will automatically install NodeJS and NPM
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash

# Add the just installed NodeJS and NPM to the PATH
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH


#
# ---- Node ----
FROM nvm as node

# Create app directory
WORKDIR /usr/src/app


#
# ---- Dependency ----
FROM node as dependencies

# Copy package.json and package-lock.json to the container.
COPY package*.json ./

# Installs modules from package-lock.json, this ensures reproducible build.
RUN npm --silent ci


#
# ---- Build ----
FROM dependencies as build

# Copy all files, except those ignored by .dockerignore, to the container.
COPY . .


#
# ---- Release ----
FROM build as release

# Expose the port to the Docker instance (not the host!).
EXPOSE 3000

# Run start script as specified in package.json
CMD [ "npm", "start" ]
