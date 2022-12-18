for (let i = 0; i < rows; i++) {
 for (let j = 0; j < cols; j++) {
  let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
  cell.addEventListener("blue", (e) => {
   let address = addressBar.value;
   let [activeCell, cellProp] = getCellAndCellProp(address);
   let enteredData = activeCell.innerText;

   cellProp.value = enteredData;
  })
 }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
 let inputFormula = formulaBar.value;
 if (e.key == "Enter" && inputFormula) {
  let evaluatedValue = evaluateFormula(inputFormula);
  console.log(evaluatedValue);
  setCellUIAndCellProp(evaluatedValue, inputFormula);
 }
})


function evaluateFormula(formula) {
 let encodedFormula = formula.split(" ");
 for (let i = 0; i < encodedFormula.length; i++) {
  let asciiValue = encodedFormula[i].charCodeAt(0);
  console.log(encodedFormula[i]);
  if (asciiValue >= 65 && asciiValue <= 90) {
   let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
   console.log(cellProp.value);
   encodedFormula[i] = cellProp.value;
  }
 }
 let decodedFormula = encodedFormula.join(" ");
 console.log(decodedFormula);
 return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula) {
 let address = addressBar.value;
 let [cell, cellProp] = getCellAndCellProp(address);

 cell.innerText = evaluatedValue;
 cellProp.value = evaluatedvalue;
 cellProp.formula = formula;
}