const btnStart = document.querySelector('button#btn-start');
const btnStop  = document.querySelector('button#btn-stop');
const btnRestart  = document.querySelector('button#btn-restart');
const numberShoot  = document.querySelector('span#number-shoot');
const divCongratulations  = document.querySelector('div.end-game');
const allTargets = document.querySelectorAll('div.target');
const btnCloseStop = document.querySelector('button#btn-close-stop');

let divStopGame = document.querySelector('div.stop-game');
let divOne = document.querySelector('div.one');
let divBubble = document.querySelector('div.box-colors')
let timer = document.querySelector('span#timer');
let wasTimer = document.querySelector('span#was-time');

let TIMER = 0;
let arrColor = [];
let interval = null;

btnCloseStop.onclick = () => {
    divStopGame.style.display = 'none';
}

btnStart.onclick = () =>{
    divOne.classList.add('startGame');
    divBubble.innerHTML = '';
    numberShoot.innerHTML = 0;
    timer.innerHTML = '0s';
    TIMER = 0;

    if (TIMER == 0) {
        interval = setInterval(countTimer, 1000);
    }

    startRunTarget();
    addColorBublle();
}

btnStop.onclick = () =>{
    divOne.classList.remove('startGame');
    clearInterval(interval);
    TIMER = 0;
    timer.innerHTML = '0s';
    divStopGame.style.display = 'flex';
}

btnRestart.onclick = () =>{
    divCongratulations.style.display = 'none';
    divOne.classList.add('startGame');
    divBubble.innerHTML = '';
    numberShoot.innerHTML = 0;
    timer.innerHTML = '0s';
    TIMER = 0;

    if (TIMER == 0) {
        interval = setInterval(countTimer, 1000);
    }

    startRunTarget();
    addColorBublle();

}

function startRunTarget(){

    let arrPoints = [];
    
    allTargets.forEach(element => {
        
        element.onclick = (e) => {
            let valueShoot = e.target.getAttribute('value')
            
            arrPoints.push(parseInt(valueShoot))
            
            let newArr = arrPoints.filter((val, i) => arrPoints.indexOf(val) === i); 
            let sumShoot = newArr.reduce((acc, curr) => acc + curr);
            
            numberShoot.innerHTML = sumShoot;
            
            if (numberShoot.innerHTML == 45) {
                newArr.slice(0,0);
                divOne.classList.remove('startGame');
                divCongratulations.style.display = 'flex';
                wasTimer.innerHTML = TIMER + 's';
                clearInterval(interval);
            }
        }
    });
}
    
function addColorBublle() {

    document.querySelector('body').onclick = (e) => {
        
        if (!String(e.target.className).match('target')) return;
        
        let color = e.target.getAttribute('color')
        let element = `<span style="background-color: ${color}; padding: 15px 15px; border-radius: 50%;" id="${color}"></span>`;
        let verifyElement = document.querySelector(`span#${color}`);

        (verifyElement === null) ? divBubble.innerHTML += element : false;
    }
}

function countTimer() {
    TIMER++;
    timer.innerHTML = TIMER + 's';
}