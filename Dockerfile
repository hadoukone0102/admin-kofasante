FROM node:18.16.0
# RUN mkdir /home/node/app && chown node:node /home/node/app
# RUN mkdir /home/node/app/node_modules && chown node:node /home/node/app/node_modules
# WORKDIR  /home/node/app
# USER node
# COPY --chown=node:node package.json package-lock.json ./
# # RUN npm ci --quiet
# COPY --chown=node:node . .
RUN mkdir /project
WORKDIR /project

COPY . .


EXPOSE 4200
RUN npm install -g @angular/cli
RUN npm install
CMD ["ng", "serve", "--host", "0.0.0.0"] 