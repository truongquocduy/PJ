ARG NODE_VERSION=20.18.1

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /app
COPY package*.json ./

################################################################################
# Install prodution
FROM base AS prod-deps
ENV NODE_OPTIONS="--max-old-space-size=2048"

# RUN npm install --only=prod
RUN npm install

################################################################################
# Install deps
FROM base AS build-deps
ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN npm install

################################################################################
# Build prod
FROM build-deps AS build
ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY . .
RUN npm run build

################################################################################
# Runtime
FROM base AS runtime
ENV NODE_OPTIONS="--max-old-space-size=2048"

WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output

RUN npm install pm2 -g

RUN pm2 install pm2-logrotate \
    && pm2 set pm2-logrotate:max_size 128M \
    && pm2 set pm2-logrotate:retain 3 \
    && pm2 set pm2-logrotate:compress true

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["pm2-runtime", "./.output/server/index.mjs"]
