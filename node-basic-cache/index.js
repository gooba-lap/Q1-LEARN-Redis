const fastify = require('fastify')
const { MongoClient } = require('mongodb')

const mongoUri = 'mongodb+srv://admin:clDBilhMcEuFfzXl@cluster0.wydy7.mongodb.net'
const mongoDbName = 'basic101'
const mongoCollection = 'articles'
const mongoClient = new MongoClient(mongoUri, {
    useUnifiedTopology: true
})

const getArticles = async (criteria = {}) => {
    await mongoClient.connect()

    const datebase = mongoClient.db(mongoDbName)
    const Article = datebase.collection(mongoCollection)

    const articles = await Article.find(criteria).toArray()

    return articles 
} 

const createNewArticle = async (data = {}) => {
    await mongoClient.connect()

    const database = mongoClient.db(mongoDbName)
    const Article = database.collection(mongoCollection)

    const inserted = await Article.insertOne(data)

    return inserted
}

createNewArticle({
    title: 'Basic Cache 101',
    author: 'IOsonoTAN'
})

const app = fastify()

app.get('/', async (request, reply) => {
    const articles = await getArticles()

    reply.send(articles)
})

app.listen(3000, 'localhost', () => {
    console.log('app is listen on port 3000')
})