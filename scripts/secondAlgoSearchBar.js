
export function getIdRecipe2 (event, recipes, allChecked) {
  const text = event.target.value
  let ids = recipes.map(obj => {
    const name = obj.name.toLowerCase()
    const descriptionLowerCase = obj.description.toLowerCase()
    // name
    if (text && name.includes(text.toLowerCase())) {
      return obj.id
    }

    // description
    if (text && descriptionLowerCase.includes(text.toLowerCase())) {
      return obj.id
    }

    if (allChecked.length) console.log('filter', filterTag(recipes, allChecked))

    // ingredient
    const myingredient = obj.ingredients.filter(object => {
      const ingredientLowerCase = object.ingredient.toLowerCase()
      if (text && ingredientLowerCase.includes(text.toLowerCase())) {
        return true
      }
      return false
    })
    // return text && ingredientLowerCase.includes(text.toLowerCase())
    if (myingredient.length > 0) {
      return obj.id
    }
    // return obj
  }).filter(id => id !== undefined)

  ids = [...new Set(ids)]
  return ids
}

export function getGoodRecipe2 (recipes, ids) {
  const goodRecipe = []
  recipes.forEach(recipe => {
    ids.forEach(id => {
      if (recipe.id === id) {
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
  return goodRecipe
}

function filterTag (obj, allChecked) {
  const ingredients = allChecked.filter(element => element.color === 'tags-blue')
  const appareils = allChecked.filter(element => element.color === 'tags-green')
  const ustensils = allChecked.filter(element => element.color === 'tags-red')
  console.log(ingredients)

  const conditionIngredients = ingredients.every(ingredient => {
    return obj.ingredients.find(element => element.ingredient === ingredient)
  })
  const conditionAppareils = appareils.some(appareil => {
    return obj.appliance === appareil
  })
  const conditionUstensils = ustensils.every(ustensil => {
    return obj.ustensils.includes(ustensil)
  })
  if ((!ingredients.length || conditionIngredients) && (!appareils.length || conditionAppareils) && (!ustensils.length || conditionUstensils)) return obj.id
  return 0
}

// Not Supported in IE 9-11
// const arr1 = ['pizza', 'cola'];
// const arr2 = ['pizza', 'cake', 'cola'];

// const containsAll = arr1.every(element => {
//   return arr2.includes(element);
// });

// console.log(containsAll); // 👉 true
