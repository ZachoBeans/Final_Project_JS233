

export class ImageView {
  constructor() {
    // this. ? = document.getElementById(' ? ');
  }
}

//Everything above is my new code

//Everything below is my old code

let buttons = document.querySelectorAll(".cellButton");
  
let buttonArray = Array.from(buttons);

let firstClick = null; //These are my clicks of the mouse to make it so the game knows when two numbers match when clicked.
let secondClick = null;

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]; //This is creating my array of matching numbers

numbers.sort(function() { //This is shuffling my array of numbers
  return Math.random() - 0.5;
});

buttonArray.forEach(function(button, index) { //This is assigning each button a number from the array
  button.dataset.number = numbers[index];
  button.querySelector(".buttonStyle").textContent = "";
});

function showNumber(button) { //This is my function to show the numbers when clicked. The first cell stays open until a second cell is clicked and if they match, they stay up. If they don't they hide themselves after a second.

  let num = button.querySelector(".buttonStyle");
  if (!num || num.textContent !== "") return;

  //This reveals the number on the cell
  num.textContent = button.dataset.number;

  if (!firstClick) { //This is for the first click
    firstClick = button;
    return;
  }

  secondClick = button;

  //This checks to see if the numbers match and if they do, they stay up
  if (firstClick.dataset.number === secondClick.dataset.number) {

    //This keeps track of when a match is found
    firstClick.classList.add("matched");
    secondClick.classList.add("matched");

    //This resets the first and second clicks
    firstClick = null;
    secondClick = null;

    //This is checking if all the buttons are matched
    let allMatched = document.querySelectorAll(".cellButton.matched").length === buttonArray.length;

    if (allMatched) {
      document.getElementById("win").style.display = "block"; //This is displaying the hidden win message if every pair is matched
}
  } else {
    //This is to determine when the first and second click happen and when they dissapear after it is a failed match
    setTimeout(function() {
      firstClick.querySelector(".buttonStyle").textContent = "";
      secondClick.querySelector(".buttonStyle").textContent = "";
      firstClick = null;
      secondClick = null;
    }, 1000);
  }
}




  
