FROM node:16

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Copy source to container
COPY . .

CMD [ "yarn", "start" ]

