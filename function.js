import { words } from "./Words.js";

const word = new words();

const inpt = document.querySelectorAll('.inpt');
let Word_to_guest = word.word().toUpperCase();
const Myguest = [];

let row = 0;
let endCol =5;
let score=0;

console.log(Word_to_guest);
document.addEventListener('keyup', (event)=>{
    console.log(Word_to_guest);
    if(event.key=='Enter'){
       if(Myguest.length==endCol){
          Check_win();
       }
    }
    else if(event.key=='Backspace'){
        if(Myguest.length>row){
           Myguest.pop();
           fillBoard();
        }
    }
    else if(isLetter(event.key)){
        if(Myguest.length<endCol){
          Myguest.push(event.key.toUpperCase());
          fillBoard();
        }
    }
})

function Check_win(){
    let count =row;
    let j=row;
    let greens = [];
    let Myanswer = [];
    for(let i=0;i<Word_to_guest.length;i++){
            greens.push(Word_to_guest.charAt(i));
            Myanswer.push(Myguest[j++]);
    }  
   j=row;

    for(let i=0;i<Word_to_guest.length;i++){
        if(Word_to_guest.charAt(i)===Myanswer[i]){
            count++;
            greens[i]='';
            Myanswer[i]='';
            inpt[j].style.backgroundColor ='lightgreen'
        }
        j++;
    }  

    j=row;
    
    for(let i=0;i<Word_to_guest.length;i++){
         if(Myanswer[i]!==''&&greens.includes(Myanswer[i])){
             for(let j1 =0;j1<greens.length;j1++){
                if(greens[j1]==Myanswer[i]){
                    greens[j1]='';
                    Myanswer[i]='';
                    break;
                }
             }
            inpt[j].style.backgroundColor = 'yellow';
        }
        j++;
    }
    
    j=row;

    for(let i=0;i<Word_to_guest.length;i++){
        if(Myanswer[i]!==''){
            inpt[j].style.backgroundColor = 'black';
            inpt[j].style.color = 'white';
        }
        j++;
    }

    if(count==endCol){
       win();
    }else if(endCol==30){
      fillBoard(resetGame());
    }else{
        row+=5;
        endCol+=5;
    }
}

function win(){ 
     score++;
   document.getElementById("score").textContent = "Score: "+score;
   setTimeout(()=>{
    fillBoard(resetGame());
   },200)
}
const aplha = "abcdefghijklmnopqrstuvwxyz";
function isLetter(letter){
      letter = letter.toLowerCase();
      return aplha.includes(letter);
}
function resetGame(){
    let c = Myguest.length;
  for(let i=0;i<c;i++){
    Myguest.pop();
  }
  for(let i=0;i<inpt.length;i++){
     inpt[i].className = '';
     inpt[i].classList.add('inpt');
  }
 
  endCol = 5;
  row=0;
  Word_to_guest = word.word().toUpperCase();
} 


function fillBoard(){
    for(let i=0;i<inpt.length;i++){
        inpt[i].textContent='';
    }
    for(let i=0;i<Myguest.length;i++){
         inpt[i].textContent = Myguest[i];
    }
}



