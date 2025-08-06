import { genero } from './Game.js'; 
import { nome } from "./Game.js";
export let terminouacao = 0;
let dialogoiniciado = false;
export let posicao = { saiusala: true}
let inventarioaberto = false
import { bens} from "./inicio3.js"
import {inventario} from './variaveis.js'
export class Inicio2 extends Phaser.Scene {
    constructor(){
        super("Inicio2")
}
preload(){

        //carregando os modelos

        this.load.image('escola', 'Assets/escola.png');
        this.load.spritesheet("personagem", "Assets/personagens.png", { //carrega this imagem com os sprites do personagem
            frameWidth: 32, //largura do frame
            frameHeight: 32, //altura do frame
            })
        this.load.spritesheet("professora", "Assets/F_08.png", {
            frameWidth:16,
            frameHeight: 17,
        })
        this.load.spritesheet("amigo", "Assets/npc1.jpeg",{
            frameWidth:45,
            frameHeight:68
        })
        this.load.spritesheet("npc1", "Assets/F_01.png",{
            frameWidth:16,
            frameHeight: 17,
        })
        this.load.spritesheet("npc2", "Assets/F_06.png", {
            frameWidth:16,
            frameHeight: 17,
        })
        this.load.spritesheet("npc3", "Assets/M_08.png", {
            frameWidth:16,
            frameHeight: 17,
        })
        this.load.spritesheet("npc4", "Assets/M_01.png", {
            frameWidth:16,
            frameHeight: 17,
        })
        this.load.spritesheet("npc5","Assets/F_11.png",{
            frameWidth:16,
            frameHeight: 17,
        })
        this.load.spritesheet("npc6", "Assets/M_11.png",{
            frameWidth:16,
            frameHeight: 17,
        })
    }

    
    create(){
     
        let indice = null;
        if (genero == "masculino"){
            indice = 2
        } else{ indice = 20}


        this.escola = this.add.image(640,360, "escola").setScale(0.5);
        this.jogador = this.physics.add.sprite(500, 545, 'personagem',indice).setScale(2).refreshBody();
        this.professora = this.physics.add.sprite(620, 100, 'professora').setScale(5)
        //this.professora = this.add.sprite(700, 100, 'professora',).setScale(5);
        this.amigo = this.physics.add.sprite(575, 545, "amigo",12).setScale(1.5);
        this.npc1 = this.add.sprite(500, 300, "npc1",2).setScale(4);
        this.npc2 = this.add.sprite(555, 300, "npc2",2).setScale(4);
        this.npc3 = this.add.sprite(500, 420, "npc3",2).setScale(4);
        this.npc4 = this.add.sprite(690, 545, "npc4",2).setScale(4);
        this.npc5 = this.add.sprite(740, 420, "npc5",2).setScale(4);
        this.npc6 = this.add.sprite(740, 300, "npc6",2).setScale(5);
      
        //HITBOX

        this.mesaprotagonista = this.add.rectangle(530, 530, 90, 80, 255, 0);
        this.mesameioesquerdo = this.add.rectangle(530, 400, 90, 80, 255, 0);
        this.mesafrenteesquerda = this.add.rectangle(530, 300, 90, 80, 255, 0);
        this.mesatras = this.add.rectangle(710, 530, 100, 80, 255, 0);
        this.mesameiodireito = this.add.rectangle(710, 400, 100, 80, 255, 0);
        this.mesafrentedireita = this.add.rectangle(710, 300, 100, 100, 255, 0);
        this.mesaprofessora = this.add.rectangle(500, 200, 133, 90, 255, 0);
        this.paredeesquerda = this.add.rectangle(350, 200, 133, 1000, 255, 0);
        this.parededireita = this.add.rectangle(900, 200, 133, 1000, 255, 0);
        this.paredecima = this.add.rectangle(540, 35, 1000, 50,255, 0 );
        this.professorahitbox = this.add.rectangle(615, 130, 50, 25, 255, 0)
        this.paredebaixo = this.add.rectangle(530, 670, 1000, 50, 255, 0);
        this.retangulo = this.add.rectangle(644, 570, 1000, 200, 255, 0.5).setVisible(false);
        this.dialogoprof = this.add.text(150, 550, " Tá fazendo o que aqui ainda? Tô esperando...", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.porta = this.add.rectangle(850, 100, 150, 80, 255, 0);
       
        
        //adciona fisica para as hitboxs
        this.physics.add.existing(this.porta, true)
        this.physics.add.existing(this.mesaprotagonista, true)
        this.physics.add.existing(this.mesameioesquerdo, true)
        this.physics.add.existing(this.mesafrenteesquerda, true)
        this.physics.add.existing(this.mesatras, true)
        this.physics.add.existing(this.mesameiodireito, true)
        this.physics.add.existing(this.mesafrentedireita, true)
        this.physics.add.existing(this.mesaprofessora, true)
        this.physics.add.existing(this.paredeesquerda, true)
        this.physics.add.existing(this.parededireita, true)
        this.physics.add.existing(this.paredecima, true)
        this.physics.add.existing(this.professorahitbox, true)
        this.physics.add.existing(this.paredebaixo, true)

        //adciona colisao

        this.physics.add.collider(this.jogador, this.mesaprotagonista);
        this.physics.add.collider(this.jogador, this.mesameioesquerdo);
        this.physics.add.collider(this.jogador, this.mesafrenteesquerda);
        this.physics.add.collider(this.jogador, this.mesatras);
        this.physics.add.collider(this.jogador, this.mesameiodireito);
        this.physics.add.collider(this.jogador, this.mesafrentedireita);
        this.physics.add.collider(this.jogador, this.mesaprofessora);
        this.physics.add.collider(this.jogador, this.paredeesquerda);
        this.physics.add.collider(this.jogador, this.parededireita);
        this.physics.add.collider(this.jogador, this.paredecima);
        this.physics.add.collider(this.jogador, this.professorahitbox);
        this.physics.add.collider(this.jogador, this.paredebaixo)



        


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

        //MOVIMENTO DO PROTAGONISTA

        let parado;
        let andandoesquerda;
        let andandofrente;
        let andandoparatras;
        
        this.cursors = this.input.keyboard.createCursorKeys(); //para o movimento do personagem. chamas setas
        if (genero == "masculino") { //verifica se this variavel é igual this "masculino"
            parado = {key: "defrente", //caso for:
                frames: [{key:"personagem",  frame:0}],
                frameRate: 1,
                repeat:-1
                }
            
            andandoesquerda = { key:"esquerda",
                frames: this.anims.generateFrameNumbers("personagem", {frames: [1, 4, 7]}),
                frameRate: 8,
                repeat:-1
                }

            andandofrente = { key:"frente",
                frames: this.anims.generateFrameNumbers("personagem", {frames:[3,6]}),
                frameRate: 8,
                repeat:-1
                }

            andandoparatras = { key:"paratras",
                frames: this.anims.generateFrameNumbers("personagem", {frames:[2,5,8] }),
                frameRate: 8,
                repeat:-1} 
    }
            
        else{ //caso nao for(personagem feminina):
            parado = {key: "defrente",
                frames: [{key:"personagem",  frame:18}],
                frameRate: 1,
                repeat:-1
            } 
            andandoesquerda = { key:"esquerda",
                frames: this.anims.generateFrameNumbers("personagem", {frames: [19,22,25]}),
                frameRate: 8,
                repeat:-1
                }
            andandofrente = { key:"frente",
                frames: this.anims.generateFrameNumbers("personagem", {frames:[21,24]}),
                frameRate: 8,
                repeat:-1}
            andandoparatras = { key:"paratras",
                frames: this.anims.generateFrameNumbers("personagem", {frames:[20,23,26] }),
                frameRate: 8,
                repeat:-1}}

        this.anims.create(parado);
        this.anims.create(andandoesquerda);
        this.anims.create(andandofrente);
        this.anims.create(andandoparatras);
        this.wasd = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'})

        //INVENTARIO
        if (dialogoiniciado === false){
            inventario(this)
        }
        
        
  

        //CUTSCENE

        this.tweens.add({  //adciona uma animaçao
            targets: this.amigo,  
            x:630,
            duration: 2000,
            ease:"Linear",
            onStart:()=>{
                this.amigo.play("amigodireita")
                
            },
            onComplete:()=>{
                this.amigo.play("amigoparadodecostas")
                this.tweens.add({
                    targets: this.amigo,
                    y: 190,
                    duration: 6000,
                    ease:"Linear",
                    onStart:()=>{
                        this.amigo.play("amigotras")
                    },
                    onComplete:()=>{
                        this.amigo.play("amigoparadolado")
                        this.tweens.add({
                            targets: this.amigo,
                            x: 800,
                            duration: 4000,
                            ease:"Linear",
                            onStart:()=>{
                                this.amigo.play("amigodireita") //aaaaaa
                            },
                            onComplete:()=>{
                                this.amigo.play("amigoparadolado")
                                this.tweens.add({
                                    targets: this.amigo,
                                    y: 100,
                                    duration: 4000,
                                    ease:"Linear",
                                    onStart:()=>{
                                        this.amigo.play("amigotras") //aaaaaa
                                    },
                                    onComplete:()=>{
                                        this.amigo.play("amigoparadodecostas")

                                        this.tweens.add({
                                            targets: this.jogador,
                                            x: 450,
                                            duration: 2000,
                                            ease:"Linear",
                                            onStart:()=>{
                                                this.jogador.play(andandoesquerda)
                                            },
                                            onComplete:()=>{
                                                this.jogador.play(parado)
                                                terminouacao++
                                                        }
                                                            })

                                        this.tweens.add({
                                            targets: this.amigo,
                                            x: 830,
                                            duration: 4000,
                                            ease:"Linear",
                                            onStart:()=>{
                                                this.amigo.play("amigodireita")
                                            },
                                            onComplete:()=>{
                                                this.amigo.play("amigoparadolado")
                                                 this.tweens.add({
                                                    targets: this.amigo,
                                                    alpha: 0,
                                                    duration: 1000,
                                                    ease: "Linear"
    });
                                                
                                                        }
                                                            })
                                
                    }
                    })
                    }
                    })
                    }
                    })


                

                }
            })

                
       

            //DIALOGOS PARA OS NPCS


            this.input.keyboard.on("keydown-Z", () => {
                let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.professora.x, this.professora.y);
                if (distancia < 80 ) { 
                    if (dialogoiniciado === false){
                        dialogoiniciado = true
                        if(this.jogador.y >= 173){
                        this.professora.setFrame(0)
                        this.retangulo.setVisible(true)
                        this.dialogoprof.setVisible(true)

                        this.input.keyboard.once("keydown-Z", () =>{
                            this.retangulo.setVisible(false);
                            this.dialogoprof.setVisible(false)
                            dialogoiniciado = false;
                        })
                    }
                    else{
                        this.professora.setFrame(1)
                        this.retangulo.setVisible(true)
                        this.dialogoprof.setVisible(true)
                        this.input.keyboard.once("keydown-Z", () =>{
                            this.retangulo.setVisible(false);
                            this.dialogoprof.setVisible(false);
                            this.professora.setFrame(0)
                            dialogoiniciado = false
                        })
                    }
                

                    }
                
                    
                

                    
                }
            });
            this.dialogonpc1 =  this.add.text(150, 550, " Você estudou para this prova, " + nome + "?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.input.keyboard.on("keydown-Z", () => {
                    let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.npc1.x, this.npc1.y);
                    if (distancia < 70) {
                        if (dialogoiniciado === false){
                            dialogoiniciado = true
                            this.npc1.setFrame(3)
                            this.retangulo.setVisible(true)
                            this.dialogonpc1.setVisible(true)
                            this.input.keyboard.once("keydown-Z", () =>{
                                this.retangulo.setVisible(false);
                                this.dialogonpc1.setVisible(false)
                                this.npc1.setFrame(2)
                                dialogoiniciado = false;
                        })
                            
                    }}
                
        })

            this.dialogonpc2 =  this.add.text(150, 550, " (Ela parece ocupada desenhando).", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.input.keyboard.on("keydown-Z", () => {
                let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.npc2.x, this.npc2.y);
                    if (distancia < 70) {
                        if (dialogoiniciado === false){
                            dialogoiniciado = true
                            
                            this.retangulo.setVisible(true)
                            this.dialogonpc2.setVisible(true)
                            this.input.keyboard.once("keydown-Z", () =>{
                                this.retangulo.setVisible(false);
                                this.dialogonpc2.setVisible(false)
                               
                                dialogoiniciado = false;
                            })
                            
                    }}
        })    

            this.dialogonpc3 =  this.add.text(150, 550, " " + nome + ", se eu fosse você, eu aproveitava essa oportunidade e dava no pé.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.input.keyboard.on("keydown-Z", () => {
                    let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.npc3.x, this.npc3.y);
                    if (distancia < 70) {
                        if (dialogoiniciado === false){
                            dialogoiniciado = true
                            this.npc3.setFrame(3)
                            this.retangulo.setVisible(true)
                            this.dialogonpc3.setVisible(true)
                            this.input.keyboard.once("keydown-Z", () =>{
                                this.retangulo.setVisible(false);
                                this.dialogonpc3.setVisible(false)
                                this.npc3.setFrame(2)
                                dialogoiniciado = false;
                        })
                            
                    }}
                
        })
            this.dialogonpc4 =  this.add.text(150, 550, " Não acredito que esqueci da prova! Cara, se eu tirar uma nota baixa minha mãe vai \n me matar!", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.input.keyboard.on("keydown-Z", () => {
                    let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.npc4.x, this.npc4.y);
                    if (distancia < 70) {
                        if (dialogoiniciado === false){
                            dialogoiniciado = true
                            if (this.jogador.y <= 555) {
                                this.npc4.setFrame(3)
                                this.retangulo.setVisible(true)
                                this.dialogonpc4.setVisible(true)
                                this.input.keyboard.once("keydown-Z", () =>{
                                    this.retangulo.setVisible(false);
                                    this.dialogonpc4.setVisible(false)
                                    this.npc4.setFrame(2)
                                    dialogoiniciado = false;
                            
                        })
                            }
                            else{
                                this.npc4.setFrame(0)
                                this.retangulo.setVisible(true)
                                this.dialogonpc4.setVisible(true)
                                this.input.keyboard.once("keydown-Z", () =>{
                                    this.retangulo.setVisible(false);
                                    this.dialogonpc4.setVisible(false)
                                    this.npc4.setFrame(2)
                                    dialogoiniciado = false;
                            
                        })
                            }
                            
                            
                    }}
                
        })
            this.dialogonpc5 =  this.add.text(150, 550, " Oi, " + nome + " . Quer passar o recreio comigo hoje?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.input.keyboard.on("keydown-Z", () => {
                    let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.npc5.x, this.npc5.y);
                    if (distancia < 70) {
                        if (dialogoiniciado === false){
                            dialogoiniciado = true
                            this.npc5.setFrame(1)
                            this.retangulo.setVisible(true)
                            this.dialogonpc5.setVisible(true)
                            this.input.keyboard.once("keydown-Z", () =>{
                                this.retangulo.setVisible(false);
                                this.dialogonpc5.setVisible(false)
                                this.npc5.setFrame(2)
                                dialogoiniciado = false;
                        })
                            
                    }}
                
        })

            this.dialogonpc6 =  this.add.text(150, 550, " Aposto que essa prova vai ser moleza.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.input.keyboard.on("keydown-Z", () => {
                    let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.npc6.x, this.npc6.y);
                    if (distancia < 70) {
                        if (dialogoiniciado === false){
                            dialogoiniciado = true
                            this.npc6.setFrame(1)
                            this.retangulo.setVisible(true)
                            this.dialogonpc6.setVisible(true)
                            this.input.keyboard.once("keydown-Z", () =>{
                                this.retangulo.setVisible(false);
                                this.dialogonpc6.setVisible(false)
                                this.npc6.setFrame(2)
                                dialogoiniciado = false;
                        })
                            
                    }}
                
        })

            //PROXIMA CENA

           this.dialogoporta =  this.add.text(150, 550, " Sair da sala?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.input.keyboard.on("keydown-Z", () => {
                    let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.porta.x, this.porta.y);
                    if (distancia < 60 && dialogoiniciado === false) {
                        this.scene.start("Inicio3")
                        }
                
        })
            
        }
    //MOVIMENTO DO PROTAGONISTA

    update(){

        if (terminouacao > 0){
            let andando = false;
            let teclas = this.wasd;
            let jogador = this.jogador;
            jogador.body.setVelocity(0)
            this.jogador.body.setCollideWorldBounds(true); // evita sair da tela
            this.jogador.body.setMaxVelocity(150); 

            if (inventarioaberto === true){
                jogador.body.setVelocity(0);
                jogador.body.setMaxVelocity(0);
                return
            }



            if(teclas.left.isDown){
                jogador.setVelocityX(-150);
                jogador.anims.play("esquerda",true)
                jogador.flipX = false; 
                andando = true
            }
            else if(teclas.right.isDown){
                jogador.setVelocityX(150)
                jogador.anims.play("esquerda",true)
                jogador.flipX = true;
                andando = true 
                
                }
                
            else if(teclas.down.isDown){
                jogador.setVelocityY(150);
                jogador.anims.play("frente",true)
                andando = true;
               
                }
                    
            else if(teclas.up.isDown){
                jogador.setVelocityY(-150);
                jogador.anims.play("paratras", true);
                andando = true
               
                }
            else{
                if (andando == false){
                    jogador.anims.play("defrente", true);
                    
                }
        }
        
        
    }

        }
}

