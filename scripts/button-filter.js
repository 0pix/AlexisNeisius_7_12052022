// const buttonsFilters = document.querySelectorAll('.filter')

/** *************|Nombre de colones des filtres|***************/
export function setCollumnFromBar (input, data1, data2, contentFilter) {
  let data = []
  if (input.value === '') {
    data = data1
  } else {
    data = data2
  }
  if (data.length && data.length < 10) {
    contentFilter.classList.add('grid-column-1')
    contentFilter.classList.remove('grid-column-2')
    contentFilter.classList.remove('grid-column-3')
  }
  if (data.length && data.length > 10 && data.length < 21) {
    contentFilter.classList.add('grid-column-2')
    contentFilter.classList.remove('grid-column-1')
    contentFilter.classList.remove('grid-column-3')
  }

  if (data.length && data.length >= 21) {
    contentFilter.classList.add('grid-column-3')
    contentFilter.classList.remove('grid-column-2')
    contentFilter.classList.remove('grid-column-1')
  }
}
