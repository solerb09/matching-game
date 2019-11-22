//
//Name: Brandon Soler
//Project: Matching Game
//Date: 11/21/19
//Due Date: 11/22/19

//array of all the cards
let cardImg = [ "img/10C.png","img/10D.png","img/10H.png","img/10S.png","img/2C.png","img/2D.png","img/2H.png","img/2S.png","img/3C.png","img/3D.png",
	"img/4C.png","img/4D.png","img/4H.png","img/5S.png","img/5C.png","img/5D.png","img/5H.png","img/6C.png","img/6D.png","img/6H.png","img/6S.png",
	"img/7C.png","img/7D.png","img/7H.png","img/7S.png","img/8C.png","img/8D.png","img/8H.png","img/8S.png",
	"img/9C.png","img/9D.png","img/9H.png","img/9S.png","img/AC.png","img/AD.png","img/AH.png","img/AS.png"];

//available positions on the grid from 1-16
availablePos = [
        "1", "2", "3", "4", 
        "5", "6", "7", "8",
        "9", "10", "11", "12",
        "13", "14", "15", "16"
    ];
//array contains the cards the user has already selected
let usedCards = [];
//array contains the cards the 16 cards
let listCards = [];
//array contains the file locations of each 16 cards
let cardValues = [];




//flippedimg is the back of the card
let flippedImg = "img/red_back.png"
//random card
let randomCard = null;
//the users selected card
let playerChoice = null;
//the users selected card source
let playerCardSrc = null;

//the generated card
let printedCard = null;
//the position of the grid in where the card goes
let generateCardArrayLocation = null;
//value for the position of the random card position
let rdCardListPosition = null;
//the random position
let rdCardPos = null;

//previous player card
let previousPlrCard = null;
//value for the previous player card
let previousPlayerCardValue = null;
//timer to hide the cards
let hideTimer = null;
//tries counter
let tries = 0;


function init()
{
    //disable the restart button
    document.getElementById("refresh").disabled = true;
    //run randomizer
    randomizer()
    //push the random card to the list of cards
    listCards.push(randomCard)
    //for loop counting to the length of the array full  of cards
    for (i = 0; i < cardImg.length; i++)
    {
        randomizer() //run randomizer
        listCards.push(randomCard) //push each random card
        if (i == 6) //if the counter reaches 6
        {
            break; //break out of the for loop
        }
        
    }

   

    //concat the array to itself to duplicate the 8 cards as there needs to be matching cards
listCards = listCards.concat(listCards)
console.log(listCards)

//generate the cards
generate();

}

function generate()
{
    //generating where the card is placed
    generateCardArrayLocation = Math.floor(Math.random() * listCards.length)
    //printed card set to a place on the grid
    printedCard = listCards[generateCardArrayLocation];

    //random value for the random card position
    rdCardFromListPosition = Math.floor(Math.random() * availablePos.length)
    //the random card position equals the available position indexed into the value
    rdCardPos = availablePos[rdCardFromListPosition];

    //splice the location so it cant be used again
    listCards.splice(generateCardArrayLocation, 1);
    //splice the random card so it cant be used again
    availablePos.splice(rdCardFromListPosition, 1);

    //the random card should be flipped
    document.getElementById(rdCardPos).src=flippedImg;

    //pushing the printed card to my array
    cardValues.push(printedCard)

    //if the length is not equal to 0 rerun generate
    if (listCards.length != 0)
    {
        generate();
    }
    //else enable the restart button
    else
    {
        document.getElementById("refresh").disabled = false;
    }

}

function matchCards(card) //card parameter from the this pointer
{   
    //if the previous player card is null and the source of the user clicked card does not include the empty card
    if((previousPlrCard == null) && (card.src.includes("img/empty.png")) == false)
    {
       //the value for the previous card picked by the user
        previousPlayerCardValue = cardValues[parseInt(card.id - 1)];
        
        //setting the previous player card to the used card
        previousPlrCard = card;
        
        //changing the source to the value of the picked card
        previousPlrCard.src = previousPlayerCardValue;
    }
    //if the card clicked on includes an empty box
    else if((card.src.includes("img/empty.png")) == true) 
    {
        //print out a message to user telling them to choose a flipped card
        document.getElementById("game").innerHTML = "Choose an available card."
    }

    //if the card value indexed to the id is equal to the value of the previous card and card id does not equal the previous player card id and the card source doesnt include empty png
    else if((cardValues[parseInt(card.id - 1)] == previousPlayerCardValue) && (card.id != previousPlrCard.id) && ((card.src.includes("img/empty.png")) == false))
    {
        usedCards.push(previousPlrCard.id);
        usedCards.push(card.id);    //push the previous card id and the card id to used cards

        //source of the card equals the cardvalues indexed into the id
        card.src = cardValues[parseInt(card.id - 1)];

        //setTimeout to the hide function with 4 parameters: id of the previous player card, the card id, and the source of both cards in half a second
        hideTimer = setTimeout(hideCards, 500, previousPlrCard.id, card.id, previousPlrCard.src, card.src);
        
        //setting the previous player card to null to reset the value of the card
        previousPlrCard = null;
    }

    else if (card.id == previousPlrCard.id)
    {
        //using this statement for the else statement
    }

    else
    {
        //changing the source of the card value
        card.src = cardValues[parseInt(card.id - 1)];

        //hide the cards with the four parameters with half a second
		hideTimer = setTimeout(hideCards, 500, previousPlrCard.id, card.id, previousPlrCard.src, card.src);
			
        //setting the value of the previous player card to null
		previousPlrCard = null;
    }
     
}
//hide timer with the four parameters from the settimeout
function hideCards(cardOneId, cardTwoId, cardOneSrc, cardTwoSrc) 
//first two are the card id and the last two are the sources of the card
{

    document.getElementById(cardOneId).src = "img/red_back.png";
    //setting both cards to the red back
	document.getElementById(cardTwoId).src = "img/red_back.png";
    //if the source of both cards are similar
	if(cardOneSrc == cardTwoSrc)
	{
        console.log("Correct!")
        document.getElementById(cardOneId).src = "img/empty.png";
        //change the source of the card to empty and then the user cannot press the location anymore
		document.getElementById(cardTwoId).src = "img/empty.png";
    }
    else 
    {
        console.log("Try Again")
    }
	
    //increment the tries counter
	tries++;
    
    //displaying the tries to the user
	document.getElementById("tries").innerHTML = `Tries: ${tries}`

    //clearing the timer
	clearTimeout(hideTimer);

    //if the length of the used cards is 16
	if(usedCards.length >= 16)
	{
        //for loop to go through each and every image id
        for (let id = 0; id < usedCards.length; id++)
        {
            //disabling id of the images 1-16
            document.getElementById(id+1).setAttribute("onclick", false);
            //setting the game fontsize to 30 pixels
            document.getElementById("game").style.fontSize="30px";
            //printing out to the user that they matched every card on the grid
            document.getElementById("game").innerHTML = "You found all of the matching cards! Press restart if you want to play again!<br>";
            
        }
	}
}
//setting all the variables to the default
function refresh()
{   
    cardImg = [ 
        "img/10C.png","img/10D.png","img/10H.png","img/10S.png","img/2C.png","img/2D.png","img/2H.png","img/2S.png","img/3C.png","img/3D.png",
    	"img/4C.png","img/4D.png","img/4H.png","img/5S.png","img/5C.png","img/5D.png","img/5H.png","img/6C.png","img/6D.png","img/6H.png","img/6S.png",
    	"img/7C.png","img/7D.png","img/7H.png","img/7S.png","img/8C.png","img/8D.png","img/8H.png","img/8S.png",
        "img/9C.png","img/9D.png","img/9H.png","img/9S.png","img/AC.png","img/AD.png","img/AH.png","img/AS.png"
              ];

     availablePos = [
         "1", "2", "3", "4", 
         "5", "6", "7", "8",
         "9", "10", "11", "12",
         "13", "14", "15", "16"
                    ];
     usedCards = [];
     listCards = [];
     cardValues = [];
     flippedImg = "img/red_back.png"
     randomCard = null;
    
     playerChoice = null;
     playerCardSrc = null;

     printedCard = null;
     generateCardArrayLocation = null;
     rdCardListPosition = null;
     rdCardPos = null;

     previousPlrCard = null;
     previousPlayerCardValue = null;
     hideTimer = null;
     generateTimer = null;

     tries = 0;
    
     //printing out the tries
     document.getElementById("tries").innerHTML=`Tries: ${tries}`
     init();
}

function randomizer()
{
    
    //random function that returns a random card image
    return randomCard = cardImg[Math.floor(Math.random() * cardImg.length)]
    
}
