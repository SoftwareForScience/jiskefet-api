#
# ---- Base ----
FROM node:12.13.1 as base

WORKDIR /usr/src/app


#
# ---- Dependency ----
FROM base as dependencies

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
EXPOSE 4000

# Run start script as specified in package.json
CMD [ "npm", "start" ]
