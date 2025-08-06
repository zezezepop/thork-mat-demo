export let bens = ["Lapistab"]; 
import { genero } from "./Game.js";
let pegouitem = false;
import { posicao } from "./inicio2.js";
import { conversou } from "./armazem2.0.js"
let inventarioaberto = false
let dialogoiniciado = false;
export let ofensivo = { armaatual : "Regua Trincada" }
import {inventario} from './variaveis.js' 

export class Inicio3 extends Phaser.Scene {
    constructor(){
        super("Inicio3");
    }

    preload(){
        this.load.image('corredor', 'Assets/corredor.jpeg');
        this.load.spritesheet("personagem", "Assets/personagens.png", {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.spritesheet("valentona", "Assets/f_10.png",{
            frameWidth:16,
            frameHeight: 17,
        })

        this.load.spritesheet("amigo", "Assets/npc1.jpeg",{
            frameWidth:45,
            frameHeight:68
        })

        this.load.audio("boss", "Assets/boss.mp3")
    }

    create(){
        
        let indice = (genero == "masculino") ? 0 : 18;

        this.corredor = this.add.image(640, 360, "corredor").setScale(0.4);
        let posicaox = posicao.saiusala === true? 800: 430;
        this.jogador = this.physics.add.sprite(posicaox, 400, 'personagem', indice).setScale(2).refreshBody();
        if (posicao.saiusala === true){
            posicao.saiusala = false;
        }
        let gif = document.getElementById("gif");

        if(this.anims.exists('amigodireita')) this.anims.remove('amigodireita');
        if(this.anims.exists('amigofrente')) this.anims.remove('amigofrente');
        if(this.anims.exists('amigotras')) this.anims.remove('amigotras');
        if(this.anims.exists('amigoparado')) this.anims.remove('amigoparado');
        if(this.anims.exists('amigoparadodecostas')) this.anims.remove('amigoparadodecostas');
        if(this.anims.exists('amigoparadolado')) this.anims.remove('amigoparadolado');
        
        //MOVIMENTO DO AMIGO
        this.anims.create ( { key:"amigodireita",
            frames: this.anims.generateFrameNumbers("amigo", {start:13, end: 15}),
            frameRate: 8,
            repeat:-1
                });

        this.anims.create ( { key:"amigofrente",
            frames: this.anims.generateFrameNumbers("amigo", {start:1, end: 3}),
            frameRate: 8,
            repeat:-1
                });
        
        this.anims.create ( { key:"amigotras",
            frames: this.anims.generateFrameNumbers("amigo", {start:4, end: 7}),
            frameRate: 8,
            repeat:-1
                });

        this.anims.create ( { key:"amigoparado",
            frames: this.anims.generateFrameNumbers("amigo", {start:0, end: 0}),
            frameRate: 1,
            repeat:-1
                });

        this.anims.create({ key : "amigoparadodecostas",
        frames: this.anims.generateFrameNumbers("amigo", {start:4, end: 4}),
        frameRate:1,
        repeat:-1
        });

        this.anims.create({ key : "amigoparadolado",
        frames: this.anims.generateFrameNumbers("amigo", {start:13, end: 13}),
        frameRate:1,
        repeat:-1
        });

        //movimento da valentona

        
        if(this.anims.exists('valentonaesquerda')) this.anims.remove('valentonaesquerda');
        if(this.anims.exists('valentonafrente')) this.anims.remove('valentonafrente');
        if(this.anims.exists('valentonatras')) this.anims.remove('valentonatras');
        if(this.anims.exists('valentonaparadaesquerda')) this.anims.remove('valentonaparadaesquerda');

        this.anims.create ( { key:"valentonaesquerda",
                frames: this.anims.generateFrameNumbers("valentona", {frames: [3, 7, 11]}),
                frameRate: 8,
                repeat:-1
                });
        this.anims.create({ key:"valentonafrente",
                frames: this.anims.generateFrameNumbers("valentona", {frames:[4,8]}),
                frameRate: 8,
                repeat:-1
                });
        this.anims.create ({key:"valentonatras",
                frames : this.anims.generateFrameNumbers("valentona", {frames:[6,10]}),
                frameRate:8,
                repeat:-1});

        this.anims.create({key:"valentonaparadaesquerda",
                frames:[{key:"valentona", frame:3}],
                frameRate:1,
                repeat:-1});


        
        let parado, andandoesquerda, andandofrente, andandoparatras;

        if(this.anims.exists('defrente')) this.anims.remove('defrente');
        if(this.anims.exists('esquerda')) this.anims.remove('esquerda');
        if(this.anims.exists('frente')) this.anims.remove('frente');
        if(this.anims.exists('paratras')) this.anims.remove('paratras');

        this.cursors = this.input.keyboard.createCursorKeys();
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


        if (conversou === true){
            let frame = genero === "masculino" ? 1 : 19
            this.amigo = this.physics.add.sprite(650, 460, 'amigo', 13).setScale(1.5);
            this.valentona = this.physics.add.sprite(750, 460, 'valentona', 3).setScale(5);
            this.dialogovalentona = this.add.text(150, 550, " Qual é, Cleber? Vai fugir de novo?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona2 = this.add.text(150, 550, " Achei que a gente já tinha combinado... almoço pra mim todo dia.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogocleber = this.add.text(150, 550, " Letícia, eu juro… eu não tenho dinheiro hoje. Nem lanche eu trouxe…", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona3 = this.add.text(150, 550, " Ahhh, sempre a mesma desculpa.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona4 = this.add.text(150, 550, " Sabe que isso tá começando a me cansar, né?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona5 = this.add.text(150, 550, " Acho que vou ter que começar a cobrar em 'prestações'... tipo, sua mochila, \n talvez?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona6 = this.add.text(150, 550, " …Quem—?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona7 = this.add.text(150, 550, " Tsc. Você?", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona8 = this.add.text(150, 550, " Veio salvar o amiguinho? Que bonitinho", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogocleber2 = this.add.text(150, 550, " Ainda bem que você chegou…", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona9 = this.add.text(150, 550, " Sabe que não gosto de plateia.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona10 = this.add.text(150, 550, " Mas beleza. Já que quer se meter, vai pagar o dobro.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
            this.dialogovalentona11 = this.add.text(150, 550, " Hora de ensinar matemática… com juros.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);



            this.tweens.add({
                targets: this.amigo,
                x: 550,
                duration: 2000,
                ease: 'Linear',
                onStart:()=>{
                    this.amigo.play("amigodireita");
                },
                onComplete:()=>{
                    this.amigo.play("amigoparadolado");
                }
            })
            this.tweens.add({
                targets: this.valentona,
                x: 650,
                duration: 2000,
                ease: 'Linear',
                onStart:()=>{
                    this.valentona.play("valentonaesquerda");
                },
                onComplete:()=>{
                    this.valentona.play("valentonaparadaesquerda");
                    this.retangulo.setVisible(true);
                    this.dialogovalentona.setVisible(true);
                    this.input.keyboard.once("keydown-Z", ()=>{
                        this.dialogovalentona.setVisible(false);
                        this.dialogovalentona2.setVisible(true);
                        this.input.keyboard.once("keydown-Z", ()=>{
                            this.dialogovalentona2.setVisible(false);
                            this.dialogocleber.setVisible(true);
                            this.input.keyboard.once("keydown-Z", ()=>{
                                this.dialogocleber.setVisible(false);
                                this.dialogovalentona3.setVisible(true);
                                this.input.keyboard.once("keydown-Z", ()=>{
                                    this.dialogovalentona3.setVisible(false)
                                    this.retangulo.setVisible(false)
                                    this.tweens.add({
                                        targets:this.amigo,
                                        x:450,
                                        duration: 2000,
                                        ease: "Linear",
                                        onStart:()=>{
                                            this.amigo.play("amigodireita")
                                        },
                                        onComplete:()=>{
                                            this.amigo.play("amigoparadolado")
                                        }
                                    })

                                    this.tweens.add({
                                        targets: this.valentona,
                                        x: 550,
                                        duration: 2000,
                                        ease: 'Linear',
                                        onStart:()=>{
                                            this.valentona.play("valentonaesquerda");
                                        },
                                        onComplete:()=>{
                                            this.valentona.play("valentonaparadaesquerda");
                                            this.retangulo.setVisible(true);
                                            this.dialogovalentona4.setVisible(true);
                                            this.input.keyboard.once("keydown-Z", ()=>{
                                                this.dialogovalentona4.setVisible(false);
                                                this.dialogovalentona5.setVisible(true);
                                                this.input.keyboard.once("keydown-Z", ()=>{
                                                    this.dialogovalentona5.setVisible(false);
                                                    this.retangulo.setVisible(false);
                                                    this.tweens.add({
                                                        targets: this.amigo,
                                                        x: 400,
                                                        duration: 2000,
                                                        ease: 'Linear',
                                                        onStart:()=>{
                                                            this.amigo.play("amigodireita");
                                                        },
                                                        onComplete:()=>{
                                                            this.amigo.play("amigoparadolado");
                                                            this.tweens.add({
                                                                targets: this.jogador,
                                                                y: 460,
                                                                duration: 2000,
                                                                ease: 'Linear',
                                                                onStart:()=>{
                                                                    this.jogador.play("frente");
                                                                },
                                                                onComplete:()=>{
                                                                    this.jogador.anims.stop();
                                                                    this.jogador.setFrame(frame);
                                                                    this.jogador.flipX = true;
                                                                    this.retangulo.setVisible(true);
                                                                    this.dialogovalentona6.setVisible(true);
                                                                    this.input.keyboard.once("keydown-Z", ()=>{
                                                                        this.dialogovalentona5.setVisible(false);
                                                                        this.dialogovalentona6.setVisible(true);
                                                                        this.input.keyboard.once("keydown-Z", ()=>{
                                                                            this.dialogovalentona6.setVisible(false);
                                                                            this.dialogovalentona7.setVisible(true);
                                                                            this.input.keyboard.once("keydown-Z", ()=>{
                                                                                this.dialogovalentona7.setVisible(false);
                                                                                this.dialogovalentona8.setVisible(true);
                                                                                this.input.keyboard.once("keydown-Z", ()=>{
                                                                                    this.dialogovalentona8.setVisible(false);
                                                                                    this.dialogocleber2.setVisible(true);
                                                                                    this.amigo.setFrame(0);
                                                                                    this.input.keyboard.once("keydown-Z", ()=>{
                                                                                        this.amigo.setFrame(13);
                                                                                        this.dialogocleber2.setVisible(false);
                                                                                        this.dialogovalentona9.setVisible(true);
                                                                                        this.input.keyboard.once("keydown-Z", ()=>{
                                                                                            this.dialogovalentona9.setVisible(false);
                                                                                            this.dialogovalentona10.setVisible(true);
                                                                                            this.input.keyboard.once("keydown-Z", ()=>{
                                                                                                this.dialogovalentona10.setVisible(false);
                                                                                                this.dialogovalentona11.setVisible(true);
                                                                                                this.input.keyboard.once("keydown-Z", ()=>{
                                                                                                    this.dialogovalentona11.setVisible(false);
                                                                                                    this.retangulo.setVisible(false);
                                                                                                    gif.style.display = "block";
                                                                                                    this.sound.play("boss")
                                                                                                    setTimeout(()=>{
                                                                                                        this.scene.start('Facil')
                                                                                                        }, 2000);
                                                                                                    
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                });
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    });

                }
            });
            
            

        }
        this.portasala = this.add.rectangle(815, 320, 50, 100, 255, 0);
        this.portadeposito = this.add.rectangle(430, 320, 50, 100, 255, 0);
        this.portasala2 = this.add.rectangle(550, 320, 50, 100, 255, 0);
        this.armarios = this.add.rectangle(700, 325, 100, 100, 255, 0);
        this.seuarmario = this.add.rectangle(630, 325, 50, 100, 0, 0);
        this.paredealto = this.add.rectangle(530, 320, 1000, 100, 255, 0);
        this.paredebaixo = this.add.rectangle(530, 550, 1000, 50, 255, 0);
        this.parededireita = this.add.rectangle(950, 550, 100, 1000, 255, 0);
        this.paredeesquerda = this.add.rectangle(330, 550, 100, 1000, 255, 0);
        
        this.retangulo = this.add.rectangle(644, 570, 1000, 200, 255, 0.5).setVisible(false);

        this.physics.add.existing(this.portasala, true);
        this.physics.add.existing(this.portasala2, true);
        this.physics.add.existing(this.portadeposito, true);
        this.physics.add.existing(this.armarios, true);
        this.physics.add.existing(this.seuarmario, true);
        this.physics.add.existing(this.paredealto, true);
        this.physics.add.existing(this.paredebaixo, true);
        this.physics.add.existing(this.parededireita, true);
        this.physics.add.existing(this.paredeesquerda, true);

        this.physics.add.collider(this.jogador, this.portasala);
        this.physics.add.collider(this.jogador, this.portasala2);
        this.physics.add.collider(this.jogador, this.portadeposito);
        this.physics.add.collider(this.jogador, this.armarios);
        this.physics.add.collider(this.jogador, this.seuarmario);
        this.physics.add.collider(this.jogador, this.paredealto);
        this.physics.add.collider(this.jogador, this.paredebaixo);
        this.physics.add.collider(this.jogador, this.parededireita);
        this.physics.add.collider(this.jogador, this.paredeesquerda);

        this.wasd = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        });


        
        this.dialogoportasala = this.add.text(150, 550, " A professora te trancou pro lado de fora.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.portasala.x, this.portasala.y);
            if (distancia < 90 && dialogoiniciado === false && inventarioaberto === false){
                dialogoiniciado = true
                this.retangulo.setVisible(true)
                this.dialogoportasala.setVisible(true)
                this.input.keyboard.once("keydown-Z", () =>{
                    this.retangulo.setVisible(false);
                    this.dialogoportasala.setVisible(false)
                    dialogoiniciado = false;
                })
            }
        })

        this.dialogoportasala2 = this.add.text(150, 550, " Essa não é a sua sala de aula!", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.portasala2.x, this.portasala2.y);
            if (distancia < 90 && dialogoiniciado === false && inventarioaberto === false){
                dialogoiniciado = true
                this.retangulo.setVisible(true)
                this.dialogoportasala2.setVisible(true)
                this.input.keyboard.once("keydown-Z", () =>{
                    this.retangulo.setVisible(false);
                    this.dialogoportasala2.setVisible(false)
                    dialogoiniciado = false;
                })
            }
        })

        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.portadeposito.x, this.portadeposito.y);
            if (distancia < 90 && dialogoiniciado === false && conversou === false && inventarioaberto === false)  {
                this.scene.start('Armazem');
            }
        })

        this.dialogoarmarios = this.add.text(150, 550, " Está trancado.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.armarios.x, this.armarios.y);
            if (distancia < 90 && dialogoiniciado === false && inventarioaberto === false){
                dialogoiniciado = true
                this.retangulo.setVisible(true)
                this.dialogoarmarios.setVisible(true)
                this.input.keyboard.once("keydown-Z", () =>{
                    this.retangulo.setVisible(false);
                    this.dialogoarmarios.setVisible(false)
                    dialogoiniciado = false;
                })
            }
        })

        this.dialogoseuarmario = this.add.text(150, 550, " É o seu armário. Dentro tinha uma maça.", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoseuarmario2 = this.add.text(150, 550, " Maça foi adicionada aos seus itens!", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);
        this.dialogoseuarmario3 = this.add.text(150, 550, " Não há mais nada de interessante aí dentro", { fontSize: '20px', fill: "#FFFFFF" }).setVisible(false);

        this.input.keyboard.on("keydown-Z", () => {
            let distancia = Phaser.Math.Distance.Between(this.jogador.x, this.jogador.y, this.seuarmario.x, this.seuarmario.y);
            if (distancia < 90 && dialogoiniciado === false && inventarioaberto === false) {
                dialogoiniciado = true;
                if (pegouitem === false) {
                    this.retangulo.setVisible(true)
                    this.dialogoseuarmario.setVisible(true)
                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogoseuarmario.setVisible(false)
                        this.dialogoseuarmario2.setVisible(true)
                        // Adiciona a maça como um objeto
                        bens.push("Maça");
                        pegouitem = true
                        this.input.keyboard.once("keydown-Z", () => {
                            this.dialogoseuarmario2.setVisible(false)
                            this.retangulo.setVisible(false)
                            dialogoiniciado = false;
                        });
                    });
                } else {
                    this.retangulo.setVisible(true)
                    this.dialogoseuarmario3.setVisible(true)
                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogoseuarmario3.setVisible(false)
                        this.retangulo.setVisible(false)
                        dialogoiniciado = false;
                    });
                }
            }
        });

        
         if (dialogoiniciado === false && conversou === false){
             inventario(this)
         }
    }

    update(){
        let andando = false;
        let teclas = this.wasd;
        let jogador = this.jogador;

        // Garante que o jogador não se mova durante diálogos ou inventário
        if (conversou === true || inventarioaberto === true || dialogoiniciado === true){ 
            this.jogador.body.setVelocity(0);
            this.jogador.body.setMaxVelocity(0);
            return;
        } else {
            jogador.body.setVelocity(0);
            jogador.body.setMaxVelocity(150);
        }
        
        if(teclas.left.isDown){
            jogador.setVelocityX(-150);
            jogador.anims.play("esquerda",true)
            jogador.flipX = false;
            andando = true
        } else if(teclas.right.isDown){
            jogador.setVelocityX(150)
            jogador.anims.play("esquerda",true)
            jogador.flipX = true;
            andando = true
        } else if(teclas.down.isDown){
            jogador.setVelocityY(150);
            jogador.anims.play("frente",true)
            andando = true;
        } else if(teclas.up.isDown){
            jogador.setVelocityY(-150);
            jogador.anims.play("paratras", true);
            andando = true
        } else {
            if (!andando){
                jogador.anims.play("defrente", true);
            }
        }
    }
}
