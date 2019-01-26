const { ApolloServer, gql } = require('apollo-server');
const slugify = require('slugify')

const config = require('./knexfile')
const knex = require('knex')(config);

// The GraphQL schema
const typeDefs = gql`
  type Recipe {
    id: Int!
    name: String!
    slug: String!
    ingredients: [String]!
    directions: [String]!
  }
  
  type Query {
    allRecipes(limit: Int, skip: Int): [Recipe]
    recipe(slug: String!): Recipe
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
            slug: item.slug,
            ingredients: item.ingredients,
            directions: item.directions
          }))
        })
    },
    recipe: (parent, args, context, info) => {
      return knex('recipes')
        .limit(1)
        .where({ slug: args.slug })
        .then(res => {
          return res[0]
        })
    }
  },
  Mutation: {
    addRecipe: (parent, args, context) => {
      return knex('recipes').returning('*').insert({
        name: args.name,
        slug: slugify(args.name).toLowerCase(),
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
