/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
// import { get } from 'fast-levenshtein'
import { recipes } from './../data/recipes.js'
import { getIdRecipe, getGoodRecipe } from './../scripts/secondAlgoSearchBar.js'
import { setCollumnFromBar } from './../scripts/button-filter.js'
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

// first input
const searchBar = document.getElementById('search-bar')
// blue DOM
const blueFilter = document.getElementById('blue-filter')
const blueButton = blueFilter.querySelector('button')
const blueContent = document.getElementById('blue-content')
const blueInput = document.getElementById('blue-input')
const blueTitle = document.getElementById('blue-title')
const blueModal = document.getElementById('background-blue')
// green DOM
const greenFilter = document.getElementById('green-filter')
const greenbutton = greenFilter.querySelector('button')
const greenContent = document.getElementById('green-content')
const greenInput = document.getElementById('green-input')
const greenTitle = document.getElementById('green-title')
const greenModal = document.getElementById('background-green')
// red DOM
const redFilter = document.getElementById('red-filter')
const redButton = redFilter.querySelector('button')
const redContent = document.getElementById('red-content')
const redInput = document.getElementById('red-input')
const redTitle = document.getElementById('red-title')
const redModal = document.getElementById('background-red')
// Data
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

/** *************|Barre de recherche principal algo |***************/
// écrire dans la principale barre de recherche
searchBar.addEventListener('keydown', function (event) {
  if (event.target.value.length >= 3 || event.target.value.length === 0) {
    showRecipeGrid(event)
  }
})

// écrire dans la principale barre de recherche
searchBar.addEventListener('keyup', function (event) {
  if (event.target.value.length >= 3 || event.target.value.length === 0) {
    showRecipeGrid(event)
  }
})

function showRecipeGrid (event) {
  if (event.code === 'Backspace' && event.target.value === '') {
    event = null
  }
  data.goodIds = getIdRecipe(recipes, data.checkedAll)
  data.goodRecipe = getGoodRecipe(recipes, data.goodIds)
  recipeOnGrid()
}

// afficher les recettes dans le container/grille
function recipeOnGrid () {
  const gridCard = document.getElementById('recette-card-container')
  gridCard.innerHTML = data.goodRecipe.join('')
}

/** *************|Filters|***************/
function init () {
  data.ingrediensFiltered = getIngregdientForTag(recipes) // récuperer tout les ingrédients
  data.devicesFiltered = getDevicesForTag(recipes) // récuperer tout les appareils
  data.utensilsFiltered = getUtensilsForTag(recipes) // récuperer tout les ustentils
  data.goodIds = getIdRecipe(recipes, data.checkedAll)
  data.goodRecipe = getGoodRecipe(recipes, data.goodIds)
  recipeOnGrid()
  data.checkedAll = getTagChecked()
}
init()

// innert les tags dans les boutons
innertTags(blueContent, blueInput, data.ingrediensFiltered, data.ingrediensSearchBar, 'tags-blue')
innertTags(greenContent, greenInput, data.devicesFiltered, data.devicesSearchBar, 'tags-green')
innertTags(redContent, redInput, data.utensilsFiltered, data.utensilsSearchBar, 'tags-red')

// clic sur bouton flêche Ingrédients (ouverture/fermeture)
blueButton.addEventListener('click', () => {
  blueContent.classList.toggle('hide')
  blueInput.classList.toggle('hide')
  blueTitle.classList.toggle('hide')
  blueButton.classList.toggle('rotateBtn')
  blueFilter.classList.toggle('index999')
  blueModal.classList.toggle('hide')
  setCollumnFromBar(blueInput, data.ingrediensFiltered, data.ingrediensSearchBar, blueContent)
})

// clic sur bouton flêche Appareils (ouverture/fermeture)
greenbutton.addEventListener('click', () => {
  greenContent.classList.toggle('hide')
  greenInput.classList.toggle('hide')
  greenTitle.classList.toggle('hide')
  greenbutton.classList.toggle('rotateBtn')
  greenFilter.classList.toggle('index999')
  greenModal.classList.toggle('hide')
  setCollumnFromBar(greenInput, data.devicesFiltered, data.devicesSearchBar, greenContent)
})

// clic sur bouton flêche ingrédients (ouverture/fermeture)
redButton.addEventListener('click', () => {
  redContent.classList.toggle('hide')
  redInput.classList.toggle('hide')
  redTitle.classList.toggle('hide')
  redButton.classList.toggle('rotateBtn')
  redFilter.classList.toggle('index999')
  redModal.classList.toggle('hide')
  setCollumnFromBar(redInput, data.utensilsFiltered, data.utensilsSearchBar, redContent)
})

// fermer bouton bleue en cliquant sur le modal de fond
blueModal.addEventListener('click', () => {
  blueContent.classList.toggle('hide')
  blueInput.classList.toggle('hide')
  blueTitle.classList.toggle('hide')
  blueButton.classList.toggle('rotateBtn')
  blueFilter.classList.toggle('index999')
  blueModal.classList.toggle('hide')
  setCollumnFromBar(blueInput, data.ingrediensFiltered, data.ingrediensSearchBar, blueContent)
})

// fermer bouton bleue en cliquant sur le modal de fond
greenModal.addEventListener('click', () => {
  greenContent.classList.toggle('hide')
  greenInput.classList.toggle('hide')
  greenTitle.classList.toggle('hide')
  greenbutton.classList.toggle('rotateBtn')
  greenFilter.classList.toggle('index999')
  greenModal.classList.toggle('hide')
  setCollumnFromBar(greenInput, data.devicesFiltered, data.devicesSearchBar, greenContent)
})

// fermer bouton bleue en cliquant sur le modal de fond
redModal.addEventListener('click', () => {
  redContent.classList.toggle('hide')
  redInput.classList.toggle('hide')
  redTitle.classList.toggle('hide')
  redButton.classList.toggle('rotateBtn')
  redFilter.classList.toggle('index999')
  redModal.classList.toggle('hide')
  setCollumnFromBar(redInput, data.utensilsFiltered, data.utensilsSearchBar, redContent)
})

// clic sur text tag (all)
document.addEventListener('click', function (event) {
  if (event.target.parentNode.classList.contains('tag')) {
    data.checkedAll = getTagChecked()
    TagsOnTop(data.checkedAll)
    data.goodIds = getIdRecipe(recipes, data.checkedAll)
    data.goodRecipe = getGoodRecipe(recipes, data.goodIds)
    recipeOnGrid()
  }
})

// clic sur petite croix tag (Remove tags from top)
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('closeBtnTag')) {
    uncheckTag(event)
    data.checkedAll = getTagChecked()
    TagsOnTop(data.checkedAll)
    data.goodIds = getIdRecipe(recipes, data.checkedAll)
    data.goodRecipe = getGoodRecipe(recipes, data.goodIds)
    recipeOnGrid()
  }
})

// barre de recherche indrédients
blueInput.addEventListener('keyup', () => {
  data.ingrediensSearchBar = searchBarTag(blueInput, data.ingrediensFiltered)
  innertTags(blueContent, blueInput, data.ingrediensFiltered, data.ingrediensSearchBar, 'tags-blue')
  setCollumnFromBar(blueInput, data.ingrediensFiltered, data.ingrediensSearchBar, blueContent)
})

// barre de recherche appareils
greenInput.addEventListener('keyup', () => {
  data.devicesSearchBar = searchBarTag(greenInput, data.devicesFiltered)
  innertTags(greenContent, greenInput, data.devicesFiltered, data.devicesSearchBar, 'tags-green')
  setCollumnFromBar(greenInput, data.devicesFiltered, data.devicesSearchBar, greenContent)
})

// barre de recherche ustensils
redInput.addEventListener('keyup', () => {
  data.utensilsSearchBar = searchBarTag(redInput, data.utensilsFiltered)
  innertTags(redContent, redInput, data.utensilsFiltered, data.utensilsSearchBar, 'tags-red')
  setCollumnFromBar(redInput, data.utensilsFiltered, data.utensilsSearchBar, redContent)
})
