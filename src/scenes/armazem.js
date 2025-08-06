import { genero } from './Game.js'; 
import { nome } from "./Game.js";
export let terminouacao = 0;
let dialogoiniciado = false;
export let nivelfacil = false;
export let nivelmedio = false
export let niveldificil = false;
export let nivelhack = false;
let pegouitem = false;
export let posicaoplayerx = null;
export let posicaoplayery = null;
import { conversou } from "./armazem2.0.js"
let inventarioaberto = false
import { bens} from "./inicio3.js"
import {inventario, hp, qi, ataque, defesa, nivel} from "./variaveis.js"
export let hpmaximo = 0
export let qimaximo = 0
export class Armazem extends Phaser.Scene {
    constructor(){
        super("Armazem");
    }
    preload(){
        this.load.image('provas', 'Assets/provas.jpeg');
        this.load.spritesheet("personagem", "Assets/personagens.png", {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.spritesheet("amigo", "Assets/npc1.jpeg",{
            frameWidth:45,
            frameHeight:68
        })
    }
    create(){
        this.armazem = this.add.image(640, 360, "provas").setScale(0.4);   
              
        let indice = genero == "masculino" ? 2 : 20;

        if (conversou === false){this.jogador = this.physics.add.sprite(640, 460, 'personagem', indice).setScale(2).refreshBody();}
        else{this.jogador = this.physics.add.sprite(posicaoplayerx, posicaoplayery, 'personagem', indice).setScale(2).refreshBody();}
        if (conversou === false){this.amigo = this.physics.add.sprite(735, 450, "amigo",8).setScale(1.5);
        this.amigohitbox = this.add.rectangle(735, 450, 40, 30, 255, 0);
        
        this.physics.add.existing(this.amigohitbox, true);
        this.physics.add.collider(this.jogador, this.amigohitbox);
        
        
        
        
        }
        else{
            this.amigo = this.physics.add.sprite(735, 450, "amigo",8).setScale(1.5).destroy();
            this.physics.add.existing(this.amigohitbox, false);
        }
        

        
        this.item8 = this.add.text(530, 430, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
        this.paredealto = this.add.rectangle(530,250, 1000, 100, 255, 0);
        this.paredebaixo = this.add.rectangle(530, 550, 1000, 50, 255, 0);
        this.parededireita = this.add.rectangle(820, 550, 100, 1000, 255, 0);
        this.paredeesquerda = this.add.rectangle(460, 550, 100, 1000, 255, 0);
        this.porta = this.add.rectangle(640,545, 50, 25, 255, 0);
        this.nivelfacil = this.add.rectangle(480, 370, 50, 300, 255, 0);
        this.nivelmedio = this.add.rectangle(800, 370, 50, 300, 255, 0);
        this.niveldificil = this.add.rectangle(580,300, 50, 25, 255, 0);
        this.niveldificil2 = this.add.rectangle(700,300, 50, 25, 255, 0);
        
        this.nivelhack = this.add.rectangle(640,300, 50, 25, 255, 0);
        this.retangulo = this.add.rectangle(644, 570, 1000, 200, 255, 0.5).setVisible(false);
        let sim = document.getElementById("sim");
        let nao = document.getElementById("nao");
        let senha = document.getElementById("senha");
        let botaoresposta = document.getElementById("resposta");
       

        
        this.physics.add.existing(this.paredealto, true);
        this.physics.add.existing(this.paredebaixo, true);
        this.physics.add.existing(this.parededireita, true);
        this.physics.add.existing(this.paredeesquerda, true);

        
        
        this.physics.add.collider(this.jogador, this.paredealto);
        this.physics.add.collider(this.jogador, this.paredebaixo);
        this.physics.add.collider(this.jogador, this.parededireita);
        this.physics.add.collider(this.jogador, this.paredeesquerda);
       
        this.cursors = this.input.keyboard.createCursorKeys();

        let parado, andandoesquerda, andandofrente, andandoparatras;

        if(this.anims.exists('defrente')) this.anims.remove('defrente');
        if(this.anims.exists('esquerda')) this.anims.remove('esquerda');
        if(this.anims.exists('frente')) this.anims.remove('frente');
        if(this.anims.exists('paratras')) this.anims.remove('paratras');
        if (genero == "masculino") {
            parado = {key: "defrente", frames: [{key:"personagem",  frame:0}], frameRate: 1, repeat:-1}
            andandoesquerda = { key:"esquerda", frames: this.anims.generateFrameNumbers("personagem", {frames: [1, 4, 7]}), frameRate: 8, repeat:-1}
            andandofrente = { key:"frente", frames: this.anims.generateFrameNumbers("personagem", {frames:[3,6]}), frameRate: 8, repeat:-1}
            andandoparatras = { key:"paratras", frames: this.anims.generateFrameNumbers("personagem", {frames:[2,5,8] }), frameRate: 8, repeat:-1}
        } else {
            parado = {key: "defrente", frames: [{key:"personagem",  frame:18}], frameRate: 1, repeat:-1}
            andandoesquerda = { key:"esquerda", frames: this.anims.generateFrameNumbers("personagem", {frames: [19,22,25]}), frameRate: 8, repeat:-1}
            andandofrente = { key:"frente", frames: this.anims.generateFrameNumbers("personagem", {frames:[21,24]}), frameRate: 8, repeat:-1}
            andandoparatras = { key:"paratras", frames: this.anims.generateFrameNumbers("personagem", {frames:[20,23,26] }), frameRate: 8, repeat:-1}
        }

        this.anims.create(parado);
        this.anims.create(andandoesquerda);
        this.anims.create(andandofrente);
        this.anims.create(andandoparatras);
        this.wasd = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        });

        
        if(this.anims.exists('amigodireita')) this.anims.remove('amigodireita');
        if(this.anims.exists('amigofrente')) this.anims.remove('amigofrente');
        if(this.anims.exists('amigotras')) this.anims.remove('amigotras');
        if(this.anims.exists('amigoparado')) this.anims.remove('amigoparado');
        if(this.anims.exists('amigoparadodecostas')) this.anims.remove('amigoparadodecostas');
        if(this.anims.exists('amigoparadolado')) this.anims.remove('amigoparadolado');
        
        //MOVIMENTO DO AMIGO
        this.anims.create ( { key:"amigodireita",
            frames: this.anims.generateFrameNumbers("amigo", {start:12, end: 15}),
            frameRate: 8,
            repeat:-1
                })

        this.anims.create ( { key:"amigofrente",
            frames: this.anims.generateFrameNumbers("amigo", {start:1, end: 3}),
            frameRate: 8,
            repeat:-1
                })
        
        this.anims.create ( { key:"amigotras",
            frames: this.anims.generateFrameNumbers("amigo", {start:4, end: 7}),
            frameRate: 8,
            repeat:-1
                })

        this.anims.create ( { key:"amigoparado",
            frames: this.anims.generateFrameNumbers("amigo", {start:0, end: 0}),
            frameRate: 1,
            repeat:-1
                })

        this.anims.create({ key : "amigoparadodecostas",
        frames: this.anims.generateFrameNumbers("amigo", {start:4, end: 4}),
        frameRate:1,
        repeat:-1
        })

        this.anims.create({ key : "amigoparadolado",
        frames: this.anims.generateFrameNumbers("amigo", {start:13, end: 13}),
        frameRate:1,
        repeat:-1
        })
        
        // INVENTÁRIO

        if (inventarioaberto === false){
            inventario(this)
        }
                
       
        

        //DIALOGO DE ESCOLHA DE NIVEIS
        //let dialogoiniciado = false;
       
        this.dialogonivelfacil = this.add.text(150, 550, " São as provas do jardim de infância.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelfacil2 = this.add.text(150, 550, " Você sente que pegar essas daqui vai tornar sua vida muito mais fácil.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelfacil3 = this.add.text(150, 550, " Pegar as provas?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelfacil4 = this.add.text(150, 550, " Você já pegou as provas.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogopegou = this.add.text(150, 550, " Você pegou as provas do jardim de infancia.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.nivelfacil.x, this.nivelfacil.y);
            if (distancia < 80 && dialogoiniciado === false) {
                dialogoiniciado = true;

                if (pegouitem === false) {
                    this.retangulo.setVisible(true);
                    this.dialogonivelfacil.setVisible(true);

                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogonivelfacil.setVisible(false);
                        this.dialogonivelfacil2.setVisible(true);

                        this.input.keyboard.once("keydown-Z", () => {
                            this.dialogonivelfacil2.setVisible(false);
                            this.dialogonivelfacil3.setVisible(true);

                            this.input.keyboard.once("keydown-Z", () => {
                                this.dialogonivelfacil3.setVisible(false);
                                sim.style.display = "block";
                                nao.style.display = "block";
                                sim.onclick = ()=>{
                                    nao.style.display = "none"
                                    sim.style.display = "none"
                                    pegouitem = true;
                                    this.dialogonivelfacil3.setVisible(false);
                                    this.dialogopegou.setVisible(true);
                                    this.input.keyboard.once("keydown-Z", () => {
                                        nivelfacil = true
                                        this.dialogopegou.setVisible(false);
                                        this.retangulo.setVisible(false);
                                        pegouitem = true;
                                        dialogoiniciado = false;
                                    
                            });
                                }
                                nao.onclick = ()=>{
                                    nao.style.display = "none"
                                    sim.style.display = "none"
                                    this.dialogonivelfacil3.setVisible(false);
                                    this.retangulo.setVisible(false);
                                    dialogoiniciado = false;
                                    
                            
                                }
                                
                        });
                    });
                })
                }
                else{
                    this.retangulo.setVisible(true);
                    this.dialogonivelfacil4.setVisible(true);
                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogonivelfacil4.setVisible(false);
                        this.retangulo.setVisible(false);
                        dialogoiniciado = false;
                            });

                }
            }
        });

        this.dialogonivelmedio = this.add.text(150, 550, " São as provas da sua turma.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelmedio2 = this.add.text(150, 550, " Pegar as provas?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelmedio3 = this.add.text(150, 550, " Você já pegou as provas.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogopegoumedio = this.add.text(150, 550, " Você pegou as provas.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.nivelmedio.x, this.nivelmedio.y);
            if (distancia < 80 && dialogoiniciado === false) {
                dialogoiniciado = true;

                if (pegouitem === false) {
                    this.retangulo.setVisible(true);
                    this.dialogonivelmedio.setVisible(true);
                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogonivelmedio.setVisible(false);
                        this.dialogonivelmedio2.setVisible(true);

                        this.input.keyboard.once("keydown-Z", () => {
                            this.dialogonivelmedio2.setVisible(false);
                            sim.style.display = "block";
                            nao.style.display = "block";
                            sim.onclick = ()=>{
                                nao.style.display = "none"
                                sim.style.display = "none"
                                pegouitem = true;
                                this.dialogonivelmedio2.setVisible(false);
                                this.dialogopegoumedio.setVisible(true);
                                this.input.keyboard.once("keydown-Z", () => {
                                    nivelmedio = true;
                                    this.dialogopegoumedio.setVisible(false);
                                    this.retangulo.setVisible(false);
                                    pegouitem = true;
                                    dialogoiniciado = false;
                                    
                            });
                                }
                            nao.onclick = ()=>{
                                nao.style.display = "none"
                                sim.style.display = "none"
                                this.dialogonivelmedio2.setVisible(false);
                                this.retangulo.setVisible(false);
                                dialogoiniciado = false;
                                    
                            
                                }
                                
                        });
                })
                }
                else{
                    this.retangulo.setVisible(true);
                    this.dialogonivelmedio3.setVisible(true);
                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogonivelmedio3.setVisible(false);
                        this.retangulo.setVisible(false);
                        dialogoiniciado = false;
                            });

                }
            }
        });

        
        this.dialogoniveldificil = this.add.text(150, 550, " São as provas da obmep.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoniveldificil2 = this.add.text(150, 550, " Você sente que pegar essas daqui vai tornar sua vida um inferno.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoniveldificil3 = this.add.text(150, 550, " Pegar as provas?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoniveldificil4 = this.add.text(150, 550, " Você já pegou as provas.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogopegoudificil = this.add.text(150, 550, " Você pegou as provas da obmep.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.niveldificil.x, this.niveldificil.y);
            let distancia2 =  Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.niveldificil2.x, this.niveldificil2.y);
            if ((distancia < 50 || distancia2 < 50 ) && dialogoiniciado === false) {
                dialogoiniciado = true;

                if (pegouitem === false) {
                    this.retangulo.setVisible(true);
                    this.dialogoniveldificil.setVisible(true);

                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogoniveldificil.setVisible(false);
                        this.dialogoniveldificil2.setVisible(true);

                        this.input.keyboard.once("keydown-Z", () => {
                            this.dialogoniveldificil2.setVisible(false);
                            this.dialogoniveldificil3.setVisible(true);

                            this.input.keyboard.once("keydown-Z", () => {
                                this.dialogoniveldificil3.setVisible(false);
                                sim.style.display = "block";
                                nao.style.display = "block";
                                sim.onclick = ()=>{
                                    nao.style.display = "none"
                                    sim.style.display = "none"
                                    pegouitem = true;
                                    this.dialogoniveldificil3.setVisible(false);
                                    this.dialogopegoudificil.setVisible(true);
                                    this.input.keyboard.once("keydown-Z", () => {
                                        niveldificil = true;
                                        this.dialogopegoudificil.setVisible(false);
                                        this.retangulo.setVisible(false);
                                        pegouitem = true;
                                        dialogoiniciado = false;
                                    
                            });
                                }
                                nao.onclick = ()=>{
                                    nao.style.display = "none"
                                    sim.style.display = "none"
                                    this.dialogoniveldificil3.setVisible(false);
                                    this.retangulo.setVisible(false);
                                    dialogoiniciado = false;
                                    
                            
                                }
                                
                        });
                    });
                })
                }
                else{
                    this.retangulo.setVisible(true);
                    this.dialogoniveldificil4.setVisible(true);
                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogoniveldificil4.setVisible(false);
                        this.retangulo.setVisible(false);
                        dialogoiniciado = false;
                            });

                }
            }
        });

        this.dialogonivelhack = this.add.text(150, 550, " Você sente uma energia negativa extremamente forte vindo dessa caixa...", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelhack2 = this.add.text(150, 550, " Você sente que, se abri-la, sua vida nunca mais vai ser a mesma.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelhack3 = this.add.text(150, 550, " Abrir a caixa?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelhack4 = this.add.text(150, 550, " Você já pegou as provas.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogonivelhacksenha = this.add.text(150, 550, " A caixa precisa de uma senha para ser aberta...", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogopegouhack = this.add.text(150, 550, " Dentro da caixa, estranhamente, só haviam...provas..?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogopegou2 = this.add.text(150, 550, " E, estranhamente, um suco de laranja de aparencia suspeita.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogopegou3 = this.add.text(150, 550, " Você pegou as provas estranhas...e o suquinho", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogosenhaerrada = this.add.text(150, 550, " Senha incorreta.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.nivelhack.x, this.nivelhack.y);
            if (distancia < 50 && dialogoiniciado === false) {
                dialogoiniciado = true;

                if (pegouitem === false) {
                    this.retangulo.setVisible(true);
                    this.dialogonivelhack.setVisible(true);  

                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogonivelhack.setVisible(false);
                        this.dialogonivelhack2.setVisible(true);

                        this.input.keyboard.once("keydown-Z", () => {
                            this.dialogonivelhack2.setVisible(false);
                            this.dialogonivelhack3.setVisible(true);

                            this.input.keyboard.once("keydown-Z", () => {
                                this.dialogonivelhack3.setVisible(false);
                                sim.style.display = "block";
                                nao.style.display = "block";
                                sim.onclick = ()=>{
                                    nao.style.display = "none";
                                    sim.style.display = "none";
                                    this.dialogonivelhack3.setVisible(false);
                                    this.dialogonivelhacksenha.setVisible(true);
                                    this.input.keyboard.once("keydown-Z", () => {
                                    this.dialogonivelhacksenha.setVisible(false);
                                    this.retangulo.setVisible(false);
                                    senha.style.display = "block";
                                    botaoresposta.style.display = "block"
                                    botaoresposta.onclick = ()=>{
                                        console.log("o botao foi clicado");
                                        let senhaplayer = document.getElementById("senha").value;
                                        let senhacerta = "192227"
                                        if (senhaplayer == senhacerta){
                                        senha.style.display = "none"
                                        botaoresposta.style.display = "none"
                                        this.retangulo.setVisible(true);
                                        this.dialogopegouhack.setVisible(true)
                                        this.input.keyboard.once("keydown-Z", ()=>{
                                            this.dialogopegouhack.setVisible(false);
                                            this.dialogopegou2.setVisible(true);
                                            this.input.keyboard.once("keydown-Z", ()=>{
                                                this.dialogopegou2.setVisible(false)
                                                this.dialogopegou3.setVisible(true)
                                                this.input.keyboard.once("keydown-Z",()=>{
                                                    this.dialogopegou3.setVisible(false)
                                                    this.retangulo.setVisible(false);
                                                    pegouitem = true;
                                                    dialogoiniciado = false;
                                                    nivelhack = true;
                                                    bens.push("Suquinho")
                                                })

                                                
                                                
                                                
                                                
                                            })
                                        })
                                   }

                                    else{
                                        senha.style.display = "none"
                                        botaoresposta.style.display = "none"
                                        this.retangulo.setVisible(true);
                                        this.dialogosenhaerrada.setVisible(true);
                                        this.input.keyboard.once("keydown-Z", ()=>{
                                            this.dialogosenhaerrada.setVisible(false);
                                            this.retangulo.setVisible(false);
                                            dialogoiniciado = false;
                                        })


                                   }

                                    }
                                    
                            })
                                }
                                nao.onclick = ()=>{
                                    nao.style.display = "none"
                                    sim.style.display = "none"
                                    this.dialogonivelhack3.setVisible(false);
                                    this.retangulo.setVisible(false);
                                    dialogoiniciado = false;
                                    
                            
                                }
                                
                        });
                    });
                })
                }
                else{
                    this.retangulo.setVisible(true);
                    this.dialogonivelhack4.setVisible(true);
                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogonivelhack4.setVisible(false);
                        this.retangulo.setVisible(false);
                        dialogoiniciado = false;
                            });

                }
            }
        });
        hp.hpatual = nivelfacil === true? 50:30
        qi.qiatual = nivelfacil === true?60:40
        ataque.ataqueatual = nivelfacil === true?5:3
        defesa.defesaatual = nivelfacil === true?5:3
        if (nivelfacil === true){
            if (nivel.nivelatual === 1){
                hpmaximo = 50;
            }
            else if (nivel.nivelatual === 2){
                hpmaximo = 60;
            }
            else if (nivel.nivelatual === 3){
                hpmaximo = 71;
            }
            else if (nivel.nivelatual === 4){
                hpmaximo = 83;
            }
            else if (nivel.nivelatual === 5){
                hpmaximo = 96;
            }
            else if (nivel.nivelatual === 6){
                hpmaximo = 110;
            }
            else if (nivel.nivelatual === 7){
                hpmaximo = 123;
            }
            else if (nivel.nivelatual === 8){
                hpmaximo = 135;
            }
            else if (nivel.nivelatual === 9){
                hpmaximo = 146;
            }
            else if (nivel.nivelatual === 10){
                hpmaximo = 155;
            }
            else if (nivel.nivelatual === 11){
                hpmaximo = 163;
            }
            else if (nivel.nivelatual === 12){
                hpmaximo = 171;
            }
            else if (nivel.nivelatual === 13){
                hpmaximo = 179;
            }
            else if (nivel.nivelatual === 14){
                hpmaximo = 187;
            }
            else if (nivel.nivelatual === 15){
                hpmaximo = 196;
            }
            else if (nivel.nivelatual === 16){
                hpmaximo = 206;
            }
            else if (nivel.nivelatual === 17){
                hpmaximo = 217;
            }
            else if (nivel.nivelatual === 18){
                hpmaximo = 229;
            }
            else if (nivel.nivelatual === 19){
                hpmaximo = 242;
            }
            else if (nivel.nivelatual === 20){
                hpmaximo = 256;
            }
        }
        
        
        else{
            if (nivel.nivelatual === 1){
                hpmaximo = 30;
            }
            else if (nivel.nivelatual === 2){
                hpmaximo = 38;
            }
            else if (nivel.nivelatual === 3){
                hpmaximo = 47;
            }
            else if (nivel.nivelatual === 4){
                hpmaximo = 57;
            }
            else if (nivel.nivelatual === 5){
                hpmaximo = 68;
            }
            else if (nivel.nivelatual === 6){
                hpmaximo = 80;
            }
            else if (nivel.nivelatual === 7){
                hpmaximo = 91;
            }
            else if (nivel.nivelatual === 8){
                hpmaximo = 101;
            }
            else if (nivel.nivelatual === 9){
                hpmaximo = 110;
            }
            else if (nivel.nivelatual === 10){
                hpmaximo = 118;
            }
            else if (nivel.nivelatual === 11){
                hpmaximo = 125;
            }
            else if (nivel.nivelatual === 12){
                hpmaximo = 132;
            }
            else if (nivel.nivelatual === 13){
                hpmaximo = 139;
            }
            else if (nivel.nivelatual === 14){
                hpmaximo = 146;
            }
            else if (nivel.nivelatual === 15){
                hpmaximo = 154;
            }
            else if (nivel.nivelatual === 16){
                hpmaximo = 163;
            }
            else if (nivel.nivelatual === 17){
                hpmaximo = 173;
            }
            else if (nivel.nivelatual === 18){
                hpmaximo = 184;
            }
            else if (nivel.nivelatual === 19){
                hpmaximo = 196;
            }
            else if (nivel.nivelatual === 20){
                hpmaximo = 210;
            }
        }
        if (nivelfacil === true){
            if (nivel.nivelatual === 1){
                qimaximo = 60;
            }
            else if (nivel.nivelatual === 2){
                qimaximo = 68;
            }
            else if (nivel.nivelatual === 3){
                qimaximo = 77;
            }
            else if (nivel.nivelatual === 4){
                qimaximo = 87;
            }
            else if (nivel.nivelatual === 5){
                qimaximo = 98;
            }
            else if (nivel.nivelatual === 6){
                qimaximo = 110;
            }
            else if (nivel.nivelatual === 7){
                qimaximo = 121;
            }
            else if (nivel.nivelatual === 8){
                qimaximo = 131;
            }
            else if (nivel.nivelatual === 9){
                qimaximo = 140;
            }
            else if (nivel.nivelatual === 10){
                qimaximo = 148;
            }
            else if (nivel.nivelatual === 11){
                qimaximo = 155;
            }
            else if (nivel.nivelatual === 12){
                qimaximo = 162;
            }
            else if (nivel.nivelatual === 13){
                qimaximo = 169;
            }
            else if (nivel.nivelatual === 14){
                qimaximo = 176;
            }
            else if (nivel.nivelatual === 15){
                qimaximo = 184;
            }
            else if (nivel.nivelatual === 16){
                qimaximo = 193;
            }
            else if (nivel.nivelatual === 17){
                qimaximo = 203;
            }
            else if (nivel.nivelatual === 18){
                qimaximo = 214;
            }
            else if (nivel.nivelatual === 19){
                qimaximo = 226;
            }
            else if (nivel.nivelatual === 20){
                qimaximo = 240;
            }
        }
        
        
        else {
            if (nivel.nivelatual === 1){
                qimaximo = 40;
            }
            else if (nivel.nivelatual === 2){
                qimaximo = 48;
            }
            else if (nivel.nivelatual === 3){
                qimaximo = 57;
            }
            else if (nivel.nivelatual === 4){
                qimaximo = 67;
            }
            else if (nivel.nivelatual === 5){
                qimaximo = 78;
            }
            else if (nivel.nivelatual === 6){
                qimaximo = 90;
            }
            else if (nivel.nivelatual === 7){
                qimaximo = 101;
            }
            else if (nivel.nivelatual === 8){
                qimaximo = 111;
            }
            else if (nivel.nivelatual === 9){
                qimaximo = 120;
            }
            else if (nivel.nivelatual === 10){
                qimaximo = 128;
            }
            else if (nivel.nivelatual === 11){
                qimaximo = 135;
            }
            else if (nivel.nivelatual === 12){
                qimaximo = 142;
            }
            else if (nivel.nivelatual === 13){
                qimaximo = 149;
            }
            else if (nivel.nivelatual === 14){
                qimaximo = 156;
            }
            else if (nivel.nivelatual === 15){
                qimaximo = 164;
            }
            else if (nivel.nivelatual === 16){
                qimaximo = 173;
            }
            else if (nivel.nivelatual === 17){
                qimaximo = 183;
            }
            else if (nivel.nivelatual === 18){
                qimaximo = 194;
            }
            else if (nivel.nivelatual === 19){
                qimaximo = 206;
            }
            else if (nivel.nivelatual === 20){
                qimaximo = 220;
            }
        }

        let pronome = genero == "masculino"? "chato" : "chata";

        this.dialogoamigo = this.add.text(150, 550, " Se eu não me engano, a professora deixou as provas aqui nessa prateleira...", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigo2 = this.add.text(150, 550, " ...mas seria engraçado se a gente simplesmente voltasse lá com provas erradas \n e fodase kkkkk", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigonivelfacil = this.add.text(150, 550, " Você pegou as provas do jardim de infância? Bem, pelo menos agora nossa nota tá \n garantida.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigonivelmedio = this.add.text(150, 550, " Achou as provas? Que pena...eu tava gostando de ficar fora da sala.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigoniveldificil = this.add.text(150, 550, " Tu pegou as provas da obmep?! Caraca, agora que metade da sala roda.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigonivelhack = this.add.text(150, 550, " Que?! Cê tá me dizendo que dentro daquela caixa misteriosa só tinham provas?! \n Quem que guarda provas em uma caixa fechada com senha? Pensei que tinha algo mais \n legal.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigovoltarsala = this.add.text(150, 550, " Certo, então bora voltar pra sala então...", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigovoltarsala2 = this.add.text(150, 550, " ...", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigovoltarsala3 = this.add.text(150, 550, " Na verdade, bora matar aula?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigomataraula = this.add.text(150, 550, " Eu tava só zuando, po. Bora voltar pra sala.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoamigonaomataraula = this.add.text(150, 550, " Tu é " + pronome + " hein.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        
        dialogoiniciado = false;
        
        this.input.keyboard.on("keydown-Z", () =>{
            if (this.amigo && dialogoiniciado === false ){
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.amigo.x, this.amigo.y);
            if (distancia < 60 ){
                dialogoiniciado = true
                if (pegouitem === false){
                    this.retangulo.setVisible(true);
                    this.dialogoamigo.setVisible(true);
                    this.input.keyboard.once("keydown-Z", () =>{
                        this.dialogoamigo.setVisible(false);
                        this.dialogoamigo2.setVisible(true);
                        this.input.keyboard.once("keydown-Z", ()=>{
                            this.retangulo.setVisible(false);
                            this.dialogoamigo2.setVisible(false);
                            dialogoiniciado = false;
                        })
                })
                }
                else{
                    posicaoplayerx = this.jogador.x;
                    posicaoplayery = this.jogador.y;
                    this.scene.start('Armazem2');
                }
                };
            }
            });


        this.input.keyboard.on("keydown-Z", () => {
        if (dialogoiniciado === false  && inventarioaberto === false){
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.porta.x, this.porta.y);
            if (distancia < 70){
                this.scene.start('Inicio3');
        }
        }
    })

};

    update(){
        let andando = false;
        let teclas = this.wasd;
        let jogador = this.jogador;

        if (inventarioaberto === true){
            jogador.body.setVelocity(0);
            jogador.body.setMaxVelocity(150);
            return

        }
        jogador.body.setVelocity(0);
        jogador.body.setMaxVelocity(150);



        if(teclas.left.isDown){
            jogador.setVelocityX(-150);
            jogador.anims.play("esquerda",true);
            jogador.flipX = false;
            andando = true;
        } else if(teclas.right.isDown){
            jogador.setVelocityX(150);
            jogador.anims.play("esquerda",true);
            jogador.flipX = true;
            andando = true;
        } else if(teclas.down.isDown){
            jogador.setVelocityY(150);
            jogador.anims.play("frente",true);
            andando = true;
        } else if(teclas.up.isDown){
            jogador.setVelocityY(-150);
            jogador.anims.play("paratras", true);
            andando = true;
        } else {
            if (!andando){
                jogador.anims.play("defrente", true);
            };
        };
    };
};