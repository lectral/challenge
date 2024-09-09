FROM mcr.microsoft.com/playwright:v1.47.0-noble

WORKDIR /workspace

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
