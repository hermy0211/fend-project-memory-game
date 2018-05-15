// 1. Global variables

  // List to hold cards
  let listOfCards = document.querySelectorAll('.card');
  let arrayOfCards = [...listOfCards];

  // Other variables
  let countMoves;
  const moves = document.querySelector('.moves');
  let stars = document.querySelector('.stars');
  let timer = false;
  let seconds = document.querySelector('.seconds');
  let minutes = document.querySelector('.minutes');
  let interval;
  let listOfOpenCards = [];
  let listOfMatchedCards = [];
  const popup = document.querySelector('.popup');
  const close = document.querySelector('.close');


// 2. Begin game

  // Shuffle and display cards on page
  startGame();

  function startGame() {
    moveReset();
    arrayOfCards = shuffle(arrayOfCards);
    createNewDeck(arrayOfCards);
    endTimer();
    setTimer();
    listOfMatchedCards = [];
  }

  // Restart game when restart button is clicked
  const restart = document.querySelector('.restart');
  restart.addEventListener('click', startGame);

  // Function for shuffling cards (Function from http://stackoverflow.com/a/2450976)
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // Function for creating a new deck
  function createNewDeck(array) {
    let cardDeck = document.querySelector('.deck');
    cardDeck.innerHTML = "";

    for (let card of array){
      // Create new card element
      let newCard = document.createElement('li');
      newCard.className = "card";
      newCard.innerHTML = card.innerHTML;
      cardDeck.appendChild(newCard);

      // Add event listeners
      newCard.addEventListener('click', cardList);
      newCard.addEventListener('click', beginTimer);
    }
  }


// 3. Display cards when clicked and check if they match

  // Add cards to list of open cards
  function cardList() {
    // Check if it is an already matched card
    if (this.classList.contains('match')){
      return;
    }
    // If not, add to the list of open cards
    else {
      this.className = "card show open";
      listOfOpenCards.push(this);
      // Check if the same card was clicked twice
      if (listOfOpenCards[0] !== listOfOpenCards[1]){
        if (listOfOpenCards.length < 2){
          moveCounter();
          return;
        }
        else if (listOfOpenCards.length == 2){
          moveCounter();
          cardMatch();
        }
      }
      // If the same card was clicked twice, take it out from the array
      else{
        listOfOpenCards.pop();
      }
    }
  }

  // Check if cards match
  function cardMatch() {
    // If the two cards match, keep them open
    if (listOfOpenCards[0].innerHTML == listOfOpenCards[1].innerHTML){
      setTimeout(function(){
        listOfOpenCards[0].className = "card match";
        listOfOpenCards[1].className = "card match";
        listOfOpenCards = [];
        listOfMatchedCards.push("Match");
        listOfMatchedCards.push("Match");
        endGame();
      }, 200);
    }
    // If the two cards do not match, return them into their original state
    else{
      setTimeout(function(){
        listOfOpenCards[0].className = "card";
        listOfOpenCards[1].className = "card";
        listOfOpenCards = [];
      }, 200);
    }
  }


// 4. Functions to control the move counter

  // Count the number of moves
  function moveCounter() {
    countMoves++;
    moves.textContent = countMoves;
    moveStars();
  }

  // Reset the number of moves
  function moveReset() {
    countMoves = 0;
    moves.textContent = countMoves;
    stars.innerHTML =
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  }

  // Decrease stars based on the number of moves
  function moveStars() {
    if (parseInt(moves.textContent)<=38){
      stars.innerHTML =
      `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    }
    else if (parseInt(moves.textContent)>38 && parseInt(moves.textContent)<=50){
      stars.innerHTML =
      `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    }
    else {
      stars.innerHTML =
      `<li><i class="fa fa-star"></i></li>`;
    }
  }


// 5. Function to control timer

  // Set the timer to 00:00
  function setTimer(){
    seconds.textContent = "00";
    minutes.textContent = "00";
  }

  // Run the timer (Seperated in order to prevent interval from doubling)
  function controlTimer(){
    interval = setInterval(function(){
      seconds.textContent++;
      seconds.textContent = pad2(seconds.textContent);
      if (seconds.textContent == "60"){
        minutes.textContent++;
        minutes.textContent = pad2(minutes.textContent);
        seconds.textContent = "00";
      }
      if (minutes.textContent == "60"){
        document.querySelector('.timer').innerHTML = `Time Out`;
      }
    }, 1000)
  }

  // Function to always show two digits
  function pad2(number) {
    return (number<10 ? '0' : '') + number;
  }

  // Stop the timer
  function endTimer() {
    clearInterval(interval);
  }

  // Function to start timer when the player clicks a card
  function beginTimer() {
    if (timer === false){
      controlTimer();
      timer = true;
    }
  }


// 6. Display message with the final score when all cards have been matched

  // Function to end game and display pop up
  function endGame() {
    if (listOfMatchedCards.length == 16) {
      endTimer();

      // Show pop up
      popup.classList.add("show");
      document.querySelector('.final-move').innerHTML = document.querySelector('.moves').innerHTML;
      document.querySelector('.final-time').innerHTML = document.querySelector('.timer').innerHTML;
      document.querySelector('.final-star').innerHTML = document.querySelector('.stars').innerHTML;
    }
  }

  // Function to close pop up
  function closePopUp() {
    popup.classList.remove("show");
    startGame();
  }
