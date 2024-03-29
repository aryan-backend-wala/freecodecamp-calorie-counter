const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function addEntry(){
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name">
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories">
    `;
    // targetInputContainer.innerHTML += HTMLString;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
  // console.log(targetInputContainer);
}

function calculateCalories(e){
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if(isError){
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  // console.log(consumedCalories);

  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

  const surplusOrDeficient = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
  <span class="${surplusOrDeficient.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficient}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;
  output.classList.remove('hide');
  // console.log(breakfastCalories);
}

function cleanInputString(str){
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str){
  const regex = /\d+e\d+/i;
  return str.match(regex)
}

function getCaloriesFromInputs(list){
  let calories = 0;
  for(let i=0;i<list.length;i++){
    const currVal = cleanInputString(list[i].value);
    const invalidInputMatch = isInvalidInput(currVal);
    // console.log(currVal);
    if(invalidInputMatch){
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
    // console.log(calories);
  }
  return calories;
}

function clearForm(){
  const inputContainer = Array.from(document.querySelectorAll('.input-container'));
  for(let element of inputContainer){
    console.log(element);
    element.innerHTML = "";
  }
  budgetNumberInput.value = '';
  output.innerText = "";
  output.classList.add('hide');
  // console.log(inputContainer[0]);
}

addEntryButton.addEventListener('click', addEntry);

calorieCounter.addEventListener('submit', calculateCalories);

clearButton.addEventListener('click', clearForm);

