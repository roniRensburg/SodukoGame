//load boards from file or manually
const easy = [
  "6-53---7-9-14-53---3--61-59-6257-9-15-96-8-3--18-93465-239-65171-78-2----561-7298",
  "6-5-2-1--9-1--5--6--4--18-93-25-49-154--187-271-29--65-2-9-65-719785--434-61-729-",
  "--5-2-1-49-1-8-3-623--618-9-6-57---15-96-873-718-9--658-39-65-7-978--64-45-137-98",
  "--53-9-----14-532-234--1-59-62--4--15-96-87--71829-465-2---6-171-78-2-4-45---7298",
  "68-32-174971--5---2----1859--2-749--5-96-8--2718-9-4-5--3---517178-264-45-137--8",
];

const medium = [
  "6--4-2--3--3---6-7--7--6--41-82--36--2-5-1---7-4--81-2--1-54-36--5-2---14-2--3--5",
  "---4-2--32-3---617--73-6----5-2--3-99-65-----7---98-52---7-4---3-5---74---21-38-5",
  "6--47--8---39---175---1---4---247---9-6-3-47--34--815---175---63--82---1---16--95",
  "6----25----39--6-7---316---15----36---653---87----815----75-----65--974--72---8--",
  "---47---324---561---7---924---247---92---147--3469---2891--42363--82---14--163---",
];

const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "7---8-6-4-----4----4-----7---1--6----6----4-----1--3--1----------3----------52-41",
  "7----3--46--7-------52----3----36---------4---98---32------75----3--17--9-6--28--",
  "---5--6--6397----8------1--5-14----7------4-----1----6--------2-----17--9-63--8--",
  "---5-3----------5-8-5----7---1--69-73--9-------8--5-2------7--2------7--9-63-2--1",
];

const result = [
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841",
];

// creat variables
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

//function thats going to run when our window lodes
window.onload = function () {
  // debugger
  //run start game function when button is clicked
  id("start-btn").addEventListener("click", startGame);
  //Add event listener to each number in number  container
  for (let i = 0; i < id("numbers-container").children.length; i++) {
    id("numbers-container").children[i].addEventListener("click", function () {
      //If selecting is not disabled
      if (!disableSelect) {
        //If number is already selected
        if (this.classList.contains("selected")) {
          //Then remove selection
          this.classList.remove("selected");
          selectedNum = null;
        } else {
          //Deselect all other numbers
          for (let i = 0; i < 9; i++) {
            id("numbers-container").children[i].classList.remove("selected");
          }
          //Select it and update selectedNum variable
          this.classList.add("selected");
          selectedNum = this;
          updateMove();
        }
      }
    });
  }
};

function startGame() {
  //choose board difficulty and set lives
  let board;
  if (id("difficulty-1").checked) {
    board = easy[Math.floor(Math.random() * easy.length)];
    lives = 7;
  }
  if (id("difficulty-2").checked) {
    board = medium[Math.floor(Math.random() * medium.length)];
    lives = 5;
  }
  if (id("difficulty-3").checked) {
    board = hard[Math.floor(Math.random() * hard.length)];
    lives = 3;
  }

  disableSelect = false;
  id("lives").textContent = `Lives Remaining: ${lives}`;
  //creates board based on difficulty
  generateBoard(board);
  //Starts the timer
  startTimer();
  //Show number container
  id("numbers-container").classList.remove("hidden");
}

function startTimer() {
  //
  if (id("time-1").checked) {
    timeRemaining = 180;
  } else if (id("time-2").checked) {
    timeRemaining = 300;
  } else timeRemaining = 600;
  //Sets timer for first second
  id("timer").textContent = timeConversion(timeRemaining);
  //Sets timer to update every second
  timer = setInterval(function () {
    timeRemaining--;
    //If no time remaining end the game
    if (timeRemaining === 0) {
      endGame();
    }
    id("timer").textContent = timeConversion(timeRemaining);
  }, 1000);
}

//Converts seconds into string of MM:SS format
function timeConversion(time) {
  let minutes = Math.floor(time / 60);
  if (minutes < 10) minutes = "0" + minutes;
  let seconds = time % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}

function generateBoard(board) {
  //clear previous board
  clearPrevious();
  //let used to increment tile ids
  let idCount = 0;
  for (let i = 0; i < 81; i++) {
    //create a new paragraph element
    let tile = document.createElement("p");
    //if the tile is not supposed to be blank
    if (board.charAt(i) != "-") {
      //set tile to correct number
      tile.textContent = board.charAt(i);
    } else {
      //Add click event listener to tile
      tile.addEventListener("click", function () {
        //If selecting is not disable
        if (!disableSelect) {
          // debugger
          //If the tile is already selected
          if (tile.classList.contains("selected")) {
            //Then remove selection
            tile.classList.remove("selected");
            selectedTile = null;
          } else {
            //Deselected all other tiles
            for (let i = 0; i < 81; i++) {
              qsa(".tile")[i].classList.remove("selected");
            }
            //Add selection and update variable
            tile.classList.add("selected");
            selectedTile = tile;
            updateMove();
          }
        }
      });
    }
    //assign tile id
    tile.id = idCount;
    //increment for next tile
    idCount++;
    //add tile class to all tiles
    tile.classList.add("tile");
    if ((tile.id > 17 && tile.id < 27) || (tile.id > 44) & (tile.id < 54)) {
      tile.classList.add("bottomBorder");
    }
    if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
      tile.classList.add("rightBorder");
    }
    //add tile to board
    id("board").appendChild(tile);
  }
}

function updateMove() {
  //If a tile and number selected
  if (selectedTile && selectedNum) {
    debugger;
    //Set the tile to the correct number
    selectedTile.textContent = selectedNum.textContent;
    //If the number matches the corresponding number in the solution key
    if (checkCorrect(selectedTile)) {
      //Deselected the tile
      selectedTile.classList.remove("selected");
      selectedNum.classList.remove("selected");
      //Clear the selected variables
      electedNum = null;
      selectedTile = null;
      //Check if board is completed
      if (checkDone()) {
        endGame();
      }
      //If the number does not match the solution key
    } else {
      //Disable selecting new numbers for one second
      disableSelect = true;
      //Make the tile turn red
      selectedTile.classList.add("incorrect");
      //Run in one second
      setTimeout(function () {
        //Subtract lives by one
        lives--;
        //If no lives left end the game
        if (lives === 0) {
          endGame();
        } else {
          //If lives is not equal to zero
          //Update lives text
          id("lives").textContent = "Lives Remaining:" + lives;
          //Renable selecting numbers and tiles
          disableSelect = false;
        }
        //Restore tile color and remove selected from both
        selectedTile.classList.remove("incorrect");
        selectedTile.classList.remove("selected");
        selectedNum.classList.remove("selected");
        //Clear the tiles text and clear selected variables
        selectedTile.textContent = "";
        selectedTile = null;
        selectedNum = null;
      }, 1000);
    }
  }
}

function checkDone() {
  let tiles = qsa(".tile");
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].textContent === "") return false;
  }
  return true;
}

function endGame() {
  //Disable moves and stop the timer
  disableSelect = true;
  clearTimeout(timer);
  //Display win or loss message
  if (lives === 0 || timeRemaining === 0) {
    //function return true if user click "ok" and false if click "cancel"
    if (confirm("You Lost! do you want try again?") == true) {
      startGame();
    } else {
      //reset the page
      location.reload();
      alert("You're such a loser");
    }
  } else {
    alert("You Won!");
    location.reload(); //reset the page
  }
}

function checkCorrect(tile) {
  //Set solution based on difficulty selection
  let solution;
  if (id("difficulty-1").checked) {
    solution = result[0];
  }
  if (id("difficulty-2").checked) {
    solution = result[1];
  }
  if (id("difficulty-3").checked) {
    solution = result[2];
  }

  //If tiles number is equal to solution's number
  if (solution.charAt(tile.id) === tile.textContent) return true;
  else return false;
}

function clearPrevious() {
  //access all of the tiles
  let tiles = qsa(".tile");
  //remove each tile
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].remove();
  }
  // if there is a timer clear it
  if (timer) clearTimeout(timer);
  //deselect any
  for (let i = 0; i < id("numbers-container").children.length; i++) {
    id("numbers-container").children[1].classList.remove("selected");
  }
  //clear selected variables
  selectedTile = null;
  selectedNum = null;
}

id("clear-btn").addEventListener("click", clearBoard);

//helper function instead getElementById
function id(id) {
  return document.getElementById(id);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}
