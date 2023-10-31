FROM node:18 AS build

# 创建一个项目文件夹，可自定义
RUN mkdir /app  

# 切入项目文件夹下
WORKDIR /app

# 将本地文件复制到项目文件夹下
COPY . /app

RUN yarn config set registry https://registry.npm.taobao.org/

# RUN yarn install -g npm@10.2.1

RUN yarn install

RUN yarn run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
# 把源代码复制过去， 以便报错能报对行
COPY --from=build /app/src ./src
COPY --from=build /app/bootstrap.js ./
COPY --from=build /app/package.json ./

RUN apk add --no-cache tzdata

ENV TZ="Asia/Shanghai"

RUN npm install --production

# 如果端口更换，这边可以更新一下
EXPOSE 7001

#CMD ["pm2-runtime", "start", "bootstrap.js", "--name server"]
CMD ["yarn", "serve"]