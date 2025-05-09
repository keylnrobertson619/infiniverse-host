//Tudo explicado abaixo
//Everything explained below



//Pegando as 3 opcoes para modificar no JS

//Getting all options to change with JS
var pedra = document.getElementById("pedra")
var papel = document.getElementById("papel")
var tesoura = document.getElementById("tesoura")

//Pegando o score do jogador e do computador

//Getting the player score and computer score
var playerScore = document.getElementById("score_a")
var computerScore = document.getElementById("score_b")

//Definindo variaveis para pontuacao e verificacao

//Defining variables to change points and verification
var player = 0
var computer = 0
var ingame = 0
var choice
var computerChoice

//Funcao para gerar um numero aleatorio para escolha do computador - numero vai de 1 ate 3

//Function to generate a random number until the computer choice be different of player choice - number goes of 1 until 3
function randomChoice() {
    var randomChoice = Math.floor(Math.random() * 3) + 1 //gerando o numero aleatorio | generating a random number
    computerChoice = randomChoice //definindo a variavel da escolha do computador | defining the variable of the computer choice
}

//Funcao chamada quando voce escolher uma opcao

//Function called when you pick a option
function pickOption(o) {
    if (choice == undefined) {
        choice = o
        
        if (o == 1) {
            pedra.classList = "player"
        } else if (o == 2) {
            papel.classList = "player"
        } else {
            tesoura.classList = "player"
        }
        
        if (computerChoice == undefined) {
//Chamei a funcao para gerar o numero aleatorio para o computador, porem não pode dar empate, entao chamei o while, enquanto for igual a escolhar do jogador ele vai gerar outro ate ficar diferente
          
//I did called the function to generate a random number to computer, but if it's equals the player choice, i runed a "while", while computer choice be equals the player choice, it's will generate another number until be diferente
            randomChoice()
            while (computerChoice == choice) {
                randomChoice()
            }
            
            if (computerChoice == 1) {
                pedra.classList = "computer"
            } else if (computerChoice == 2) {
                papel.classList = "computer"
            } else {
                tesoura.classList = "computer"
            }
        }
        
        getWin(choice, computerChoice) //Funcao para verificar se ganhou passando a escolha do jogador e do computador | Function to verify if won passing the player choice and the computer choice
    } else {
        alert("You've already played!") //Se a pessoa ja jogou, vem um alerta falando que ela não pode jogar de novo | If player already played, comes a alert saying that can't play again
    }
    ingame = 0
}

function getWin(p, c) {
    //Verifica a opção do jogador e do computador para pegar o ganhador
  
    //Verify the player choice and the computer choose to see who won
    if (ingame == 1) {
        
        if (p == 1 && c == 2) {
            computer ++
        } else if (p == 1 && c == 3) {
            player ++
        } else if (p == 2 && c == 1) {
            player ++
        } else if (p == 2 && c == 3) {
            computer ++
        } else if (p == 3 && c == 1) {
            computer ++
        } else if (p == 3 && c == 2) {
            player ++
        }
        
        playerScore.innerHTML = player
        computerScore.innerHTML = computer
    }
}

function newGame() {
    //Seta o status do game para 1, para o jogador voltar a jogar
  
    //It's set the status of the game to 1, to make player play again
    if (ingame == 0) {
        ingame = 1
        choice = undefined
        computerChoice = undefined
        
        pedra.classList = ""
        papel.classList = ""
        tesoura.classList = ""
        
        playerScore.innerHTML = player
        computerScore.innerHTML = computer
    }
}