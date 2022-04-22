export function getIdRecipe2 (recipes, allChecked) {
  // const text = event?.target.value
  const input = document.getElementById('search-bar').value

  let ids = recipes.map(obj => {
    const name = obj.name.toLowerCase()
    const descriptionLowerCase = obj.description.toLowerCase()
    // name
    if (input && name.includes(input.toLowerCase())) {
      return obj.id
    }

    // description
    if (input && descriptionLowerCase.includes(input.toLowerCase())) {
      return obj.id
    }

    // tag
    if (allChecked.length) return filterTag(obj, allChecked)

    // ingredient
    const myingredient = obj.ingredients.filter(object => {
      const ingredientLowerCase = object.ingredient.toLowerCase()
      if (input && ingredientLowerCase.includes(input.toLowerCase())) {
        return true
      }
      return false
    })
    // return input && ingredientLowerCase.includes(input.toLowerCase())
    if (myingredient.length > 0) {
      return obj.id
    }
  }).filter(id => id !== undefined)

  if (input === '' && allChecked.length === 0) {
    ids = recipes.map(obj => obj.id)
  }

  // enelever les doublons
  ids = [...new Set(ids)]
  return ids
}

// afficher les recettes grâce aux id
export function getGoodRecipe2 (recipes, ids) {
  // const input = event?.target.value
  const input = document.getElementById('search-bar').value
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
  if (ids.length === 0 && input !== '') {
    goodRecipe.push('<div id="messageRecipe"><p>Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poissons"</p></div>')
  }
  return goodRecipe
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

  if ((ingredients.length === 0 || conditionIngredients) && (appareils.length === 0 || conditionAppareils) && (ustensils.length === 0 || conditionUstensils)) return obj.id
  return 0
}

// function filterTag (obj, allChecked) {
//   const ingredients = allChecked.filter(element => element.color === 'tags-blue')
//   const appareils = allChecked.filter(element => element.color === 'tags-green')
//   const ustensils = allChecked.filter(element => element.color === 'tags-red')

//   const conditionIngredients = ingredients.length
//     ? ingredients.every(ingredient => {
//       return obj.ingredients.find(element => element.ingredient.includes(ingredient.item))
//     })
//     : false
//   const conditionAppareils = appareils.every(appareil => {
//     return obj.appliance.includes(appareil.item)
//   })
//   const conditionUstensils = ustensils.length
//     ? ustensils.every(ustensil => {
//       return obj.ustensils.find(element => element.includes(ustensil.item))
//     })
//     : false
//   if ((ingredients.length === 0 || conditionIngredients) && (appareils.length === 0 || conditionAppareils) && (ustensils.length === 0 || conditionUstensils)) return obj.id
//   return 0
// }

// Not Supported in IE 9-11
// const arr1 = ['pizza', 'cola'];
// const arr2 = ['pizza', 'cake', 'cola'];

// const containsAll = arr1.every(element => {
//   return arr2.includes(element);
// });

// console.log(containsAll); // 👉 true
