const IMAGES = document.querySelectorAll("img");
const hearts_p = document.querySelectorAll(".scoreText");
const questions_p = document.querySelectorAll(".gameText");
var gameCharacter = "";
var game_img = document.querySelector("#gameImage");

//HomePage Functions
function gameSet(target){
    gameCharacter = (target.nextSibling).nextSibling.innerText;
    gameCharacter = gameCharacter.toLowerCase();
    localStorage.setItem("gameCharacter", gameCharacter);
    window.location.href = "gameStart.html";
}

const listener = (event) => {
    let eventTarget = event.target;
    gameSet(eventTarget); 
} 

function addListeners(){
    IMAGES.forEach( img => img.addEventListener('click', listener));
}

//Game Engine
function characterRoute(){
    gameCharacter = localStorage.getItem("gameCharacter");
    switch(gameCharacter){
        case "azura":
            characterGame(azura);
            break;

        case "anna":
            characterGame(anna);
            break;
   
        case "forrest":
            characterGame(forrest);
            break;

        case "leo":
            characterGame(leo);
            break;

        case "marth":
            characterGame(marth);
            break;

        case "odin":
            characterGame(odin);
            break;
    }

}



//number randomizer
function random(length){
    let randomValue = Math.floor(Math.random() * length);
    return randomValue;
}

//Gets the Original Answers and the Answers in random order
function randomQuestion(character){
    let goodChoice = character.chatOptions.good.splice(random(character.chatOptions.good.length),1);
    let neutralChoice = character.chatOptions.neutral.splice(random(character.chatOptions.neutral.length),1);
    let badChoice = character.chatOptions.bad.splice(random(character.chatOptions.bad.length),1);
    let choiceArray = [goodChoice, neutralChoice, badChoice];
    let originalAnswers = [];
    let randomAnswers = [];
    for(i = 0; i < choiceArray.length; i++){
       originalAnswers.push(choiceArray[i][0]);
    }
    let clone = [].concat(originalAnswers);
    for(i = 0; i < choiceArray.length; i++){
        let randomNumber = random(2);
        if(randomNumber == 0){
            randomAnswers.push(clone.pop());
        } else{
            randomAnswers.push(clone.shift());
        }
    }
    return [originalAnswers, randomAnswers];
}

var questions = [];
var originalQuestions = [];
var randomQuestions = [];
var maxRounds = 5;
var roundNumber = 0;
var playerScore = 0;
var winningScore = 3;
var characterName = ""

function characterGame(character){
    characterName = character;
    game_img.src = characterName.images.base;
    hearts_p[roundNumber].classList.add('scoreSpin');
    questions = randomQuestion(characterName);
    originalQuestions = questions[0];
    randomQuestions = questions[1];
    for(let i = 0; i < 3; i++){
        questions_p[i].innerHTML = randomQuestions[i];
    }
    questions_p[0].addEventListener('click', () => game(event));
    questions_p[1].addEventListener('click', () => game(event));
    questions_p[2].addEventListener('click', () => game(event));

   
}


function gameResult(){
    //change DOM
    if(playerScore >= winningScore ){
        //winner DOM
        setTimeout(() =>  questions_p.forEach((p) =>{
            game_img.src = characterName.images.smile;
            p.classList.add('green-glow');
            p.innerHTML = "YOU WIN"}), 500);       
        setTimeout(() => questions_p.forEach((p) => {
            p.classList.add('transition');
            p.classList.remove('green-glow')}), 3000);

        setTimeout(() => {
            questions_p[0].innerHTML = ("Play Again? " + "(" + characterName.name + ")");
            questions_p[0].onclick = () =>  window.location.href = "gameStart.html";
            questions_p[1].innerHTML = "Character Selection";
            questions_p[1].onclick = () =>  window.location.href = "index.html";
            questions_p[2].innerHTML = "Thanks for Playing!";
        }, 3200);


    } else{
        setTimeout(() =>  questions_p.forEach((p) =>{
            game_img.src = characterName.images.frown;
            p.classList.add('red-glow');
            p.innerHTML = "YOU LOSE"}), 500);       
        setTimeout(() => questions_p.forEach((p) =>{
            p.classList.add('transition');
            p.classList.remove('red-glow')}), 3000);

        setTimeout(() => {
            questions_p[0].innerHTML = ("Play Again? " + "(" + characterName.name + ")");
            questions_p[0].onclick = () =>  window.location.href = "gameStart.html";
            questions_p[1].innerHTML = "Character Selection";
            questions_p[1].onclick = () =>  window.location.href = "index.html";
            questions_p[2].innerHTML = "Thanks for Playing!";
        }, 3200);
    }
}
   


function game(event){
    let eventTarget = event.target;
    switch(eventTarget.innerHTML){
        case originalQuestions[0]:
            eventTarget.classList.add('green-glow');
            game_img.src = characterName.images.smile;
            setTimeout(() => {
                eventTarget.classList.remove('green-glow');
                game_img.src = characterName.images.base;}, 500);
            hearts_p[roundNumber].style.color = "#A7E9AF";
            playerScore++;
            hearts_p[roundNumber].classList.remove('scoreSpin');
            roundNumber++;
            if(roundNumber < maxRounds){
                hearts_p[roundNumber].classList.add('scoreSpin');
                questions = randomQuestion(characterName);
                originalQuestions = questions[0];
                randomQuestions = questions[1];
                for(let i = 0; i < 3; i++){
                    questions_p[i].innerHTML = randomQuestions[i];
                }
            }else{
                gameResult();
            }
            break;

        case originalQuestions[1]:
            eventTarget.classList.add('gray-glow');
            setTimeout(() => eventTarget.classList.remove('gray-glow'), 500);
            hearts_p[roundNumber].style.color = "#ADB0BF";
            hearts_p[roundNumber].classList.remove('scoreSpin');
            roundNumber++;
            if(roundNumber < maxRounds){
                hearts_p[roundNumber].classList.add('scoreSpin');
                questions = randomQuestion(characterName);
                originalQuestions = questions[0];
                randomQuestions = questions[1];
                for(let i = 0; i < 3; i++){
                    questions_p[i].innerHTML = randomQuestions[i];
                }
            }else{
                gameResult();
            }
            break;

        case originalQuestions[2]:
            eventTarget.classList.add('red-glow');
            game_img.src = characterName.images.frown;
            setTimeout(() => {
                eventTarget.classList.remove('red-glow')
                game_img.src = characterName.images.base;}, 500);
            hearts_p[roundNumber].style.color = "#fa163f";
            playerScore--;
            hearts_p[roundNumber].classList.remove('scoreSpin');
            roundNumber++;
            if(roundNumber < maxRounds){
                hearts_p[roundNumber].classList.add('scoreSpin');
                questions = randomQuestion(characterName);
                originalQuestions = questions[0];
                randomQuestions = questions[1];
                for(let i = 0; i < 3; i++){
                    questions_p[i].innerHTML = randomQuestions[i];
                }
            }else{
                gameResult();
            }
            break;
    }

}




//Chat Options Class

class ChatOptions{
    constructor(good, neutral, bad){
        this.good = good;
        this.neutral = neutral;
        this.bad = bad;
    }
}

//Images Class

class charImages{
    constructor(base, smile, frown){
        this.base = base;
        this.smile = smile;
        this.frown = frown;
    }
}

//Character Class
class Character{
    constructor(name, images, chatOptions){
        this.name = name;
        this.images = images;
        this.chatOptions = chatOptions;
    }
}


const azura = new Character('azura', new charImages('images/azura/azuraBase.png', 'images/azura/azuraSmile.png', 'images/azura/azuraFrown.png') ,
  new ChatOptions(['A strong battalion',"Books you've read recently",'Capable comrades','The last battle',"I'm counting on you",'Reliable allies'],
    ['Past laughs','Someone you look up to','A new gambit','Working together',"Guessing someone's age",'Things that bother you'],
    ['Our first meeting','Tell me about yourself','The view from the bridge','Your ambitions','Equipment upkeep','I heard some gossip']));

const anna = new Character('anna', new charImages('images/anna/annaBase.png', 'images/anna/annaSmile.png', 'images/anna/annaFrown.png'),
  new ChatOptions(['Cats','Children at the market','Cute monks','Favorite sweets','Cooking mishaps','Shareable snacks'],
    ['School days','School uniforms','You seem well','Exploring','Likeable allies','Things you find romantic'],
    ['Plans for the future','You seem different','The ideal relationship','Working hours for guards','First crushes','Dreamy knights']));

const forrest = new Character('forrest', new charImages('images/forrest/forrestBase.png', 'images/forrest/forrestSmile.png', 'images/forrest/forrestFrown.png'),
new ChatOptions(['A dinner invitation','Cute accessories','Cute monks','Dining partners','Dreamy knights','Fashion'],
    ['Gardening mishaps','Relaxing at the Sauna','I heard some gossip','Heart-racing memories','Our first meeting','Things that bother you'],
    ['Evaluating allies','The opera','You seem different',"I'm counting on you",'The courtyard couple','Children at the market']));

const leo = new Character('leo', new charImages('images/leo/leoBase.png', 'images/leo/leoSmile.png', 'images/leo/leoFrown.png'),
new ChatOptions(['Evaluating allies','Mighty weapons',"I'm counting on you",'Overcoming weaknesses','Children at the market','The last battle'],
    ['Food in the Dining Hall','Shareable snacks','Cats','A dinner invitation','Favorite sweets','Perfect recipes'],
    ['Fashion','First crushes','Dating escapades','Dining partners','I heard some gossip','Cute monks']));

const marth = new Character('marth', new charImages('images/marth/marthBase.png', 'images/marth/marthSmile.png', 'images/marth/marthFrown.png'),
new ChatOptions(['The view from the bridge','You seem well','Working together','Relaxing at the Sauna','Likeable allies','Hopes for your future'],
    ['Thanks for everything','Tell me about yourself','Overcoming weaknesses','Past laughs','Dating escapades','Dining partners'],
    ['I heard some gossip','You seem different','The opera','Cooking mishaps',"A place you'd like to visit","Guessing someone's age"]));

const odin = new Character('odin', new charImages('images/odin/odinBase.png', 'images/odin/odinSmile.png', 'images/odin/odinFrown.png'),
new ChatOptions(['Close calls','Successful plots','Your ambitions','Tell me about yourself','You seem well','A new gambit'],
    ['Capable comrades','Overcoming weaknesses','Shareable snacks','First crushes','The ideal relationship','Cats'],
    ['Someone you look up to','Equipment upkeep','Dreamy knights','Children at the market','A strong battalion','The opera']));
 

