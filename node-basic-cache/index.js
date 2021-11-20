const fastify = require('fastify')
const { MongoClient } = require('mongodb')
const redis = require('redis')
const { promisify } = require('util')

const redisClient = redis.createClient()
redisClient.on('error', (error) => {
    console.error('redis error ->', error)
})
const redisGetAsync = promisify(redisClient.get).bind(redisClient)

const mongoUri = 'mongodb+srv://admin:clDBilhMcEuFfzXl@cluster0.wydy7.mongodb.net'
const mongoDbName = 'basic101'
const mongoCollection = 'articles'
const mongoClient = new MongoClient(mongoUri, {
    useUnifiedTopology: true
})

const getArticles = async (criteria = {}) => {
    const redisCacheKey = 'basic101:articles'
    const articlesInCache = await redisGetAsync(redisCacheKey)
    console.log('articlesInCache ->', articlesInCache)

    // cache is here
    if (articlesInCache) { 
        return JSON.parse(articlesInCache)
    }

    await mongoClient.connect()

    const datebase = mongoClient.db(mongoDbName)
    const Article = datebase.collection(mongoCollection)

    const articles = await Article.find(criteria).toArray()

    redisClient.setex(redisCacheKey, 60*10, JSON.stringify(articles))

    return articles 
} 

const createNewArticle = async (data = {}) => {
    await mongoClient.connect()

    const database = mongoClient.db(mongoDbName)
    const Article = database.collection(mongoCollection)

    const inserted = await Article.insertOne(data)

    return inserted
}

// createNewArticle({
//     title: 'Basic Cache 101',
//     author: 'IOsonoTAN'
// })

const app = fastify()

app.get('/', async (request, reply) => {
    const articles = await getArticles()

    reply.send(articles)
})

app.listen(3000, 'localhost', () => {
    console.log('app is listen on port 3000')
})