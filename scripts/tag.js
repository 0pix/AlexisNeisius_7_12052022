/* eslint-disable no-unused-vars */
/** *************|Obtenir les ingrédients|***************/
export function getIngregdientForTag (recipes) {
  let data = []
  recipes.forEach(i => {
    i.ingredients.forEach(x => {
      data.push(x.ingredient)
    })
  })
  data = cleanDataTag(data)
  return data
}

/** *************|Obtenir les Appareils|***************/
export function getDevicesForTag (recipes) {
  let data = []
  recipes.forEach(i => {
    data.push(i.appliance)
  })
  data = cleanDataTag(data)
  return data
}

/** *************|Obtenir les Ustentils|***************/
export function getUtensilsForTag (recipes) {
  let data = []
  recipes.forEach(i => {
    i.ustensils.forEach(x => {
      data.push(x)
    })
  })
  data = cleanDataTag(data)
  return data
}

/** *************|Clean la data|***************/
function cleanDataTag (data) {
  //  trier le tableau par ordre alphabétique
  data.sort()//  trier le tableau par ordre alphabétique
  // retirer les doublons
  data = [...new Set(data)]
  // retirer les ingrédients avec un S
  // data = data.filter((valeur, index) => {
  //   console.log(valeur);
  //   return !(valeur.includes(data[index + 1]) || data[index + 1].includes(valeur))
  // })
  // data.forEach(valeur, index) => {
  //   if(i.includes(data[index+1]) || data[index+1].includes(i)){
  //     data.splice(valeur, 1)
  //   }
  // }

  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].includes(data[i + 1]) || data[i + 1].includes(data[i])) {
      data.splice(i, 1)
    }
  }

  //  retirer les ingrédients avec un accents
  // data.forEach(i => {
  //   const elt = i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  //   const nextElt = [i + 1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  //   if (elt.includes(nextElt) || elt.includes(nextElt)) {
  //     data.splice(i, 1)
  //   }
  // })

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
      <div class="test">
      <input type="checkbox" classCss=${classCss} class="hide" id="${ingredient}" name="checkbox-input" value="${ingredient}">
      <label name="checkbox-label" for="${ingredient}">${ingredient}</label>
      </div>
      `
    )
    .join('')
}

/** *************|vérifier quel tag est checked |***************/
export function getTagChecked () {
  const filter = document.querySelectorAll('.test')
  const tagbloc = document.getElementById('tags-bloc')
  const allChecked = []
  filter.forEach(function (item) {
    if (item.firstElementChild.checked) {
      allChecked.push(item.firstElementChild.id)
      item.lastElementChild.style.color = 'white'
    } else {
      item.lastElementChild.style.color = 'rgba(255, 255, 255, 0.534)'
    }
  })
  allChecked.sort()

  return allChecked
}

/** *************|afficher les tags en haut|***************/
export function TagsOnTop (allChecked) {
  const tagbloc = document.getElementById('tags-bloc')
  console.log(allChecked)
  // allChecked.forEach(e => {
  //   console.log('ici :', e)
  // })
  tagbloc.innerHTML = allChecked
    .map(
      (tag) =>
 `
 <div class="tags ${tag.classCss}" >
   <div class="tags-text">${tag}</div>
   <button class="closeBtnTag"><img class="closeBtnTag" src="./img/svg/cross.svg" alt=""></button>
 </div>
 `
    )
    .join('')
}

/** *************|UncheckTag|***************/
export function removeTagFromTop (event) {
  const allTags = document.querySelectorAll('.test')
  if (event.target.className === 'closeBtnTag') {
    allTags.forEach(function (item) {
      if (item.firstElementChild.checked && item.firstElementChild.value === event.target.parentNode.previousElementSibling.textContent) {
        item.lastElementChild.style.color = 'white'
        item.firstElementChild.checked = false
      }
    })
  }
}
