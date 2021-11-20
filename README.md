How to do caching on Node.js by Redis?
https://www.youtube.com/watch?v=e6z1KXluIIY&t=315s

## set environment

```bash
npm init -y
```

```bash
npm i -S mongodb fastify 
```

```bash
npm i -D nodemon 
```

-

```bash
npm i -S redis
```

## run / TERMINAL 1: node,redis-server

```bash
redis-server
```

```bash
npm run dev
```

# use redis / TERMINAL 2: redis-cli

```bash
redis-cli
```

```bash
keys *
```

```bash
get 'key'
```

```bash
ttl 'key'
```
