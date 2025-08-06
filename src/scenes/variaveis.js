export let armas = { arma: ["Regua Trincada", "Compasso de Titânio", "Transferidor Afiado", "Caneta Quântica", "Estojão da Desgraça", "Compasso Duplo", "Borracha do Esquecimento", "Lápis n°2 Maldito", "Esquadro Letal", "Livrão de Álgebra", "Tesoura de 3 Pontas", "Estojo do Caos", ""]}
import {bens} from "./inicio3.js"
let inventarioaberto = false
let dialogoiniciado = false;
export let hp = {hpatual: 0}  //facil :50 restante: 30
export let qi = {qiatual: 0}  //facil:60 restante: 40
export let nivel = {nivelatual:1}, ataque = {ataqueatual: 0}, defesa = {defesaatual: 0}, xp = {xpatual:0}


export function inventario(a){
    a.status = a.add.rectangle(640, 360, 300, 200, 255, 0.5).setVisible(false);
    a.statushabilidade = a.add.rectangle(640, 360, 300, 200, 255, 0.5).setVisible(false);
    a.inventario = a.add.rectangle(640, 360, 300, 500, 255, 0.5).setVisible(false);
    a.semitens = a.add.text(530, 150, "Voce nao tem bens", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
    a.item1 = a.add.text(530, 150, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
    a.item2 = a.add.text(530, 190, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
    a.item3 = a.add.text(530, 230, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
    a.item4 = a.add.text(530, 270, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
    a.item5 = a.add.text(530, 310, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
    a.item6 = a.add.text(530, 350, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
    a.item7 = a.add.text(530, 390, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);
    a.item8 = a.add.text(530, 430, "", { fontSize: '20px', color: '#FFFFFF' }).setVisible(false);

    a.input.keyboard.on("keydown-X", () => {
        a.inventario.setVisible(false)
        a.semitens.setVisible(false);
        a.item1.setText(bens[0] || "").setVisible(false);
        a.item2.setText(bens[1] || "").setVisible(false);
        a.item3.setText(bens[2] || "").setVisible(false);
        a.item4.setText(bens[3] || "").setVisible(false);
        a.item5.setText(bens[4] || "").setVisible(false);
        a.item6.setText(bens[5] || "").setVisible(false);
        a.item7.setText(bens[6] || "").setVisible(false);
        a.item8.setText(bens[7] || "").setVisible(false);

        inventarioaberto = inventarioaberto === false ? true : false;

        if (inventarioaberto === true) {
            a.inventario.setVisible(true);
            if (bens.length === 0) {
                a.semitens.setVisible(true);
            } else {
                if (bens.length >= 1) {
                    a.item1.setVisible(true);
                }
                if (bens.length >= 2) {
                    a.item2.setVisible(true);
                }
                if (bens.length >= 3) {
                    a.item3.setVisible(true);
                }
                if (bens.length >= 4) {
                    a.item4.setVisible(true);
                }
                if (bens.length >= 5) {
                    a.item5.setVisible(true);
                }
                if (bens.length >= 6) {
                    a.item6.setVisible(true);
                }
                if (bens.length >= 7) {
                    a.item7.setVisible(true);
                }
                if (bens.length >= 8) {
                    a.item8.setVisible(true);
                }
            }
        }
    });
}

export function batalha(a){
        
}

export class Variaveis extends Phaser.Scene { 

    constructor() {
        super('Variaveis'); 
    }
}