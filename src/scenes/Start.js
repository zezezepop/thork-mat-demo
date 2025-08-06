//PRIMEIRA CENA!!!!!

export class Start extends Phaser.Scene { 

    constructor() {
        super('Start');  //entitula a cena como "Start"
    }

    preload() {  // funcao para carregar imagens ao jogo
        this.load.image('fundo', 'Assets/fundoagoravaipeloamordedeus.jpg'); //carrega o fundo
    }

    create() {  //cria todo o resto
        
        
        let titulo = document.getElementById("titulo"); //transforma o titulo da tela inicial em variavel
        let botao = document.getElementById("jogar"); // transforma o botao de iniciar o jogo em variavel
        let instrucoes = document.getElementById("instrucoes"); // transforma o botao de instrucoes em variavel
        titulo.style.display = "block"; //mostra o titulo
        botao.style.display = 'block'; // mostra o botao de iniciar o jogo
        instrucoes.style.display = "block"; // mostra o botao de instrucoes
        let comojogar = document.getElementById("comojoga"); // transforma as instrucoes do jogo em variavel
        comojogar.style.display = "none"; // esconde as instrucoes
        let voltar = document.getElementById("voltar"); // transforma o botao para voltar para a tela inicial em variavel
        voltar.style.display = "none"; //esconde o botao
        
        this.fundo = this.add.tileSprite(640, 360, 1280, 720, 'fundo'); //adciona o fundo e faz ele ocupar a tela inteira


        instrucoes.addEventListener("click", ()=>{ //evento caso clique no botao de instruces
            document.documentElement.requestFullscreen();
            titulo.style.display = "none"; //esconde o titulo
            jogar.style.display = "none"; //esconde o botao de jogar
            instrucoes.style.display = "none"; //esconde o botao de instrucoes
            comojogar.style.display = "block"; //mostra as instrucoes
            voltar.style.display = "block"; //mostra o botao de voltar ao menu inicial
        })
        voltar.addEventListener("click", ()=> { //evento caso clique no botao de voltar ao menu
            voltar.style.display = "none"; //esconde o botao de voltar
            comojogar.style.display = "none"; //esconde as instrucoes
            titulo.style.display = "block"; //mostra o titulo
            botao.style.display = "block"; //mostra o botao de iniciar o jogo
            instrucoes.style.display = "block"; //mostra o botao de instrucoes

        })
        botao.addEventListener("click", ()=>{ //evento caso clique no botao de iniciar o jogo
            document.documentElement.requestFullscreen();
            this.scene.start("Game"); //muda para a cena "Game"
            botao.style.display = "none"; //esconde o botao de iniciar o jogo
            titulo.style.display = "none"; //esconde o titulo
            instrucoes.style.display = "none"; //esconde o botao de instrucoes
            
        })
    }
    }
