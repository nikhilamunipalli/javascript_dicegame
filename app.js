/*------- INITIALIZATION ------*/

//initializing connections with buttons
var newGameDOM = document.querySelector('.btn-new');
var rollDiceDOM = document.querySelector('.btn-roll');
var holdDOM = document.querySelector('.btn-hold');

//initializing connections with player panels
var player0DOM = document.querySelector('.player-0-panel');
var player1DOM = document.querySelector('.player-1-panel');

//initializing connections with names
var name0DOM = document.getElementById('name-0');
var name1DOM = document.getElementById('name-1');

//initializing connections with scores
var current0DOM = document.getElementById('current-0');
var current1DOM = document.getElementById('current-1');
var score0DOM = document.getElementById('score-0');
var score1DOM = document.getElementById('score-1');

    
//initializing connection with dice
var diceDOM = document.querySelector('.dice');


//global variables
var scores=[];
var activePlayer;
var currentScore;
var pastDice;
var winScore;
var won;
var dice;

init();

/*------- FUNCTIONS ---------*/

function init()
{
   //1.initializing global variables
    scores = [0,0];
    activePlayer = 0;
    pastDice = 0;
    currentScore = 0;
    won =false;
    dice = 0;
    
    //2.initializing all scores UI 
    current0DOM.textContent = '0';
    current1DOM.textContent = '0';
    score0DOM.textContent = '0';
    score1DOM.textContent = '0';
    
    //3.hiding dice
    diceDOM.style.display = 'none';
    
    //4.removing active and winner classes
    player0DOM.classList.remove('active');
    player1DOM.classList.remove('active');
    player0DOM.classList.remove('winner');
    player1DOM.classList.remove('winner');
    
    //7.setting the winning score
    winScore = prompt('Score for winning : ');
    
    //6.activating first player
    player0DOM.classList.add('active');
   
}

function rollDice()
{
    if(!won)
        {
            //1.dicing
            dice= Math.floor((Math.random()) * 6)+1;
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-'+dice+'.png';
            
            //2.updating score
            if(dice!==1 && (dice !==6 || pastDice !==6)) 
            { 
               currentScore += dice;
               pastDice = dice;
                dice = 0;
            }
            else currentScore = 0;
             
            //3.updating scores UI
                document.getElementById('current-'+activePlayer).textContent = currentScore;
            
            if(dice===1 || (dice === 6 && pastDice ===6))nextPlayer();
            
            
        }
}


function hold()
{
  scores[activePlayer]+=currentScore;
  document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
  currentScore = 0;
    
  if(scores[activePlayer] >= winScore
    )
  {
      won = true;
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('#name-'+activePlayer).textContent = 'WINNER!!';
      
          
  }
    
  else 
  {
      document.getElementById('current-'+activePlayer).textContent = 0;
      nextPlayer();
  }
}

function nextPlayer()
{
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    if(activePlayer === 0) activePlayer = 1;
    else activePlayer = 0;
    currentScore = 0;
    pastDice = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
}


newGameDOM.addEventListener('click',init);
rollDiceDOM.addEventListener('click',rollDice);
holdDOM.addEventListener('click',hold);