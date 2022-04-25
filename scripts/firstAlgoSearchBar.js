/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

export function getIdRecipe (recipes, allChecked) {
  const input = document.getElementById('search-bar').value

  let ids = []

  for (let i = 0; i <= recipes.length - 1; i++) {
    const name = recipes[i].name.toLowerCase()
    const descriptionLowerCase = recipes[i].description.toLowerCase()
    // name
    if (input && name.includes(input.toLowerCase())) {
      ids.push(recipes[i].id)
    }
    // description
    if (input && descriptionLowerCase.includes(input.toLowerCase())) {
      ids.push(recipes[i].id)
    }

    // tag
    if (allChecked.length) return filterTag(recipes[i], allChecked)

    // ingredient
    for (let j = 0; j <= recipes[i].ingredients.length - 1; j++) {
      const ingredientLowerCase = recipes[i].ingredients[j].ingredient.toLowerCase()
      if (input && ingredientLowerCase.includes(input.toLowerCase())) {
        ids.push(recipes[i].id)
      }
    }
    if (input === '' && allChecked.length === 0) {
      ids.push(recipes[i].id)// à modifier en vieux
    }
  }

  // enelever les doublons
  ids = [...new Set(ids)]
  return ids
}

// afficher les recettes grâce aux id
export function getGoodRecipe (recipes, ids) {
  const input = document.getElementById('search-bar').value
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
  if (ids.length === 0 && input !== '') {
    recipe.push('<div id="messageRecipe"><p>Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poissons"</p></div>')
  }
  return recipe
}

//  condition tag pour fonction
function filterTag (obj, allChecked) {
  const ingredients = allChecked.filter(element => element.color === 'tags-blue')
  const appareils = allChecked.filter(element => element.color === 'tags-green')
  const ustensils = allChecked.filter(element => element.color === 'tags-red')

  const conditionIngredients = ingredients.length
    ? ingredients.every(ingredient => {
      return obj.ingredients.find(element => element.ingredient.includes(ingredient.item))
    })
    : false
  const conditionAppareils = appareils.every(appareil => {
    return obj.appliance.includes(appareil.item)
  })
  const conditionUstensils = ustensils.length
    ? ustensils.every(ustensil => {
      return obj.ustensils.find(element => element.includes(ustensil.item))
    })
    : false
  if ((ingredients.length === 0 || conditionIngredients) && (appareils.length === 0 || conditionAppareils) && (ustensils.length === 0 || conditionUstensils)) return obj.id
  return 0
}
