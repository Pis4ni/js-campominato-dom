//! recuper dal dom gli elementi di interesse

const cellsContainer = document.getElementById('cells-container')
const startBtn = document.getElementById('generate-grid')
const difficulty = document.getElementById('difficulty')

let difficultyOption = difficulty.options[difficulty.selectedIndex];
let difficultyValue = difficulty.value
let difficultyText = difficultyOption.textContent;
console.log(difficultyValue);

// ! NUMERO DI CELLE IN BASE ALLA DIFFICOLTÁ

let cellsTotal = difficultyValue * difficultyValue;

// ! WHITELIST

const whitelist = generateWhitelist(cellsTotal)

// ! BOMBLIST

const bombList = bombs(whitelist)
console.log(bombList);


// ! ON LOAD

generateGrid(cellsContainer, whitelist, difficultyValue, bombList)
// console.log(cellsTotal);




// ! STARTBUTTON CLICK

startBtn.addEventListener('click', () =>{
    cellsContainer.innerHTML = ''
    difficultyValue = difficulty.value
    difficultyOption = difficulty.options[difficulty.selectedIndex];
    difficultyText = difficultyOption.textContent;
    cellsTotal = difficultyValue * difficultyValue

    // todo cells total e stato spostato sotto perche e calcolato in base al valore della select
    const whitelist = generateWhitelist(cellsTotal)
    
    generateGrid(cellsContainer, whitelist, difficultyValue)

    console.log('created a grid with ' + cellsTotal +  ' elements, difficulty: ' + difficultyText );
})




// ! FUNCTIONS


// ################# GENERA GRIGLIA #######################

function generateGrid(container, whitelist, difficulty, bombList){
    container.innerHTML = ''

    console.log(whitelist.length);
    while (whitelist.length) {
        // ? casual index;
        const randomIndex = Math.floor(Math.random()*whitelist.length)
        const cellValue = whitelist[randomIndex];
        whitelist.splice(randomIndex, 1)
        generateCell(container, difficulty, cellValue ,whitelist, bombList);

    }

}

//  ############# GENERA CELLA ###############

function generateCell(container, difficulty, cellnumber, bombList){
    // creo l'elemento cella
    const cell = document.createElement('li')

    // classi in base alla difficoltá
    if (difficulty == 10) {
        cell.classList.remove('w-medium')
        cell.classList.remove('w-hard')
        cell.classList.add('w-easy')
    }else if (difficulty == 9) {
        cell.classList.remove('w-easy')
        cell.classList.remove('w-hard')
        cell.classList.add('w-medium') 
    }else if (difficulty == 7) {
        cell.classList.remove('w-easy')
        cell.classList.remove('w-medium')
        cell.classList.add('w-hard') 
    }


    cell.setAttribute('data-index', cellnumber)
    cell.classList.add('cell')

    //  ########## event listener cella ##############

    cell.addEventListener('click', function(){
        bombs = bombList
        console.log(bombs);
        const index =this.getAttribute('data-index');
        this.innerText = index;
        if (this.classList.contains('enlighted') || this.classList.contains('cell-odd')) {
            this.classList.remove('enlighted')  
            this.classList.remove('cell-odd')  
            this.innerText = '';
            console.log('removed ' + index);
        }else if(bombList.includes(index)) {
            this.classList.remove('enlighted')  
            this.classList.add('cell-odd')  
        }else{
            this.classList.add('enlighted')  
            console.log(index);
        }
        console.log(index);
    })
    // metto l'elemento appena creato nel container
    container.append(cell)
    
}


// ################# GENERA WHITELIST #######################

function generateWhitelist(cellsTotal){
    const whitelist =  []
    for (let i = 1; i <= cellsTotal ; i++) {
        whitelist.push(i);
    }
    return whitelist;
}
function bombs(whitelist){
    const bombs = []
    for (let i = 0; i < 16; i++) {
        
        let randomNumber = Math.floor(Math.random() * whitelist.length);
        if (bombs.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * whitelist.length)
        }
        bombs.push(randomNumber)
    }
    return bombs

}