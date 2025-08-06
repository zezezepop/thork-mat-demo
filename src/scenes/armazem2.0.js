import { posicaoplayerx } from "./armazem.js";
import { posicaoplayery } from "./armazem.js";
import { nivelfacil } from "./armazem.js";
import { nivelmedio } from "./armazem.js";
import { niveldificil } from "./armazem.js";
import { nivelhack } from "./armazem.js";
import { genero } from './Game.js'; 
export let conversou = false;



export class Armazem2 extends Phaser.Scene {
    constructor(){
        super("Armazem2");
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
                
        let indice = genero == "masculino" ? 0 : 18;

        this.jogador = this.physics.add.sprite(posicaoplayerx, posicaoplayery, 'personagem', indice).setScale(2).refreshBody();

        this.amigo = this.physics.add.sprite(735, 450, "amigo",8).setScale(1.5);
        this.retangulo = this.add.rectangle(644, 570, 1000, 200, 255, 0.5).setVisible(false);
        
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
        
        
        let botaomataraula = document.getElementById("mataraula");
        let botaonaomatar = document.getElementById("naomatar");

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
        

        this.retangulo.setVisible(true);
        if (nivelfacil === true) {
            this.dialogoamigonivelfacil.setVisible(true);
        } else if (nivelmedio === true) {
            this.dialogoamigonivelmedio.setVisible(true);
        } else if (niveldificil === true) {
            this.dialogoamigoniveldificil.setVisible(true);
        } else {
            this.dialogoamigonivelhack.setVisible(true);
        }

        this.input.keyboard.once("keydown-Z", () => {
            conversou = true;
            this.dialogoamigonivelfacil.setVisible(false);
            this.dialogoamigonivelmedio.setVisible(false);
            this.dialogoamigoniveldificil.setVisible(false);
            this.dialogoamigonivelhack.setVisible(false);
            this.dialogoamigovoltarsala.setVisible(true);
            this.input.keyboard.once("keydown-Z", () => {
                this.dialogoamigovoltarsala.setVisible(false);
                this.dialogoamigovoltarsala2.setVisible(true);
                this.input.keyboard.once("keydown-Z", () => {
                    this.dialogoamigovoltarsala2.setVisible(false);
                    this.dialogoamigovoltarsala3.setVisible(true);
                    this.input.keyboard.once("keydown-Z", () => {
                        this.dialogoamigovoltarsala3.setVisible(false);
                        this.retangulo.setVisible(false);
                        botaomataraula.style.display = "block";
                        botaonaomatar.style.display = "block";

                        botaomataraula.onclick = () => {
                            this.retangulo.setVisible(true);
                            botaomataraula.style.display = "none";
                            botaonaomatar.style.display = "none";
                            this.dialogoamigomataraula.setVisible(true);
                            this.input.keyboard.once("keydown-Z", () => {
                                this.dialogoamigomataraula.setVisible(false);
                                this.dialogoamigonaomataraula.setVisible(false);
                                this.retangulo.setVisible(false);
                     
                                this.tweens.add({
                                targets: this.amigo,
                                x: 640,
                                duration: 2000,
                                ease: 'Linear',
                                onStart: () => {
                                    this.amigo.play("amigodireita");
                                    this.amigo.flipX = true;
                                },
                                onComplete: () => {
                                    this.amigo.play("amigoparado");
                                    this.tweens.add({
                                        targets: this.amigo,
                                        y: 530,
                                        duration: 2000,
                                        ease: 'Linear',
                                        onStart: () => {
                                            this.amigo.play("amigofrente");
                                            this.amigo.flipX = true;
                                        },
                                        onComplete: () => {
                                            this.amigo.play("amigoparado");
                                            this.tweens.add({
                                                targets: this.amigo,
                                                alpha: 0,
                                                duration: 1000,
                                                ease: "Linear",
                                                onComplete: ()=>{
                                                    this.scene.start('Armazem');
                                                    
                                                }

                                                
                                        
                                            });
                                        
                                        }
                                    });
                                    
                                }
                            });
                                
                              
                            });
                            
                            };

                            botaonaomatar.onclick = () => {
                                this.retangulo.setVisible(true);
                                botaomataraula.style.display = "none";
                                botaonaomatar.style.display = "none";
                                this.dialogoamigonaomataraula.setVisible(true);
                                this.input.keyboard.once("keydown-Z", () => {
                                    this.dialogoamigomataraula.setVisible(false);
                                    this.dialogoamigonaomataraula.setVisible(false);
                                    this.retangulo.setVisible(false);
                                   
                                            
                                    this.tweens.add({
                                        targets: this.amigo,
                                        x: 640,
                                        duration: 2000,
                                        ease: 'Linear',
                                        onStart: () => {
                                            this.amigo.play("amigodireita");
                                            this.amigo.flipX = true;
                                        },
                                        onComplete: () => {
                                            this.amigo.play("amigoparado");
                                            this.tweens.add({
                                                targets: this.amigo,
                                                y: 530,
                                                duration: 2000,
                                                ease: 'Linear',
                                                onStart: () => {
                                                    this.amigo.play("amigofrente");
                                                    this.amigo.flipX = true;
                                                },
                                                onComplete: () => {
                                                    this.amigo.play("amigoparado");
                                                    this.tweens.add({
                                                        targets: this.amigo,
                                                        alpha: 0,
                                                        duration: 1000,
                                                        ease: "Linear",
                                                        onComplete: ()=>{
                                                            this.scene.start("Armazem")
                                                        
                                                            
                                                            }
                                                        
                                                        });
                                                    
                                            }
                                        });
                                        
                                    }
                                });
                                   
                                    

                            });
                        
                            };

    
                        });
                    });
                });
            });
            
        
}
}