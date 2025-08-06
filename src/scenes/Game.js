//SEGUNDA CENA!!!!
export let genero = null;
export let nome= null
export class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }
    create(){
        let escolhagenero = document.getElementById("genero"); //transforma o div genero em variavel
        let masculino = document.getElementById("homem"); //transforma o botao homem em variavel
        let feminino = document.getElementById("mulher"); //transforma o botao mulher em variavel
        escolhagenero.style.display = "block"; //mostra o div com o titulo e botoes
        let escolhanome = document.getElementById("nomepersonagem"); // div nomepersonagem em variavel
        let tituloescolhenome = document.getElementById("titulonomepersonagem"); // titulo pra escolher nome do personagem
        let botaoescolhenome = document.getElementById("escolheunome");//botao pra escolher o nome transformado em variavel
        let semnome = document.getElementById("semnome");

        masculino.addEventListener("click", ()=>{ //evento caso o jogador escolha o genero masculino
            genero = "masculino"; //a variavel genero muda para a string "masculino"
         
            escolhagenero.style.display = "none"; //esconde o titulo e botoes para escolher o genero
            tituloescolhenome.textContent = "Escolha o nome do Personagem"
            escolhanome.style.display = "block";
           
        })

        feminino.addEventListener("click", ()=>{ //evento caso o jogador escolha o genero feminino
            genero = "feminino"; //a variavel genero muda para a string "feminino"
           
            escolhagenero.style.display = "none"; //esconde o titulo e botoes para escolher o genero
            tituloescolhenome.textContent = "Escolha o nome da Personagem"
            escolhanome.style.display = "block";

        })
        
        botaoescolhenome.addEventListener("click", ()=>{ 
            console.log(genero)
            nome = document.getElementById("nomeescolhido").value
            if (nome === ""){
                semnome.textContent = "digite um nome antes de continuar"
            } else{
            escolhanome.style.display = "none";
            
            this.scene.start("Inicio");

            }
        })
        }

    }
