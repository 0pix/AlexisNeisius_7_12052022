/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

export function getRecipes (recipes, allChecked) {
  const input = document.getElementById('search-bar').value

  let recipe = []

  for (let i = 0; i <= recipes.length - 1; i++) {
    const name = recipes[i].name.toLowerCase()
    const descriptionLowerCase = recipes[i].description.toLowerCase()

    // description
    if (input && descriptionLowerCase.includes(input.toLowerCase())) {
      recipe.push(recipes[i])
    }

    // name
    if (input && name.includes(input.toLowerCase())) {
      recipe.push(recipes[i])
    }

    // ingredient
    const myingredient = []
    for (let j = 0; j <= recipes[i].ingredients.length - 1; j++) {
      const ingredientLowerCase =
        recipes[i].ingredients[j].ingredient.toLowerCase()
      if (input && ingredientLowerCase.includes(input.toLowerCase())) {
        myingredient.push(recipes[i])
      }
    }

    if (myingredient.length > 0) {
      recipe.push(recipes[i])
    }
  }

  // afficher recipes
  if (input === '' && recipe.length === 0) {
    recipe = recipes
  }

  // tag
  // Nouveau filtre sur le tableau des recettes sélectionnées
  let recipeTag = []
  for (let h = 0; h <= recipe.length - 1; h++) {
    if (allChecked.length) {
      const test = filterTag(recipe[h], allChecked)
      if (test === true) {
        recipeTag.push(recipe[h])
      }
    } else {
      recipeTag.push(recipe[h])
    }
  }

  // enlever les doublons
  recipeTag = [...new Set(recipeTag)]

  // afficher recipes
  if (input === '' && allChecked.length === 0) {
    return recipes
  }

  return recipeTag
}

// afficher les recettes
export function getGoodRecipe (recipes, ids) {
  const input = document.getElementById('search-bar').value
  const recipe = []
  for (let i = 0; i <= recipes.length - 1; i++) {
    for (let j = 0; j <= ids.length - 1; j++) {
      if (recipes[i].id === ids[j].id) {
        let html = ''
        for (let k = 0; k <= recipes[i].ingredients.length - 1; k++) {
          // boucle sur les ingrédients à afficher
          const ingredient = recipes[i].ingredients[k]
          html += `<li>${ingredient.ingredient}: ${
            ingredient.quantity || ingredient.quantite || ''
          } ${ingredient.unit || ''}</li>`
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
  if (ids.length === 0 && input !== '') {
    recipe.push(
      '<div id="messageRecipe"><p>Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poissons"</p></div>'
    )
  }
  return recipe
}

//  condition tag pour fonction
function filterTag (obj, allChecked) {
  const ingredients = allChecked.filter(element => element.color === 'tags-blue')
  const appareils = allChecked.filter(element => element.color === 'tags-green')
  const ustensils = allChecked.filter(element => element.color === 'tags-red')

  const conditionIngredients =
     ingredients.every(ingredient => {
       return obj.ingredients.find(element => element.ingredient.toLowerCase() === ingredient.item.toLowerCase() + 's' || ingredient.item.toLowerCase() === element.ingredient.toLowerCase() + 's' || ingredient.item.toLowerCase() === element.ingredient.toLowerCase())
     })

  const conditionAppareils = appareils.every(appareil => {
    return obj.appliance.toLowerCase().includes(appareil.item.toLowerCase())
  })

  const conditionUstensils =
     ustensils.every(ustensil => {
       return obj.ustensils.find(element => element.toLowerCase() === ustensil.item.toLowerCase() + 's' || ustensil.item.toLowerCase() === element.toLowerCase() + 's' || ustensil.item.toLowerCase() === element.toLowerCase())
     })

  return !!((ingredients.length === 0 || conditionIngredients) && (appareils.length === 0 || conditionAppareils) && (ustensils.length === 0 || conditionUstensils))
}
