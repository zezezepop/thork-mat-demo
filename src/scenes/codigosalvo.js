import { hp, qi, nivel, ataque, defesa, magias } from './variaveis.js'; //status do personagem
import { nome, genero } from './Game.js';
import {bens} from './inicio3.js'; // os itens do jogador

ataque.ataqueatual = 5 // ataque atual do jogador. No nivel facil é 5, nos demais niveis, vai ser 2
defesa.defesaatual = 5 // idem
let turno = true; //controla os turnos. Se for true, é o turno do jogador, se for false,é o turno do adversario.
hp.hpatual = 50; // hp do jogador. No nivel facil vai ser 50, nos demais 30
qi.qiatual = 60; // qi do jogador. Vai ser necessario para usar as magias de qi. No nivel facil vai comecar om 60, nos demais niveus vai ser menor(vc escolhe)
let sedefendeu = false //false: o jogador n se defendeu. true: o jogador se defendeu com sucesso e vai receber menos dano do inimigo
let vidaescudo = null //a vida do escudo casoa gente use uma magia de qi defensiva. Quando chegar a 0, o escudo vai quebrar. Se acima de 0, vai diminuir o dano tomado(dependendo da magia q escolhemos)
let dialogo = false; // variavel q verifica se esta tendo algum dialogo ou nao
let boss = true; //verifica se o inimigo q estamos lutando é um boss ou nao. em bosses, nao é possivel fugir.
let leticiaataque = "Léticia tenta te dar um soco na fuça."; //dialogos para a batalha caso o adv ataque
let generoinimigo = "feminino"; // genero do inimigo, serve para questoes esteticas apenas, como uso de pronomes
let hpadv = 35; //hp do inimigo pode ou nao ser mair nos outros niveis, ou pode ser menor no fácil, vc escolhe
let qiinimigo = 30; //o tanto de pontos de qi que o inimigo tem. nos outros niveis vao ser maiores. cada ataque de qi vai custar uma quantidade de qi, e se nao tiver essa quantidade, o ataque falha.
let ataqueinimigo = 5; //ataque do inimigo
let defesainimiho = 3;//defesa do inimigo
let forcaqinimigo = 2;//forca dos ataques de qi
let fraquezainimigo = [ ]; //fraquezas do inimigo. As fraquezas podem ser: 'ataque fisico'(quando vc usa um ataque normal), e os diversos tipos de ataues de qi. Ela, no caso, vai ser fraca contra ataques de qi(APENAS OS DE ATAQUE, que sao: PK Matemágica(da dano em area(isso n é importante agora pois ela esta lutando sozinha), e vai custar mais qi que o pk algebra. Nao pode ser um custo mt alto pq é um ataque inicial do jogo), PK Argh-gebra(ataca so um inimigo, dá mais dano q o pk matemagica e custa menos.)), PK Pi-ramide(ataca um so inimigo. da mais dano e custa mais qi que os outros, porem so é desbloqueavel no nivel 5), PK Fat-orra(dano em area. mais fraco q piramide e tem o custo de qi maior, porem é mais forte q pk matemagica e algebra. desbloquavel no nivel 9), PK Logardor(dano em area. o mais forte ate agr, mas custa mais qi q os outros. desbloquavel no nivel 13) e PK TriGO-nito(ataca um inimigo por vez, mais fraco q logardor, porem tem a chance de atacar duas vezes. custa menos qi que o anterior.)
//Outras magias de qi: magias defensivas: o jogador n vai ter nenhuma magia defensiva ate o nivel 3. A primeira magia q ele vai desbloquear é: PK Parênteseguros(desbloqueavel no nivel 3, defesa mediocre, mas o custo de qi é baixo), PK Fração de Dano(desbloqueavel apenas no nivel 6, mais forte q o anterior, mas custa mais qi.) PK Divi-nega(desbloqueia no nivel 10, mais fraco q o anteriror, mas tem uma chance de bloquear todo o ataque do inimigo e o jogador nao tomar dano.), PK Contra-ângulo(desbloqueia no nivel 14, defesa fraca, mas reflete os ataques do inimigo.), PK Constante-C(desbloqueia no nivel 18, defesa mais forte de todas. O custo de qi vai ser mais alto, mas vai valer a pena.)
//magias de cura: curam o jogador. A primeira magia so vai ser possivel a partir no nivel 3. PK Soma)desbloqueia no nivel 3, cura mediocre para quebrar o galho.), PK Media Boa(desbloqueia no nivel 7, cura mais forte, custa mais qi.), PK Zera Tudo(desbloqueavel no nivel 8, nao cura, mas remove os efeitos negativos(se vc achar interessante adcionar)), PK Arredon-dói(nivel 11, custa pouco qi, porem a cura é completamente aleatoria, podendo ser muito boa ou muito baixa.), PK Limite(nivel 16, melhor cura do jogo, porem a mais cara.)
let imunidadeinimigo = [ ]; //ataques que o inimigo é imune. Apenas ataques ofensivos, como fisicos ou de qi. Se vc usar um ataque que o inimigo é imune, ele vai receber muito pouco dano desse ataque. No nivel facil, ela n vai ter nenhuma imunidade, mas nos demais niveis ela vai ter imunidade a ataques fisicos.
let opcoes = true
let abriuitens = false
let pagina1 = true
let pagina2 = false
let pagina3 = false
let pagina4 = false
let lugarfuga = "Inicio3" //variavel com o nome da cena caso o jogador consiga fugir
let anuloucontas = false
let erros = 0;
let piordecisao = 0;
let teveoportunidade = 0;
let danofisico = 5;
let danomagico = 0;
let ataquefisico = false;
let ataquedeqi = false;
let vencedor = "Sem vencedor ainda";
let rank = "A"
let defesadeqi = false;
let chatgpt = false;
let tempoInicioBatalha;
let tempoFimBatalha;
let hpmaximo = 50;


export function turnos(a) { //funcao com os turnos do jogador e adv
    let caixaataque = document.getElementById("caixaataque"); //caixa onde vc pode escolher se vai atacar, defender, etc.
    //elementos visuais para o jogador escolher qual açao tomar
    let ataque = document.getElementById("ataque");
    let mostraqi = document.getElementById("qi");
    let itens = document.getElementById("itens");
    let defesa = document.getElementById("defesa");
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

    //fundo e valentona
    let fundo = document.getElementById("batalhafundo"); //mostra o fundo da batalha(algumas batalhas vao ter fundos diferentes)
    let inimigo = document.getElementById("valentona");

    //mostra o elemento
    caixabatalha.style.display = "block";
    caixaataque.style.display = "block";
    ataque.style.display = "block";
    mostraqi.style.display = "block";
    itens.style.display = "block";
    defesa.style.display = "block";
    fugir.style.display = "block";
    seta.style.display = "block";
    vida.style.display = "block"
    qiatual.style.display = "block"
    nomejogador.style.display = "block";
    nomejogador.innerText = nome;
    seta.innerText = ">";
    
    //pega o y e x da seta no css
    let yseta = parseInt(getComputedStyle(seta).marginTop);
    let xseta = parseInt(getComputedStyle(seta).marginLeft);

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
                    xseta = 155;
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
                else if(xseta === 25 && yseta === 32 && bens.lenght ===5){
                    xseta = 225
                }
                else if(xseta === 25 && yseta === 78 && bens.lenght ===6){
                    xseta = 225
                }
                else if(xseta === 25 && yseta === 32 && bens.lenght ===3){
                    xseta= 125
                }
                else if(xseta === 25 && yseta === 78 && bens.lenght ===4){
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
    window.addEventListener("keydown", movimentosetinha);// um novo listener é criado


    function usarmagia(a) {   //AQUI É ONDE VOCE VAI MEXER NAS MAGIAS
    // Corrige bug de páginas e múltiplos listeners
    pagina1 = true;
    pagina2 = false;
    pagina3 = false;
    pagina4 = false;

    // Remove listeners anteriores corretamente
    movermagia.replaceWith(movermagia.cloneNode(true));
    movermagia = document.getElementById("proximapagina");

    // Agora adiciona o listener de novo
    movermagia.addEventListener("click", moveamagia);

    // Remove e adiciona os outros listeners normalmente
    pkmatematica.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Matemática"
        descricao.innerText = "Lança teoremas instáveis. Dano mágico em área./n/nCusto de QI: 15"
        requisitos.style.display = "block"
    })
    pkmatematica.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkalgebra.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Argh-gebra"
        descricao.innerText = "X, Y, dor. Envia variáveis que explodem.\n\nCusto de QI: 10"
        requisitos.style.display = "block"
    })
    pkalgebra.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkparenteses.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Parênteseseguro"
        descricao.innerText = "Cria um escudo que te isola do mundo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkparenteses.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pksoma.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Soma"
        descricao.innerText = "Recupera um pouco de HP. Serve pra quebrar galho.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pksoma.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkpiramide.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Pi-râmide"
        descricao.innerText = "Gira e lança formas geométricas pontiagudas.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkpiramide.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkfracao.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Fração"
        descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkfracao.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkmediaboa.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Media Boa"
        descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkmediaboa.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkzeratudo.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Zera Tudo"
        descricao.innerText = "Apaga status negativos com um pano de cálculo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkzeratudo.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkfatora.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Fat-orra"
        descricao.innerText = "Divide o inimigo e torra cada fator.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkfatora.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkdivinega.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Divi-nega"
        descricao.innerText = "Divide o ataque inimigo... por zero.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkdivinega.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkarredondar.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Arredon-dói"
        descricao.innerText = "Cura arredondando. Às vezes pra cima, às vezes para baixo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkarredondar.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pklogaritmo.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Logar-dor"
        descricao.innerText = "Cresce devagar, mas quando dói, dói log.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pklogaritmo.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkcontraangulo.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Contra-Ângulo"
        descricao.innerText = "Reflete o golpe com geometria pura.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkcontraangulo.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pklimite.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Limite"
        descricao.innerText = "Restaura quase tudo, quase sempre.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pklimite.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pktrigonometria.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK TriGO-nito"
        descricao.innerText = "Ataca com um raio de cossenos e trauma.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pktrigonometria.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkconstante.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Constante-C"
        descricao.innerText = "Te deixa inabalável. Rígido como número fixo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkconstante.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkmatematica.removeEventListener("click", usarpkmatematica);
    pkalgebra.removeEventListener("click", usarpkalgebra);
    pkparenteses.removeEventListener("click", usarpkparenteses);
    pksoma.removeEventListener("click", usarpksoma);
    pkpiramide.removeEventListener("click", usarpkpiramide)
    pkfracao.removeEventListener("click", usarpkfracao)
    pkmediaboa.removeEventListener("click", usarpkmediaboa)
    pkzeratudo.removeEventListener("click", usarpkzeratudo)
    pkfatora.removeEventListener("click", usarpkfatora)
    pkdivinega.removeEventListener("click", usarpkdivinega)
    pkarredondar.removeEventListener("click", usarpkarredondoi)
    pklogaritmo.removeEventListener("click", usarpklogardor)
    pkcontraangulo.removeEventListener("click", usarpkcontraangulo)
    pklimite.removeEventListener("click", usarpklimite)
    pktrigonometria.removeEventListener("click", usarpktrigonito)
    pkconstante.removeEventListener("click", usarpkconstante)



    //adciona os eventos

    pkmatematica.addEventListener("click", usarpkmatematica);
    pkalgebra.addEventListener("click", usarpkalgebra);
    pkparenteses.addEventListener("click", usarpkparenteses);
    pksoma.addEventListener("click", usarpksoma);
    pkpiramide.addEventListener("click", usarpkpiramide)
    pkfracao.addEventListener("click", usarpkfracao)
    pkmediaboa.addEventListener("click", usarpkmediaboa)
    pkzeratudo.addEventListener("click", usarpkzeratudo)
    pkfatora.addEventListener("click", usarpkfatora)
    pkdivinega.addEventListener("click", usarpkdivinega)
    pkarredondar.addEventListener("click", usarpkarredondoi)
    pklogaritmo.addEventListener("click", usarpklogardor)
    pkcontraangulo.addEventListener("click", usarpkcontraangulo)
    pklimite.addEventListener("click", usarpklimite)
    pktrigonometria.addEventListener("click", usarpktrigonito)
    pkconstante.addEventListener("click", usarpkconstante)
    pkmatematica.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Matemática"
        descricao.innerText = "Lança teoremas instáveis. Dano mágico em área./n/nCusto de QI: 15"
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
        descricao.innerText = "Cria um escudo que te isola do mundo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkparenteses.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pksoma.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Soma"
        descricao.innerText = "Recupera um pouco de HP. Serve pra quebrar galho.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pksoma.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkpiramide.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Pi-râmide"
        descricao.innerText = "Gira e lança formas geométricas pontiagudas.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkpiramide.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkfracao.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Fração"
        descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkfracao.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkmediaboa.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Media Boa"
        descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkmediaboa.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkzeratudo.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Zera Tudo"
        descricao.innerText = "Apaga status negativos com um pano de cálculo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkzeratudo.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkfatora.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Fat-orra"
        descricao.innerText = "Divide o inimigo e torra cada fator.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkfatora.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkdivinega.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Divi-nega"
        descricao.innerText = "Divide o ataque inimigo... por zero.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkdivinega.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkarredondar.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Arredon-dói"
        descricao.innerText = "Cura arredondando. Às vezes pra cima, às vezes para baixo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkarredondar.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pklogaritmo.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Logar-dor"
        descricao.innerText = "Cresce devagar, mas quando dói, dói log.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pklogaritmo.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkcontraangulo.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Contra-Ângulo"
        descricao.innerText = "Reflete o golpe com geometria pura.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkcontraangulo.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pklimite.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Limite"
        descricao.innerText = "Restaura quase tudo, quase sempre.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pklimite.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pktrigonometria.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK TriGO-nito"
        descricao.innerText = "Ataca com um raio de cossenos e trauma.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pktrigonometria.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkconstante.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Constante-C"
        descricao.innerText = "Te deixa inabalável. Rígido como número fixo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkconstante.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })


    // Primeiro, remove os listeners antigos (se já existirem)
    pkmatematica.removeEventListener("click", usarpkmatematica);
    pkalgebra.removeEventListener("click", usarpkalgebra);
    pkparenteses.removeEventListener("click", usarpkparenteses);
    pksoma.removeEventListener("click", usarpksoma);
    pkpiramide.removeEventListener("click", usarpkpiramide)
    pkfracao.removeEventListener("click", usarpkfracao)
    pkmediaboa.removeEventListener("click", usarpkmediaboa)
    pkzeratudo.removeEventListener("click", usarpkzeratudo)
    pkfatora.removeEventListener("click", usarpkfatora)
    pkdivinega.removeEventListener("click", usarpkdivinega)
    pkarredondar.removeEventListener("click", usarpkarredondoi)
    pklogaritmo.removeEventListener("click", usarpklogardor)
    pkcontraangulo.removeEventListener("click", usarpkcontraangulo)
    pklimite.removeEventListener("click", usarpklimite)
    pktrigonometria.removeEventListener("click", usarpktrigonito)
    pkconstante.removeEventListener("click", usarpkconstante)
    movermagia.removeEventListener("click", moveamagia);
    pkmatematica.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Matemática"
        descricao.innerText = "Lança teoremas instáveis. Dano mágico em área.\n\nCusto de QI: 15"
        requisitos.style.display = "block"
    })
    pkmatematica.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkalgebra.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Argh-gebra"
        descricao.innerText = "X, Y, dor. Envia variáveis que explodem.\n\nCusto de QI: 10"
        requisitos.style.display = "block"
    })
    pkalgebra.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkparenteses.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Parenteseseguro"
        descricao.innerText = "Cria um escudo que te isola do mundo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkparenteses.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pksoma.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Soma"
        descricao.innerText = "Recupera um pouco de HP. Serve pra quebrar galho.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pksoma.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkpiramide.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Pi-râmide"
        descricao.innerText = "Gira e lança formas geométricas pontiagudas.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkpiramide.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkfracao.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Fração"
        descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkfracao.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkmediaboa.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Media Boa"
        descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkmediaboa.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkzeratudo.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Zera Tudo"
        descricao.innerText = "Apaga status negativos com um pano de cálculo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkzeratudo.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkfatora.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Fat-orra"
        descricao.innerText = "Divide o inimigo e torra cada fator.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkfatora.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkdivinega.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Divi-nega"
        descricao.innerText = "Divide o ataque inimigo... por zero.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkdivinega.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkarredondar.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Arredon-dói"
        descricao.innerText = "Cura arredondando. Às vezes pra cima, às vezes para baixo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkarredondar.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pklogaritmo.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Logar-dor"
        descricao.innerText = "Cresce devagar, mas quando dói, dói log.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pklogaritmo.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkcontraangulo.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Contra-Ângulo"
        descricao.innerText = "Reflete o golpe com geometria pura.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkcontraangulo.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pklimite.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Limite"
        descricao.innerText = "Restaura quase tudo, quase sempre.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pklimite.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pktrigonometria.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK TriGO-nito"
        descricao.innerText = "Ataca com um raio de cossenos e trauma.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pktrigonometria.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkconstante.removeEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Constante-C"
        descricao.innerText = "Te deixa inabalável. Rígido como número fixo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkconstante.removeEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })

    // Depois, adiciona os novos
    pkmatematica.addEventListener("click", usarpkmatematica);
    pkalgebra.addEventListener("click", usarpkalgebra);
    pkparenteses.addEventListener("click", usarpkparenteses);
    pksoma.addEventListener("click", usarpksoma);
    pksoma.addEventListener("click", usarpksoma);
    pkpiramide.addEventListener("click", usarpkpiramide)
    pkfracao.addEventListener("click", usarpkfracao)
    pkmediaboa.addEventListener("click", usarpkmediaboa)
    pkzeratudo.addEventListener("click", usarpkzeratudo)
    pkfatora.addEventListener("click", usarpkfatora)
    pkdivinega.addEventListener("click", usarpkdivinega)
    pkarredondar.addEventListener("click", usarpkarredondoi)
    pklogaritmo.addEventListener("click", usarpklogardor)
    pkcontraangulo.addEventListener("click", usarpkcontraangulo)
    pklimite.addEventListener("click", usarpklimite)
    pktrigonometria.addEventListener("click", usarpktrigonito)
    pkconstante.addEventListener("click", usarpkconstante)
    movermagia.addEventListener("click", moveamagia);
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
        descricao.innerText = "Cria um escudo que te isola do mundo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkparenteses.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pksoma.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Soma"
        descricao.innerText = "Recupera um pouco de HP. Serve pra quebrar galho.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pksoma.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkpiramide.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Pi-râmide"
        descricao.innerText = "Gira e lança formas geométricas pontiagudas.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkpiramide.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkfracao.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Fração"
        descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkfracao.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkmediaboa.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Media Boa"
        descricao.innerText = "Reduz todo dano a uma pequena parte.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkmediaboa.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkzeratudo.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Zera Tudo"
        descricao.innerText = "Apaga status negativos com um pano de cálculo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkzeratudo.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkfatora.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Fat-orra"
        descricao.innerText = "Divide o inimigo e torra cada fator.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkfatora.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkdivinega.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Divi-nega"
        descricao.innerText = "Divide o ataque inimigo... por zero.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkdivinega.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkarredondar.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Arredon-dói"
        descricao.innerText = "Cura arredondando. Às vezes pra cima, às vezes para baixo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkarredondar.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pklogaritmo.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Logar-dor"
        descricao.innerText = "Cresce devagar, mas quando dói, dói log.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pklogaritmo.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkcontraangulo.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Contra-Ângulo"
        descricao.innerText = "Reflete o golpe com geometria pura.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkcontraangulo.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pklimite.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Limite"
        descricao.innerText = "Restaura quase tudo, quase sempre.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pklimite.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pktrigonometria.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK TriGO-nito"
        descricao.innerText = "Ataca com um raio de cossenos e trauma.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pktrigonometria.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    pkconstante.addEventListener("mouseenter", ()=>{
        titulopk.innerText = "PK Constante-C"
        descricao.innerText = "Te deixa inabalável. Rígido como número fixo.\n\nCusto de QI: (adcione aqui o custo de qi)"
        requisitos.style.display = "block"
    })
    pkconstante.addEventListener("mouseleave", ()=>{
        requisitos.style.display = "none"
    })
    }

    // Funções internas de cada magia
    function usarpkmatematica() { //<-----MEXA AQUI, PK MATEMATICA,
        magias.style.display = "none";
        retangulo.style.display = "block";
        let numero1 = Math.floor(Math.random()* 10) + 1;
        let numero2 = Math.floor(Math.random()* 10) + 1;
        let resposta = numero1 * numero2;
        pergunta.innerText = `Qual a resposta de ${numero1} X ${numero2}`;
        matematicadojogo.style.display = "block";
        pergunta.style.display = "block";
        digitarresposta.style.display = "block";
        responderpergunta.style.display = "block";
        responderpergunta.onclick = () =>{
            teveoportunidade += 1;
            matematicadojogo.style.display = "none";
            pergunta.style.display = "none";
            digitarresposta.style.display = "none";
            responderpergunta.style.display = "none";
            let respostadada = document.getElementById("digiteresposta").value;
            if (respostadada === resposta.toString()){
                if (qi.qiatual > 15 || qi.qiatual === 15){
                    ataquedeqi = true;
                    danomagico = 5;
                    qi.qiatual -= 15;
                    dialogoagora.innerText = "Você usou PK Matemágica!";
                    dialogoagora.style.display = "block";
                }
                else{
                    piordecisao += 1
                    dialogoagora.innerText = "Você não consegue usar PK Matemágica!";
                    dialogoagora.style.display = "block";
                    a.input.keyboard.once("keydown-Z", () => {
                        dialogoagora.innerText = "Você não tem qi suficiente";
                    })
                }
                a.input.keyboard.once("keydown-Z", () => {
                    digitarresposta.value = ""
                    retangulo.style.display = "none";
                    dialogoagora.style.display = "none";
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });
            }
            else {
                erros += 1;
                dialogoagora.innerText = "Você tenta usar PK Matemágica!";
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    dialogoagora.innerText = "Não conseguiu usar!";
                    a.input.keyboard.once("keydown-Z", () => {
                        dialogoagora.innerText = "Você se pergunta o que fez errado!";
                        a.input.keyboard.once("keydown-Z", () => {
                            digitarresposta.value = "";
                            retangulo.style.display = "none";
                            dialogoagora.style.display = "none";
                            dialogo = false;
                            turno = false;
                            window.removeEventListener("keydown", turnodojogador);
                            turnos(a);
                        });
                    });
                });
            }
        }
    }

    function usarpkalgebra() { //AS DEMAIS MAGIAS 
        magias.style.display = "none";
        retangulo.style.display = "block";
        let numero1 = Math.floor(Math.random()* 10) + 1;
        let numero2 = Math.floor(Math.random()* 10) + 1;
        let resposta = numero1 * numero2;
        if(anuloucontas === true){
            if (contador >= 3){
                anuloucontas = false;
            }
            else{
                pergunta.innerText = `A resposta è ${resposta}`
                contador += 1
            }
        }
        else{
             pergunta.innerText = `Qual a resposta de ${numero1} X ${numero2}`
            }
        matematicadojogo.style.display = "block";
        pergunta.style.display = "block";
        digitarresposta.style.display = "block";
        responderpergunta.style.display = "block";
        responderpergunta.onclick = () =>{
            teveoportunidade += 1;
            matematicadojogo.style.display = "none";
            pergunta.style.display = "none";
            digitarresposta.style.display = "none";
            responderpergunta.style.display = "none";
            let respostadada = document.getElementById("digiteresposta").value;
            if (respostadada === resposta.toString()){
                digitarresposta.value = "";
                if (qi.qiatual > 10 || qi.qiatual === 10){
                    ataquedeqi = true;
                    danomagico = 9;
                    qi.qiatual -= 10;
                    dialogoagora.innerText = "Você usou PK Argh-gebra!";
                    dialogoagora.style.display = "block";
                }
                else{
                    piordecisao += 1;
                    dialogoagora.innerText = "Você não tem qi suficiente";
                    dialogoagora.style.display = "block";
                }
                a.input.keyboard.once("keydown-Z", () => {
                    retangulo.style.display = "none";
                    dialogoagora.style.display = "none";
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });
            }
            else {
                erros += 1;
                digitarresposta.value = "";
                dialogoagora.innerText = "Você tenta usar PK Argh-gebra!";
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    dialogoagora.innerText = "Não conseguiu usar!";
                    a.input.keyboard.once("keydown-Z", () => {
                        dialogoagora.innerText = "PK Argh-gebra é dificil demais para você!";
                        a.input.keyboard.once("keydown-Z", () => {
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        dialogo = false;
                        turno = false;
                        window.removeEventListener("keydown", turnodojogador);
                        turnos(a);
                        });
                    });
                });
            }
        }
    }
        
    

    function usarpkparenteses() {
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Parênteseguros!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }

    function usarpksoma() {
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Soma!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }

    function usarpkpiramide(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Pi-râmide!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpkmediaboa(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Media Boa!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpkfracao(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Fação!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpkzeratudo(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Zera Tudo!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpkfatora(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Fat-orra!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpkdivinega(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Divi-nega!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpkarredondoi(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Arredon-dói!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpklogardor(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Logar-dor!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }

    function usarpkcontraangulo(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Contra-Ângulo!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpklimite(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Limite!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpktrigonito(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK TriGO-nito!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function usarpkconstante(){
        magias.style.display = "none";
        retangulo.style.display = "block";
        dialogoagora.innerText = "Você usou PK Constante-C!";
        dialogoagora.style.display = "block";
        a.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";
            dialogo = false;
            turno = false;
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);
        });
    }
    function moveamagia(){
        if(pagina1 === true && nivel.nivelatual>=3){
            pkmatematica.style.display = "none"
            pkalgebra.style.display = "none"
            pkparenteses.style.display = "none"
            pksoma.style.display = "none"
            pagina1 = false
            pagina2 = true
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
                pkzeratudo.style.display= "block"
            }
            
        }
        else if(pagina2 === true && nivel.nivelatual>8){
            pagina2 = false
            pagina3 = true
            pkpiramide.style.display = "none"
            pkfracao.style.display = "none"
            pkmediaboa.style.display = "none"
            pkzeratudo.style.display = "none"
            if (nivel.nivelatual>=9){
                pkfatora.style.display = "block"
            }
            if(nivel.nivelatual>=10){
                pkdivinega.style.display = "block"
            }
            if(nivel.nivelatual>11){
                pkarredondar.style.display = "block"
            }
            if(nivel.nivelatual>=13){
                pklogaritmo.style.display = "block"
            }
        }
        else if (pagina2 === true && nivel.nivelatual<=8){
            pagina2 = false
            pagina1 = true
            pkpiramide.style.display = "none"
            pkfracao.style.display = "none"
            pkmediaboa.style.display = "none"
            pkzeratudo.style.display = "none"
            pkmatematica.style.display = "block"
            pkalgebra.style.display = "block"
            pkparenteses.style.display = "block"
            pksoma.style.display = "block"

        }
        else if(pagina3 === true && nivel.nivelatual>13){
            pagina4=true
            pagina3=false
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
        else if(pagina4 === true) {
            pagina4 = false
            pagina1 = true
            pkcontraangulo.style.display = "none"
            pklimite.style.display = "none"
            pktrigonometria.style.display = "none"
            pkconstante.style.display = "none"
            pkmatematica.style.display = "block"
            pkalgebra.style.display = "block"
            pkparenteses.style.display = "block"
            pksoma.style.display = "block"
        }
    }




    function turnodojogador(event) { //funcao com o turno do jogador e adversario
        if (dialogo === true) { // se estiver em um dialogo, nao funciona
            return;
        }

        if (event.key=== "z" || event.key === "Z") { //caso o z seja pressionado
            if (xseta === 25 && yseta === 32 && abriuitens ===false && dialogo === false) { // ATAQUE
             
                dialogo = true; // comeca o dialogo mostrando se seu ataque funcionou ou nao
                let chanceatacar = Math.floor(Math.random() * 20) + 1; //chance de 5% de errar
                if (chanceatacar === 1) {  //se vc errou
                    retangulo.style.display = "block"; //mostrando o retangulo que vai ficar os dialogos
                    dialogoagora.innerText = "Você errou..."; //dialogo de erro
                    dialogoagora.style.display = "block";//mostrando o dialogo de erro
                    a.input.keyboard.once("keydown-Z", () => { //continuaçao do dialogo
                        dialogoagora.innerText = "O adversário ri de você!";//outro dialogo
                        a.input.keyboard.once("keydown-Z", () => {//fim do dialogo
                            retangulo.style.display = "none"; //esconde o retangulo
                            dialogoagora.style.display = "none"; //esconde o dialogo
                            dialogo = false;//a variave fica falsa
                            turno = false;//o turno fica false, ou seja, o turno agora é o adversario
                            window.removeEventListener("keydown", turnodojogador);//apaga o listener pra evitar bugs
                            turnos(a);//chama a funcao turnos
                        });
                    });
                } 
                else {//se vocer acertou <-------VOCE VAI MEXER AQUI
                    retangulo.style.display = "block";
                    dialogoagora.innerText = "Você tenta acertar ela!"; //DIALOGO TEMPORARIO
                    dialogoagora.style.display = "block";
                    a.input.keyboard.once("keydown-Z", () => {
                        let numero1 = Math.floor(Math.random()* 10) + 1;
                        let numero2 = Math.floor(Math.random()* 10) + 1;
                        let resposta = numero1 * numero2
                        if(anuloucontas === true){
                            if (contador >= 3){
                                anuloucontas = false;
                            }
                            else{
                                pergunta.innerText = `A resposta è ${resposta}`
                                contador += 1
                            }
                        }
                        else{
                            pergunta.innerText = `Qual a resposta de ${numero1} X ${numero2}`
                        }
                        matematicadojogo.style.display = "block"
                        pergunta.style.display = "block"
                        digitarresposta.style.display = "block"
                        responderpergunta.style.display = "block"
                        responderpergunta.onclick = () =>{
                            responderpergunta.onclick = null;
                            matematicadojogo.style.display = "none"
                            pergunta.style.display = "none"
                            digitarresposta.style.display = "none"
                            responderpergunta.style.display = "none"
                            let respostadada = document.getElementById("digiteresposta").value
                            if (respostadada === resposta.toString()){
                            digitarresposta.value = ""
                            dialogoagora.innerText = "Você acertou ela em cheio!";
                            ataquefisico = true;
                            a.input.keyboard.once("keydown-Z", () => {
                                let rirdela = Math.floor(Math.random() * 5) + 1
                                if (rirdela === 1){
                                danofisico = 6
                                dialogoagora.innerText = "Você ri dela";
                                a.input.keyboard.once("keydown-Z", () => {
                                    retangulo.style.display = "none";
                                    dialogoagora.style.display = "none";
                                    dialogo = false;
                                    turno = false;
                                    window.removeEventListener("keydown", turnodojogador);
                                    turnos(a);
                                });
                                }
                                else if(rirdela === 2){
                                    danofisico = 10
                                    dialogoagora.innerText = "Você acerta ela duas vezes";
                                    a.input.keyboard.once("keydown-Z", () => {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        dialogo = false;
                                        turno = false;
                                        window.removeEventListener("keydown", turnodojogador);
                                        turnos(a);
                                });
                                } 
                                else if (rirdela === 3){
                                    danofisico = 5
                                    dialogoagora.innerText = "Você sabe que se perder está morto";
                                    a.input.keyboard.once("keydown-Z", () => {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        dialogo = false;
                                        turno = false;
                                        window.removeEventListener("keydown", turnodojogador);
                                        turnos(a);
                                });
                                }
                                else{
                                    danofisico = 5
                                    retangulo.style.display = "none";
                                    dialogoagora.style.display = "none";
                                    dialogo = false;
                                    turno = false;
                                    window.removeEventListener("keydown", turnodojogador);
                                    turnos(a);
                                }
                                
                            });
                          } else{
                            digitarresposta.value = ""
                            opcoes = Math.floor(Math.random() * 5) + 1
                            if (opcoes === 1){
                                dialogoagora.innerText = "Você acertou seu amigo!";
                                a.input.keyboard.once("keydown-Z", () => {
                                    dialogoagora.innerText = "Seu amigo fica irritado!";
                                    a.input.keyboard.once("keydown-Z", () => {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        dialogo = false;
                                        turno = false;
                                        window.removeEventListener("keydown", turnodojogador);
                                        turnos(a);
                                        });
                                        });
                            }
                            else if (opcoes === 2 || opcoes === 4){
                                dialogoagora.innerText = "Você escorrega no propio pé";
                                hp.hpatual -= 2
                                a.input.keyboard.once("keydown-Z", () => {
                                    dialogoagora.innerText = "Seu amigo pergunta se você é burro";
                                    a.input.keyboard.once("keydown-Z", () => {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        dialogo = false;
                                        turno = false;
                                        window.removeEventListener("keydown", turnodojogador);
                                        turnos(a);
                                    })
                                    })
                                }
                            else if (opcoes === 3 || opcoes === 5){
                               dialogoagora.innerText = "Você nem sabe o que está fazendo";
                               a.input.keyboard.once("keydown-Z", () => {
                                    dialogoagora.innerText = "Sua adversaria não entendeu nada";
                                    a.input.keyboard.once("keydown-Z", () => {
                                        retangulo.style.display = "none";
                                        dialogoagora.style.display = "none";
                                        dialogo = false;
                                        turno = false;
                                        window.removeEventListener("keydown", turnodojogador);
                                        turnos(a);
                                    })
                                    }) 
                                    }
                                }
                            };
                        });
                    }

            } 
            else if (xseta === 155 && yseta === 32) { // INVENTÁRIO <------ VOCE VAI MEXER AQUI
                if (bens.length === 0){ //caso não tenha itens
                    dialogo = true;
                    retangulo.style.display = "block";
                    dialogoagora.innerText = "Você não tem itens!"; 
                    dialogoagora.style.display = "block";
                    a.input.keyboard.once("keydown-Z", () => {
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        dialogo = false;
                        window.removeEventListener("keydown", turnodojogador);
                        turnos(a);
                    });
                }
                else{ //caso tenha pelo menos 1
                    xseta = 25
                    seta.style.marginLeft = xseta + "px"
                    opcoes = false
                    abriuitens = true
                    ataque.style.display = "none";
                    mostraqi.style.display = "none";
                    itens.style.display = "none";
                    defesa.style.display = "none";
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
                retangulo.style.display = "block";
                if (bens[0] === "Maça"){
                      let numero1 = Math.floor(Math.random()* 10) + 1;
                      let numero2 = Math.floor(Math.random()* 10) + 1;
                      let resposta = numero1 * numero2
                      if(anuloucontas === true){
                            if (contador >= 3){
                                anuloucontas = false;
                            }
                            else{
                                pergunta.innerText = `A resposta è ${resposta}`
                                contador += 1
                            }
                        }
                        else{
                            pergunta.innerText = `Qual a resposta de ${numero1} X ${numero2}`
                        }
                      matematicadojogo.style.display = "block"
                      pergunta.style.display = "block"
                      digitarresposta.style.display = "block"
                      responderpergunta.style.display = "block"
                      responderpergunta.onclick = () =>{
                         matematicadojogo.style.display = "none"
                         pergunta.style.display = "none"
                         digitarresposta.style.display = "none"
                         responderpergunta.style.display = "none"
                         let respostadada = document.getElementById("digiteresposta").value
                         if (respostadada === resposta.toString()){
                           digitarresposta.value = "";
                           hp.hpatual += 15;
                           if (hp.hpatual > hpmaximo){
                            let diferenca = hp.hpatual - hpmaximo
                            hp.hpatual -= diferenca
                           }
                           dialogoagora.innerText = "Você usou  " + bens[0] + "!"; 
                           dialogoagora.style.display = "block";
                         }
                         else{
                            dialogoagora.innerText = "Você tentou usar  " + bens[0] + "...";
                            dialogoagora.style.display = "block";
                            a.input.keyboard.once("keydown-Z", () => {
                                dialogoagora.innerText = "Não conseguiu e perdeu o item!";
                            })
                         } 
                      }
                }
                else if (bens[0] === "Lapizcomtabuada"){
                    dialogoagora.innerText = "Você usou  " + bens[0] + "!"; 
                    dialogoagora.style.display = "block";
                     a.input.keyboard.once("keydown-Z", () => {
                                dialogoagora.innerText = "Você não terá uma conta para resolver no proximo turno";
                                anuloucontas = true
                            })
                }
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(0,1)
                    abriuitens = false
                    opcoes = true
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
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });

            }

            else if(xseta === 25 && yseta === 78 && abriuitens === true){ //INTERAÇAO COM O ITEM 2, VC VAI MEXER AQUI <--------
                dialogo = true;
                retangulo.style.display = "block";
                if (bens[1] === "Lapiz com tabuada"){
                    dialogoagora.innerText = "Você usou  " + bens[1] + "!"; 
                    dialogoagora.style.display = "block";
                     a.input.keyboard.once("keydown-Z", () => {
                                dialogoagora.innerText = "Você não terá contas para resolver no proximo turno";
                                anuloucontas = true
                            })
                }else{
                   dialogoagora.innerText = "Você usou " + bens[1] + "!"; 
                   dialogoagora.style.display = "block";
                }
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(1,1)
                    abriuitens = false
                    opcoes = true
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
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });

            }
            else if(xseta === 125 && yseta === 32 && abriuitens === true){ //INTERAÇAO COM O ITEM 3, VC VAI MEXER AQUI <--------
                dialogo = true;
                retangulo.style.display = "block";
                dialogoagora.innerText = "Você usou " + bens[2] + "!"; 
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(2,1)
                    abriuitens = false
                    opcoes = true
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
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });
            }
            else if(xseta === 125 && yseta === 78 && abriuitens === true){ //INTERAÇAO COM O ITEM 4, VC VAI MEXER AQUI <--------
                dialogo = true;
                retangulo.style.display = "block";
                dialogoagora.innerText = "Você usou " + bens[3] + "!"; 
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(3,1)
                    abriuitens = false
                    opcoes = true
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
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });
            }
            else if(xseta === 225 && yseta === 32 && abriuitens === true){ //INTERAÇAO COM O ITEM 5, VC VAI MEXER AQUI <--------
                dialogo = true;
                retangulo.style.display = "block";
                dialogoagora.innerText = "Você usou " + bens[4] + "!"; 
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(4,1)
                    abriuitens = false
                    opcoes = true
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
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });
            }
            else if(xseta === 225 && yseta === 78 && abriuitens === true){ //INTERAÇAO COM O ITEM 6, VC VAI MEXER AQUI <--------
                dialogo = true;
                retangulo.style.display = "block";
                dialogoagora.innerText = "Você usou " + bens[5] + "!"; 
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(5,1)
                    abriuitens = false
                    opcoes = true
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
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });
            }
            else if(xseta === 325 && yseta === 32 && abriuitens === true){ //INTERAÇAO COM O ITEM 7, VC VAI MEXER AQUI <--------
                dialogo = true;
                retangulo.style.display = "block";
                dialogoagora.innerText = "Você usou " + bens[6] + "!"; 
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(6,1)
                    abriuitens = false
                    opcoes = true
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
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });
            }
            else if(xseta === 325 && yseta === 78 && abriuitens === true){  //INTERAÇAO COM O ITEM 8, VC VAI MEXER AQUI <--------
                dialogo = true;
                retangulo.style.display = "block";
                dialogoagora.innerText = "Você usou " + bens[7] + "!"; 
                dialogoagora.style.display = "block";
                a.input.keyboard.once("keydown-Z", () => {
                    bens.splice(7,1)
                    abriuitens = false
                    opcoes = true
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
                    dialogo = false;
                    turno = false;
                    window.removeEventListener("keydown", turnodojogador);
                    turnos(a);
                });
            }
            else if (xseta === 25 && yseta === 78) { // QI <-----VOCE VAI MEXER AQUI 
                dialogo = true  
                pagina1 = true
                pagina2=false
                pagina3=false
                pagina4=false
                magias.style.display = "block"
                pkparenteses.style.display = nivel.nivelatual>=3? "block" :"none"
                pksoma.style.display = nivel.nivelatual>=3? "block" :"none"
                movermagia.style.display = nivel.nivelatual>5? "block" :"none"
                if (qi.qiatual>=15){
                }
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
                usarmagia(a)
                

            } 
            else if (xseta === 155 && yseta === 78) { // DEFESA <-----VOCE VAI MEXER AQUI
                dialogo = true;
                retangulo.style.display = "block";
                dialogoagora.innerText = "Você tenta se defender!"; //PERGUNTA MATEMATICA. SE O JOGADOR ACERTAR, VAI SE DEFENDER COM SUCESSO E O DANO DO PROXIMO TURNO VAI SER MENOR. SE NAO, VAI DAR ERRADO
                let numero1 = Math.floor(Math.random()* 10) + 1;
                let numero2 = Math.floor(Math.random()* 10) + 1;
                let resposta = numero1 * numero2
                if(anuloucontas === true){
                            if (contador >= 3){
                                anuloucontas = false;
                            }
                            else{
                                pergunta.innerText = `A resposta è ${resposta}`
                                contador += 1
                            }
                        }
                        else{
                            pergunta.innerText = `Qual a resposta de ${numero1} X ${numero2}`
                        }
                matematicadojogo.style.display = "block"
                pergunta.style.display = "block"
                digitarresposta.style.display = "block"
                responderpergunta.style.display = "block"
                responderpergunta.onclick = () =>{
                    matematicadojogo.style.display = "none"
                    pergunta.style.display = "none"
                    digitarresposta.style.display = "none"
                    responderpergunta.style.display = "none"
                    let respostadada = document.getElementById("digiteresposta").value
                    if (respostadada === resposta.toString()){
                        dialogoagora.innerText = "Você se defendeu!";
                        dialogoagora.style.display = "block";
                        sedefendeu = true;
                        a.input.keyboard.once("keydown-Z", () => {
                            digitarresposta.value = ""
                            retangulo.style.display = "none";
                            dialogoagora.style.display = "none";
                            dialogo = false;
                            turno = false;
                            window.removeEventListener("keydown", turnodojogador);
                            turnos(a); 
                        });
                    }
                    else{
                        erros += 1;
                        digitarresposta.value = ""
                        dialogoagora.innerText = "Você não conseguiu se defender!";
                        dialogoagora.style.display = "block";
                        sedefendeu = false;
                        a.input.keyboard.once("keydown-Z", () => {
                            retangulo.style.display = "none";
                            dialogoagora.style.display = "none";
                            dialogo = false;
                            turno = false;
                            window.removeEventListener("keydown", turnodojogador);
                            turnos(a); 
                        }); 
                    } 
                }

            } 
            else { // FUGIR
                dialogo = true;
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
                                window.removeEventListener("keydown", turnodojogador);
                                //turnos(a);
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
                                dialogo = false;
                                turno = false;
                                window.removeEventListener("keydown", turnodojogador);
                                turnos(a);
                            })

                        })

                    }
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
                                dialogo = false;
                                turno = false;
                                window.removeEventListener("keydown", turnodojogador);
                                turnos(a);
                            })

                        })

                    }
                
                
            }
        }

        if ((event.key === "x" || event.key === "X") && abriuitens === true){
            opcoes = true
            abriuitens = false
            dialogo = false
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
            window.removeEventListener("keydown", turnodojogador);
            turnos(a);

        } 
    }

    
    //window.removeEventListener("keydown", movimentosetinha);
    //window.addEventListener("keydown", movimentosetinha);

    /*window.removeEventListener("keydown", turnodojogador); // <-- ADICIONADO
    window.addEventListener("keydown", turnodojogador);  */
    if (turno === true) {
        console.log("É o turno do jogador");
        window.removeEventListener("keydown", turnodojogador);
        window.addEventListener("keydown", turnodojogador);
    } else {
        dialogo = true;
        retangulo.style.display = "block";
        dialogoagora.style.display = "block";
        if (hpadv <= 0 || hp.hpatual <= 0){
            fimdabatalha()
        } 
        else{
            
        

            let acao;

            if (hpadv <= 10){
                acao = Math.random() < 0.7 ? 1 : 2; 
            }
            else {
               if (sedefendeu === true || hp.hpatual < 10 || defesadeqi === true){
                  if (qiinimigo < 10){
                    acao = Math.random() < 0.9 ? 1 : 3; 
                  }
                  else{
                    if (hp.hpatual > 15){
                        acao = Math.random() < 0.5 ? 1 : 3;
                    }
                    else{
                      acao = Math.random() < 0.8 ? 1 : 3;
                    }
                  }
                }
                else if (ataquedeqi === true){
                    if (hpadv <= 10){
                        acao = Math.random() < 0.9 ? 2 : 1;
                    }
                    else if (hpadv <= 15){
                        acao = Math.random() < 0.7 ? 2 : 1;
                    }
                    else{
                        acao = Math.floor(Math.random() * 3) + 1;
                    }
                }
                else{ // ataque fisico
                    if (hpadv <= 10){
                        if(danofisico < hpadv){
                            acao = Math.random() < 0.5 ? 2 : 1;
                        }else{
                            acao = Math.random() < 0.80 ? 2 : 1;
                        }
                    }
                    else if (hpadv <= 15){
                        acao = Math.random() < 0.6 ? 2 : 1;
                    }
                    else{
                        acao = Math.floor(Math.random() * 3) + 1;
                    }
                }

            }

            if (acao === 1) {
                dialogoagora.innerText = "Letícia te deu uma reguada!";

                if (ataquefisico === true){
                    let verificarimunidade = imunidadeinimigo.length;
                    let verificarfraqueza = fraquezainimigo.length;
                    if(verificarimunidade >= 1){
                      if(imunidadeinimigo.includes("ataquefisico")){
                            hpadv -= parseInt(danofisico * 0.6);
                      }
                    }
                    else if(verificarfraqueza >= 1){
                      if(fraquezainimigo.includes("ataquefisico")){
                            let danoadicionalporfraqueza = parseInt(danofisico * 0.6);
                            hpadv -= danofisico + danoadicionalporfraqueza;
                      }
                    }
                    else{
                        hpadv -= danofisico;
                    }
                    ataquefisico = false;
                    }
                
                if(ataquedeqi === true){
                    let verificarimunidade = imunidadeinimigo.length;
                    let verificarfraqueza = fraquezainimigo.length;
                    if(verificarimunidade >= 1){
                      if(imunidadeinimigo.includes("ataquedeqi")){
                            hpadv -= parseInt(danomagico * 0.6);
                      }
                    }
                    else if(verificarfraqueza >= 1){
                      if(fraquezainimigo.includes("ataquedeqi")){
                            let danoadicionalporfraqueza = parseInt(danomagico * 0.6);
                            hpadv -= danomagico + danoadicionalporfraqueza;
                      }
                    }
                    else{
                        hpadv -= danomagico;
                    }
                    ataquedeqi = false;
                }
                
                if (sedefendeu === true){
                        hp.hpatual -= parseInt(ataqueinimigo * 0.6);
                        sedefendeu = false;
                        if (hpadv <= 0 || hp.hpatual <= 0){
                          fimdabatalha()
                          }
                        else{
                            a.input.keyboard.once("keydown-Z", () => {
                            retangulo.style.display = "none";
                            dialogoagora.style.display = "none";
                            dialogo = false;
                            turno = true;
                            turnos(a);
                            }); 
                        }

                }
                else if (defesadeqi === true){
                    let verificarfraqueza = fraquezainimigo.length;
                    if (verificarfraqueza >= 1){
                        if (fraquezainimigo.includes("defezadeqi")){
                            hp.hpatual -= parseInt(ataqueinimigo * 0,3);
                        }
                        else{
                            hp.hpatual -= parseInt(ataqueinimigo * 0.6);
                        }
                    }
                    if (hpadv <= 0 || hp.hpatual <= 0){
                      fimdabatalha()
                    }
                    else{
                    a.input.keyboard.once("keydown-Z", () => {
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        dialogo = false;
                        turno = true;
                        turnos(a);
                    }); 
                    }
                }
                else{
                    hp.hpatual -= danofisico;
                    if (hpadv <= 0 || hp.hpatual <= 0){
                      fimdabatalha()
                    } 
                    else{
                            a.input.keyboard.once("keydown-Z", () => {
                            retangulo.style.display = "none";
                            dialogoagora.style.display = "none";
                            dialogo = false;
                            turno = true;
                            turnos(a);
                            }); 
                    }
                }
                

            } else if (acao === 2) {
                dialogoagora.innerText = "Letícia ficou na defensiva.";
                if (ataquefisico === true){
                    let verificarimunidade = imunidadeinimigo.length;
                    let verificarfraqueza = fraquezainimigo.length;
                    if(verificarimunidade >= 1){
                      if(imunidadeinimigo.includes("ataquefisico")){
                        hpadv -= parseInt(danofisico * 0,4); //imunidade a ataques fisicos anula muito dano
                      }
                      }
                    else if(verificarfraqueza >= 1){
                      if(fraquezainimigo.includes("ataquefisico")){
                         hpadv -= parseInt(danofisico * 0,7); //toma bastante dano mesmo defendendo por ser sua fraqueza
                      }
                    }
                    else{
                        hpadv -= danofisico
                    }
                    ataquefisico = false;
                }
                if(ataquedeqi === true){
                    let verificarimunidade = imunidadeinimigo.length;
                    let verificarfraqueza = fraquezainimigo.length;
                    if(verificarimunidade >= 1){
                      if(imunidadeinimigo.includes("ataquedeqi")){
                            hpadv -= parseInt(danomagico * 0.3);
                      }
                    }
                    else if(verificarfraqueza >= 1){
                      if(fraquezainimigo.includes("ataquedeqi")){
                            let danoadicionalporfraqueza = parseInt(danomagico * 0.6);
                            hpadv -= ((danomagico + danoadicionalporfraqueza) * 0.6);
                      }
                    }
                    else{
                        hpadv -= danomagico;
                    }
                    ataquedeqi = false;
                }
                if (sedefendeu === true) {
                    sedefendeu = false;
                }
                if (defesadeqi === true){
                    defesadeqi = false;
                }
                if (hpadv <= 0 || hp.hpatual <= 0){
                   fimdabatalha()
                }
                else{
                    a.input.keyboard.once("keydown-Z", () => {
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        dialogo = false;
                        turno = true;
                        turnos(a);
                    });
                }

            } else {
                if (ataquefisico === true){
                    let verificarimunidade = imunidadeinimigo.length;
                    let verificarfraqueza = fraquezainimigo.length;
                    if(verificarimunidade >= 1){
                      if(imunidadeinimigo.includes("ataquefisico")){
                            hpadv -= parseInt(danofisico * 0.6);
                      }
                    }
                    else if(verificarfraqueza >= 1){
                      if(fraquezainimigo.includes("ataquefisico")){
                            let danoadicionalporfraqueza = parseInt(danofisico * 0.6);
                            hpadv -= danofisico + danoadicionalporfraqueza;
                      }
                    }
                    else{
                        hpadv -= danofisico;
                    }
                    ataquefisico = false;
                    }
                    
                }
                if(ataquedeqi === true){
                    let verificarimunidade = imunidadeinimigo.length;
                    let verificarfraqueza = fraquezainimigo.length;
                    if(verificarimunidade >= 1){
                      if(imunidadeinimigo.includes("ataquedeqi")){
                            hpadv -= parseInt(danomagico * 0.6);
                      }
                    }
                    else if(verificarfraqueza >= 1){
                      if(fraquezainimigo.includes("ataquedeqi")){
                            let danoadicionalporfraqueza = parseInt(danomagico * 0.6);
                            hpadv -= danomagico + danoadicionalporfraqueza;
                      }
                    }
                    else{
                        hpadv -= danomagico;
                    }
                    ataquedeqi = false;
                }
                if (qiinimigo < 10){
                    dialogoagora.innerText = "Letícia tenta usar equação maligna!";
                }
                else{
                   dialogoagora.innerText = "Letícia usou uma equação maligna!";
                   qiinimigo -= 10;
                }
                

                if (sedefendeu === true){
                    sedefendeu = false;
                }
                else if (defesadeqi === true){
                    defesadeqi = false;
                }
                else{
                    if (qiinimigo > 9){
                      hp.hpatual -= forcaqinimigo;
                    }
                }


                if (hpadv <= 0 || hp.hpatual <= 0){
                   fimdabatalha()
                }
                else{
                    a.input.keyboard.once("keydown-Z", () => {
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        dialogo = false;
                        turno = true;
                        turnos(a);
                    }); 
                }
                }
        }
    

        function fimdabatalha(){
            tempoFimBatalha = Date.now();
            let duracaoMilisegundos = tempoFimBatalha - tempoInicioBatalha;
            let tempodebatalha = duracaoMilisegundos / 1000;
            console.log(tempodebatalha)
            if ( hpadv <= 0){
                vencedor = "jogador"
            }
            else if (hp.hpatual <= 0){
                vencedor = "adversario"
            }

            console.log("acabou a batalha")

            if ((erros >= 3 || piordecisao > 1) && vencedor === "adversario"){
                rank = "F"
            }
            else if ((erros >= 4 || piordecisao >= 1) && vencedor === "jogador"){
                rank = "E"
            }
            else if (erros === 3  && vencedor === "jogador" ){
                rank = "D"
            }
            else if (erros === 2 && vencedor === "jogador"){
                rank = "C"
            }
            else if (erros <= 1 && vencedor === "jogador"){
                rank = "B"
            }
            else if(erros === 0 && vencedor === "jogador" && tempodebatalha < 40 && tempodebatalha > 32){
                rank = "A"
            }
            else if(erros === 0 && vencedor === "jogador" && tempodebatalha < 32 && tempodebatalha > 26){
                rank = "S"
            }
            else if(erros === 0 && vencedor === "jogador" && tempodebatalha <= 26){
                rank = "S+"
                bens.push("ChatGPT")
            }
            else{
                console.log("bug")
            }
            
            dialogoagora.innerText = "A batalha acabou!";
            a.input.keyboard.once("keydown-Z", () => {
                dialogoagora.innerText = `O vencedor foi o ${vencedor}`;
                a.input.keyboard.once("keydown-Z", () => {
                    dialogoagora.innerText = `Parabens,você conseguiu a classificação ${rank} nesta batalha!`;
                    a.input.keyboard.once("keydown-Z", () => {
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        caixabatalha.style.display = "none";
                        caixaataque.style.display = "none";
                        ataque.style.display = "none";
                        mostraqi.style.display = "none";
                        itens.style.display = "none";
                        defesa.style.display = "none";
                        fugir.style.display = "none";
                        seta.style.display = "none";
                        vida.style.display = "none"
                        qiatual.style.display = "none"
                        nomejogador.style.display = "none";
                        retangulo.style.display = "none";
                        dialogoagora.style.display = "none";
                        inimigo.style.display = "none";
                        fundo.style.display = "none";
                        a.scene.start("Posbatalha");
                    });
                });
            });
        
        }

}



 
export class Facil extends Phaser.Scene { //comeca a cena
    constructor() {
        super("Facil");
    }

    preload() { }

    create() {
        let fundo = document.getElementById("batalhafundo"); //mostra o fundo da batalha(algumas batalhas vao ter fundos diferentes)
        let inimigo = document.getElementById("valentona"); //mostra o sprite do inimigo(no caso a leticia)
        let retangulo = document.getElementById('caixadialogo'); //onde vai ser mostrado os dialogos de batalha
        let dialogoagora = document.getElementById("dialogobatalhas"); // o dialogo das batalhas
        fundo.style.display = "block"; //mostra o fundo
        inimigo.style.display = "block";//mostra o inimigo

        //dialogo inicial da batalha

        dialogoagora.innerText = "Letícia bloqueia o caminho.";
        retangulo.style.display = "block";
        dialogoagora.style.display = "block";
        tempoInicioBatalha = Date.now(); //comeca a contar

        this.input.keyboard.once("keydown-Z", () => {
            retangulo.style.display = "none";
            dialogoagora.style.display = "none";

            turnos(this); //Quando o dialogo termina, a funçao é chamada
        });
    }
}