const buttonsFilters = document.querySelectorAll(".filter");

function setCollumn(number) {
  const filters = buttonsFilters[number].querySelectorAll(".test");
  const blocFilters = buttonsFilters[number].querySelector(".filter-content ");
  if (filters.length < 10) {
    blocFilters.classList.add("grid-column-1");
  } else if (filters.length > 10 && filters.length < 21) {
    blocFilters.classList.add("grid-column-2");
  } else if (filters.length >= 21) {
    blocFilters.classList.add("grid-column-3");
  }
}
setCollumn(0);
setCollumn(1);
setCollumn(2);

function openAllFilters(number) {
  const button = buttonsFilters[number].querySelector("button");
  const filterInput = buttonsFilters[number].querySelector(".fliter-input");
  const blocFilters = buttonsFilters[number].querySelector(".filter-content ");
  const filterTitle = buttonsFilters[number].querySelector(".filter-title");

  button.addEventListener("click",function(){
   if(blocFilters.classList.contains("hide")){
    blocFilters.classList.remove("hide")
    filterInput.classList.remove("hide")
    filterTitle.classList.add("hide")
   } else{
    blocFilters.classList.add("hide")
    filterInput.classList.add("hide")
    filterTitle.classList.remove("hide")
    filterInput.value = ""; 
   }
  })
}
openAllFilters(0);
openAllFilters(1);
openAllFilters(2);

 