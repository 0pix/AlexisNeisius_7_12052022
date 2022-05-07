// rechercher les recettes qui correspondent au mot de la barre de recherche
export function getRecipes (recipes, allChecked) {
  const input = document.getElementById('search-bar').value

  let recipe = recipes.filter(obj => {
    const name = obj.name.toLowerCase()
    const descriptionLowerCase = obj.description.toLowerCase()

    // description
    if (input && descriptionLowerCase.includes(input.toLowerCase())) {
      return true
    }

    // name
    if (input && name.includes(input.toLowerCase())) {
      return true
    }

    // ingredient
    const myingredient = obj.ingredients.filter(object => {
      const ingredientLowerCase = object.ingredient.toLowerCase()
      return input && ingredientLowerCase.includes(input.toLowerCase())
    })

    if (myingredient.length > 0) {
      return true
    }
  })

  // afficher toutes les recettes
  if (input === '' && recipe.length === 0) {
    recipe = recipes
  }

  // tag
  const recipeTag = recipe.filter(obj => {
    if (allChecked.length) {
      console.log(obj, allChecked)
      return filterTag(obj, allChecked)
    }
    return true
  })

  // afficher toutes les recettes
  if (input === '' && allChecked.length === 0) {
    return recipes
  }
  return recipeTag
}

// afficher les recettes
export function getGoodRecipe (recipes, ids) {
  const input = document.getElementById('search-bar').value
  const goodRecipe = []
  recipes.forEach(recipe => {
    ids.forEach(id => {
      if (recipe.id === id.id) {
        let html = ''
        recipe.ingredients.forEach(ingr => {
          html += `<li>${ingr.ingredient}: ${ingr.quantity || ingr.quantite || ''} ${ingr.unit || ''}</li>`
        })
        goodRecipe.push(
                    `<div class="card-recette">
                <div class="card-img"></div>
                <div class="card-text">

                    <div class="title-time">
                        <h4>${recipe.name}</h4>
                        <div>
                            <img src="./img/svg/clock.svg" alt="">
                            ${recipe.time} min
                        </div>
                    </div>
                    <div class="list-text">
                        <ul>
                            ${html}
                        </ul>
                        <p>${recipe.description}</p>
                    </div>
                </div>
            </div>`
        )
      }
    })
  })
  if (ids.length === 0 && input !== '') {
    goodRecipe.push('<div id="messageRecipe"><p>Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poissons"</p></div>')
  }
  return goodRecipe
}

//  condition tag pour fonction getIdRecipe2
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
