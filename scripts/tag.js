/* eslint-disable no-unused-vars */
/** *************|Obtenir les ingrédients|***************/
export function getIngregdientForTag (recipes) {
  let data = recipes.map(element => {
    return element.ingredients.map(ingr => ingr.ingredient)
  })
  data = data.flat()
  data = cleanDataTag(data)
  console.log('%cIngrédients :', 'color: #3282F7; background-color: #2A334E; padding: 3px; border-radius: 5px', data)
  return data
}

/** *************|Obtenir les Appareils|***************/
export function getDevicesForTag (recipes) {
  let data = recipes.map(element => {
    return element.appliance
  })
  data = data.flat()
  data = cleanDataTag(data)
  console.log('%cAppareils :', 'color: #68D9A4; background-color: #2A334E; padding: 3px; border-radius: 5px', data)
  return data
}

/** *************|Obtenir les Ustentils|***************/
export function getUtensilsForTag (recipes) {
  let data = recipes.map(element => {
    return element.ustensils
  })
  data = data.flat()
  data = cleanDataTag(data)
  console.log('%cUstensils :', 'color: #ED6454; background-color: #2A334E; padding: 3px 5px 3px 5px; border-radius: 5px', data)
  return data
}

/** *************|Clean la data|***************/
function cleanDataTag (data) {
  //  trier le tableau par ordre alphabétique
  data.sort()//  trier le tableau par ordre alphabétique

  // mettre uniquement la première lettre en majuscule
  data = data.map((word) => {
    word = word.toLowerCase()
    return word.charAt(0).toUpperCase() + word.slice(1)
    // return word.toLowerCase()
  })

  // retirer les doublons
  data = [...new Set(data)]

  //  retirer les ingrédients avec un S
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i] === data[i + 1] + 's' || data[i + 1] === (data[i]) + 's') {
      data.splice(i, 1)
    }
  }
  // for (let i = 0; i < data.length - 1; i++) {
  //   if (data[i].includes(data[i + 1]) || data[i + 1].includes(data[i])) {
  //     data.splice(i, 1)
  //   }
  // }

  //  retirer les ingrédients avec un accents
  // for (let i = 0; i < data.length - 1; i++) {
  //   const elt = data[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  //   const nextElt = data[i + 1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  //   if (elt.includes(nextElt) || elt.includes(nextElt)) {
  //     data.splice(i, 1)
  //   }
  // }

  return data
}

/** *************|barre de recherche des tags|***************/
export function searchBarTag (number, data) {
  const input = document.querySelectorAll('.filter-input')
  let newtag = []
  if (input[number].value !== '') {
    newtag = data.filter((elt) =>
      elt.toLowerCase().includes(input[number].value.toLowerCase())
    )
  }
  return newtag
}

//= ========================================================================================//

/** *************|Afficher les tags dans bouton|***************/
export function innertTags (target, number, data1, data2, classCss) {
  const input = document.querySelectorAll('.filter-input')
  let data = []
  if (input[number].value === '') {
    data = data1
  } else {
    data = data2
  }
  target[number].innerHTML = data
    .map(
      (ingredient) =>
                `
      <div class="test tag">
      <input type="checkbox" classCss=${classCss} class="hide" id="${ingredient}" name="checkbox-input" value="${ingredient}">
      <label name="checkbox-label"  for="${ingredient}">${ingredient}</label>
      </div>
      `
    )
    .join('')
}

/** *************|vérifier quel tag est checked |***************/
export function getTagChecked () {
  const filter = document.querySelectorAll('.test')
  const allChecked = []
  filter.forEach(function (item) {
    if (item.firstElementChild.checked) {
      allChecked.push(
        { item: item.firstElementChild.id, color: item.firstElementChild.getAttribute('classCss') }
      )
      item.lastElementChild.style.color = 'white'
    } else {
      item.lastElementChild.style.color = 'rgba(255, 255, 255, 0.534)'
    }
  })
  allChecked.sort()
  console.log(allChecked);
  return allChecked
}

/** *************|afficher les tags en haut|***************/
export function TagsOnTop (allChecked) {
  const tagbloc = document.getElementById('tags-bloc')
  tagbloc.innerHTML = allChecked
    .map(
      (tag) =>
  `
 <div class="tags ${tag.color} tag" >
   <div class="tags-text">${tag.item}</div>
   <button class="closeBtnTag tag"><img class="closeBtnTag tag" src="./img/svg/cross.svg" alt=""></button>
 </div>
 `
    )
    .join('')
}

/** *************|UncheckTag|***************/
export function uncheckTag (event) {
  const allTags = document.querySelectorAll('.test')
  allTags.forEach(function (item) {
    if (item.firstElementChild.checked && item.firstElementChild.value === event.target.parentNode.previousElementSibling.textContent) {
      item.lastElementChild.style.color = 'white'
      item.firstElementChild.checked = false
    }
  })
}
