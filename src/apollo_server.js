const { ApolloServer, gql } = require('apollo-server-hapi')

module.exports = function createApolloServer(recipeRepository) {

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
        return recipeRepository.all({
          limit: args.limit
        })
      },
      recipe: (parent, args, context, info) => {
        return recipeRepository.find(args.slug)
      }
    },
    Mutation: {
      addRecipe: (parent, args, context) => {
        return recipeRepository.create({
          name: args.name,
          ingredients: args.ingredients,
          directions: args.directions
        })
      }
    }
  };

  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
  });
}
