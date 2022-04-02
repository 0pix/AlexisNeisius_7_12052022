/* eslint-disable no-unused-vars */
/** *************|Obtenir les ingrédients|***************/
export function getIngregdientForTag (recipes) {
  const ingrediensBrut = []
  let ingrediensFiltered = []
  // récupérer tout les ingrédients
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      ingrediensBrut.push(recipes[i].ingredients[j].ingredient)
    }
  }
  // trier le tableau par ordre alphabétique
  ingrediensBrut.sort()
  // retirer les doublons
  ingrediensFiltered = [...new Set(ingrediensBrut)]
  //  retirer les ingrédients avec un S
  for (let i = 0; i < ingrediensFiltered.length - 1; i++) {
    if (ingrediensFiltered[i].includes(ingrediensFiltered[i + 1]) || ingrediensFiltered[i + 1].includes(ingrediensFiltered[i])) {
      ingrediensFiltered.splice(i, 1)
    }
  }
  //  retirer les ingrédients avec un accents
  for (let i = 0; i < ingrediensFiltered.length - 1; i++) {
    const elt = ingrediensFiltered[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const nextElt = ingrediensFiltered[i + 1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    if (elt.includes(nextElt) || elt.includes(nextElt)) {
      ingrediensFiltered.splice(i, 1)
    }
  }
  return ingrediensFiltered
}

/** *************|Obtenir les Appareils|***************/
export function getDevicesForTag (recipes) {
  const devicesBrut = []
  let devicesFiltered = []
  // récupérer tout les ingrédients
  for (let i = 0; i < recipes.length; i++) {
    devicesBrut.push(recipes[i].appliance)
  }
  // trier le devices par ordre alphabétique
  devicesBrut.sort()
  // retirer les doublons
  devicesFiltered = [...new Set(devicesBrut)]
  //  retirer les ingrédients avec un S
  for (let i = 0; i < devicesFiltered.length - 1; i++) {
    if (devicesFiltered[i].includes(devicesFiltered[i + 1]) || devicesFiltered[i + 1].includes(devicesFiltered[i])) {
      devicesFiltered.splice(i, 1)
    }
  }
  //  retirer les ingrédients avec un accents
  for (let i = 0; i < devicesFiltered.length - 1; i++) {
    const elt = devicesFiltered[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const nextElt = devicesFiltered[i + 1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    if (elt.includes(nextElt) || elt.includes(nextElt)) {
      devicesFiltered.splice(i, 1)
    }
  }
  // console.log(devicesFiltered)
  return devicesFiltered
}

/** *************|Obtenir les Ustentils|***************/
export function getUtensilsForTag (recipes) {
  const utensilsBrut = []
  let utensilsFiltered = []
  // récupérer tout les ingrédients
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
      utensilsBrut.push(recipes[i].ustensils[j])
    }
  }
  // trier le tableau par ordre alphabétique
  utensilsBrut.sort()
  // retirer les doublons
  utensilsFiltered = [...new Set(utensilsBrut)]
  //  retirer les ingrédients avec un S
  for (let i = 0; i < utensilsFiltered.length - 1; i++) {
    if (utensilsFiltered[i].includes(utensilsFiltered[i + 1]) || utensilsFiltered[i + 1].includes(utensilsFiltered[i])) {
      utensilsFiltered.splice(i, 1)
    }
  }
  //  retirer les ingrédients avec un accents
  for (let i = 0; i < utensilsFiltered.length - 1; i++) {
    const elt = utensilsFiltered[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const nextElt = utensilsFiltered[i + 1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    if (elt.includes(nextElt) || elt.includes(nextElt)) {
      utensilsFiltered.splice(i, 1)
    }
  }
  return utensilsFiltered
}

//= ========================================================================================//
/** *************|barre de recherche des tags|***************/
export function searchBarTag (number, data) {
  const input = document.querySelectorAll('.filter-input')
  let newtag = []
  if (input[number].value !== '') {
    newtag = data.filter(elt => elt.toLowerCase().includes(input[number].value.toLowerCase()))
  }
  console.log(newtag)
  return newtag
}

//= ========================================================================================//

/** *************|Afficher les tags (ingrédients)|***************/
export function innertTags (target, number, data1, data2) {
  const input = document.querySelectorAll('.filter-input')
  if (input[number].value === '') {
    target[number].innerHTML = data1
      .map(
        (ingredient) =>
      `
      <div class="test">
      <input type="checkbox" class="hide" id="${ingredient}" name="checkbox-input" value="${ingredient}">
      <label name="checkbox-label" for="${ingredient}">${ingredient}</label>
      </div>
      `
      )
      .join('')
  }
  if (input[number].value !== '') {
    target[number].innerHTML = data2
      .map(
        (ingredient) =>
      `
      <div class="test">
      <input type="checkbox" class="hide" id="${ingredient}" name="checkbox-input" value="${ingredient}">
      <label name="checkbox-label" for="${ingredient}">${ingredient}</label>
      </div>
      `
      )
      .join('')
  }
}

/** *************|Afficher les tags (Appareils)|***************/

// export function innertDevices (target, number, data) {
//   target[number].innerHTML = data
//     .map(
//       (devices) =>
//       `
//       <div class="test">
//       <input type="checkbox" class="hide" id="${devices}" name="checkbox-input" value="${devices}">
//       <label name="checkbox-label" for="${devices}">${devices}</label>
//       </div>
//       `
//     )
//     .join('')
// }

/** *************|vérifier quel tag est checked (est l'afficher en haut)|***************/
export function getTagChecked (buttonsFilters, number) {
  const filter = buttonsFilters[number].querySelectorAll('.test')
  const tagbloc = document.getElementById('tags-bloc')
  const allChecked = []
  filter.forEach(function (item) {
    if (item.firstElementChild.checked) {
      allChecked.push(item.firstElementChild.id)
      item.lastElementChild.style.color = 'white'
    } else {
      item.lastElementChild.style.color = 'rgba(255, 255, 255, 0.534)'
    }
    tagbloc.innerHTML = allChecked.map((tag) =>
  `
  <div class="tags">
    <div class="tags-text">${tag}</div>
    <button class="closeBtnTag"><img class="closeBtnTag" src="./img/svg/cross.svg" alt=""></button>
  </div>
  `
    ).join('')
  })
  console.log(allChecked)
  return allChecked
}

// Remove tag with cross btn
export function removeTagFromTop (buttonsFilters, number) {
  document.addEventListener('click', function (event) {
    const filter = buttonsFilters[number].querySelectorAll('.test')
    if (event.target.className === 'closeBtnTag') {
      filter.forEach(function (item) {
        if (item.firstElementChild.checked && item.firstElementChild.value === event.target.parentNode.previousElementSibling.textContent) {
          item.lastElementChild.style.color = 'white'
          item.firstElementChild.checked = false
        }
      })
      getTagChecked(buttonsFilters, number)
    }
  })
}
