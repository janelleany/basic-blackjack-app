//
// Basic Blackjack App
// by Janelle R. Alexander
//


//DOM elements
let elements = {
  newGameButton: document.querySelector("#new-game-button"),
  gameDiv: document.querySelector("#game-div"),
  playerCardsDiv: document.querySelector("#player-cards-div"),
  dealerCardsDiv: document.querySelector("#dealer-cards-div"),
  hitButton: document.querySelector("#hit-button"),
  stayButton: document.querySelector("#stay-button")
};


//Global variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];

let faceValues = ["Ace", "King", "Queen", "Jack", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

let gameLaunched = false;
let gameDeck = [];
let playerHand = [];
let dealerHand = [];
let playerStays = true;
let playerScore = 0;
let dealerScore = 0;


function launchGame() {
  console.log(`beginning: playerScore is ${playerScore} and dealerScore is ${dealerScore} and gameLaunched is ${gameLaunched}`);
  gameLaunched = true;
  
  elements.gameDiv.style.display = "block";
  elements.newGameButton.style.display = "none";
  
  gameDeck = createDeck();
  playerHand = createAHand(gameDeck);
  dealerHand = createAHand(gameDeck);
  renderCards(playerHand, true);
  renderCards(dealerHand, false);
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  renderScore(playerScore, true);
  renderScore(dealerScore, false);
  
  statusOfGame(gameDeck, playerScore, dealerScore);
}

function createDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < faceValues.length; j++) {
      let newCard = { suit: suits[i], faceValue: faceValues[j]};
      deck.push(newCard);
    }
  }
  return deck;
}

function dealACard(aDeck) {
  let dealtCard = {};
  let randomIndexNumber = Math.trunc(Math.random() * (aDeck.length + 1));
  dealtCard = aDeck[randomIndexNumber];
  aDeck.splice(randomIndexNumber, 1);
  let gameDeck = aDeck;
  return dealtCard;
}

function createAHand(aDeck) {
  let aHand = [];
  let numberOfCards = 0;
  while (numberOfCards < 2) {
    let dealtCard = dealACard(aDeck);
    aHand.push(dealtCard);
    numberOfCards++;
  }
  return aHand;
}

function renderCards(aHand, isPlayerHand) {
  console.log("renderCards is running");
  for (let i = 0; i < aHand.length; i++) {
    let newNode = document.createElement("p");
    newNode.textContent = `The ${aHand[i].faceValue} of ${aHand[i].suit}`;
    if (isPlayerHand) {elements.playerCardsDiv.appendChild(newNode)} 
    else {elements.dealerCardsDiv.appendChild(newNode)}
  }
}

function renderScore(aScore, isPlayerHand) {
  let newNode = document.createElement("p");
  newNode.textContent = `Score: ${aScore}`;
  if (isPlayerHand) {elements.playerCardsDiv.appendChild(newNode)} 
    else {elements.dealerCardsDiv.appendChild(newNode)}
}

function calculateScore(aHand) {
  let score = 0;
  let cardValue = 0;
  for (let i = 0; i < aHand.length; i++) {
    switch (aHand[i].faceValue) {
      case "King":
      case "Queen":
      case "Jack":
      case "Ten":
        cardValue = 10;
        break;
      case "Nine":
        cardValue = 9;
        break;
      case "Eight":
        cardValue = 8;
        break;
      case "Seven":
        cardValue = 7;
        break;
      case "Six":
        cardValue = 6;
        break;
      case "Five":
        cardValue = 5;
        break;
      case "Four":
        cardValue = 4;
        break;
      case "Three":
        cardValue = 3;
        break;
      case "Two":
        cardValue = 2;
        break;
      case "Ace":
        cardValue = 11;
      break;
    }
    score += cardValue;
  }
  return score;
}

function statusOfGame(gameDeck, playerScore, dealerScore) {
  console.log(`after launchGame gameDeck is now ${gameDeck.length} and gameLaunched is ${gameLaunched}. playerScore is ${playerScore} and dealerScore is ${dealerScore}`);
}

function hit() {
  playerStays = false;
  console.log(`about to hit. gameDeck is still ${gameDeck.length}`);
  let cardDealtOnHit = dealACard(gameDeck);
  console.log(`cardDealtOnHit is ${cardDealtOnHit.faceValue} of ${cardDealtOnHit.suit}`);
  console.log(`gameDeck is now ${gameDeck.length}`);
  let dealtCardArray = [];
  dealtCardArray.push(cardDealtOnHit);
  
  renderCards(dealtCardArray, true);
  // definitely need/want to run renderCards here ☝but renderCards needs an array and you're currently giving it an object (a card)
  
}

function recalculateScore(aCard, aScore) {
  
}

elements.newGameButton.addEventListener("click", launchGame);

elements.hitButton.addEventListener("click", hit);