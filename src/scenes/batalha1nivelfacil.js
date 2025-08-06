import { nivel, hp, qi, ataque, defesa, xp } from './variaveis.js'; //status do personagem
import { nome} from './Game.js';
import {bens} from './inicio3.js'; // os itens do jogador
import {nivelfacil, nivelmedio, niveldificil, nivelhack, hpmaximo, qimaximo} from "./armazem.js"

let turno = true; //controla os turnos. Se for true, é o turno do jogador, se for false,é o turno do adversario.
let sedefendeu = false //false: o jogador n se defendeu. true: o jogador se defendeu com sucesso e vai receber menos dano do inimigo
let vidaescudo = 0 //a vida do escudo casoa gente use uma magia de qi defensiva. Quando chegar a 0, o escudo vai quebrar. Se acima de 0, vai diminuir o dano tomado(dependendo da magia q escolhemos)
let dialogo = false; // variavel q verifica se esta tendo algum dialogo ou nao
let boss = true; //verifica se o inimigo q estamos lutando é um boss ou nao. em bosses, nao é possivel fugir.
let textoinimigoataque = "Léticia tenta te dar um soco na fuça."; //dialogos para a batalha caso o adv ataque
let hpadv = 35; //hp do inimigo pode ou nao ser mair nos outros niveis, ou pode ser menor no fácil, vc escolhe
let qiinimigo = 30; //o tanto de pontos de qi que o inimigo tem. nos outros niveis vao ser maiores. cada ataque de qi vai custar uma quantidade de qi, e se nao tiver essa quantidade, o ataque falha.
let ataqueinimigo = 3
let forcaqiinimigo = 1;
let inimigo = document.getElementById("valentona");
let fundo = document.getElementById("batalhafundo"); //mostra o fundo da batalha(algumas batalhas vao ter fundos diferentes)
//let inimigo = document.getElementById("valentona"); //mostra o sprite do inimigo(no caso a leticia)
let retangulo = document.getElementById('caixadialogo'); //onde vai ser mostrado os dialogos de batalha
let dialogoagora = document.getElementById("dialogobatalhas"); // o dialogo das batalhas
let opcoes = true
let abriuitens = false;
let pagina1 = true;
let pagina2 = false;
let pagina3 = false;
let pagina4 = false;
let lugarfuga = "Posbatalha"; //variavel com o nome da cena caso o jogador consiga fugir
let dialogofuga = "Letícia colocou o pé para você tropeçar! Ui!";
let voceerrou = "Letícia ri da sua cara!";
let defesaqi = [];
let usoudefesaqi = false;
let contas;

let inimigodefendeu = false;
let anuloucontas = false;
let contador = 3;

let divinega = false;
let perguntasfeitas = 0
let perguntascertas = 0
let perguntaserradas = 0
let lugarperdeu = "Posbatalha"
let inimigoatual = "leticia"
let itemindex = null
let acaoinimigo;
let escolheataque;
let resposta;
export let ganhou = false
export let perdeu = false
let dialogoerrou = "Seu amigo acha que você é burro!."
let dialogoerrou2 = "Você acerta seu amigo..."
let numero1
let numero2


export function batalha(a){
    console.log(hpadv)
    let caixaataque = document.getElementById("caixaataque"); //caixa onde vc pode escolher se vai atacar, defender, etc.
    //elementos visuais para o jogador escolher qual açao tomar
    let mostraataque = document.getElementById("ataque");
    let mostraqi = document.getElementById("qi");
    let itens = document.getElementById("itens");
    let mostradefesa = document.getElementById("defesa");
    let fugir = document.getElementById("fugir");
    let seta = document.getElementById("seta"); //a setinha q o jogador vai usar para escolher os ataques

    //elementos visuais da vida e qi do jogador
    let caixabatalha = document.getElementById("caixabatalha"); //caixa que mostra o hp e qi atual do jogador
    let nomejogador = document.getElementById("nomejogador"); //elemento html para o nome do jogador 
    let retangulo = document.getElementById('caixadialogo'); //onde vai ser mostrado os dialogos de batalha
    let dialogoagora = document.getElementById("dialogobatalhas"); // o dialogo das batalhas
    let vida = document.getElementById("vida");//elemento html para a vida do jogador
    vida.innerText = hp.hpatual; //o elemento recebeu o valor da vida do jogador
    let qijogador = document.getElementById("qiatual");//elemento html para o qi do jogador
    qijogador.innerText = qi.qiatual; //o elemento recebeu o valor do qi do jogador.
    let item0 = document.getElementById("item0")
    let item1 = document.getElementById("item1")
    let item2 = document.getElementById("item2")
    let item3 = document.getElementById("item3")
    let item4 = document.getElementById("item4")
    let item5 = document.getElementById("item5")
    let item6 = document.getElementById("item6")
    let item7 = document.getElementById("item7")
    let magias = document.getElementById("magias")
    let pkmatematica = document.getElementById("pkmatematica")
    let pkalgebra = document.getElementById("pkalgebra")
    let pkparenteses = document.getElementById("pkparenteses")
    let pksoma = document.getElementById("pksoma")
    let movermagia = document.getElementById("proximapagina")
    let pkpiramide = document.getElementById("pkpiramide")
    let pkfracao = document.getElementById("pkfracao")
    let pkmediaboa = document.getElementById("pkmediaboa")
    let pkzeratudo = document.getElementById("pkzeratudo")
    let pkfatora = document.getElementById("pkfatora")
    let pkdivinega = document.getElementById("pkdivinega")
    let pkarredondar = document.getElementById("pkarredondar")
    let pklogaritmo = document.getElementById('pklogaritmo')
    let pkcontraangulo = document.getElementById("pkcontraangulo")
    let pklimite = document.getElementById('pklimite')
    let pktrigonometria = document.getElementById("pktrigonometria")
    let pkconstante = document.getElementById('pkconstante')
    let requisitos = document.getElementById("requisitos")
    let titulopk = document.getElementById("titulopk")
    let descricao = document.getElementById("descricao")

    //visual do input de matematica + contas que vão aparecer + botão de responder
    let matematicadojogo = document.getElementById("matematica")
    let pergunta = document.getElementById("pergunta")
    let digitarresposta = document.getElementById("digiteresposta")
    let responderpergunta = document.getElementById("responder")

    //mostra o elemento
    caixabatalha.style.display = "block";
    caixaataque.style.display = "block";
    mostraataque.style.display = "block";
    mostraqi.style.display = "block";
    itens.style.display = "block";
    mostradefesa.style.display = "block";
    fugir.style.display = "block";
    seta.style.display = "block";
    vida.style.display = "block"
    qiatual.style.display = "block"
    nomejogador.style.display = "block";
    nomejogador.innerText = nome;
    seta.innerText = ">";
    let yseta = parseInt(getComputedStyle(seta).marginTop);
    let xseta = parseInt(getComputedStyle(seta).marginLeft);
    if (hpadv <= 0 || hp.hpatual <= 0){
            fimdebatalha()  
            return 
        } 

    function verificaitens(){
        retangulo.style.display = "block"
        if (bens[itemindex]=== "Maça" || bens[itemindex]=== "Suquinho" ){
            perguntasfeitas++
            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
              
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1 ){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
        
                if (contas === 1){ // contas de +
                                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block"

            function responderitem(){           
                matematicadojogo.style.display = "none"
                let respostadada = document.getElementById("digiteresposta").value
                if (respostadada === resposta.toString()){
                    digitarresposta.value = "";
                    if (bens[itemindex]=== "Maça"){
                        hp.hpatual += 15;
                    }
                    else{
                        hp.hpatual += 30;
                    }
                    if (hp.hpatual >= hpmaximo){
                        hp.hpatual = hpmaximo
                    }
                    
                    dialogoagora.innerText = "Você usou  " + bens[itemindex] + "!"; 
                    perguntascertas++
                    dialogoagora.style.display = "block";
                    responderpergunta.removeEventListener("click", responderitem)
                    a.input.keyboard.once("keydown-Z", () => {
                        bens.splice(itemindex,1)
                        abriuitens = false
                       
                        xseta = 25
                        yseta = 32
                        seta.style.marginTop = yseta +"px"
                        seta.style.marginLeft = xseta + "px"
                        item0.style.display = "none"
                        item1.style.display = "none"
                        item2.style.display = "none"
                        item3.style.display = "none"
                        item4.style.display = "none"
                        item5.style.display = "none"
                        item6.style.display = "none"
                        item7.style.display = "none"
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        turno = false;
                        setTimeout(()=>{
                            opcoes = true
                            dialogo = false; 
                            batalha(a);
                        })                               
                    });
                    }
                else{
                    perguntaserradas++
                    dialogoagora.innerText = "Você tentou usar  " + bens[itemindex] + "...";
                    dialogoagora.style.display = "block";
                    a.input.keyboard.once("keydown-Z", () => {
                        dialogoagora.innerText = "Não conseguiu e perdeu o item!";
                        perguntaserradas++
                        responderpergunta.removeEventListener("click", responderitem)
                        a.input.keyboard.once("keydown-Z", () => {
                            bens.splice(itemindex,1)
                            abriuitens = false
                           
                            xseta = 25
                            yseta = 32
                            seta.style.marginTop = yseta +"px"
                            seta.style.marginLeft = xseta + "px"
                            item0.style.display = "none"
                            item1.style.display = "none"
                            item2.style.display = "none"
                            item3.style.display = "none"
                            item4.style.display = "none"
                            item5.style.display = "none"
                            item6.style.display = "none"
                            item7.style.display = "none"
                            retangulo.style.display = "none";
                            dialogoagora.style.display = "none";
                            turno = false;
                            setTimeout(()=>{
                                dialogo = false; 
                              
                                batalha(a);
                                
                            })                               
                        });
                    })
                    } 
        

           
            }
            responderpergunta.removeEventListener("click", responderitem)
            responderpergunta.addEventListener("click", responderitem)

        }
        else if(bens[itemindex] === "Lapistab"){
            dialogoagora.innerText = "Você usou o lápis com tabuada!"; 
            dialogoagora.style.display = "block";
            a.input.keyboard.once("keydown-Z", () => {
                dialogoagora.innerText = "Você não terá uma conta para resolver no proximo turno";
                anuloucontas = true
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(itemindex,1)
                    abriuitens = false
                    xseta = 25
                    yseta = 32
                    seta.style.marginTop = yseta +"px"
                    seta.style.marginLeft = xseta + "px"
                    item0.style.display = "none"
                    item1.style.display = "none"
                    item2.style.display = "none"
                    item3.style.display = "none"
                    item4.style.display = "none"
                    item5.style.display = "none"
                    item6.style.display = "none"
                    item7.style.display = "none"
                    retangulo.style.display = "none";
                    dialogoagora.style.display = "none";
                    turno = false;
                    setTimeout(()=>{
                        dialogo = false; 
                      
                        batalha(a);
                    })                               
                });
                    })

        }
        abriuitens = false
    }

    function usoudefesa(){
        if (sedefendeu === false && defesaqi.length === 0 ){
            hp.hpatual -= ataqueinimigo
            dialogoagora.innerText = "Você não se defendeu."
            a.input.keyboard.once("keydown-Z", ()=>{
                retangulo.style.display = "none"
                dialogoagora.style.display = "none"
                turno = true
                setTimeout(()=>{
                    opcoes = true
                    dialogo = false
                    batalha(a)
                },500)
            })
        }

        else if (sedefendeu === true && defesaqi.length === 0){
            dialogoagora.innerText = "Voce se defendeu, entao tomou menos dano!"
            if (acaoinimigo === 1){  //ataque fisico
                hp.hpatual -= parseInt(ataqueinimigo * 0.5);
                retangulo.style.display = "block"
                dialogoagora.style.display = "block"
                sedefendeu = false
                a.input.keyboard.once("keydown-Z", ()=>{
                    retangulo.style.display = "none"
                    dialogoagora.style.display = "none"
                    turno = true
                    setTimeout(()=>{
                        opcoes = true
                        dialogo = false
                        batalha(a)
                    },500)
                })
            }
            else{  //ataqueqi
                if (forcaqiinimigo<=2){   //pk matemagica
                    if(escolheataque === 1){
                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.5);
                    }
                    else{  //pk arg-gebra
                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.5);
                    }
                }
                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                    if (escolheataque === 1){  //matemagica
                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.5)
                    }
                    else if(escolheataque === 2){  //argh-gebra
                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.5)
                    }
                    else if(escolheataque === 3){ //pi-râmide
                        hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.5)
                    }
                    else{  //fat-orra
                        hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.5)
                    }
                }
                else{
                    if (escolheataque === 1){  //pi-ramide
                        hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.5)
                    }
                    else if(escolheataque === 2){  //fat-orra
                        hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.5)
                    }
                    else if(escolheataque === 3){ //logar-dor
                        hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.5)
                    }
                    else{  //triGO-nit
                        hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.5)
                    }

                }
                retangulo.style.display = "block"
                dialogoagora.style.display = "block"
                sedefendeu = false
                a.input.keyboard.once("keydown-Z", ()=>{
                    dialogoagora.innerText = "Você se defendeu, então tomou menos dano!"
                    dialogoagora.style.display = "block"
                    a.input.keyboard.once("keydown-Z",()=>{
                        retangulo.style.display = "none"
                        dialogoagora.style.display = "none"
                        turno = true
                        setTimeout(()=>{
                            opcoes = true
                            dialogo = false
                            batalha(a)
                        },500)

                    })
                    
            })
            }
            
            
        }
        else if(sedefendeu === false && defesaqi.length>0){
                dialogoagora.innerText = "Voce se defendeu com magia de qi, entao tomou menos dano!"
                dialogoagora.style.display = "block"
                a.input.keyboard.once("keydown-Z",()=>{
                    if(defesaqi.includes("parenteseseguro")){
                        dialogoagora.innerText = "Voce se defendeu com PK Parenteseseguro";
                        dialogoagora.style.display = "block";
                        vidaescudo -=1;
                        if (acaoinimigo === 1){  //ataque fisico
                                hp.hpatual -= parseInt(ataqueinimigo * 0.5);
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                        else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.7);
                                    }
                                    else{  //pk arg-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.7);
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.7)
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.7)
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.7)
                                    }
                                    else{  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.7)
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.7)
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.7)
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.7)
                                    }
                                    else{  //triGO-nit
                                        hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.7)
                                    }

                                }
                        }
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                     
                           })
                        }
                    
        
                    else if(defesaqi.includes("fracao")){
                        dialogoagora.innerText = "Voce se defendeu com PK Fração"
                        dialogoagora.style.display = "block"
                        vidaescudo-=1
                        if (acaoinimigo === 1){  //ataque fisico
                                hp.hpatual -= parseInt(ataqueinimigo * 0.5);
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                        else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.5);
                                    }
                                    else{  //pk arg-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.5);
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.5)
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.5)
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.5)
                                    }
                                    else{  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.5)
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.5)
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.5)
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.5)
                                    }
                                    else{  //triGO-nit
                                        hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.5)
                                    }

                                }
                        }
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                    else if(defesaqi.includes("divinega")){
                        dialogoagora.innerText = "Voce se defendeu com PK Divi-nega";
                        vidaescudo -= 1;
                        dialogoagora.style.display = "block";

                        a.input.keyboard.once("keydown-Z", ()=> {
                            let chancedezerarataque;
                            if (nivelfacil === true){
                                chancedezerarataque = Math.floor(Math.random()*10)+1;
                            } else {
                                chancedezerarataque = Math.floor(Math.random()*20)+1;
                            }

                            if (acaoinimigo === 1){  //ataque fisico
                                if (chancedezerarataque > 1){
                                    hp.hpatual -= parseInt(ataqueinimigo * 0.6);
                                }
                                
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                            else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        if (chancedezerarataque > 1){
                                            hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.6);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        if (chancedezerarataque > 1){
                                            hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.6);
                                        }
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        if (chancedezerarataque > 1){
                                             hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.6)
                                        }
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        if (chancedezerarataque > 1){
                                             hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.6)
                                        }
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        if (chancedezerarataque > 1){
                                          hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.6)
                                        }
                                    }
                                    else{  //fat-orra
                                        if (chancedezerarataque > 1){
                                           hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.6)
                                        }
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        if ( chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.6)
                                        }
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        if (chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.6)
                                        }
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        if (chancedezerarataque > 1){
                                          hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.6)
                                        }
                                    }
                                    else{  //triGO-nit
                                        if (chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.6)
                                        }
                                    }

                                }
                            }

                            if (chancedezerarataque === 1){
                                setTimeout(() => {
                                    dialogoagora.innerText = "O dano foi dividido por zero!";
                                    
                                    dialogoagora.style.display = "block";

                                    a.input.keyboard.once("keydown-Z", ()=> {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        turno = true;
                                        setTimeout(()=>{
                                            opcoes = true
                                            dialogo = false;
                                            batalha(a);
                                        },500);
                                    });
                                }, 30);
                            } 
                            else {
                                setTimeout(() => {
                                    dialogoagora.innerText = "O dano nao foi zerado infelizmente";
                                    dialogoagora.style.display = "block";

                                    a.input.keyboard.once("keydown-Z", ()=> {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        turno = true;
                                        setTimeout(()=>{
                                            opcoes = true
                                            dialogo = false;
                                            batalha(a);
                                        },500);
                                    });
                                }, 30);
                            }
                        });
                    }

                    else if(defesaqi.includes("contraangulo")){
                        dialogoagora.innerText = "Voce se defendeu com PK Contra-Ângulo"
                        vidaescudo -= 1;
                        dialogoagora.style.display = "block";

                        a.input.keyboard.once("keydown-Z", ()=> {
                            let chancederefletirataque
                            if (nivelfacil === true){
                                chancederefletirataque = Math.floor(Math.random()*2)+1
                            } else {
                                chancederefletirataque = Math.floor(Math.random()*20)+1 
                            }

                            if (acaoinimigo === 1){  //ataque fisico
                                hp.hpatual -= parseInt(ataqueinimigo * 0.5);
                                if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                    hpadv -= parseInt((ataqueinimigo * 0.5) * 0.5);
                                }
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
1                            }
                            else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.6);
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 4) * 0.6) * 0.5);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.6);
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 8) * 0.6) * 0.5);
                                        }
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.6)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 4) * 0.6) * 0.5);
                                        }
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.6)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 8) * 0.6) * 0.5);
                                        }
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.6)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 10) * 0.6) * 0.5);
                                        }
                                    }
                                    else{  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.6)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 20) * 0.6) * 0.5);
                                        }
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.6)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 14) * 0.6) * 0.5);
                                        }
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.6)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 24) * 0.6) * 0.5);
                                        }
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.6)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 44) * 0.6) * 0.5);
                                        }
                                    }
                                    else{  //triGO-nit
                                        hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.6)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 74) * 0.6) * 0.5);
                                        }
                                    }

                                }
                            }

                            if (nivelfacil === true && chancederefletirataque === 1){
                                setTimeout(() => {
                                    dialogoagora.innerText = "O ataque ricocheteou em um ângulo improvável!"
                                    dialogoagora.style.display = "block";

                                    a.input.keyboard.once("keydown-Z", ()=> {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        turno = true;
                                        setTimeout(()=>{
                                            opcoes = true
                                            dialogo = false;
                                            batalha(a);
                                        },500);
                                    });
                                }, 30);
                            } 
                            else if (nivelfacil === true && chancederefletirataque === 2) {
                                setTimeout(() => {
                                    dialogoagora.innerText = "O ataque nao refletiu"
                                    dialogoagora.style.display = "block";

                                    a.input.keyboard.once("keydown-Z", ()=> {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        turno = true;
                                        setTimeout(()=>{
                                            opcoes = true
                                            dialogo = false;
                                            batalha(a);
                                        },500);
                                    });
                                }, 30);
                            }
                            else if(nivelfacil === false && chancederefletirataque <=7){
                                setTimeout(() => {
                                    dialogoagora.innerText = "O ataque ricocheteou em um ângulo improvável!"
                                    dialogoagora.style.display = "block";

                                    a.input.keyboard.once("keydown-Z", ()=> {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        turno = true;
                                        setTimeout(()=>{
                                            opcoes = true
                                            dialogo = false;
                                            batalha(a);
                                        },500);
                                    });
                                }, 30);
                            }
                            else{
                                setTimeout(() => {
                                    dialogoagora.innerText = "O ataque nao refletiu";
                                    dialogoagora.style.display = "block";

                                    a.input.keyboard.once("keydown-Z", ()=> {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        turno = true;
                                        setTimeout(()=>{
                                            opcoes = true
                                            dialogo = false;
                                            batalha(a);
                                        },500);
                                    });
                                }, 30);
                            }
                        });
                       
                    }
                    else if(defesaqi.includes("constante")){
                        dialogoagora.innerText = "Voce se defendeu com PK Constante-C(defesa mais forte de jogo)"
                        vidaescudo-=1
                        if (acaoinimigo === 1){  //ataque fisico
                                let evitabugs = parseInt(ataqueinimigo * 0.25);
                                if (evitabugs <=0){
                                    hp.hpatual -= 1;
                                }
                                else{
                                    hp.hpatual -= parseInt(ataqueinimigo * 0.25);
                                }
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                            else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        let evitabugs = parseInt(forcaqiinimigo * 0.25);
                                        if (evitabugs <=0){
                                            hp.hpatual -= 0;
                                        }
                                        else{
                                            hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.25);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.25);
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.25)
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.25)
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.25)
                                    }
                                    else{  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.25)
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.25)
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.25)
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.25)
                                    }
                                    else{  //triGO-nit
                                        hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.25)
                                    }

                                }
                            }
                        dialogoagora.style.display = "block"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                    else{
                        dialogoagora.innerText = "Aconteceu algum erro..."
                        dialogoagora.style.display = "block"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                               opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                })
                
            
        }

        else if(sedefendeu === true && defesaqi.length>0){
            sedefendeu = false
            dialogoagora.innerText = "Voce se defendeu fisicamente e com magia!"
            dialogoagora.style.display = "block"
            a.input.keyboard.once("keydown-Z",()=>{
                if(defesaqi.includes("parenteseseguro")){
                    dialogoagora.innerText = "Voce se defendeu com PK Parenteseseguro"
                    vidaescudo -=1
                    if (acaoinimigo === 1){  //ataque fisico
                                let evitabugs = parseInt(ataqueinimigo * 0.4);
                                if (evitabugs <=0){
                                    hp.hpatual -= 1;
                                }
                                else{
                                    hp.hpatual -= parseInt(ataqueinimigo * 0.4);
                                }
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                    }
                    else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        let evitabugs = parseInt(forcaqiinimigo * 0.4);
                                        if (evitabugs <=0){
                                            hp.hpatual -= 0;
                                        }
                                        else{
                                            hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.4);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.4);
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.4)
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.4)
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.4)
                                    }
                                    else{  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.4)
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.4)
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.4)
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.4)
                                    }
                                    else{  //triGO-nit
                                        hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.4)
                                    }

                                }
                    }
                    dialogoagora.style.display = "block"
                    a.input.keyboard.once("keydown-Z", ()=>{
                        retangulo.style.display = "none"
                        dialogoagora.style.display = "none"
                        turno = true
                        setTimeout(()=>{
                            opcoes = true
                            dialogo = false
                            batalha(a)
                        },500)
                    })
                }
                if(defesaqi.includes("fracao")){
                    dialogoagora.innerText = "Voce se defendeu com PK Fração"
                    vidaescudo-=1
                    if (acaoinimigo === 1){  //ataque fisico
                                let evitabugs = parseInt(ataqueinimigo * 0.35);
                                if (evitabugs <=0){
                                    hp.hpatual -= 1;
                                }
                                else{
                                    hp.hpatual -= parseInt(ataqueinimigo * 0.35);
                                }
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                    else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        let evitabugs = parseInt(forcaqiinimigo * 0.35);
                                        if (evitabugs <=0){
                                            hp.hpatual -= 0;
                                        }
                                        else{
                                            hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.35);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.35);
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.35)
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.35)
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.35)
                                    }
                                    else{  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.35)
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.35)
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.35)
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.35)
                                    }
                                    else{  //triGO-nit
                                        hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.35)
                                    }

                                }
                    }
                    dialogoagora.style.display = "block"
                    a.input.keyboard.once("keydown-Z", ()=>{
                        retangulo.style.display = "none"
                        dialogoagora.style.display = "none"
                        turno = true
                        setTimeout(()=>{
                            opcoes = true
                            dialogo = false
                            batalha(a)
                        },500)
                    })
                }
                if(defesaqi.includes("divinega")){
                    dialogoagora.innerText = "Voce se defendeu com PK Divi-nega"
                    vidaescudo-=1
                    dialogoagora.style.display = "block"
                    a.input.keyboard.once("keydown-Z",()=>{
                        let chancedezerarataque;
                        if (nivelfacil === true){
                            chancedezerarataque = Math.floor(Math.random()*10)+1

                            if (acaoinimigo === 1){  //ataque fisico
                                if (chancedezerarataque > 1){
                                    hp.hpatual -= parseInt(ataqueinimigo * 0.3);
                                }
                                
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                            else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        if (chancedezerarataque > 1){
                                            hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.3);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        if (chancedezerarataque > 1){
                                            hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.3);
                                        }
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        if (chancedezerarataque > 1){
                                             hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.3)
                                        }
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        if (chancedezerarataque > 1){
                                             hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.3)
                                        }
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        if (chancedezerarataque > 1){
                                          hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.3)
                                        }
                                    }
                                    else{  //fat-orra
                                        if (chancedezerarataque > 1){
                                           hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.3)
                                        }
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        if ( chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.3)
                                        }
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        if (chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.3)
                                        }
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        if (chancedezerarataque > 1){
                                          hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.3)
                                        }
                                    }
                                    else{  //triGO-nit
                                        if (chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.3)
                                        }
                                    }

                                }
                            }

                            if(chancedezerarataque === 1){
                                dialogoagora.innerText = "O dano foi dividido por zero!"
                                divinega = true;
                                dialogoagora.style.display = "block"
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{  
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                            else{
                                dialogoagora.innerText = "O dano nao foi zerado infelizmente"
                                dialogoagora.style.display = "block"
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })

                            }
                        }
                        else{
                            chancedezerarataque = Math.floor(Math.random()*20)+1
                            if(chancedezerarataque === 1){

                                if (acaoinimigo === 1){  //ataque fisico
                                if (chancedezerarataque > 1){
                                    hp.hpatual -= parseInt(ataqueinimigo * 0.3);
                                }
                                
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                            else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        if (chancedezerarataque > 1){
                                            hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.3);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        if (chancedezerarataque > 1){
                                            hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.3);
                                        }
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        if (chancedezerarataque > 1){
                                             hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.3)
                                        }
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        if (chancedezerarataque > 1){
                                             hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.3)
                                        }
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        if (chancedezerarataque > 1){
                                          hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.3)
                                        }
                                    }
                                    else{  //fat-orra
                                        if (chancedezerarataque > 1){
                                           hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.3)
                                        }
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        if ( chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.3)
                                        }
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        if (chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.3)
                                        }
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        if (chancedezerarataque > 1){
                                          hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.3)
                                        }
                                    }
                                    else{  //triGO-nit
                                        if (chancedezerarataque > 1){
                                         hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.3)
                                        }
                                    }

                                }
                            }

                                dialogoagora.innerText = "O dano foi dividido por zero!"
                                dialogoagora.style.display = "block"
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                            else{
                                dialogoagora.innerText = "nao zerou o dano!"
                                dialogoagora.style.display = "block"
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                        }


                        
                    })
                    
                }
                if(defesaqi.includes("contraangulo")){
                    dialogoagora.innerText = "Voce se defendeu com PK Contra-Ângulo"
                    vidaescudo-=1
                    dialogoagora.style.display = "block"
                    a.input.keyboard.once("keydown-Z",()=>{
                        let chancedezerarataque;
                        if (nivelfacil === true){
                            chancedezerarataque = Math.floor(Math.random()*2)+1
                            if(chancedezerarataque === 1){
                                dialogoagora.innerText = "O ataque ricocheteou em um ângulo improvável!"
                                dialogoagora.style.display = "block"
                            }
                        }
                        else{
                            chancedezerarataque = Math.floor(Math.random()*20)+1 
                            if(chancedezerarataque <=7){
                                dialogoagora.innerText = "O ataque ricocheteou em um ângulo improvável!"
                                dialogoagora.style.display = "block"
                            }
                        }

                        if (acaoinimigo === 1){  //ataque fisico
                                hp.hpatual -= parseInt(ataqueinimigo * 0.3);
                                if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                    hpadv -= parseInt((ataqueinimigo * 0.5) * 0.4);
                                }
                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                        else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.3);
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 4) * 0.6) * 0.5);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.3);
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 8) * 0.6) * 0.5);
                                        }
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.3)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 4) * 0.6) * 0.5);
                                        }
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.3)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 8) * 0.6) * 0.5);
                                        }
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.3)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 10) * 0.6) * 0.5);
                                        }
                                    }
                                    else{  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.3)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 20) * 0.6) * 0.5);
                                        }
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.3)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 14) * 0.6) * 0.5);
                                        }
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.3)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 24) * 0.6) * 0.5);
                                        }
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.3)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 44) * 0.6) * 0.5);
                                        }
                                    }
                                    else{  //triGO-nit
                                        hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.3)
                                        if (nivelfacil === true && chancederefletirataque === 1 || nivelfacil === false && chancederefletirataque <=7){
                                            hpadv -= parseInt(((forcaqiinimigo + 74) * 0.6) * 0.5);
                                        }
                                    }

                                }
                        }

                        a.input.keyboard.once("keydown-Z", ()=>{
                        retangulo.style.display = "none"
                        dialogoagora.style.display = "none"
                        turno = true
                        setTimeout(()=>{
                            opcoes = true
                            dialogo = false
                            batalha(a)
                        },500)
                    })
                    })
                }
                if(defesaqi.includes("constante")){
                    dialogoagora.innerText = "Voce se defendeu com PK Constante-C"
                    vidaescudo-=1
                    if (acaoinimigo === 1){  //ataque fisico
                                let danoprevisto = parseInt((forcaqiinimigo + 24) * 0.1)
                                if (danoprevisto <= 0){
                                    hp.hpatual -= 1;
                                } 
                                else{
                                      hp.hpatual -= parseInt(ataqueinimigo * 0.5);
                                }

                                retangulo.style.display = "block"
                                dialogoagora.style.display = "block"
                                sedefendeu = false
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                    else{  //ataqueqi
                                if (forcaqiinimigo<=2){   //pk matemagica
                                    if(escolheataque === 1){
                                        let danoprevisto = parseInt((forcaqiinimigo + 24) * 0.1)
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1;
                                        } 
                                        else{
                                            hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.1);
                                        }
                                    }
                                    else{  //pk arg-gebra
                                        let danoprevisto = parseInt((forcaqiinimigo + 24) * 0.1)
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1
                                        } 
                                        else{
                                            hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.1);
                                        }
                                    }
                                }
                                else if(forcaqiinimigo <2 && forcaqiinimigo<10){
                                    if (escolheataque === 1){  //matemagica
                                        let danoprevisto = parseInt((forcaqiinimigo + 24) * 0.1)
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1;
                                        } 
                                        else{
                                             hp.hpatual -= parseInt((forcaqiinimigo + 4) * 0.1)
                                        }
                                    }
                                    else if(escolheataque === 2){  //argh-gebra
                                        let danoprevisto = parseInt((forcaqiinimigo + 24) * 0.1)
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1;
                                        } 
                                        else{
                                           hp.hpatual -= parseInt((forcaqiinimigo + 8) * 0.1);
                                        }
                                    }
                                    else if(escolheataque === 3){ //pi-râmide
                                        let danoprevisto = parseInt((forcaqiinimigo + 24) * 0.1)
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1;
                                        } 
                                        else {
                                            hp.hpatual -= parseInt((forcaqiinimigo + 10) * 0.1);
                                        }
                                    }
                                    else{  //fat-orra
                                        let danoprevisto = parseInt((forcaqiinimigo + 24) * 0.1);
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1;
                                        } 
                                        else{
                                           hp.hpatual -= parseInt((forcaqiinimigo + 20) * 0.1);
                                        }
                                    }
                                }
                                else{
                                    if (escolheataque === 1){  //pi-ramide
                                        let danoprevisto = parseInt((forcaqiinimigo + 14) * 0.1)
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1
                                        }
                                        else{
                                             hp.hpatual -= parseInt((forcaqiinimigo + 14) * 0.1)
                                        }
                                    }
                                    else if(escolheataque === 2){  //fat-orra
                                        let danoprevisto = parseInt((forcaqiinimigo + 24) * 0.1)
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1
                                        }else{
                                         hp.hpatual -= parseInt((forcaqiinimigo + 24) * 0.1)
                                        }
                                    }
                                    else if(escolheataque === 3){ //logar-dor
                                        let danoprevisto = parseInt((forcaqiinimigo + 44) * 0.1)
                                        if (danoprevisto <= 0){
                                        hp.hpatual -= 1
                                        }
                                        else{
                                           hp.hpatual -= parseInt((forcaqiinimigo + 44) * 0.1)
                                        }
                                    }
                                    else{  //triGO-nit
                                        let danoprevisto = parseInt((forcaqiinimigo + 74) * 0.1)
                                        if (danoprevisto <= 0){
                                            hp.hpatual -= 1
                                        }
                                        else{
                                            hp.hpatual -= parseInt((forcaqiinimigo + 74) * 0.1)
                                        }
                                        
                                    }

                                }
                    }
                    dialogoagora.style.display = "block"
                    a.input.keyboard.once("keydown-Z", ()=>{
                        retangulo.style.display = "none"
                        dialogoagora.style.display = "none"
                        turno = true
                        setTimeout(()=>{
                            opcoes = true
                            dialogo = false
                            batalha(a)
                        },500)
                    })
                }
                else{
                    dialogoagora.innerText = "Aconteceu algum erro..."
                    dialogoagora.style.display = "block"
                    a.input.keyboard.once("keydown-Z", ()=>{
                        retangulo.style.display = "none"
                        dialogoagora.style.display = "none"
                        turno = true
                        setTimeout(()=>{
                            opcoes = true
                            dialogo = false
                            batalha(a)
                        },500)
                    })
                }
            })
            
            
        }
        else{
            a.input.keyboard.once("keydown-Z", ()=>{
                retangulo.style.display = "none"
                dialogoagora.style.display = "none"
                turno = true
                setTimeout(()=>{
                    opcoes = true
                    dialogo = false
                    batalha(a)
                },500)
            })
        }
        
}

    function usarpkmatemagica(){
        magias.style.display = "none";
        retangulo.style.display = "block";

        if (qi.qiatual>=15){
            qi.qiatual -= 15;
            perguntasfeitas++
            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block";
            dialogoagora.innerText = "Você tenta usar PK Matemágica...";
            dialogoagora.style.display = "block";
            responderpergunta.removeEventListener("click", respondermatemagica2);

            function respondermatemagica2(){
                matematicadojogo.style.display = "none";
                let respostadada = document.getElementById("digiteresposta").value;
                if (parseInt(respostadada) === resposta){
                    if(inimigodefendeu === true){
                        hpadv -= 6 * 0.5;
                        inimigodefendeu = false;
                    }
                    else{
                        hpadv -= 6;
                    }
                    dialogoagora.innerText = "Você usou PK Matemágica!";
                    perguntascertas++;
                }
                else{
                    dialogoagora.innerText = "Você não conseguiu usar";
                    perguntaserradas++;
                }
                dialogoagora.style.display = "block";

                a.input.keyboard.once("keydown-Z", ()=>{
                    dialogoagora.style.display = "none";
                    retangulo.style.display = "none";
                    turno = false;
                    pkmatematica.removeEventListener("click", usarpkmatemagica);
                    responderpergunta.removeEventListener("click", respondermatemagica2);
                    setTimeout(()=>{
                        dialogo = false;
                        batalha(a);
                    }, 500);
                });
            }
            responderpergunta.removeEventListener("click", respondermatemagica2);
            responderpergunta.addEventListener("click", respondermatemagica2);

        }
        else{
            dialogoagora.innerText = "Você não tem QI suficiente!";
            dialogoagora.style.display = "block";
            a.input.keyboard.once("keydown-Z", ()=>{
                dialogoagora.style.display = "none";
                retangulo.style.display = "none";
                turno = false;
                pkmatematica.removeEventListener("click", usarpkmatemagica);
                setTimeout(()=>{
                    dialogo = false;
                    batalha(a);
                }, 500);
            });
        }
    }


    function usarpkalgebra(){
        magias.style.display = "none"
        retangulo.style.display = "block"

        if (qi.qiatual >= 10){  
            qi.qiatual -= 10;
            perguntasfeitas++
            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block";
            dialogoagora.innerText = "Você tenta usar PK Argh-gebra...";
            dialogoagora.style.display = "block";
            responderpergunta.removeEventListener("click", responderalgebra2);

            function responderalgebra2(){
                matematicadojogo.style.display = "none";
                let respostadada = document.getElementById("digiteresposta").value;

                if (parseInt(respostadada) === resposta){
                    if(inimigodefendeu === true){
                        hpadv -= 9 * 0.5;
                        inimigodefendeu = false;
                    }
                    else{
                        hpadv -= 9;
                    }
                    dialogoagora.innerText = "Você usou PK Argh-gebra!";
                    perguntascertas++;
                }
                else{
                    dialogoagora.innerText = "Você não conseguiu usar";
                    perguntaserradas++;
                }
                dialogoagora.style.display = "block";

                a.input.keyboard.once("keydown", ()=>{
                    dialogoagora.style.display = "none";
                    retangulo.style.display = "none";
                    turno = false;
                    pkalgebra.removeEventListener("click", usarpkalgebra);
                    responderpergunta.removeEventListener("click", responderalgebra2);
                    setTimeout(()=>{
                        dialogo = false;
                        batalha(a);
                    }, 500);
                });
            }
            responderpergunta.removeEventListener("click", responderalgebra2);
            responderpergunta.addEventListener("click", responderalgebra2);

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!";
            dialogoagora.style.display = "block";
            a.input.keyboard.once("keydown", ()=>{
                dialogoagora.style.display = "none";
                retangulo.style.display = "none";
                turno = false;
                pkalgebra.removeEventListener("click", usarpkalgebra);
                setTimeout(()=>{
                    dialogo = false;
                    batalha(a);
                }, 500);
            });
        }
    }

    function usarpkparenteseseguro(){
        magias.style.display = "none"
        retangulo.style.display = "block"

        if (qi.qiatual >= 15){
            qi.qiatual -= 15;
            perguntasfeitas++

            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
    }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block";
            dialogoagora.innerText = "Você tenta usar PK Parênteseseguro...";
            dialogoagora.style.display = "block";
            responderpergunta.removeEventListener("click", responderparenteseseguro);

            function responderparenteseseguro(){
                matematicadojogo.style.display = "none";
                let respostadada = document.getElementById("digiteresposta").value;

                if (parseInt(respostadada) === resposta){
                    defesaqi = ["parenteseseguro"];
                    vidaescudo = 3;
                    usoudefesaqi = true;
                    if(inimigodefendeu === true){
                        inimigodefendeu = false;
                    }
                    dialogoagora.innerText = "Você usou PK Parênteseseguro!";
                    perguntascertas += 1;
                }
                else{
                    dialogoagora.innerText = "Você não conseguiu usar!";
                    perguntaserradas += 1;
                }
                dialogoagora.style.display = "block";

                a.input.keyboard.once("keydown", ()=>{
                    dialogoagora.style.display = "none";
                    retangulo.style.display = "none";
                    turno = false;
                    pkparenteses.removeEventListener("click", usarpkparenteseseguro);
                    responderpergunta.removeEventListener("click", responderparenteseseguro);
                    setTimeout(()=>{
                        dialogo = false;
                        batalha(a);
                    }, 500);
                });
            }
            responderpergunta.removeEventListener("click", responderparenteseseguro);
            responderpergunta.addEventListener("click", responderparenteseseguro);

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!";
            dialogoagora.style.display = "block";
            a.input.keyboard.once("keydown", ()=>{
                dialogoagora.style.display = "none";
                retangulo.style.display = "none";
                turno = false;
                pkparenteses.removeEventListener("click", usarpkparenteseseguro);
                setTimeout(()=>{
                    dialogo = false;
                    batalha(a);
                }, 500);
            });
        }
    }

    function usarpksoma(){ //cura 10hp
        magias.style.display = "none"
        retangulo.style.display = "block"
        dialogoagora.innerText = "Você tenta usar PK Soma..."
        dialogoagora.style.display = "block"

        if (qi.qiatual >= 20){
            qi.qiatual -= 20
            perguntasfeitas++
            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block";

            
            responderpergunta.removeEventListener("click", respondersoma);

            function respondersoma(){
                matematicadojogo.style.display = "none";
                let respostadada = document.getElementById("digiteresposta").value;

                if (parseInt(respostadada) === resposta){
                    hp.hpatual += 10;
                    if ( hp.hpatual >= hpmaximo){
                            hp.hpatual = hpmaximo
                    }
                    dialogoagora.innerText = "Você usou PK Soma!";
                    perguntascertas += 1;
                }
                else{
                    dialogoagora.innerText = "Você não conseguiu usar!";
                    perguntaserradas += 1;
                }
                dialogoagora.style.display = "block";

                a.input.keyboard.once("keydown", ()=>{
                    dialogoagora.style.display = "none";
                    retangulo.style.display = "none";
                    turno = false;
                    pksoma.removeEventListener("click", usarpksoma);
                    responderpergunta.removeEventListener("click", respondersoma);
                    setTimeout(()=>{
                        dialogo = false;
                        batalha(a);
                    }, 500);
                });
            }
            responderpergunta.removeEventListener("click", respondersoma);
            responderpergunta.addEventListener("click", respondersoma);

        } 
        else {
            dialogoagora.innerText = "Você não tem QI suficiente!";
            dialogoagora.style.display = "block";
            a.input.keyboard.once("keydown", ()=>{
                dialogoagora.style.display = "none";
                retangulo.style.display = "none";
                turno = false;
                pksoma.removeEventListener("click", usarpksoma);
                setTimeout(()=>{
                    dialogo = false;
                    batalha(a);
                }, 500);
            });
        }
    }

    function usarpkpiramide(){  // ofensivo
        magias.style.display = "none";
        retangulo.style.display = "block";

        if (qi.qiatual >= 40){
            perguntasfeitas++
            qi.qiatual -= 40;
            dialogoagora.innerText = "Você tenta usar PK Pi-râmide!";
            dialogoagora.style.display = "block";

            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block";

           
            responderpergunta.removeEventListener("click", responderpiramide);

            function responderpiramide(){
                matematicadojogo.style.display = "none";
                let respostadada = document.getElementById("digiteresposta").value;

                if (parseInt(respostadada) === resposta){
                    if(inimigodefendeu === true){
                        hpadv -= 22 * 0.5;
                        inimigodefendeu = false;
                    }
                    else{
                        hpadv -= 22;
                    }
                    dialogoagora.innerText = "Você usou PK Pi-râmide!";
                    perguntascertas += 1;
                }
                else{
                    dialogoagora.innerText = "Você não conseguiu usar";
                    perguntaserradas += 1;
                }
                dialogoagora.style.display = "block";

                a.input.keyboard.once("keydown", ()=>{
                    dialogoagora.style.display = "none";
                    retangulo.style.display = "none";
                    turno = false;
                    pkpiramide.removeEventListener("click", usarpkpiramide);
                    responderpergunta.removeEventListener("click", responderpiramide);
                    setTimeout(()=>{
                        dialogo = false;
                        batalha(a);
                    }, 500);
                });
            }

            responderpergunta.addEventListener("click", responderpiramide);

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!";
            dialogoagora.style.display = "block";
            a.input.keyboard.once("keydown", ()=>{
                dialogoagora.style.display = "none";
                retangulo.style.display = "none";
                turno = false;
                pkpiramide.removeEventListener("click", usarpkpiramide);
                setTimeout(()=>{
                    dialogo = false;
                    batalha(a);
                }, 500);
            });
        }
    }

    function usarpkfracao() { // defesa
        magias.style.display = "none";
        retangulo.style.display = "block";

        if (qi.qiatual >= 30) {
            qi.qiatual -= 30;
            perguntasfeitas++
            dialogoagora.innerText = "Você tenta usar PK Fração!";
            dialogoagora.style.display = "block";

            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 50)+ 1
                    numero2 = Math.floor(Math.random() * 60)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block";
            responderpergunta.removeEventListener("click", responderfracao);
            responderpergunta.addEventListener("click", responderfracao);

            function responderfracao() {
                matematicadojogo.style.display = "none";
                let respostadada = document.getElementById("digiteresposta").value;

                if (respostadada == resposta) {
                    vidaescudo = 6;
                    defesaqi = ["fracao"];
                    usoudefesaqi = true;
                    dialogoagora.innerText = "Você usou PK Fração!";
                    perguntascertas += 1;
                } 
                else {
                    dialogoagora.innerText = "Você não conseguiu usar!";
                    perguntaserradas += 1;     
                }

                if (inimigodefendeu === true) {
                    inimigodefendeu = false;
                }

                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown", () => {
                    dialogoagora.style.display = "none";
                    retangulo.style.display = "none";
                    turno = false;
                    pkfracao.removeEventListener("click", usarpkfracao);
                    responderpergunta.removeEventListener("click", responderfracao); // remove listener
                    setTimeout(() => {
                        dialogo = false;
                        batalha(a);
                    }, 500);
                });
            }
        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!";
            dialogoagora.style.display = "block";

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none";
                retangulo.style.display = "none";
                turno = false;
                pkfracao.removeEventListener("click", usarpkfracao);
                setTimeout(() => {
                    dialogo = false;
                    batalha(a);
                }, 500);
            });
        }
    }

    function usarpkmediaboa() {  //cura
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você tenta usar PK Media Boa...";
        dialogoagora.style.display = "block";

        if (qi.qiatual >= 35) {
            qi.qiatual -= 35;
            perguntasfeitas++

          
            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block";

          
            responderpergunta.removeEventListener("click", respondermediaboa);
            responderpergunta.addEventListener("click", respondermediaboa);

            function respondermediaboa() {
                matematicadojogo.style.display = "none";
                let respostadada = document.getElementById("digiteresposta").value;

                if (respostadada == resposta) {
                    hp.hpatual += 40;
                    if ( hp.hpatual >= hpmaximo){
                        hp.hpatual = hpmaximo
                    }
            
                    dialogoagora.innerText = "Você usou PK Media Boa!";
                    perguntascertas += 1;
                } else {
                    dialogoagora.innerText = "Você não conseguiu usar!";
                    perguntaserradas += 1;
                }

                a.input.keyboard.once("keydown-Z", () => {
                    dialogoagora.style.display = "none";
                    retangulo.style.display = "none";
                    turno = false;
                    pkmediaboa.removeEventListener("click", usarpkmediaboa);
                    responderpergunta.removeEventListener("click", respondermediaboa);

                    setTimeout(() => {
                        dialogo = false;
                        batalha(a);
                    }, 500);
                });
            }
        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!";
            dialogoagora.style.display = "block";

            a.input.keyboard.once("keydown-Z", () => {
                dialogoagora.style.display = "none";
                retangulo.style.display = "none";
                turno = false;
                pkmediaboa.removeEventListener("click", usarpkmediaboa);

                setTimeout(() => {
                    dialogo = false;
                    batalha(a);
                }, 500);
            });
        }
    }


    function usarpkzeratudo() { // para os efeitos negativos
        if (inimigodefendeu === true) {
            inimigodefendeu = false;
        }
        magias.style.display = "none"

        dialogoagora.innerText = "Essa magia não foi programada...";
        retangulo.style.display = "block";
        dialogoagora.style.display = "block";

        a.input.keyboard.once("keydown", () => {
            dialogoagora.style.display = "none";
            retangulo.style.display = "none";
            turno = false;
            pkzeratudo.removeEventListener("click", usarpkzeratudo);

            setTimeout(() => {
                dialogo = false;
                batalha(a);
            }, 500);
        });
    }

    function usarpkfatora() {   // ofensiva
        magias.style.display = "none"
        retangulo.style.display = "block"

        if (qi.qiatual >= 50) {
            qi.qiatual -= 50
            perguntasfeitas++
            responderpergunta.removeEventListener("click", responderfatora)
            responderpergunta.addEventListener("click", responderfatora)
            dialogoagora.innerText = "Você tenta usar PK Fat-orra!"
            dialogoagora.style.display = "block"
            if ( nivelfacil === true){
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1 ){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block"

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!"
            dialogoagora.style.display = "block"
            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                pkfatora.removeEventListener("click", usarpkfatora)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }

   
        function responderfatora() {
            matematicadojogo.style.display = "none"
            let respostadada = document.getElementById("digiteresposta").value

            if (respostadada == resposta) {
                if (inimigodefendeu === true) {
                    hpadv -= 30 * 0.5
                    inimigodefendeu = false
                } else {
                    hpadv -= 30
                }
                dialogoagora.innerText = "Você usou PK Fat-orra!"
                perguntascertas += 1
            } else {
                dialogoagora.innerText = "Você não conseguiu usar"
                perguntaserradas += 1
            }

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                responderpergunta.removeEventListener("click", responderfatora)
                pkfatora.removeEventListener("click", usarpkfatora)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }
    }



    function usarpkdivinega() {  // defesa
        magias.style.display = "none"
        retangulo.style.display = "block"

        if (qi.qiatual >= 35) {
            qi.qiatual -= 35
            perguntasfeitas++

        
            responderpergunta.removeEventListener("click", responderdivinega)


            responderpergunta.addEventListener("click", responderdivinega)

            dialogoagora.innerText = "Você tenta usar PK Divi-nega!"
            dialogoagora.style.display = "block"

            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block"

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!"
            dialogoagora.style.display = "block"
            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                pkdivinega.removeEventListener("click", usarpkdivinega)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }

    
        function responderdivinega() {
            matematicadojogo.style.display = "none"
            let respostadada = document.getElementById("digiteresposta").value

            if (respostadada == resposta) {
                defesaqi = ["divinega"]
                vidaescudo = 15
                usoudefesaqi = true
                if (inimigodefendeu === true) {
                    inimigodefendeu = false
                }
                dialogoagora.innerText = "Você usou PK Divi-nega!"
                perguntascertas += 1
            } else {
                dialogoagora.innerText = "Você não conseguiu usar!"
                perguntaserradas += 1
            }

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                responderpergunta.removeEventListener("click", responderdivinega)
                pkdivinega.removeEventListener("click", usarpkdivinega)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }
    }

    function usarpkarredondoi() {  // cura
        magias.style.display = "none"
        retangulo.style.display = "block"

        if (qi.qiatual >= 20) {
            qi.qiatual -= 20
            perguntasfeitas++
            responderpergunta.removeEventListener("click", responderarredondoi)
            responderpergunta.addEventListener("click", responderarredondoi)

            dialogoagora.innerText = "Você tenta usar PK Arredon-dói"
            dialogoagora.style.display = "block"
            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block"

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!"
            dialogoagora.style.display = "block"
            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                pkarredondar.removeEventListener("click", usarpkarredondoi)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }

        
        function responderarredondoi() {
            matematicadojogo.style.display = "none"
            let respostadada = document.getElementById("digiteresposta").value

            if (respostadada == resposta) {
                let vidarecuperada
                vidarecuperada = Math.floor(Math.random() * 70) + 1
                hp.hpatual += vidarecuperada
                if ( hp.hpatual >= hpmaximo){
                    hp.hpatual = hpmaximo
                }

                if (inimigodefendeu === true) {
                    inimigodefendeu = false
                }

                dialogoagora.innerText = "Você usou PK Arredon-dói"
                perguntascertas += 1
            } else {
                dialogoagora.innerText = "Você não conseguiu usar!"
                perguntaserradas += 1
            }

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                responderpergunta.removeEventListener("click", responderarredondoi)
                pkarredondar.removeEventListener("click", usarpkarredondoi)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }
    }


    function usarpklogardor() {  // ofensiva
        magias.style.display = "none"
        retangulo.style.display = "block"

        if (qi.qiatual >= 65) {
            qi.qiatual -= 65
            perguntasfeitas++

            responderpergunta.removeEventListener("click", responderlogardor)
            responderpergunta.addEventListener("click", responderlogardor)

            // gerar pergunta matemática
            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
    }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block"
            dialogoagora.style.display = "block"

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!"
            dialogoagora.style.display = "block"
            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                pklogaritmo.removeEventListener("click", usarpklogardor)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }

        function responderlogardor() {
            matematicadojogo.style.display = "none"
            let respostadada = document.getElementById("digiteresposta").value

            if (respostadada == resposta) {
                if (inimigodefendeu === true) {
                    hpadv -= 65 * 0.5
                    inimigodefendeu = false
                } else {
                    hpadv -= 65
                }
                dialogoagora.innerText = "Você usou PK Logar-dor"
                perguntascertas += 1
            } else {
                dialogoagora.innerText = "Você não conseguiu usar"
                perguntaserradas += 1
            }

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                responderpergunta.removeEventListener("click", responderlogardor)
                pklogaritmo.removeEventListener("click", usarpklogardor)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }
    }


    function usarpkcontraangulo() { // defesa
        magias.style.display = "none"
        retangulo.style.display = "block"

        if (qi.qiatual >= 40) {
            qi.qiatual -= 40
            perguntasfeitas++

            responderpergunta.removeEventListener("click", respondercontraangulo)
            responderpergunta.addEventListener("click", respondercontraangulo)

            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block"
            dialogoagora.style.display = "block"

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!"
            dialogoagora.style.display = "block"
            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                pkcontraangulo.removeEventListener("click", usarpkcontraangulo)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }

        function respondercontraangulo() {
            matematicadojogo.style.display = "none"
            let respostadada = document.getElementById("digiteresposta").value

            if (respostadada == resposta) {
                defesaqi = ["contraangulo"]
                vidaescudo = 20
                usoudefesaqi = true
                if (inimigodefendeu === true) {
                    inimigodefendeu = false
                }
                dialogoagora.innerText = "Você usou PK Contra-Ângulo"
                perguntascertas += 1
            } else {
                dialogoagora.innerText = "Você não conseguiu usar!"
                perguntaserradas += 1
            }

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                responderpergunta.removeEventListener("click", respondercontraangulo)
                pkcontraangulo.removeEventListener("click", usarpkcontraangulo)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }
    }


    function usarpklimite() { // cura
        magias.style.display = "none"
        retangulo.style.display = "block"
        dialogoagora.style.display = "block"

        if (qi.qiatual >= 70) {
            qi.qiatual -= 70
            perguntasfeitas++

            responderpergunta.removeEventListener("click", responderlimite)
            responderpergunta.addEventListener("click", responderlimite)

            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1 ){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block"

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!"
            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                pklimite.removeEventListener("click", usarpklimite)
                setTimeout(() => {
                  
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }

        function responderlimite() {
            matematicadojogo.style.display = "none"
            let respostadada = document.getElementById("digiteresposta").value

            if (respostadada == resposta) {
                hp.hpatual += 100
                if ( hp.hpatual >= hpmaximo){
                            hp.hpatual = hpmaximo
                    }else{
                        hp.hpatual += 10;
                    }
                dialogoagora.innerText = "Você usou PK Limite"
                perguntascertas += 1
            } else {
                dialogoagora.innerText = "você não conseguiu usar!"
                perguntaserradas += 1
            }

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                responderpergunta.removeEventListener("click", responderlimite)
                pklimite.removeEventListener("click", usarpklimite)
                setTimeout(() => {
                
                    dialogo = false
                    batalha(a)
                }, 500)
            })

            if (inimigodefendeu === true) {
                inimigodefendeu = false
            }
        }
    }

    function usarpktrigonito() { // ataque
        magias.style.display = "none"
        retangulo.style.display = "block"
        dialogoagora.style.display = "block"
        

        if (qi.qiatual >= 80) {
            qi.qiatual -= 80
            perguntasfeitas++
            dialogoagora.innerText = "Você tenta usar PK TriGO-nito..."
            

            responderpergunta.removeEventListener("click", respondertrigonito)
            responderpergunta.addEventListener("click", respondertrigonito)

            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1 ){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else if (contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 50) + 1
                    numero2 = Math.floor(Math.random() * 65) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            matematicadojogo.style.display = "block"

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!"
            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                pktrigonometria.removeEventListener("click", usarpktrigonito)
                setTimeout(() => {
                   
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }

        function respondertrigonito() {
            matematicadojogo.style.display = "none"
            let respostadada = document.getElementById("digiteresposta").value

            if (respostadada == resposta) {
                if (inimigodefendeu === true) {
                    hpadv -= 80 * 0.5
                    inimigodefendeu = false
                } else {
                    hpadv -= 80
                }
                dialogoagora.innerText = "Você usou PK TriGO-nito"
                perguntascertas += 1
            } else {
                dialogoagora.innerText = "Você não conseguiu usar"
                perguntaserradas += 1
            }

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                responderpergunta.removeEventListener("click", respondertrigonito)
                pktrigonometria.removeEventListener("click", usarpktrigonito)
                setTimeout(() => {
                  
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }
    }

    function usarpkconstante() { // defesa
        magias.style.display = "none"
        retangulo.style.display = "block"
        

        if (qi.qiatual >= 70) {
            qi.qiatual -= 70
            perguntasfeitas++
            retangulo.style.display = "block"
            dialogoagora.innerText = "Você tenta usar PK Constante-C..."
            dialogoagora.style.display = "block"

            responderpergunta.removeEventListener("click", responderconstante)
            responderpergunta.addEventListener("click", responderconstante)

            if ( nivelfacil === true){
                
                contas = Math.floor(Math.random() * 3) + 1;
                
                
                if (contas === 1 || contas === 2){
                    numero1 = Math.floor(Math.random() * 12) + 1
                    numero2 = Math.floor(Math.random() * 12) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 20)+ 1
                    numero2 = Math.floor(Math.random() * 10)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
                }
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }

                }
            }
            else{
                contas = Math.floor(Math.random() * 4) + 1;
                
                
                if (contas === 1 || contas === 2 || contas === 4){
                    numero1 = Math.floor(Math.random() * 120) + 1
                    numero2 = Math.floor(Math.random() * 120) + 1
                }
                else{
                    numero1 = Math.floor(Math.random() * 50)+ 1
                    numero2 = Math.floor(Math.random() * 65)+ 1
                }
                if (contas === 1){ // contas de +
                    resposta = parseInt(numero1 + numero2);
                }
                else if (contas === 2){ // contas de X
                    resposta = parseInt(numero1 * numero2);
                }
                else if (contas === 3){// contas de /
                    while(true){
                        if (numero1 % numero2 === 0){
                            break
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 120)+ 1
                            numero2 = Math.floor(Math.random() * 120)+ 1
                        }
                    }
                    resposta = parseInt(numero1 / numero2);
                }
                else{
                    resposta = parseInt(numero1 + (numero2 + numero1) );
                }

                if (anuloucontas === true){
                    pergunta.innerText = `A resposta é ${resposta}`
                    contador -= 1;
                    if (contador <= 0){
                        anuloucontas = false;
                    }
}
                else{
                    if (contas === 1){
                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                    }
                    else if (contas === 2){
                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                    }
                    else if (contas === 3){
                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                    }
                    else{
                        pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                    }

                }
            }

            

            matematicadojogo.style.display = "block"

        } else {
            dialogoagora.innerText = "Você não tem QI suficiente!"
            dialogoagora.style.display = "block"
            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                pkconstante.removeEventListener("click", usarpkconstante)
                setTimeout(() => {
              
                    dialogo = false
                    batalha(a)
                
                }, 500)
            })
            }
        }


        function responderconstante() {
            matematicadojogo.style.display = "none"
            let respostadada = document.getElementById("digiteresposta").value

            if (respostadada == resposta) {
                defesaqi = ["constante"]
                vidaescudo = 35
                usoudefesaqi = true
                if (inimigodefendeu === true) {
                    inimigodefendeu = false
                }
                dialogoagora.innerText = "Você usou PK Constante-C"
                perguntascertas += 1
            } else {
                dialogoagora.innerText = "Você não usou PK Constante-C"
                perguntaserradas += 1
            }
            retangulo.style.display = "block"
            dialogoagora.style.display = "block"

            a.input.keyboard.once("keydown", () => {
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                turno = false
                responderpergunta.removeEventListener("click", responderconstante)
                pkconstante.removeEventListener("click", usarpkconstante)
                setTimeout(() => {
                    dialogo = false
                    batalha(a)
                }, 500)
            })
        }
        function moveamagia(){
            if(pagina1 === true){
                pagina1 = false
                pagina2 = true
                pagina3 = false
                pagina4 = false
                pkmatematica.style.display = "none"
                pkalgebra.style.display = "none"
                pkparenteses.style.display = "none"
                pksoma.style.display = "none"
                if(nivel.nivelatual>=5){
                    pkpiramide.style.display = "block"
                }
                if(nivel.nivelatual>=6){
                    pkfracao.style.display = "block"
                }
                if(nivel.nivelatual>=7){
                    pkmediaboa.style.display = "block"
                }
                if(nivel.nivelatual>=8){
                    pkzeratudo.style.display = "block"
                }
                pkfatora.style.display = "none"
                pkdivinega.style.display = "none"
                pkarredondar.style.display = "none"
                pklogaritmo.style.display = "none"
                pkcontraangulo.style.display = "none"
                pklimite.style.display = "none"
                pktrigonometria.style.display = "none"
                pkconstante.style.display = "none"

            }
            else if(pagina2 === true && nivel.nivelatual<9){
                pagina1 = true
                pagina2 = false
                pagina3 = false
                pagina4 = false
                pkmatematica.style.display = "block"
                pkalgebra.style.display = "block"
                pkparenteses.style.display = "block"
                pksoma.style.display = "block"  
                pkpiramide.style.display = "none"
                pkfracao.style.display = "none"
                pkmediaboa.style.display = "none"   
                pkzeratudo.style.display = "none" 
                pkfatora.style.display = "none"                      
                pkdivinega.style.display = "none"                                 
                pkarredondar.style.display = "none"                                  
                pklogaritmo.style.display = "none"               
                pkcontraangulo.style.display = "none"
                pklimite.style.display = "none"
                pktrigonometria.style.display = "none"
                pkconstante.style.display = "none"
            }
            else if(pagina2 === true && nivel.nivelatual>=9){
                pagina1 = false
                pagina2 = false
                pagina3 = true
                pagina4 = false
                pkmatematica.style.display = "none"
                pkalgebra.style.display = "none"
                pkparenteses.style.display = "none"
                pksoma.style.display = "none"  
                pkpiramide.style.display = "none"
                pkfracao.style.display = "none"
                pkmediaboa.style.display = "none"   
                pkzeratudo.style.display = "none" 
                if (nivel.nivelatual>=9) {
                    pkfatora.style.display = "block"
                } 
                if(nivel.nivelatual>=10){
                    pkdivinega.style.display = "block"
                }     
                if (nivel.nivelatual>=11) {
                    pkarredondar.style.display = "block"
                }    
                if (nivel.nivelatual>=13){
                    pklogaritmo.style.display = "block"
                }
                pkcontraangulo.style.display = "none"
                pklimite.style.display = "none"
                pktrigonometria.style.display = "none"
                pkconstante.style.display = "none"

            }
            else if(pagina3 === true && nivel.nivelatual< 14){
                pagina1 = true
                pagina2 = false
                pagina3 = false
                pagina4 = false
                pkmatematica.style.display = "block"
                pkalgebra.style.display = "block"
                pkparenteses.style.display = "block"
                pksoma.style.display = "block"  
                pkpiramide.style.display = "none"
                pkfracao.style.display = "none"
                pkmediaboa.style.display = "none"   
                pkzeratudo.style.display = "none" 
                pkfatora.style.display = "none"                      
                pkdivinega.style.display = "none"                                 
                pkarredondar.style.display = "none"                                  
                pklogaritmo.style.display = "none"               
                pkcontraangulo.style.display = "none"
                pklimite.style.display = "none"
                pktrigonometria.style.display = "none"
                pkconstante.style.display = "none"
            }
            else if(pagina3 === true && nivel.nivelatual>=14){
                pagina1 = false
                pagina2 = false
                pagina3 = false
                pagina4 = true
                pkmatematica.style.display = "none"
                pkalgebra.style.display = "none"
                pkparenteses.style.display = "none"
                pksoma.style.display = "none"  
                pkpiramide.style.display = "none"
                pkfracao.style.display = "none"
                pkmediaboa.style.display = "none"   
                pkzeratudo.style.display = "none" 
                pkfatora.style.display = "none"                      
                pkdivinega.style.display = "none"                                 
                pkarredondar.style.display = "none" 
                pklogaritmo.style.display = "none"
                if (nivel.nivelatual>=14){
                   pkcontraangulo.style.display = "block" 
                }       
                if(nivel.nivelatual>=16){
                    pklimite.style.display = "block"
                }
                if(nivel.nivelatual>=17){
                    pktrigonometria.style.display = "block"
                }
                if(nivel.nivelatual>=18){
                    pkconstante.style.display = "block"
                }             
            }
            else if(pagina4 === true){
                pagina1 = true
                pagina2 = false
                pagina3 = false
                pagina4 = false
                pkmatematica.style.display = "block"
                pkalgebra.style.display = "block"
                pkparenteses.style.display = "block"
                pksoma.style.display = "block"  
                pkpiramide.style.display = "none"
                pkfracao.style.display = "none"
                pkmediaboa.style.display = "none"   
                pkzeratudo.style.display = "none" 
                pkfatora.style.display = "none"                      
                pkdivinega.style.display = "none"                                 
                pkarredondar.style.display = "none"                                  
                pklogaritmo.style.display = "none"               
                pkcontraangulo.style.display = "none"
                pklimite.style.display = "none"
                pktrigonometria.style.display = "none"
                pkconstante.style.display = "none"
            }
        }

    


    function movimentosetinha(event) {  //funcao com todos os movimentos da seta
        if (dialogo === true) { // caso o dialogo estiver acontecendo, vc nao consegue mover a setinha
            return;
        }

        if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") { //movimento para baixo
            if (opcoes === true){
                if (yseta === 32) {
                    yseta = 78;
                 } //se o y da seta esta em 32, ele vai para 78
                else if (yseta === 47) { // se o y da seta esta em 47, nao da para mover para baixo(nesse y a seta esta no "fugir", e como n tem nenhum elemento em cima ou embaixo dele, a seta nao move.)
                    return;
                }
                else {// se o y seta nao estiver em nenhum desses lugares anteriores, entao ele volta para 32
                    yseta = 32;
                }
            }
            
            else { //movimentos da setinha nos itens
                if(yseta === 32 && xseta === 25 && bens.length >=2){
                    yseta = 78
                }
                else if(yseta === 78 && xseta === 25 ){
                    yseta = 32
                }
                else if(yseta ===32 && xseta === 125 && bens.length >=4){
                    yseta = 78
                }
                else if(yseta === 78 && xseta === 125){
                    yseta = 32
                }
                else if(yseta === 32 && xseta === 225 && bens.length >= 6 ){
                    yseta = 78
                }
                else if( yseta === 78 && xseta === 225){
                    yseta = 32
                }
                else if(yseta === 32 && xseta === 325 && bens.length >=8){
                    yseta = 78
                }
                else if(yseta === 78 && xseta === 325){
                    yseta = 32
                }
                else{
                    return
                }
            }
            seta.style.marginTop = yseta + "px"; //atribundo os valores para o css
        } 
        else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") { //movimento para cima
            if (opcoes === true){
                if (yseta === 32) {   //IDEM
                    yseta = 78;
                }
                else if (yseta === 47) {
                    return;
                }
                else {
                    yseta = 32;
                }
            }
           

            else { //itens
                if(yseta === 32 && xseta === 25 && bens.length >=2){
                    yseta = 78
                }
                else if(yseta === 78 && xseta === 25 ){
                    yseta = 32
                }
                else if(yseta ===32 && xseta === 125 && bens.length >=4){
                    yseta = 78
                }
                else if(yseta === 78 && xseta === 125){
                    yseta = 32
                }
                else if(yseta === 32 && xseta === 225 && bens.length >= 6 ){
                    yseta = 78
                }
                else if( yseta === 78 && xseta === 225){
                    yseta = 32
                }
                else if(yseta === 32 && xseta === 325 && bens.length >=8){
                    yseta = 78
                }
                else if(yseta === 78 && xseta === 325){
                    yseta = 32
                }
                else{
                    return
                }
                }
            seta.style.marginTop = yseta + "px";
        } 
        else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
            if (opcoes === true){
                if (xseta === 25) {
                    xseta = 155;
                }
                else if (xseta === 155) {
                    yseta = 47;
                    xseta = 330;
                } 
                else {
                    xseta = 25;
                    yseta = 32;
                }
            }
            
            else{ //itens
                if (xseta === 25 && yseta === 32 && bens.length>=3){
                    xseta = 125             //ir de 100 em 100   
                }
                else if( xseta ===25 && 78 && bens.length >=4){
                    xseta = 125
                }

                else if(xseta === 125 && yseta === 32 && bens.length< 5){
                    xseta = 25
                }
                else if(xseta === 125 && yseta ===78 && bens.length < 6){
                    xseta = 25
                }

                else if(xseta === 125 && yseta === 32 && bens.length>= 5){
                    xseta = 225
                }
                else if(xseta === 125 && yseta ===78 && bens.length >= 6){
                    xseta= 225
                }
                else if(xseta === 225 && yseta == 32 && bens.length < 7){
                    xseta = 25
                }

                else if(xseta === 225 && yseta == 78 && bens.length < 8){
                    xseta = 25
                }
                
                else if(xseta === 225 && yseta == 32 && bens.length >= 7){
                    xseta = 325
                }
                else if(xseta === 225 && yseta == 78 && bens.length >= 8){
                    xseta = 325 
                }
                else if(xseta === 325){
                    xseta = 25
                }
                else{
                    return
                }
            }
            seta.style.marginLeft = xseta + "px";
            seta.style.marginTop = yseta + "px";
        } 
        else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") { //para a esquerda
            if (opcoes === true){
                if (xseta === 25) { //se o x da seta for 25(nesse x, ela ta no ataque, entao ela vai para o fugir), o x e o y mudam para os valores abaixo
                    xseta = 330;
                    yseta = 47;
                } 
                else if (xseta === 330) { // se o x da seta for 330, ou seja, a seta esta no "fugir", ela vai para o elemento a esquerda
                    xseta = 155;1
                    yseta = 78;
                } 
                else {
                    xseta = 25; // se a seta n esta em nenhum desses, ela volta para 25.
                }
            }
            
            else{ //itens
                if(xseta === 25 && yseta === 32 && bens.length >=7){
                    xseta = 325
                }
                else if( xseta === 25 && yseta === 78 && bens.length >=8){
                    xseta = 325
                }
                else if(xseta === 25 && yseta === 32 && bens.length ===5){
                    xseta = 225
                }
                else if(xseta === 25 && yseta === 78 && bens.length ===6){
                    xseta = 225
                }
                else if(xseta === 25 && yseta === 32 && bens.length ===3){
                    xseta= 125
                }
                else if(xseta === 25 && yseta === 78 && bens.length ===4){
                    xseta = 125
                }
                else if(xseta ===125 ){
                    xseta = 25
                }
                else if( xseta === 225){
                    xseta = 125
                }
                else if(xseta ===325){
                    xseta = 225
                }
                else{
                    return
                }
            }
            seta.style.marginLeft = xseta + "px";//atribuindo os valores de x para o css
            seta.style.marginTop = yseta + "px";//atribuindo os valores de y
        }
    }

    window.removeEventListener("keydown", movimentosetinha); // o listener é removido para nao haver sobreposicao de varios listeners e bugar
    window.addEventListener("keydown", movimentosetinha);// um novo listener é c




    function acoes(event){
        if ((event.key === "Z" || event.key === "z")  && dialogo === false){
            if (xseta === 25 && yseta === 32 && abriuitens === false && opcoes === true) {
                opcoes = false;
                dialogo = true;
                retangulo.style.display = "block";
                let chanceerrar;
                if (nivelfacil === true) {
                    chanceerrar = Math.floor(Math.random() * 20) + 1;
                    if (chanceerrar === 1) {
                        if (inimigodefendeu === true) {
                            inimigodefendeu = false;
                        }
                        dialogoagora.innerText = "Você errou...";
                        retangulo.style.display = "block";
                        dialogoagora.style.display = "block";
                        a.input.keyboard.once("keydown-Z", () => {
                            dialogoagora.innerText = voceerrou;
                            retangulo.style.display = "block";
                            dialogoagora.style.display = "block";
                            a.input.keyboard.once("keydown-Z", () => {
                                dialogoagora.style.display = "none";
                                retangulo.style.display = "none";
                                turno = false;
                                setTimeout(() => {
                                    dialogo = false;
                                    batalha(a);
                                },500);
                            });
                        });
                    } 
                    else {
                        perguntasfeitas++
                        dialogoagora.innerText = "Você tenta acertar o inimigo...";
                        retangulo.style.display = "block";
                        dialogoagora.style.display = "block";
                        a.input.keyboard.once("keydown-Z", () => {
                            if (inimigodefendeu === false) {
                                contas = Math.floor(Math.random() * 3) + 1;
                                
                                
                                if (contas === 1) {
                                    numero1 = Math.floor(Math.random() * 120) + 1;
                                    numero2 = Math.floor(Math.random() * 120) + 1;
                                } 
                                else if (contas === 2){
                                    numero1 = Math.floor(Math.random() * 10) + 1
                                    numero2 = Math.floor(Math.random() * 15) + 1
                                }
                                else {
                                    numero1 = Math.floor(Math.random() * 20) + 1;
                                    numero2 = Math.floor(Math.random() * 10) + 1;
                                }
                                
                                if (contas === 1) { // contas de +
                                    resposta = parseInt(numero1 + numero2);
                                } else if (contas === 2) { // contas de X
                                    resposta = parseInt(numero1 * numero2);
                                } else { // contas de /
                                    while (true) {
                                        if (numero1 % numero2 === 0) {
                                            break;
                                        } else {
                                            numero1 = Math.floor(Math.random() * 20) + 1;
                                            numero2 = Math.floor(Math.random() * 10) + 1;
                                        }
                                    }
                                    resposta = parseInt(numero1 / numero2);
                                }

                                if (anuloucontas === true){
                                    pergunta.innerText = `A resposta é ${resposta}`
                                    contador -= 1;
                                    if (contador <= 0){
                                        anuloucontas = false;
                                    }
                                }
                                else{
                                    if (contas === 1){
                                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                                    }
                                    else if (contas === 2){
                                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                                    }
                                    else{
                                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                                    }

                                }

                                matematicadojogo.style.display = "block";
                                

                                function responder() {
                                    matematicadojogo.style.display = "none";
                                    let respostadada = document.getElementById("digiteresposta").value;
                                    if (respostadada == resposta) {
                                        perguntascertas++
                                        let chance = Math.random() < 0.7 ? 1 : 2;
                                        if (chance === 1) {
                                            dialogoagora.innerText = "Você acertou ela!.";
                                            hpadv -= ataque.ataqueatual;
                                            retangulo.style.display = "block";
                                            dialogoagora.style.display = "block";
                                            a.input.keyboard.once("keydown-Z", () => {
                                                dialogoagora.style.display = "none";
                                                retangulo.style.display = "none";
                                                turno = false;
                                                setTimeout(() => {
                                                    dialogo = false;
                                                    batalha(a);
                                                },500);
                                            });
                                        } 
                                        else {
                                            dialogoagora.innerText = "Você acertou ela duas vezes!.";
                                            hpadv -= ataque.ataqueatual * 2;
                                            retangulo.style.display = "block";
                                            dialogoagora.style.display = "block";
                                            a.input.keyboard.once("keydown-Z", () => {
                                                dialogoagora.style.display = "none";
                                                retangulo.style.display = "none";
                                                turno = false;
                                                setTimeout(() => {
                                                    dialogo = false;
                                                    batalha(a);
                                                },500);
                                            });
                                        }
                                        
                                    } 
                                    else {
                                        perguntaserradas++
                                        let chance = Math.random() < 0.8 ? 1 : 2;
                                        if (chance === 1) {
                                            dialogoagora.innerText = "Você errou feio!.";
                                            retangulo.style.display = "block";
                                            dialogoagora.style.display = "block";
                                            a.input.keyboard.once("keydown-Z", () => {
                                                dialogoagora.innerText = "Seu amigo acha que você é burro!.";
                                                a.input.keyboard.once("keydown-Z", () => {
                                                    dialogoagora.style.display = "none";
                                                    retangulo.style.display = "none";
                                                    turno = false;
                                                    setTimeout(() => {
                                                        dialogo = false;
                                                        batalha(a);
                                                    },500);
                                                });
                                            });
                                        } else {
                                            dialogoagora.innerText = "Você acerta seu amigo!.";
                                            retangulo.style.display = "block";
                                            dialogoagora.style.display = "block";
                                            a.input.keyboard.once("keydown-Z", () => {
                                                dialogoagora.innerText = "Você nem olha pra ele!.";
                                                a.input.keyboard.once("keydown-Z", () => {
                                                    dialogoagora.innerText = "Você ta ferrado!.";
                                                    a.input.keyboard.once("keydown-Z", () => {
                                                        dialogoagora.style.display = "none";
                                                        retangulo.style.display = "none";
                                                        turno = false;
                                                        setTimeout(() => {
                                                            dialogo = false;
                                                            batalha(a);
                                                        },500);
                                                    });
                                                });
                                            });
                                        }
                                    }
                                    

                                    responderpergunta.removeEventListener("click", responder);
                                }

                                responderpergunta.removeEventListener("click", responder);
                                responderpergunta.addEventListener("click", responder);

                            } 
                            else {
                                inimigodefendeu = false;
                                contas = Math.floor(Math.random() * 3) + 1;
                                
                                
                                if (contas === 1 ) {
                                    numero1 = Math.floor(Math.random() * 30) + 1;
                                    numero2 = Math.floor(Math.random() * 35) + 1;
                                }
                                else if (contas === 2 ){
                                    numero1 = Math.floor(Math.random() * 10) + 1
                                    numero2 = Math.floor(Math.random() * 15) + 1
                                }
                                 else {
                                    numero1 = Math.floor(Math.random() * 20) + 1;
                                    numero2 = Math.floor(Math.random() * 10) + 1;
                                }
                               
                                if (contas === 1) { // contas de +
                                    resposta = parseInt(numero1 + numero2);
                                } else if (contas === 2) { // contas de X
                                    resposta = parseInt(numero1 * numero2);
                                } else { // contas de /
                                    while (true) {
                                        if (numero1 % numero2 === 0) {
                                            break;
                                        } else {
                                            numero1 = Math.floor(Math.random() * 20) + 1;
                                            numero2 = Math.floor(Math.random() * 10) + 1;
                                        }
                                    }
                                    resposta = parseInt(numero1 / numero2);
                                }

                                if (anuloucontas === true){
                                    pergunta.innerText = `A resposta é ${resposta}`
                                    contador -= 1;
                                    if (contador <= 0){
                                        anuloucontas = false;
                                    }
                                }
                                else{
                                    if (contas === 1){
                                        pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                                    }
                                    else if (contas === 2){
                                        pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                                    }
                                    else{
                                        pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                                    }

                                }

                                matematicadojogo.style.display = "block";

                                function responderdefesa() {
                                    matematicadojogo.style.display = "none";
                                    let respostadada = document.getElementById("digiteresposta").value;
                                    if (respostadada == resposta) {
                                        perguntascertas++
                                        let chance = Math.random() < 0.7 ? 1 : 2;
                                        if (chance === 1) {
                                            dialogoagora.innerText = "Você acertou ela!.";
                                            hpadv -= parseInt(ataque.ataqueatual * 0.5);
                                            a.input.keyboard.once("keydown-Z", () => {
                                                dialogoagora.style.display = "none";
                                                retangulo.style.display = "none";
                                                turno = false;
                                                setTimeout(() => {
                                                    dialogo = false;
                                                    opcoes = true
                                                    batalha(a);
                                                },500);
                                            });
                                        } 
                                        else {
                                            dialogoagora.innerText = "Você acertou ela duas vezes!.";
                                            hpadv -= parseInt((ataque.ataqueatual * 2) * 0.4);
                                            retangulo.style.display = "block";
                                            dialogoagora.style.display = "block";
                                            a.input.keyboard.once("keydown-Z", () => {
                                                dialogoagora.style.display = "none";
                                                retangulo.style.display = "none";
                                                turno = false;
                                                setTimeout(() => {
                                                    opcoes = true
                                                    dialogo = false;
                                                    batalha(a);
                                                },500);
                                            });
                                        }
                                        
                                    } 
                                    else {
                                        perguntaserradas++
                                        let chance = Math.random() < 0.8 ? 1 : 2;
                                        if (chance === 1) {
                                            dialogoagora.innerText = "Você errou feio!.";
                                            retangulo.style.display = "block";
                                            dialogoagora.style.display = "block";
                                            a.input.keyboard.once("keydown-Z", () => {
                                                dialogoagora.innerText = dialogoerrou;
                                                a.input.keyboard.once("keydown-Z", () => {
                                                    dialogoagora.style.display = "none";
                                                    retangulo.style.display = "none";
                                                    turno = false;
                                                    setTimeout(() => {
                                                        opcoes = true
                                                        dialogo = false;
                                                        batalha(a);
                                                    },500);
                                                });
                                            });
                                        } 
                                        else {
                                            dialogoagora.innerText = dialogoerrou2
                                            retangulo.style.display = "block";
                                            dialogoagora.style.display = "block";
                                            a.input.keyboard.once("keydown-Z", () => {
                                                dialogoagora.innerText = "Você nem olha pra ele.";
                                                a.input.keyboard.once("keydown-Z", () => {
                                                    dialogoagora.innerText = "Você ta ferrado...";
                                                    a.input.keyboard.once("keydown-Z", () => {
                                                        dialogoagora.style.display = "none";
                                                        retangulo.style.display = "none";
                                                        turno = false;
                                                        setTimeout(() => {
                                                            dialogo = false;
                                                            batalha(a);
                                                        },500);
                                                    });
                                                });
                                            });
                                        }
                                    }

                                    responderpergunta.removeEventListener("click", responderdefesa);
                                }

                                responderpergunta.removeEventListener("click", responderdefesa);
                                responderpergunta.addEventListener("click", responderdefesa);
                            }

                        });
                    }
                }
                else{

                    chanceerrar = nivelmedio === true? Math.floor(Math.random()*10) +1 : Math.floor(Math.random()*10) +1
                    if (nivelmedio === true &&chanceerrar === 1 || nivelmedio === false&& chanceerrar<=3 ){
                        dialogoagora.innerText = "Você errou..."
                        retangulo.style.display = "block"
                        dialogoagora.style.display = "block"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            dialogoagora.innerText = voceerrou
                            retangulo.style.display = "block"
                            dialogoagora.style.display = "block"
                            a.input.keyboard.once("keydown-Z", ()=>{
                                dialogoagora.style.display = "none"
                                retangulo.style.display = "none"
                                turno = false
                                setTimeout(()=>{
                                    dialogo = false
                                    batalha(a)
                                },500)
                            })
                        })
                    }
                    else{
                        perguntasfeitas++
                        dialogoagora.innerText = "Você tenta acertar o inimigo...";
                        retangulo.style.display = "block";
                        dialogoagora.style.display = "block";
                        if(inimigodefendeu === false){
                            if (nivelmedio === true){
                                contas = Math.floor(Math.random() * 4) + 1;
                                
                                
                                if (contas === 1){
                                    numero1 = Math.floor(Math.random() * 67) + 1
                                    numero2 = Math.floor(Math.random() * 50) + 1
                                }
                                else if (contas === 2){
                                    numero1 = Math.floor(Math.random() * 40) + 1
                                    numero2 = Math.floor(Math.random() * 55) + 1
                                }
                                else{
                                    numero1 = Math.floor(Math.random() * 20)+ 1
                                    numero2 = Math.floor(Math.random() * 10)+ 1
                                }
                                
                                if (contas === 1){ // contas de +
                                    resposta = parseInt(numero1 + numero2);
                                }
                                else if (contas === 2){ // contas de X
                                    resposta = parseInt(numero1 * numero2);
                                }
                                else if (contas === 3){// contas de /
                                    while(true){
                                        if (numero1 % numero2 === 0){
                                            break
                                        }
                                        else{
                                            numero1 = Math.floor(Math.random() * 50)+ 1
                                            numero2 = Math.floor(Math.random() * 50)+ 1
                                        }
                                    }
                                    resposta = parseInt(numero1 / numero2);
                                }
                                else{
                                    resposta = parseInt(numero1 + (numero2 + numero1) );
                                }
                            }
                            else{
                                contas = Math.floor(Math.random() * 4) + 1;
                                
                                
                                if (contas === 1){
                                    numero1 = Math.floor(Math.random() * 120) + 1
                                    numero2 = Math.floor(Math.random() * 120) + 1
                                }
                                else if (contas === 2 || contas === 4){
                                    numero1 = Math.floor(Math.random() * 10) + 1
                                    numero2 = Math.floor(Math.random() * 15) + 1
                                }
                                else{
                                    numero1 = Math.floor(Math.random() * 20)+ 1
                                    numero2 = Math.floor(Math.random() * 10)+ 1
                                }
                            
                                if (contas === 1){ // contas de +
                                    resposta = parseInt(numero1 + numero2);
                                }
                                else if (contas === 2){ // contas de X
                                    resposta = parseInt(numero1 * numero2);
                                }
                                else if (contas === 3){// contas de /
                                    while(true){
                                        if (numero1 % numero2 === 0){
                                            break
                                        }
                                        else{
                                            numero1 = Math.floor(Math.random() * 20)+ 1
                                            numero2 = Math.floor(Math.random() * 10)+ 1
                                        }
                                    }
                                    resposta = parseInt(numero1 / numero2);
                                }
                                else{
                                    resposta = parseInt(numero1 + (numero2 + numero1));
                                }
                            }
                            
                            
                            if (anuloucontas === true){
                                pergunta.innerText = `A resposta é ${resposta}`
                                contador -= 1;
                                if (contador <= 0){
                                    anuloucontas = false;
                                }
                            }
                            else{
                                if (contas === 1){
                                    pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                                }
                                else if (contas === 2){
                                    pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                                }
                                else if (contas === 3){
                                    pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                                }
                                else{
                                    pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                                }

                            }

                            matematicadojogo.style.display = "block";

                            function responderperguntamedio() {
                                matematicadojogo.style.display = "none";
                                let respostadada = document.getElementById("digiteresposta").value;
                                if (respostadada == resposta){
                                    perguntascertas++
                                    let chance = Math.random() < 0.7? 1 : 2;
                                    if (chance === 1){
                                        dialogoagora.innerText = "Você acertou ela!.";
                                        hpadv -= ataque.ataqueatual;
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{   
                                                opcoes = true
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                    }
                                    else{
                                        dialogoagora.innerText = "Você acertou ela duas vezes!.";
                                        hpadv -= ataque.ataqueatual * 2;
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{ 
                                                opcoes = true  
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                    }
                                    
                                }
                                else{
                                    perguntaserradas++
                                    let chance = Math.random() < 0.8? 1 : 2;
                                    if (chance === 1){
                                        dialogoagora.innerText = "Você errou feio!.";
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.innerText = dialogoerrou;
                                            a.input.keyboard.once("keydown-Z", ()=>{
                                                dialogoagora.style.display = "none";
                                                retangulo.style.display = "none";
                                                turno = false;
                                                setTimeout(()=>{   
                                                    dialogo = false;
                                                    batalha(a);
                                                },500);
                                            });
                                        });
                                    }
                                    else{
                                        dialogoagora.innerText = dialogoerrou2;
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.innerText = "Você nem olha pra ele!.";
                                            a.input.keyboard.once("keydown-Z", ()=>{
                                                dialogoagora.innerText = "Você ta ferrado!.";
                                                a.input.keyboard.once("keydown-Z", ()=>{
                                                    dialogoagora.style.display = "none";
                                                    retangulo.style.display = "none";
                                                    turno = false;
                                                    setTimeout(()=>{   
                                                        opcoes = true
                                                        dialogo = false;
                                                        batalha(a);
                                                    },500);
                                                });
                                            });
                                        });
                                    }
                                }
                                

                                responderpergunta.removeEventListener("click", responderperguntamedio);
                            }

                            responderpergunta.removeEventListener("click", responderperguntamedio);
                            responderpergunta.addEventListener("click", responderperguntamedio);
                        }    
                        else{
                            if (nivelmedio === true){
                                contas = Math.floor(Math.random() * 4) + 1;
                                
                                
                                if (contas === 1){
                                    numero1 = Math.floor(Math.random() * 67) + 1
                                    numero2 = Math.floor(Math.random() * 50) + 1
                                }
                                else if (contas === 2){
                                    numero1 = Math.floor(Math.random() * 40) + 1
                                    numero2 = Math.floor(Math.random() * 55) + 1
                                }
                                else{
                                    numero1 = Math.floor(Math.random() * 20)+ 1
                                    numero2 = Math.floor(Math.random() * 10)+ 1
                                }
                                
                                if (contas === 1){ // contas de +
                                    resposta = parseInt(numero1 + numero2);
                                }
                                else if (contas === 2){ // contas de X
                                    resposta = parseInt(numero1 * numero2);
                                }
                                else if (contas === 3){// contas de /
                                    while(true){
                                        if (numero1 % numero2 === 0){
                                            break
                                        }
                                        else{
                                            numero1 = Math.floor(Math.random() * 50)+ 1
                                            numero2 = Math.floor(Math.random() * 50)+ 1
                                        }
                                    }
                                    resposta = parseInt(numero1 / numero2);
                                }
                                else{
                                    resposta = parseInt(numero1 + (numero2 + numero1) );
                                }
                            }
                            else{
                                contas = Math.floor(Math.random() * 4) + 1;
                                
                                
                                if (contas === 1){
                                    numero1 = Math.floor(Math.random() * 120) + 1
                                    numero2 = Math.floor(Math.random() * 120) + 1
                                }
                                else if (contas === 2 || contas === 4){
                                    numero1 = Math.floor(Math.random() * 10) + 1
                                    numero2 = Math.floor(Math.random() * 15) + 1
                                }
                                else{
                                    numero1 = Math.floor(Math.random() * 20)+ 1
                                    numero2 = Math.floor(Math.random() * 10)+ 1
                                }
                            
                                if (contas === 1){ // contas de +
                                    resposta = parseInt(numero1 + numero2);
                                }
                                else if (contas === 2){ // contas de X
                                    resposta = parseInt(numero1 * numero2);
                                }
                                else if (contas === 3){// contas de /
                                    while(true){
                                        if (numero1 % numero2 === 0){
                                            break
                                        }
                                        else{
                                            numero1 = Math.floor(Math.random() * 20)+ 1
                                            numero2 = Math.floor(Math.random() * 10)+ 1
                                        }
                                    }
                                    resposta = parseInt(numero1 / numero2);
                                }
                                else{
                                    resposta = parseInt(numero1 + (numero2 + numero1));
                                }
                            }

                            if (anuloucontas === true){
                                pergunta.innerText = `A resposta é ${resposta}`
                                contador -= 1;
                                if (contador <= 0){
                                    anuloucontas = false;
                                }
                            }
                            else{
                                if (contas === 1){
                                    pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                                }
                                else if (contas === 2){
                                    pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                                }
                                else if (contas === 3){
                                    pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                                }
                                else{
                                    pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                                }

                            }

                            matematicadojogo.style.display = "block";

                            function responderperguntamediodefesa() {
                                matematicadojogo.style.display = "none";
                                let respostadada = document.getElementById("digiteresposta").value;
                                if (respostadada == resposta){
                                    perguntascertas++
                                    let chance = Math.random() < 0.7? 1 : 2;
                                    if (chance === 1){
                                        dialogoagora.innerText = "Você acertou ela!.";
                                        hpadv -= parseInt(ataque.ataqueatual * 0.5);
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                        
                                        
                                    }
                                    else{
                                        dialogoagora.innerText = "Você acertou ela duas vezes!.";
                                        hpadv -= parseInt((ataque.ataqueatual * 2) * 0.5);
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                    }
                                    retangulo.style.display = "block";
                                    dialogoagora.style.display = "block";
                                }
                                else{
                                    perguntaserradas++
                                    let chance = Math.random() < 0.8? 1 : 2;
                                    if (chance === 1){
                                        dialogoagora.innerText = "Você errou feio!.";
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.innerText = dialogoerrou;
                                            a.input.keyboard.once("keydown-Z", ()=>{
                                                dialogoagora.style.display = "none";
                                                retangulo.style.display = "none";
                                                turno = false;
                                                setTimeout(()=>{
                                                    dialogo = false;
                                                    batalha(a);
                                                },500);
                                            });
                                        });
                                    }
                                    else{
                                        dialogoagora.innerText = dialogoerrou2;
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.innerText = "Você nem olha pra ele!.";
                                            a.input.keyboard.once("keydown-Z", ()=>{
                                                dialogoagora.innerText = "Você ta ferrado!.";
                                                a.input.keyboard.once("keydown-Z", ()=>{
                                                    dialogoagora.style.display = "none";
                                                    retangulo.style.display = "none";
                                                    turno = false;
                                                    setTimeout(()=>{
                                                        dialogo = false;
                                                        batalha(a);
                                                    },500);
                                                });
                                            });
                                        });
                                    }
                                }
                               
                                responderpergunta.removeEventListener("click", responderperguntamediodefesa);
                            }

                            responderpergunta.removeEventListener("click", responderperguntamediodefesa);
                            responderpergunta.addEventListener("click", responderperguntamediodefesa);
                        }
                    }
                }



                /*else {
                    chanceerrar = Math.floor(Math.random()*10) +1
                    if (chanceerrar <=3){
                        dialogoagora.innerText = "Você errou..."
                        retangulo.style.display = "block"
                        dialogoagora.style.display = "block"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            dialogoagora.innerText = voceerrou
                            retangulo.style.display = "block"
                            dialogoagora.style.display = "block"
                            a.input.keyboard.once("keydown-Z", ()=>{
                                dialogoagora.style.display = "none"
                                retangulo.style.display = "none"
                                turno = false
                                setTimeout(()=>{
                                    dialogo = false
                                    batalha(a)
                                },500)
                            })
                        })
                    }
                    else{
                        perguntasfeitas++
                        dialogoagora.innerText = "Você tenta acertar o inimigo...";
                        retangulo.style.display = "block";
                        dialogoagora.style.display = "block";
                        let contas = Math.floor(Math.random() * 4) + 1;
                        
                        
                        if (contas === 1){
                            numero1 = Math.floor(Math.random() * 120) + 1
                            numero2 = Math.floor(Math.random() * 120) + 1
                        }
                        else if (contas === 2 || contas === 4){
                            numero1 = Math.floor(Math.random() * 10) + 1
                            numero2 = Math.floor(Math.random() * 15) + 1
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                      
                        if (contas === 1){ // contas de +
                            resposta = parseInt(numero1 + numero2);
                        }
                        else if (contas === 2){ // contas de X
                            resposta = parseInt(numero1 * numero2);
                        }
                        else if (contas === 3){// contas de /
                            while(true){
                                if (numero1 % numero2 === 0){
                                    break
                                }
                                else{
                                    numero1 = Math.floor(Math.random() * 20)+ 1
                                    numero2 = Math.floor(Math.random() * 10)+ 1
                                }
                            }
                            resposta = parseInt(numero1 / numero2);
                        }
                        else{
                            resposta = parseInt(numero1 + (numero2 + numero1));
                        }

                        if (anuloucontas === true){
                            pergunta.innerText = `A resposta é ${resposta}`
                            contador -= 1;
                            if (contador <= 0){
                                anuloucontas = false;
                            }
                        }
                        else{
                            if (contas === 1){
                                pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                            }
                            else if (contas === 2){
                                pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                            }
                            else if (contas === 3){
                                pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                            }
                            else{
                                pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                            }

                        }

                        matematicadojogo.style.display = "block";
                        
                        if (inimigodefendeu === false){
                            function responderdificil() {
                                matematicadojogo.style.display = "none";
                                let respostadada = document.getElementById("digiteresposta").value
                                responderpergunta.removeEventListener("click", responderdificil)

                                if (respostadada == resposta){
                                    perguntascertas++
                                    let chance = Math.random() < 0.7 ? 1 : 2;
                                    if (chance === 1){
                                        dialogoagora.innerText = "Você acertou ela!."
                                        hpadv -= parseInt(ataque.ataqueatual * 0.5);
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{   
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                    }
                                    else{
                                        dialogoagora.innerText = "Você acertou ela duas vezes!."
                                        hpadv -= parseInt((ataque.ataqueatual * 2) * 0.5);
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{   
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                    }
                                } 
                                else {
                                    perguntaserradas++
                                    let chance = Math.random() < 0.8 ? 1 : 2;
                                    if (chance === 1){
                                        dialogoagora.innerText = "Você errou feio!."
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{   
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                    } 
                                    else {
                                        dialogoagora.innerText = dialogoerrou
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{   
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                            }
                                }

                                
                            responderpergunta.addEventListener("click", responderdificil)
                            }
                            responderpergunta.removeEventListener("click", responderdificil)
                            responderpergunta.addEventListener("click", responderdificil)
                        }
                        else{
                            function responderdificildefesa() {
                                matematicadojogo.style.display = "none";
                                let respostadada = document.getElementById("digiteresposta").value;
                                if (respostadada == resposta){
                                    perguntascertas++
                                    let chance = Math.random() < 0.7? 1 : 2;
                                    if (chance === 1){
                                        dialogoagora.innerText = "Você acertou ela!.";
                                        hpadv -= parseInt(ataque.ataqueatual * 0.5);
                                        retangulo.style.display = "block"
                                        dialogoagora.style.display = "block"
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{   
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                    }
                                    else{
                                        dialogoagora.innerText = "Você acertou ela duas vezes!.";
                                        hpadv -= parseInt((ataque.ataqueatual * 2) * 0.5);
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.style.display = "none";
                                            retangulo.style.display = "none";
                                            turno = false;
                                            setTimeout(()=>{   
                                                dialogo = false;
                                                batalha(a);
                                            },500);
                                        });
                                    }
                                    
                                }
                                else{
                                    perguntaserradas++
                                    let chance = Math.random() < 0.8? 1 : 2;
                                    if (chance === 1){
                                        dialogoagora.innerText = "Você errou feio!.";
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.innerText = dialogoerrou
                                            a.input.keyboard.once("keydown-Z", ()=>{
                                                dialogoagora.style.display = "none";
                                                retangulo.style.display = "none";
                                                turno = false;
                                                setTimeout(()=>{
                                                    dialogo = false;
                                                    batalha(a);
                                                },500);
                                            });
                                        });
                                    }
                                    else{
                                        dialogoagora.innerText = dialogoerrou2
                                        retangulo.style.display = "block";
                                        dialogoagora.style.display = "block";
                                        a.input.keyboard.once("keydown-Z", ()=>{
                                            dialogoagora.innerText = "Você nem olha pra ele!.";
                                            a.input.keyboard.once("keydown-Z", ()=>{
                                                dialogoagora.innerText = "Você ta ferrado!.";
                                                a.input.keyboard.once("keydown-Z", ()=>{
                                                    dialogoagora.style.display = "none";
                                                    retangulo.style.display = "none";
                                                    turno = false;
                                                    setTimeout(()=>{
                                                        dialogo = false;
                                                        batalha(a);
                                                    },500);
                                                });
                                            });
                                        });
                                    }
                                }
                               
                                responderpergunta.removeEventListener("click", responderdificildefesa);
                            }

                            responderpergunta.removeEventListener("click", responderdificildefesa);
                            responderpergunta.addEventListener("click", responderdificildefesa);
                        
                        }
                        
                        }

                        
                        
                }*/
                
            }

            else if (xseta === 155 && yseta === 32) { 
                if (bens.length === 0){ //caso não tenha itens
                    dialogo = true;
                    opcoes = false
                    retangulo.style.display = "block";
                    dialogoagora.innerText = "Você não tem itens!"; 
                    dialogoagora.style.display = "block";
                    a.input.keyboard.once("keydown-Z", () => {
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        dialogo = false;
                        opcoes = true
                        batalha(a)
                    });
                }
                else{ //caso tenha pelo menos 1
                    xseta = 25
                    seta.style.marginLeft = xseta + "px"
                    opcoes = false
                    abriuitens = true
                    mostraataque.style.display = "none";
                    mostraqi.style.display = "none";
                    itens.style.display = "none";
                    mostradefesa.style.display = "none";
                    fugir.style.display = "none";
                    if(bens.length>=1){
                        item0.innerText = bens[0]
                        item0.style.display = "block"
    
                    }
                    if(bens.length>= 2){
                        item1.innerText = bens[1]
                        item1.style.display = "block"
                    }
                    if(bens.length>=3){
                        item2.innerText = bens[2]
                        item2.style.display = "block"
                    }
                    if(bens.length>= 4){
                        item3.innerText = bens[3]
                        item3.style.display = "block"
                    }
                    if(bens.length>=5){
                        item4.innerText = bens[4]
                        item4.style.display = "block"
                    }
                    if(bens.length>= 6){
                        item5.innerText = bens[5]
                        item5.style.display = "block"
                    }
                    if(bens.length>=7){
                        item6.innerText = bens[6]
                        item6.style.display = "block"
                    }
                    if(bens.length>= 8){
                        item7.innerText = bens[7]
                        item7.style.display = "block"
                    }
                    
                }
            } 

            else if(xseta === 25 && yseta === 32 && abriuitens === true){ //INTERAÇAO COM O ITEM 1, VC VAI MEXER AQUI <--------
                dialogo = true;
            
                itemindex = 0
                verificaitens()
            }

            else if(xseta === 25 && yseta === 78 && abriuitens === true){ //INTERAÇAO COM O ITEM 2, VC VAI MEXER AQUI <--------
                dialogo = true;
           
                itemindex = 1
                verificaitens()

            }
            else if(xseta === 125 && yseta === 32 && abriuitens === true){ //INTERAÇAO COM O ITEM 3, VC VAI MEXER AQUI <--------
                dialogo = true;
                
                itemindex = 2
                verificaitens()

            }
            else if(xseta === 125 && yseta === 78 && abriuitens === true){ //INTERAÇAO COM O ITEM 4, VC VAI MEXER AQUI <--------
                dialogo = true;
               
                itemindex = 3
                verificaitens()
            }
            else if(xseta === 225 && yseta === 32 && abriuitens === true){ //INTERAÇAO COM O ITEM 5, VC VAI MEXER AQUI <--------
                dialogo = true;
               
                itemindex = 4
                verificaitens()
            }
            else if(xseta === 225 && yseta === 78 && abriuitens === true){ //INTERAÇAO COM O ITEM 6, VC VAI MEXER AQUI <--------
                dialogo = true;
              
                itemindex = 5
                verificaitens()
            }
            else if(xseta === 325 && yseta === 32 && abriuitens === true){ //INTERAÇAO COM O ITEM 7, VC VAI MEXER AQUI <--------
                dialogo = true;
               
                itemindex = 6
                verificaitens()
            }
            else if(xseta === 325 && yseta === 78 && abriuitens === true){  //INTERAÇAO COM O ITEM 8, VC VAI MEXER AQUI <--------
                dialogo = true;
              
                itemindex = 7
                verificaitens()
            }

            else if (xseta === 155 && yseta === 78 && abriuitens === false){ // defesa
                dialogo = true
                dialogoagora.innerText = "você tenta se defender..."
                retangulo.style.display = "block"
                dialogoagora.style.display = "block"
                perguntasfeitas++
                a.input.keyboard.once("keydown-Z", () => {
                    
                    
                    if (nivelfacil === true){
                        contas = Math.floor(Math.random() * 3) + 1;
                        if (contas === 1 ){
                            numero1 = Math.floor(Math.random() * 120) + 1
                            numero2 = Math.floor(Math.random() * 120) + 1
                        }
                        else if (contas === 2){
                            numero1 = Math.floor(Math.random() * 10) + 1
                            numero2 = Math.floor(Math.random() * 15) + 1
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                 
                        if (contas === 1){ // contas de +
                            resposta = parseInt(numero1 + numero2);
                        }
                        else if (contas === 2){ // contas de X
                            resposta = parseInt(numero1 * numero2);
                        }
                        else if (contas === 3){// contas de /
                            while(true){
                                if (numero1 % numero2 === 0){
                                    break
                                }
                                else{
                                    numero1 = Math.floor(Math.random() * 20)+ 1
                                    numero2 = Math.floor(Math.random() * 10)+ 1
                                }
                        }
                        resposta = parseInt(numero1 / numero2);
                        }
                        else{
                            resposta = parseInt(numero1 + (numero2 + numero1) );
                        }

                        if (anuloucontas === true){
                            pergunta.innerText = `A resposta é ${resposta}`
                            contador -= 1;
                            if (contador <= 0){
                                anuloucontas = false;
                            }
                        }
                        else{
                            if (contas === 1){
                                pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                            }
                            else if (contas === 2){
                                pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                            }
                            else if (contas === 3){
                                pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                            }

                        }
                    }
                    else{
                        contas = Math.floor(Math.random() * 4) + 1;
                        if (contas === 1 ){
                            numero1 = Math.floor(Math.random() * 120) + 1
                            numero2 = Math.floor(Math.random() * 120) + 1
                        }
                        else if (contas === 2 || contas === 4){
                            numero1 = Math.floor(Math.random() * 10) + 1
                            numero2 = Math.floor(Math.random() * 15) + 1
                        }
                        else{
                            numero1 = Math.floor(Math.random() * 20)+ 1
                            numero2 = Math.floor(Math.random() * 10)+ 1
                        }
                       
                        if (contas === 1){ // contas de +
                            resposta = parseInt(numero1 + numero2);
                        }
                        else if (contas === 2){ // contas de X
                            resposta = parseInt(numero1 * numero2);
                        }
                        else if (contas === 3){// contas de /
                            while(true){
                                if (numero1 % numero2 === 0){
                                    break
                                }
                                else{
                                    numero1 = Math.floor(Math.random() * 20)+ 1
                                    numero2 = Math.floor(Math.random() * 10)+ 1
                                }
                        }
                        resposta = parseInt(numero1 / numero2);
                        }
                        else{
                            resposta = parseInt(numero1 + (numero2 + numero1) );
                        }

                        if (anuloucontas === true){
                            pergunta.innerText = `A resposta é ${resposta}`
                            contador -= 1;
                            if (contador <= 0){
                                anuloucontas = false;
                            }
                        }
                        else{
                            if (contas === 1){
                                pergunta.innerText = `Quanto é ${numero1} + ${numero2}?`;
                            }
                            else if (contas === 2){
                                pergunta.innerText = `Quanto é ${numero1} X ${numero2}?`;
                            }
                            else if (contas === 3){
                                pergunta.innerText = `Quanto é ${numero1} / ${numero2}?`;
                            }
                            else{
                                pergunta.innerText = `Quanto é ${numero1} + (${numero2} + ${numero1})?`;
                            }

                        }
                }

                    matematicadojogo.style.display = "block";

                    function responderdefesa(){
                        matematicadojogo.style.display = "none";
                        let respostadada = document.getElementById("digiteresposta").value;
                        if (respostadada == resposta){
                            sedefendeu = true;
                            dialogoagora.innerText = "Você se defendeu com sucesso!";
                            perguntascertas++
                            a.input.keyboard.once("keydown-Z", () => {
                                retangulo.style.display = "none";
                                dialogoagora.style.display = "none";
                                turno = false;
                                setTimeout(() => {
                                    dialogo = false;
                                    batalha(a);
                                }, 500);
                            });
                        }
                        else{
                            dialogoagora.innerText = "Você não conseguiu se defender";
                            perguntaserradas++ 
                            a.input.keyboard.once("keydown-Z", () => {
                                retangulo.style.display = "none";
                                dialogoagora.style.display = "none";
                                turno = false;
                                setTimeout(() => {
                                    dialogo = false;
                                    batalha(a);
                                }, 500);
                            });
                        }
                        responderpergunta.removeEventListener("click", responderdefesa);
                    }
                    responderpergunta.addEventListener("click", responderdefesa);
                    
                });
            }

            else if (xseta === 25 && yseta === 78) { 
                dialogo = true  
                pagina1 = true
                pagina2=false
                pagina3=false
                pagina4=false
                opcoes = false
                magias.style.display = "block"
                pkmatematica.style.display = "block"
                pkalgebra.style.display = "block"
                pkparenteses.style.display = nivel.nivelatual>=3? "block" :"none"
                pksoma.style.display = nivel.nivelatual>=3? "block" :"none"
                movermagia.style.display = nivel.nivelatual>5? "block" :"none"
                pkpiramide.style.display = "none"
                pkfracao.style.display = "none"
                pkmediaboa.style.display = "none"
                pkzeratudo.style.display = "none"
                pkfatora.style.display = "none"
                pkdivinega.style.display = "none"
                pkarredondar.style.display = "none"
                pklogaritmo.style.display = "none"
                pkcontraangulo.style.display = "none"
                pklimite.style.display = "none"
                pktrigonometria.style.display = "none"
                pkconstante.style.display = "none"
                movermagia.removeEventListener("click", moveamagia)
                movermagia.addEventListener("click", moveamagia)
                pkmatematica.removeEventListener("click", usarpkmatemagica)
                pkmatematica.addEventListener("click",usarpkmatemagica)
                pkalgebra.removeEventListener("click", usarpkalgebra)
                pkalgebra.addEventListener("click", usarpkalgebra)
                pkparenteses.removeEventListener("click", usarpkparenteseseguro)
                pkparenteses.addEventListener("click", usarpkparenteseseguro)
                pksoma.removeEventListener("click", usarpksoma)
                pksoma.addEventListener("click", usarpksoma)
                pkpiramide.removeEventListener("click", usarpkpiramide)
                pkpiramide.addEventListener("click", usarpkpiramide)
                pkfracao.removeEventListener("click", usarpkfracao)
                pkfracao.addEventListener("click", usarpkfracao)
                pkmediaboa.removeEventListener("click", usarpkmediaboa)
                pkmediaboa.addEventListener("click", usarpkmediaboa)
                pkzeratudo.removeEventListener("click", usarpkzeratudo)
                pkzeratudo.addEventListener("click", usarpkzeratudo)
                pkfatora.removeEventListener("click", usarpkfatora)
                pkfatora.addEventListener("click", usarpkfatora)
                pkarredondar.removeEventListener("click", usarpkarredondoi)
                pkarredondar.addEventListener("click", usarpkarredondoi)
                pkdivinega.removeEventListener("click", usarpkdivinega)
                pkdivinega.addEventListener("click", usarpkdivinega)
                pklogaritmo.removeEventListener("click", usarpklogardor)
                pklogaritmo.addEventListener("click", usarpklogardor)
                pkcontraangulo.removeEventListener("click", usarpkcontraangulo)
                pkcontraangulo.addEventListener("click", usarpkcontraangulo)
                pklimite.removeEventListener("click", usarpklimite)
                pklimite.addEventListener("click", usarpklimite)
                pktrigonometria.removeEventListener("click", usarpktrigonito)
                pktrigonometria.removeEventListener("click", usarpktrigonito)
                pkconstante.addEventListener("click", usarpkconstante)   


                pkmatematica.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Matemática"
                    descricao.innerText = "Lança teoremas instáveis. Dano mágico em área.\n\nCusto de QI: 15"
                    requisitos.style.display = "block"
                })
                pkmatematica.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkalgebra.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Argh-gebra"
                    descricao.innerText = "X, Y, dor. Envia variáveis que explodem.\n\nCusto de QI: 10"
                    requisitos.style.display = "block"
                })
                pkalgebra.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkparenteses.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Parenteseseguro"
                    descricao.innerText = "Cria um escudo que te isola do mundo.\n\nCusto de QI: 15"
                    requisitos.style.display = "block"
                })
                pkparenteses.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pksoma.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Soma"
                    descricao.innerText = "Recupera um pouco de HP. Serve pra quebrar galho.\n\nCusto de QI: 20"
                    requisitos.style.display = "block"
                })
                pksoma.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkpiramide.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Pi-râmide"
                    descricao.innerText = "Gira e lança formas geométricas pontiagudas.\n\nCusto de QI: 40"
                    requisitos.style.display = "block"
                })
                pkpiramide.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkfracao.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Fração"
                    descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: 30"
                    requisitos.style.display = "block"
                })
                pkfracao.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkmediaboa.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Media Boa"
                    descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: 35"
                    requisitos.style.display = "block"
                })
                pkmediaboa.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkzeratudo.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Zera Tudo"
                    descricao.innerText = "Apaga status negativos com um pano de cálculo.\n\nCusto de QI: 60"
                    requisitos.style.display = "block"
                })
                pkzeratudo.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkfatora.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Fat-orra"
                    descricao.innerText = "Divide o inimigo e torra cada fator.\n\nCusto de QI: 50"
                    requisitos.style.display = "block"
                })
                pkfatora.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkdivinega.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Divi-nega"
                    descricao.innerText = "Divide o ataque inimigo... por zero.\n\nCusto de QI: 35"
                    requisitos.style.display = "block"
                })
                pkdivinega.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkarredondar.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Arredon-dói"
                    descricao.innerText = "Cura arredondando. Às vezes pra cima, às vezes para baixo.\n\nCusto de QI: 20"
                    requisitos.style.display = "block"
                })
                pkarredondar.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pklogaritmo.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Logar-dor"
                    descricao.innerText = "Cresce devagar, mas quando dói, dói log.\n\nCusto de QI: 65"
                    requisitos.style.display = "block"
                })
                pklogaritmo.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkcontraangulo.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Contra-Ângulo"
                    descricao.innerText = "Reflete o golpe com geometria pura.\n\nCusto de QI: 40"
                    requisitos.style.display = "block"
                })
                pkcontraangulo.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pklimite.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Limite"
                    descricao.innerText = "Restaura quase tudo, quase sempre.\n\nCusto de QI: 70"
                    requisitos.style.display = "block"
                })
                pklimite.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pktrigonometria.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK TriGO-nito"
                    descricao.innerText = "Ataca com um raio de cossenos e trauma.\n\nCusto de QI: 80"
                    requisitos.style.display = "block"
                })
                pktrigonometria.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
                pkconstante.addEventListener("mouseenter", ()=>{
                    titulopk.innerText = "PK Constante-C"
                    descricao.innerText = "Te deixa inabalável. Rígido como número fixo.\n\nCusto de QI: 80"
                    requisitos.style.display = "block"
                })
                pkconstante.addEventListener("mouseleave", ()=>{
                    requisitos.style.display = "none"
                })
          
            } 


            else { // FUGIR
                dialogo = true;
                opcoes = false
                if (boss === false){
                    let chancefugir = Math.floor(Math.random()*5)+1
                    if (chancefugir === 1){
                        let pronome = genero === "masculino"? "sucedido": "sucedida"
                        retangulo.style.display = "block";
                        dialogoagora.innerText = "Você tentou fugir...";
                        dialogoagora.style.display = "block"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            dialogoagora.innerText = "E foi bem " + pronome + "!"
                            dialogoagora.style.display = "block"
                            a.input.keyboard.once("keydown-Z", () => {
                                retangulo.style.display = "none";
                                dialogoagora.style.display = "none";
                                a.scene.start(lugarfuga);// <--- o personagem vai voltar para a cena q estava antes, e vc souber fazer isso adcione, caso contrario, NAO MEXA
                            
                            });
                        })

                    } 

                    else{
                        retangulo.style.display = "block";
                        dialogoagora.innerText = "Você tentou fugir..."
                        dialogoagora.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            dialogoagora.innerText = "Mas falhou!"
                            dialogoagora.style.display = "block"
                            a.input.keyboard.once("keydown-Z", ()=>{
                                dialogoagora.style.display = "none";
                                retangulo.style.display = "none"
                                turno = false;
                                setTimeout(() => {
                                    dialogo = false;
                                    batalha(a);
                                }, 500);
                            })

                        })

                    }
                }
                else{
                    retangulo.style.display = "block";
                    dialogoagora.innerText = "Você tentou fugir..."
                    dialogoagora.style.display = "block";
                    a.input.keyboard.once("keydown-Z", ()=>{
                        dialogoagora.innerText = dialogofuga
                        dialogoagora.style.display = "block"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            dialogoagora.style.display = "none";
                            retangulo.style.display = "none"
                            turno = false;
                                setTimeout(() => {
                                    dialogo = false;
                                    batalha(a);
                                }, 500);
                            
                        })

                        })

                    }
            }
        }
        if(event.key === "x" || event.key === "X"){
            if (abriuitens === true){
                abriuitens = false
                item0.style.display = "none"
                item1.style.display = "none"
                item2.style.display = "none"
                item3.style.display = "none"
                item4.style.display = "none"
                item5.style.display = "none"
                item6.style.display = "none"
                item7.style.display = "none"
                xseta = 25
                yseta = 32
                seta.style.marginTop = yseta + "px"
                seta.style.marginLeft = xseta + "px"
                setTimeout(()=>{
                    opcoes = true
                    dialogo = false
                    batalha(a)
                })
            }
            else if(magias.style.display === "block"){
                magias.style.display = "none"
                setTimeout(()=>{
                    opcoes = true
                    dialogo = false
                    batalha(a)
                })
        }
        
        
    }
    }

    removeEventListener("keydown", acoes)
    addEventListener("keydown", acoes)

    
  


    if (turno === true){
        if (hpadv <= 0 || hp.hpatual <= 0){
            fimdebatalha()
            return
        } 
        else {
            dialogo = true
            retangulo.style.display = "block"
            dialogoagora.innerText = "Agora é o turno do jogador"
            dialogoagora.style.display = "block"

            if (usoudefesaqi === true && vidaescudo === 0){
                a.input.keyboard.once("keydown-Z", ()=>{ 
                    usoudefesaqi = false
                    defesaqi = []
                    dialogoagora.innerText = "Seu escudo quebrou!"
                    a.input.keyboard.once("keydown-Z", ()=>{
                        retangulo.style.display = "none"
                        dialogoagora.style.display = "none"
                        setTimeout(()=>{
                            dialogo = false
                            opcoes = true
                        }, 500)  
                    })
                })     
            } else {
                a.input.keyboard.once("keydown-Z", ()=>{ 
                    retangulo.style.display = "none"
                    dialogoagora.style.display = "none"
                    setTimeout(()=>{
                        dialogo = false
                        opcoes = true
                    }, 500)  
                })
            }
        }
        
    }
    else{
        console.log("agora ta no turno adv")
        opcoes = false
        dialogo = true
        retangulo.style.display = "block"
        if (hpadv <= 0 || hp.hpatual <= 0){
            fimdebatalha()
            return;
        } 
        acaoinimigo = Math.floor(Math.random()*3)+1
        if (acaoinimigo === 1){
            if(inimigodefendeu === true){
                inimigodefendeu = false
            }
            dialogoagora.innerText = textoinimigoataque
            dialogoagora.style.display = "block"
            let chanceinimigoerrarataque;
            a.input.keyboard.once("keydown-Z", ()=>{
                if (nivelfacil === true){
                    chanceinimigoerrarataque = Math.floor(Math.random()*5)+1 
                    if(chanceinimigoerrarataque === 1){
                        dialogoagora.innerText = "Errou!"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                    else{
                        dialogoagora.innerText = "Acertou!";
                        dialogoagora.style.display = "block";
                        a.input.keyboard.once("keydown-Z",()=>{
                            usoudefesa()
                        })
                    }
                }
                else if(nivelmedio === true){
                    chanceinimigoerrarataque = Math.floor(Math.random()*10)+1 
                    if(chanceinimigoerrarataque === 1){
                        dialogoagora.innerText = "Errou!"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                    else{
                        dialogoagora.innerText = "Acertou!"
                        dialogoagora.style.display = "block"
                        a.input.keyboard.once("keydown-Z",()=>{
                            usoudefesa()
                        })
                    }
                }
                else{
                    chanceinimigoerrarataque = Math.floor(Math.random()*20)+1 
                    if(chanceinimigoerrarataque === 1){
                        dialogoagora.innerText = "Errou!"
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                    else{
                        dialogoagora.innerText = "Acertou!"
                        dialogoagora.style.display = "block"
                        a.input.keyboard.once("keydown-Z",()=>{
                            usoudefesa()
                        })
                    }    
                }
            })
        }

        else if (acaoinimigo === 2) {
            if(inimigodefendeu === true){
                inimigodefendeu = false
            }
            if (forcaqiinimigo <= 2) {
                let chanceerrarqi = nivelfacil === true ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 20) + 1;
                escolheataque = Math.floor(Math.random() * 2) + 1;
                retangulo.style.display = "block";
                dialogoagora.innerText = "Letícia tenta um ataque inteligente, mas não parece saber direito o que\nestá fazendo.";
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    if (chanceerrarqi === 1) {
                        dialogoagora.innerText = "Errou!";
                        retangulo.style.display = "block";
                        dialogoagora.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    } 
                    else {
                        if (escolheataque === 1) {
                            if (qiinimigo >= 15) {
                                dialogoagora.innerText = "Letícia usou PK Matemágica!";
                                qiinimigo -= 15;
                               
                                dialogoagora.style.display = "block";
                                a.input.keyboard.once("keydown-Z", () => {
                                    usoudefesa();
                                });
                            } 
                            else {
                                dialogoagora.innerText = "Letícia tenta PK Matemágica, mas não é inteligente o suficiente!";
                                dialogoagora.style.display = "block";
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                        } 
                        else {
                            if (qiinimigo >= 10) {
                                dialogoagora.innerText = "Letícia usou PK Argh-gebra!";
                                qiinimigo -= 10;
                                dialogoagora.style.display = "block";
                                a.input.keyboard.once("keydown-Z", () => {
                                    usoudefesa();
                                });
                            } 
                            else {
                                dialogoagora.innerText = "Letícia tenta PK Argh-gebra, mas não é inteligente o suficiente!";
                                dialogoagora.style.display = "block";
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    retangulo.style.display = "none"
                                    dialogoagora.style.display = "none"
                                    turno = true
                                    setTimeout(()=>{
                                        opcoes = true
                                        dialogo = false
                                        batalha(a)
                                    },500)
                                })
                            }
                        }
                    }
                });
            }
            else if (forcaqiinimigo > 2 && forcaqiinimigo < 10) {
                escolheataque = Math.floor(Math.random() * 4) + 1;
                if (escolheataque === 1) {
                    if (qiinimigo >= 15) {
                        dialogoagora.innerText = "O inimigo usa PK Matemágica";
                        qiinimigo -= 15;
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", () => {
                            usoudefesa();
                        });
                    } 
                    else {
                        dialogoagora.innerText = "O inimigo tenta usar PK Matemágica, mas não tem QI suficiente!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                } 
                else if (escolheataque === 2) {
                    if (qiinimigo >= 10) {
                        dialogoagora.innerText = "O inimigo usa PK Argh-gebra!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        qiinimigo -= 10;
                        a.input.keyboard.once("keydown-Z", () => {
                            usoudefesa();
                        });
                    } 
                    else {
                        dialogoagora.innerText = "O inimigo tenta usar PK Argh-gebra, mas não tem QI suficiente!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                } 
                else if (escolheataque === 3) {
                    if (qiinimigo >= 40) {
                        dialogoagora.innerText = "O inimigo usa PK Pi-râmide";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        qiinimigo -= 40;
                        a.input.keyboard.once("keydown-Z", () => {
                            usoudefesa();
                        });
                    } 
                    else {
                        dialogoagora.innerText = "O inimigo tenta usar PK Pi-râmide, mas não tem QI suficiente!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                } 
                else if (escolheataque === 4) {
                    if (qiinimigo >= 50) {
                        dialogoagora.innerText = "O inimigo usa PK Fat-orra!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        qiinimigo -= 50;
                        a.input.keyboard.once("keydown-Z", () => {
                            usoudefesa();
                        });
                    } 
                    else {
                        dialogoagora.innerText = "O inimigo tenta usar PK Fat-orra, mas não tem QI suficiente!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                }
            }
            else {
                escolheataque = Math.floor(Math.random() * 4) + 1;
                if (escolheataque === 1) {
                    if (qiinimigo >= 40) {
                        dialogoagora.innerText = "O inimigo usa PK Pi-râmide";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        qiinimigo -= 40;
                        a.input.keyboard.once("keydown-Z", () => {
                            usoudefesa();
                        });
                    } else {
                        dialogoagora.innerText = "O inimigo tenta usar PK Pi-râmide, mas não tem QI suficiente!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                } else if (escolheataque === 2) {
                    if (qiinimigo >= 50) {
                        dialogoagora.innerText = "O inimigo usa PK Fat-orra!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        qiinimigo -= 50;
                        a.input.keyboard.once("keydown-Z", () => {
                            usoudefesa();
                        });
                    } 
                    else {
                        dialogoagora.innerText = "O inimigo tenta usar PK Fat-orra, mas não tem QI suficiente!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                } else if (escolheataque === 3) {
                    if (qiinimigo >= 65) {
                        dialogoagora.innerText = "O inimigo usa PK Logar-dor";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        qiinimigo -= 65;
                        a.input.keyboard.once("keydown-Z", () => {
                            usoudefesa();
                        });
                    } else {
                        dialogoagora.innerText = "O inimigo tenta usar PK Logar-dor, mas não tem QI suficiente!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                } else if (escolheataque === 4) {
                    if (qiinimigo >= 80) {
                        qiinimigo -= 80;
                        dialogoagora.innerText = "O inimigo usa PK TriGO-nito!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", () => {
                            usoudefesa();
                        });
                    } else {
                        dialogoagora.innerText = "O inimigo tenta usar PK TriGO-nito, mas não tem QI suficiente!";
                        dialogoagora.style.display = "block";
                        retangulo.style.display = "block";
                        a.input.keyboard.once("keydown-Z", ()=>{
                            retangulo.style.display = "none"
                            dialogoagora.style.display = "none"
                            turno = true
                            setTimeout(()=>{
                                opcoes = true
                                dialogo = false
                                batalha(a)
                            },500)
                        })
                    }
                }
            }
        }


        else{
            opcoes = false
            dialogo = true
            if (sedefendeu === true){
                sedefendeu = false
            }
            dialogoagora.innerText = "O inimigo se defendeu!"
            retangulo.style.display = "block"
            dialogoagora.style.display = "block"
            inimigodefendeu = true
            a.input.keyboard.once("keydown-Z",()=>{
                retangulo.style.display = "none"
                dialogoagora.style.display = "none"
                turno = true
                setTimeout(()=>{
                    opcoes = true
                    dialogo = false
                    batalha(a)
                },500)
            })
        }

    }

    function subirnivel() {
        let niveisAntes = nivel.nivelatual;

        while (true) {
            if (nivel.nivelatual === 1 && xp.xpatual >= 10) {
            nivel.nivelatual++;
            ataque.ataqueatual += 2;
            if (nivelfacil) {
                hp.hpatual = 60;
                qi.qiatual = 68;
            } else {
                hp.hpatual = 38;
                qi.qiatual = 48;
            }
            }
            else if (nivel.nivelatual === 2 && xp.xpatual >= 30) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 71;
                qi.qiatual = 77;
            } else {
                hp.hpatual = 47;
                qi.qiatual = 57;
            }
            }
            else if (nivel.nivelatual === 3 && xp.xpatual >= 60) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 83;
                qi.qiatual = 87;
            } else {
                hp.hpatual = 57;
                qi.qiatual = 67;
            }
            }
            else if (nivel.nivelatual === 4 && xp.xpatual >= 100) {
            nivel.nivelatual++;
            ataque.ataqueatual += 5;
            if (nivelfacil) {
                hp.hpatual = 96;
                qi.qiatual = 98;
            } else {
                hp.hpatual = 68;
                qi.qiatual = 78;
            }
            }
            else if (nivel.nivelatual === 5 && xp.xpatual >= 150) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 110;
                qi.qiatual = 110;
            } else {
                hp.hpatual = 80;
                qi.qiatual = 90;
            }
            }
            else if (nivel.nivelatual === 6 && xp.xpatual >= 210) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 123;
                qi.qiatual = 121;
            } else {
                hp.hpatual = 91;
                qi.qiatual = 101;
            }
            }
            else if (nivel.nivelatual === 7 && xp.xpatual >= 280) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 135;
                qi.qiatual = 131;
            } else {
                hp.hpatual = 101;
                qi.qiatual = 111;
            }
            }
            else if (nivel.nivelatual === 8 && xp.xpatual >= 360) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 146;
                qi.qiatual = 140;
            } else {
                hp.hpatual = 110;
                qi.qiatual = 120;
            }
            }
            else if (nivel.nivelatual === 9 && xp.xpatual >= 450) {
            nivel.nivelatual++;
            ataque.ataqueatual += 5;
            if (nivelfacil) {
                hp.hpatual = 155;
                qi.qiatual = 148;
            } else {
                hp.hpatual = 118;
                qi.qiatual = 128;
            }
            }
            else if (nivel.nivelatual === 10 && xp.xpatual >= 550) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 163;
                qi.qiatual = 155;
            } else {
                hp.hpatual = 125;
                qi.qiatual = 135;
            }
            }
            else if (nivel.nivelatual === 11 && xp.xpatual >= 610) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 171;
                qi.qiatual = 162;
            } else {
                hp.hpatual = 132;
                qi.qiatual = 142;
            }
            }
            else if (nivel.nivelatual === 12 && xp.xpatual >= 670) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 179;
                qi.qiatual = 169;
            } else {
                hp.hpatual = 139;
                qi.qiatual = 149;
            }
            }
            else if (nivel.nivelatual === 13 && xp.xpatual >= 730) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 187;
                qi.qiatual = 176;
            } else {
                hp.hpatual = 146;
                qi.qiatual = 156;
            }
            }
            else if (nivel.nivelatual === 14 && xp.xpatual >= 790) {
            nivel.nivelatual++;
            ataque.ataqueatual += 5;
            if (nivelfacil) {
                hp.hpatual = 196;
                qi.qiatual = 184;
            } else {
                hp.hpatual = 154;
                qi.qiatual = 164;
            }
            }
            else if (nivel.nivelatual === 15 && xp.xpatual >= 850) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 206;
                qi.qiatual = 193;
            } else {
                hp.hpatual = 163;
                qi.qiatual = 173;
            }
            }
            else if (nivel.nivelatual === 16 && xp.xpatual >= 900) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 217;
                qi.qiatual = 203;
            } else {
                hp.hpatual = 173;
                qi.qiatual = 183;
            }
            }
            else if (nivel.nivelatual === 17 && xp.xpatual >= 940) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 229;
                qi.qiatual = 214;
            } else {
                hp.hpatual = 184;
                qi.qiatual = 194;
            }
            }
            else if (nivel.nivelatual === 18 && xp.xpatual >= 970) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 242;
                qi.qiatual = 226;
            } else {
                hp.hpatual = 196;
                qi.qiatual = 206;
            }
            }
            else if (nivel.nivelatual === 19 && xp.xpatual >= 1000) {
            nivel.nivelatual++;
            ataque.ataqueatual++;
            if (nivelfacil) {
                hp.hpatual = 256;
                qi.qiatual = 240;
            } else {
                hp.hpatual = 210;
                qi.qiatual = 220;
            }
            }
            else {
            // Não sobe mais níveis
            break;
            }
        }

        if (nivel.nivelatual > niveisAntes) {
            dialogoagora.innerText = `Você subiu do nível ${niveisAntes} para o nível ${nivel.nivelatual}!`;
            retangulo.style.display = "block";
            fundo.style.display = "none";
            dialogoagora.style.display = "block";

            a.input.keyboard.once("keydown-Z", () => {
            fundo.style.display = "none";
            dialogoagora.innerText = "Fim da demo!"
            a.input.keyboard.once("keydown-Z",()=>{
                dialogoagora.style.display = "none"
                retangulo.style.display = "none"
                location.reload()
            })
            
            });
        } 
        }


    function fimdebatalha(){
        dialogo = true;
        opcoes = false;
        inimigo.style.display = "none";
        caixabatalha.style.display = "none";
        caixaataque.style.display = "none";
        mostraataque.style.display = "none";
        mostraqi.style.display = "none";
        itens.style.display = "none";
        mostradefesa.style.display = "none";
        fugir.style.display = "none";
        seta.style.display = "none";
        vida.style.display = "none";
        qijogador.style.display = "none";
        nomejogador.style.display = "none";
        fundo.style.display = "none"
        
        if(hpadv <= 0){
            dialogoagora.innerText= "Voce ganhou!";
            retangulo.style.display = "block";
            dialogoagora.style.display = "block";
            a.input.keyboard.once("keydown-Z", ()=>{
                dialogoagora.innerText = "Voce respondeu: " + perguntasfeitas +" perguntas";
                a.input.keyboard.once("keydown-Z", ()=>{
                    dialogoagora.innerText = "Voce acertou: " + perguntascertas + " perguntas";
                    a.input.keyboard.once("keydown-Z", ()=>{
                        dialogoagora.innerText = "Voce errou: " + perguntaserradas + " perguntas";
                        a.input.keyboard.once("keydown-Z",()=>{
                            if (perguntascertas === perguntasfeitas){
                                xp.xpatual+=50
                                dialogoagora.innerText = "Você recebeu 50 xp!"
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    subirnivel()  
                                });
                            }
                            else if(perguntascertas < perguntasfeitas && perguntascertas > perguntaserradas){
                                xp.xpatual+=30
                                dialogoagora.innerText = "Você recebeu 30 xp!"
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    subirnivel()  
                                });
                            }
                            else if (perguntascertas === perguntaserradas){
                                xp.xpatual+=20
                                dialogoagora.innerText = "Você recebeu 20 xp!"
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    subirnivel()  
                                });
                            }
                            else{
                                xp.xpatual +=10
                                dialogoagora.innerText = "Você recebeu 10 xp!"
                                a.input.keyboard.once("keydown-Z", ()=>{
                                    subirnivel()  
                                });
                            }
                            })
                        
                        
                    });
                });
            });
        }
        else{
            dialogoagora.innerText = "Você perdeu...";
            retangulo.style.display = "block";
            dialogoagora.style.display = "block";
            a.input.keyboard.once("keydown-Z", ()=>{
                fundo.style.display = "none";
                perdeu = true
                dialogoagora.innerText = "Fim da demo!"
                a.input.keyboard.once("keydown-Z",()=>{
                    dialogoagora.style.display = "none"
                    retangulo.style.display = "none"
                    location.reload()
                })
            });
        }
    
    }

   


}

export class Facil extends Phaser.Scene { //comeca a cena
    constructor() {
        super("Facil");
    }

    preload() { }

    create() {
       
        fundo.style.display = "block"; //mostra o fundo
        inimigo.style.display = "block";//mostra o inimigo

        //dialogo inicial da batalha

        dialogoagora.innerText = "Letícia bloqueia o caminho.";
        retangulo.style.display = "block";
        dialogoagora.style.display = "block";

        this.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";

            batalha(this); 
        });
    }
}