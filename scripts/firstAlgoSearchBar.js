/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

export function getIdRecipe (event, recipes) {
  const text = event.target.value
  let ids = []

  // if (text === '') {
  // }

  for (let i = 0; i <= recipes.length - 1; i++) {
    const name = recipes[i].name.toLowerCase()
    const descriptionLowerCase = recipes[i].description.toLowerCase()
    // name
    if (text && name.includes(text.toLowerCase())) {
      ids.push(recipes[i].id)
    }
    // description
    if (text && descriptionLowerCase.includes(text.toLowerCase())) {
      ids.push(recipes[i].id)
    }
    // ingredient
    for (let j = 0; j <= recipes[i].ingredients.length - 1; j++) {
      const ingredientLowerCase = recipes[i].ingredients[j].ingredient.toLowerCase()
      if (text && ingredientLowerCase.includes(text.toLowerCase())) {
        ids.push(recipes[i].id)
      }
    }
  }
  // enelever les doublons
  ids = [...new Set(ids)]
  return ids
}

export function getGoodRecipe (ids, recipes) {
  const recipe = []
  for (let i = 0; i <= recipes.length - 1; i++) {
    for (let j = 0; j <= ids.length - 1; j++) {
      if (recipes[i].id === ids[j]) {
        let html = ''
        for (let k = 0; k <= recipes[i].ingredients.length - 1; k++) { // boucle sur les ingrédients à afficher
          const ingredient = recipes[i].ingredients[k]
          html += `<li>${ingredient.ingredient}: ${ingredient.quantity || ingredient.quantite || ''} ${ingredient.unit || ''}</li>`
        }
        recipe.push(
          `<div class="card-recette">
                <div class="card-img"></div>
                <div class="card-text">

                    <div class="title-time">
                        <h4>${recipes[i].name}</h4>
                        <div>
                            <img src="./img/svg/clock.svg" alt="">
                            ${recipes[i].time} min
                        </div>
                    </div>

                    <div class="list-text">

                        <ul>
                            ${html}
                        </ul>
                        <p>${recipes[i].description}</p>
                    </div>
                </div>
            </div>`
        )
      }
    }
  }
  return recipe
}
