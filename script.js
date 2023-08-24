//DADOS INICIAIS
let square = {
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    c1: '',
    c2: '',
    c3: ''
};

let player = '';
let warning = '';
let playing = false;



reset();

//EVENTOS
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})





//FUNÇÕES

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();

    }

    // console.log(event.target)O target pode ser usado para obter o elemento que gerou o evento, bem como suas propriedades e atributos.
}

function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2); // GERANDO NÚMERO ALEATÓRIO E MULTIPLICANDO POR DOIS POIS O randon GERA UM NÚMERO ALEATÓRIO 0.ALGUMA COISA, QUANDO EU MULTIPLICO ELE FICA REDONDO.
    player = (random === 0) ? 'x' : 'o';

    for (let i in square) {
        square[i] = ''; // USANDO FOR E O CONTADOR i PARA PERCORRER O OBJ square E TROCANDO O VALOR DE CADA ELEMENTO DENTRO DELE POR VAZIO.

    }

    renderSquare();
    renderInfo();
    playing = true;
}

function renderSquare() {
    for (let i in square) { // usadno in no for ele varre os elemento do array se usar o of ele pega o valor dos elementos no array
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

}



function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}


function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        player = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if (isFull()) {
        warning = 'Deu impate';
        playing = false;
    }
    1
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',


        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
];

    for (let w in pos) {
      let pArray = pos[w].split(','); //a1,a2,a3 o split vai criar um array a cada virgula
        let hasWon = pArray.every(option => square[option] === player); // método every() é um método de array que retorna um valor booleano indicando se todos os elementos do array satisfazem uma determinada condição.
        if (hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
}
