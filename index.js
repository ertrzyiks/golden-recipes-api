const { ApolloServer, gql } = require('apollo-server');

const config = require('./knexfile')
const knex = require('knex')(config);

// The GraphQL schema
const typeDefs = gql`
  type Recipe {
    id: Int!
    name: String!
    ingredients: [String]!
    directions: [String]!
  }
  
  type Query {
    allRecipes(offset: Int, limit: Int): [Recipe]
  }
  
  type Mutation {
    addRecipe(name: String, ingredients: [String]!, directions: [String]!): Recipe
  }
`;

const resolvers = {
  Query: {
    allRecipes: (parent, args, context, info) => {
      return knex('recipes')
        .select()
        .limit(args.limit)
        .then(res => {
          return res.map(item => ({
            name: item.name,
            ingredients: item.ingredients,
            directions: item.directions
          }))
        })
    }
  },
  Mutation: {
    addRecipe: (parent, args, context) => {
      return knex('recipes').returning('*').insert({
        name: args.name,
        ingredients: JSON.stringify(args.ingredients),
        directions: JSON.stringify(args.directions)
      }).then(res => res[0])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
