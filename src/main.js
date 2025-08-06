import { Start } from './scenes/Start.js';
import { Game } from './scenes/Game.js';
import { Inicio } from './scenes/inicio.js';
import { Inicio2 } from './scenes/inicio2.js';
import { Inicio3 } from './scenes/inicio3.js';
import { Armazem } from './scenes/armazem.js';
import { Armazem2 } from './scenes/armazem2.0.js';
import { Facil } from './scenes/batalha1nivelfacil.js';
import { Variaveis } from './scenes/variaveis.js';



const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    /*width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE, 
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },*/
    scene: [
        Start, Game, Inicio, Inicio2, Inicio3, Armazem, Armazem2, Facil, Variaveis],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

new Phaser.Game(config);
            