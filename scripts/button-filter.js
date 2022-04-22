// const buttonsFilters = document.querySelectorAll('.filter')

/** *************|Nombre de colones des filtres|***************/
export function setCollumnFromBar (number, buttonsFilters) {
  const blocFilters = buttonsFilters[number].querySelector('.filter-content')
  const filter = buttonsFilters[number].querySelectorAll('.test')
  if (filter.length < 10) {
    blocFilters.classList.add('grid-column-1')
    blocFilters.classList.remove('grid-column-2')
    blocFilters.classList.remove('grid-column-3')
    buttonsFilters[number].classList.add('m-w-150px')
    buttonsFilters[number].classList.remove('m-w-300px')
    buttonsFilters[number].classList.remove('m-w-450px')
  }
  if (filter.length > 10 && filter.length < 21) {
    blocFilters.classList.add('grid-column-2')
    blocFilters.classList.remove('grid-column-1')
    blocFilters.classList.remove('grid-column-3')
    buttonsFilters[number].classList.add('m-w-300px')
    buttonsFilters[number].classList.remove('m-w-150px')
    buttonsFilters[number].classList.remove('m-w-450px')
  }
  if (filter.length >= 21) {
    blocFilters.classList.add('grid-column-3')
    blocFilters.classList.add('grid-column-2')
    blocFilters.classList.add('grid-column-1')
    buttonsFilters[number].classList.add('m-w-450px')
    buttonsFilters[number].classList.remove('m-w-150px')
    buttonsFilters[number].classList.remove('m-w-300px')
  }
}

/** *************|Ouverture des filtres|***************/
export function openAllFilters (number, buttonsFilters) {
  const button = buttonsFilters[number].querySelector('button')
  const filterInput = buttonsFilters[number].querySelector('.filter-input')
  const blocFilters = buttonsFilters[number].querySelector('.filter-content')
  const filterTitle = buttonsFilters[number].querySelector('.filter-title')
  if (blocFilters.classList.contains('hide')) {
    blocFilters.classList.remove('hide')
    filterInput.classList.remove('hide')
    filterTitle.classList.add('hide')
    button.style.transform = 'rotate(180deg)'
  } else {
    blocFilters.classList.add('hide')
    filterInput.classList.add('hide')
    filterTitle.classList.remove('hide')
    button.style.transform = 'rotate(0deg)'
    filterInput.value = ''
    buttonsFilters[number].classList.remove(
      'm-w-150px',
      'm-w-300px',
      'm-w-450px'
    )
  }
}

/** *************|Background Modal pour close le bouton avec un event|***************/
export function closeFilterFromBack (number, buttonsFilters) {
  const button = buttonsFilters[number].querySelector('button')
  const filterInput = buttonsFilters[number].querySelector('.filter-input')
  const blocFilters = buttonsFilters[number].querySelector('.filter-content')
  const filterTitle = buttonsFilters[number].querySelector('.filter-title')
  blocFilters.classList.add('hide')
  filterInput.classList.add('hide')
  filterTitle.classList.remove('hide')
  button.style.transform = 'rotate(0deg)'
  filterInput.value = ''
  buttonsFilters[number].classList.remove(
    'm-w-150px',
    'm-w-300px',
    'm-w-450px'
  )
}
