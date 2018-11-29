FROM node:10
RUN mkdir -p /opt/autodns
WORKDIR /opt/autodns
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY index.js ./
COPY src ./src
RUN yarn build
ENTRYPOINT ["yarn", "start"]
