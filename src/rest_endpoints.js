const Boom = require('boom')

module.exports = function createRestEndoints(app, recipeRepository) {
  app.route({
    method: 'POST',
    path: '/recipes',
    handler: function (request, h) {
      const { payload } = request

      if (!payload) {
        throw Boom.badRequest('Expected recipe data as payload. Got nothing.')
      }

      if (typeof payload.name !== 'string') {
        throw Boom.badRequest('Expected name to be string.')
      }

      const validArrayOfStrings = (input) => {
        return input &&
          typeof input.every == 'function' &&
          input.length != 0 &&
          input.every(item => typeof item == 'string')
      }

      if (!validArrayOfStrings(payload.ingredients)) {
        throw Boom.badRequest('Expected ingredients to be array of strings.')
      }

      if (!validArrayOfStrings(payload.directions)) {
        throw Boom.badRequest('Expected directions to be array of strings.')
      }

      return recipeRepository.create({
        name: payload.name,
        directions: payload.directions,
        ingredients: payload.ingredients
      }).catch(e => {
        if (e.message.includes('violates unique constraint')) {
          throw Boom.badRequest('Recipe with such name already exists.')
        }

        throw e
      })
    }
  });
}
