import { genero } from './Game.js'; 
import { nome } from "./Game.js"
export class Inicio extends Phaser.Scene {

    constructor(){
        super("Inicio")
    }

    preload(){
        this.load.image('escola', 'Assets/escola.png');
        this.load.spritesheet("personagem", "Assets/personagens.png", { //carrega a imagem com os sprites do personagem
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
        this.load.spritesheet("npc1", "Assets/f_01.png",{
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
        this.escola = this.add.image(640,360, "escola").setScale(0.5)
        this.jogador = this.physics.add.sprite(500, 545, 'personagem',indice).setScale(2)
        this.professora = this.physics.add.sprite(700, 100, 'professora').setScale(5)
        //this.professora = this.add.sprite(700, 100, 'professora',).setScale(5);
        this.amigo = this.add.sprite(575, 545, "amigo",8).setScale(1.5);
        this.add.sprite(500, 300, "npc1",2).setScale(4);
        this.add.sprite(555, 300, "npc2",2).setScale(4);
        this.add.sprite(500, 420, "npc3",2).setScale(4);
        this.add.sprite(690, 545, "npc4",2).setScale(4);
        this.add.sprite(740, 420, "npc5", 2).setScale(4);
        this.add.sprite(740, 300, "npc6",2).setScale(5);
        let retangulo = this.add.rectangle(644, 570, 1000, 200, 255, 0.5);
        



        retangulo.setVisible(false);

        this.anims.create ( { key:"praesquerda",
                frames: this.anims.generateFrameNumbers("professora", {frames: [3, 7, 11]}),
                frameRate: 8,
                repeat:-1
                })
        this.anims.create({ key:"prafrente",
                frames: this.anims.generateFrameNumbers("professora", {frames:[4,8]}),
                frameRate: 8,
                repeat:-1
                })
        this.anims.create ({key:"tras",
                frames : this.anims.generateFrameNumbers("professora", {frames:[6,10]}),
                frameRate:8,
                repeat:-1})
        this.anims.create( {key: "parada", //caso for:
                frames: [{key:"professora",  frame:0}],
                frameRate: 1,
                repeat:-1})
        this.anims.create({key:"paradaesquerda",
                frames:[{key:"professora", frame:3}],
                frameRate:1,
                repeat:-1})

        this.tweens.add({
            targets: this.professora,
            x: 620,
            duration: 2000,
            ease: "Linear",
            onStart: () => {
                this.professora.play("praesquerda");
            },
            onComplete: () => {
                this.professora.play("parada");
                 this.tweens.add({
                targets: this.professora,
                y: 545,
                duration: 6000,
                ease: "Linear",
                onStart: () => {
                    this.professora.play("prafrente");
                },
                onComplete: () => {
                    this.professora.play("paradaesquerda");
                    retangulo.setVisible(true);
                    let indiceatual = 0
                    let pronome = genero == "masculino"? "moleque" : "garota";
                    let pronome2 = genero =="masculino"? "acordado":"acordada"
                    let dialogo1 = this.add.text(550, 550, nome + "!", { fontSize: '50px', fill: "#FFFFFF" });
                    let dialogo2 = this.add.text(150, 550, " Ta dormindo de novo, " + pronome + " !",{ fontSize: '30px', fill: "#FFFFFF" }).setVisible(false);  
                    let dialogo3 = this.add.text(150, 550," Eu já falei quatro vezes a mesma coisa!", {fontSize:"30px", fill:"#FFFFFF" }).setVisible(false)
                    let dialogo4 = this.add.text(150, 550," Se não vai prestar atenção, pelo menos finja \n que está " + pronome2 +"!", {fontSize:"30px", fill:"#FFFFFF" }).setVisible(false)
                    let dialogo5 = this.add.text(150, 550," Levanta. Vai até a sala dos professores e traz a prova \n que eu preparei pra vocês.", {fontSize:"30px", fill:"#FFFFFF" }).setVisible(false)
                    let dialogo6 = this.add.text(150, 550, " E volta direto. Nada de ficar andando pelos \n corredores.", { fontSize: '30px', fill: "#FFFFFF" }).setVisible(false)
                    let dialogos = [dialogo1, dialogo2, dialogo3, dialogo4, dialogo5, dialogo6]
                    let andou = 0;
                    addEventListener("keydown", (event)=>{
                        if (event.key === "z" || event.key === "Z") {
                            if (indiceatual < dialogos.length) {
                                dialogos[indiceatual].setVisible(false);
                                indiceatual++;
                                if (indiceatual < dialogos.length) {
                                    dialogos[indiceatual].setVisible(true);
                                } else {
                                    retangulo.setVisible(false);
                                    this.amigo.setFrame(13);
                                    andou++;

                                let indiceatual2 = 0

                                if (andou >0){
                                    let pronome3 = genero === "masculino"? "nele": "nela"
                                    retangulo.setVisible(true)
                                    let texto0 = this.add.text(150, 550, " ", {fontSize:"10px",fill: "#FFFFFF"}).setVisible(false)
                                    let texto1 = this.add.text(150, 550, ' Professora, posso ir junto?', { fontSize: '30px', fill: '#FFFFFF' }).setVisible(false)
                                    let texto2 = this.add.text(150,550, " Não.", {fontSize: '30px', fill: "#FFFFFF"}).setVisible(false)
                                    let texto3 = this.add.text(150,550, " ...", {fontSize: '30px', fill: "#FFFFFF"}).setVisible(false)
                                    let texto4 = this.add.text(150,550, " Quer saber? Vai logo. E fica de olho "+ pronome3 + "." , {fontSize: '30px', fill: "#FFFFFF"}).setVisible(false)
                                    let texto5 = this.add.text(150,550, " Pode deixar!", {fontSize: '30px', fill: "#FFFFFF"}).setVisible(false)
                                    let texto6 = this.add.text(150,550, " Se vocês demorarem, vão os dois direto pra coordenação", {fontSize: '30px', fill: "#FFFFFF"}).setVisible(false)
                                    let texto7 = this.add.text(150,550, " Pode deixar! Bora, " + nome + ".", {fontSize: '30px', fill: "#FFFFFF"}).setVisible(false)

                                    let dialogos2 = [texto0, texto1,texto2,texto3,texto4,texto5,texto6,texto7]
                                    addEventListener('keydown', (event)=>{
                                        if (event.key === "z" || event.key ==="Z"){
                                            if (indiceatual2< dialogos2.length) {
                                                dialogos2[indiceatual2].setVisible(false)
                                                indiceatual2++
                                            }
                                            if (indiceatual2<dialogos2.length){
                                                dialogos2[indiceatual2].setVisible(true)
                                                
                                            }
                                            else{
                                                retangulo.setVisible(false)
                                                this.tweens.add({
                                                    targets:this.professora,
                                                    y:100,
                                                    duration:6000,
                                                    ease: "Linear",
                                                    onStart:()=>{
                                                        this.professora.play("tras")
                                                    },
                                                    onComplete:()=>{
                                                        this.professora.play("parada")
                                                        this.scene.start('Inicio2');
                                                    }
                                                })
                                            }
                            }
                        })}
                                
                            }}}})
                    
                            

                            
                }     
                            })
                }
                    })
                }
            }
            
        



