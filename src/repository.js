const slugify = require('slugify')

class RecipeRepository {
  constructor(knex) {
    this.knex = knex
  }

  all({limit, skip}) {
    return knex('recipes')
      .select()
      .limit(limit)
      .then(res => {
        return res.map(item => ({
          name: item.name,
          slug: item.slug,
          ingredients: item.ingredients,
          directions: item.directions
        }))
      })
  }

  find(slug) {
    return this.knex('recipes')
      .limit(1)
      .where({ slug })
      .then(res => {
        return res[0]
      })
  }

  create({name, ingredients, directions}) {
    return this.knex('recipes').returning('*').insert({
      name: name,
      slug: slugify(name).toLowerCase(),
      ingredients: JSON.stringify(ingredients),
      directions: JSON.stringify(directions)
    }).then(res => res[0])
  }
}

exports.RecipeRepository = RecipeRepository
