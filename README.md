# Golden recipes API


## GraphQL

#### Create recipe
```
mutation CreateRecipe($name: String, $ingredients: [String]!, $directions: [String]!) {
  addRecipe(name: $name, ingredients: $ingredients, directions: $directions) { name }
}
```

## Rest

#### Create recipe

```
POST /recipes
```

```
{
  "name": String,
  "ingredients": [String],
  "directions": [String]
}
```
