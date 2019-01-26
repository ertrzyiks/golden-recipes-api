# Golden recipes API

```
mutation CreateReviewForEpisode($name: String, $ingredients: [String]!, $directions: [String]!) {
  addRecipe(name: $name, ingredients: $ingredients, directions: $directions) { name }
}
```
