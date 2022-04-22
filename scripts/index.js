/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
// import { get } from 'fast-levenshtein'
import { recipes } from './../data/recipes.js'
import { getIdRecipe2, getGoodRecipe2 } from './../scripts/secondAlgoSearchBar.js'
import { getIdRecipe, getGoodRecipe } from './../scripts/firstAlgoSearchBar.js'
import { openAllFilters, setCollumnFromBar, closeFilterFromBack } from './../scripts/button-filter.js'
import {
  getIngregdientForTag,
  getDevicesForTag,
  getUtensilsForTag,
  innertTags,
  getTagChecked,
  uncheckTag,
  searchBarTag,
  TagsOnTop
} from './../scripts/tag.js'

const buttonsFilters = document.querySelectorAll('.filter')
const filterContent = document.querySelectorAll('.filter-content')
const filterBlocs = document.getElementById('filters-bloc')
const searchBar = document.getElementById('search-bar')
const input = document.querySelectorAll('.filter-input')
const arrowBtn = filterBlocs.querySelectorAll('button')
const data = {
  ingrediensFiltered: [],
  ingrediensSearchBar: [],
  devicesFiltered: [],
  devicesSearchBar: [],
  utensilsFiltered: [],
  utensilsSearchBar: [],
  goodIds: [],
  goodRecipe: [],
  checkedAll: []
}

// afficher les recettes dans le container/grille
function recipeOnGrid () {
  const gridCard = document.getElementById('recette-card-container')
  gridCard.innerHTML = data.goodRecipe.join('')
}

// /** *************|Barre de recherche algo 1|***************/

// searchBar.addEventListener('keydown', function (event) {
//   showRecipeGrid(event)
// })

// searchBar.addEventListener('keyup', function (event) {
//   showRecipeGrid(event)
// })

// function showRecipeGrid (event) {
//   if (event.code === 'Backspace' && event.target.value === '') {
//     event = null
//   }
//   data.goodIds = getIdRecipe(recipes, data.checkedAll)
//   data.goodRecipe = getGoodRecipe(recipes, data.goodIds)
//   recipeOnGrid()
// }

/** *************|Barre de recherche principal algo 2|***************/
searchBar.addEventListener('keydown', function (event) {
  showRecipeGrid(event)
})

searchBar.addEventListener('keyup', function (event) {
  showRecipeGrid(event)
})

function showRecipeGrid (event) {
  if (event.code === 'Backspace' && event.target.value === '') {
    event = null
  }
  data.goodIds = getIdRecipe2(recipes, data.checkedAll)
  data.goodRecipe = getGoodRecipe2(recipes, data.goodIds)
  recipeOnGrid()
}

/** *************|Filters|***************/
function init () {
  data.ingrediensFiltered = getIngregdientForTag(recipes) // récuperer tout les ingrédients
  data.devicesFiltered = getDevicesForTag(recipes) // récuperer tout les appareils
  data.utensilsFiltered = getUtensilsForTag(recipes) // récuperer tout les ustentils
  innertTags(filterContent, 0, data.ingrediensFiltered, data.ingrediensSearchBar, 'tags-blue')// afficher les ingrédients dans le boutons
  innertTags(filterContent, 1, data.devicesFiltered, data.devicesSearchBar, 'tags-green') // afficher les appareils dans le boutons
  innertTags(filterContent, 2, data.utensilsFiltered, data.utensilsSearchBar, 'tags-red')// afficher les appareils dans le boutons
  data.goodIds = getIdRecipe2(recipes, data.checkedAll)
  data.goodRecipe = getGoodRecipe2(recipes, data.goodIds)
  recipeOnGrid()
}
init()

// ouverture des boutons filter
arrowBtn[0].addEventListener('click', () => {
  setCollumnFromBar(0, buttonsFilters)
  openAllFilters(0, buttonsFilters)
  innertTags(filterContent, 0, data.ingrediensFiltered, data.ingrediensSearchBar, 'tags-blue')// afficher les ingrédients dans le boutons
})
arrowBtn[1].addEventListener('click', () => {
  setCollumnFromBar(1, buttonsFilters)
  openAllFilters(1, buttonsFilters)
  innertTags(filterContent, 1, data.devicesFiltered, data.devicesSearchBar, 'tags-green') // afficher les appareils dans le boutons
})
arrowBtn[2].addEventListener('click', () => {
  setCollumnFromBar(2, buttonsFilters)
  openAllFilters(2, buttonsFilters)
  innertTags(filterContent, 2, data.utensilsFiltered, data.utensilsSearchBar, 'tags-red')// afficher les appareils dans le boutons
})

// overture et fermeture de la modal qui permet de fermer les boutons filter en cliquant en dehors de la zone
document.addEventListener('click', function (e) {
  if (e.target.parentNode.parentNode.classList.contains('filter-header')) {
    const background = document.getElementById('background-modal')
    background.classList.toggle('background-modal')
    e.target.parentNode.parentNode.parentNode.classList.toggle('index999')
  }
  // close with click on background modal
  if (e.target.id === 'background-modal') {
    const background = document.getElementById('background-modal')
    background.classList.remove('background-modal')
    buttonsFilters.forEach(valeur => {
      valeur.classList.remove('index999')
    })
    closeFilterFromBack(0, buttonsFilters)
    closeFilterFromBack(1, buttonsFilters)
    closeFilterFromBack(2, buttonsFilters)
  }
})

// barre de recherche indrédients
input[0].addEventListener('keyup', () => {
  data.ingrediensSearchBar = searchBarTag(0, data.ingrediensFiltered)
  innertTags(filterContent, 0, data.ingrediensFiltered, data.ingrediensSearchBar, 'tags-blue')
  setCollumnFromBar(0, buttonsFilters)
})

// barre de recherche appareils
input[1].addEventListener('keyup', () => {
  data.devicesSearchBar = searchBarTag(1, data.devicesFiltered)
  innertTags(filterContent, 1, data.devicesFiltered, data.devicesSearchBar, 'tags-green')
  setCollumnFromBar(1, buttonsFilters)
})

// barre de recherche ustensils
input[2].addEventListener('keyup', () => {
  data.utensilsSearchBar = searchBarTag(2, data.utensilsFiltered)
  innertTags(filterContent, 2, data.utensilsFiltered, data.utensilsSearchBar, 'tags-red')
  setCollumnFromBar(2, buttonsFilters)
})

// tags top
document.addEventListener('click', function (event) {
  if (event.target.parentNode.classList.contains('tag')) {
    // console.log(event.target.parentNode.classList)
    data.checkedAll = getTagChecked()
    TagsOnTop(data.checkedAll)
    data.goodIds = getIdRecipe2(recipes, data.checkedAll)
    data.goodRecipe = getGoodRecipe2(recipes, data.goodIds)
    recipeOnGrid()
  }
})

// Remove tags from top
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('closeBtnTag')) {
    uncheckTag(event)
    data.checkedAll = getTagChecked()
    TagsOnTop(data.checkedAll)
    data.goodIds = getIdRecipe2(recipes, data.checkedAll)
    data.goodRecipe = getGoodRecipe2(recipes, data.goodIds)
    recipeOnGrid()
  }
})
