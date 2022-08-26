FROM node:16

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Copy source to container
COPY . .

RUN chmod +x index.sh

ENTRYPOINT [ "/index.sh" ]

