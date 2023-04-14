const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let count = localStorage.getItem('count');
  if (!event.target.classList.contains('clicked')){
    let targetColor = event.target.className;
    event.target.setAttribute("style", `background-color: ${targetColor};`);
    event.target.classList.add('clicked');
    if (!count) {

      localStorage.setItem('count','1');
      localStorage.setItem('color',`${targetColor}`);
    } else {

      if (localStorage.getItem('color')===`${targetColor}`) {
        localStorage.removeItem('color');
        localStorage.removeItem('count');
      } else {
        setTimeout(function(){turnOver(event,localStorage.getItem('color'))}, 1000);
      }

    }

  }


}

function turnOver(event,color) {
  event.target.setAttribute("style", 'background-color: white;');
  event.target.classList.remove('clicked');
  let anotherDiv = document.querySelectorAll(`.${color}`);
  for (let i =0; i<anotherDiv.length;i++) {
    anotherDiv[i].setAttribute("style", 'background-color: white;');
    anotherDiv[i].classList.remove('clicked');
  }
  localStorage.removeItem('color');
  localStorage.removeItem('count');
}


// when the DOM loads
createDivsForColors(shuffledColors);
