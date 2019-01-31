const Hapi = require('hapi')

const config = require('./knexfile')
const knex = require('knex')(config)

const {RecipeRepository} = require('./src/repository')
const createApolloServer = require('./src/apollo_server')
const createRestEndpoints = require('./src/rest_endpoints')

async function startServer() {
  const recipeRepository = new RecipeRepository(knex)

  const server = createApolloServer(recipeRepository)

  const app = new Hapi.server({
    port: process.env.PORT || 4000
  })

  await server.applyMiddleware({
    app,
  })

  await server.installSubscriptionHandlers(app.listener)

  createRestEndpoints(app, recipeRepository)

  await app.start()
  return app
}

startServer().then(server => {
  console.log(`🚀 Server ready at ${server.info.uri}`);
})
