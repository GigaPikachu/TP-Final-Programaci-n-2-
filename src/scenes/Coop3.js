import { Scene } from 'phaser';

import { caja } from "../entities/caja.js"
import { jugador } from "../entities/jugador2.js"
import { slime } from "../entities/enemy/slime.js"
import { hongo } from "../entities/enemy/hongo.js"
import { fantasma } from "../entities/enemy/fantasma.js"
import { esqueleto } from "../entities/enemy/esqueleto.js"

import { next_level } from "../components/next_level.js"
import { puerta } from "../entities/puzles/puerta.js"
import { candado } from "../entities/puzles/candado.js"

const time_gen_enemy = 5000;
const enemy_max = 10; // enemigos maximos (menos 1)

export class Coop3 extends Scene {
    constructor () {
        super('Coop4');
    }

    init(data) {
        this.text = data.text;
        this.idioma = data.idioma;

        // Hud
        this.monedas = data.monedas || 0;
        this.scene.launch("Hud_Coop", { text: this.text, idioma: this.idioma });
    }

    create() {

        if(true){ //fondo
            this.map = this.make.tilemap({key:"Nivel_3"})
            this.tileset = this.map.addTilesetImage("Tiled", "tileset");
            this.fondo = this.map.createLayer("Background", this.tileset)
            this.fondo.setCollisionByProperty({colicionador: true})

            this.banderas = this.physics.add.group()
            this.jugadores = this.physics.add.group();
            this.objetos = this.physics.add.group();
            this.cajas = this.physics.add.group();
            this.enemigos = this.physics.add.group();
            this.fantasmas = this.physics.add.group();

            this.puerta = []
            this.puerta[0] = new puerta(this, 0, 0, 0, 35, 18, 38, 18) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[1] = new puerta(this, 36, 40, 0, 26, 36, 38, 36) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[2] = new puerta(this, 10, 15, 0, 6, 21, 15, 21) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[3] = new puerta(this, 15, 50, 0, 14, 54, 17, 54) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[4] = new candado(this, 21, 44, 0, 36, 20);
        }

        if (true){ //enemigos
            this.enemigo = []
            this.enemigo[0] = new fantasma(this, 17, 3, 0);

            this.time.addEvent({
                delay: time_gen_enemy,
                loop: true,
                callback: () => {
                    if (this.puerta[2].active){
                        for (var i = 0; i < 8; i ++){
                            if (this.enemigo[i] == null || !this.enemigo[i].active){
                                this.pos_x = Phaser.Math.Between(2, 19);
                                this.pos_y = Phaser.Math.Between(16, 27);
                                this.enemigo[i] = new slime(this, this.pos_x, this.pos_y, "slime", 0);
                                break;
                            }
                        }
                    }

                    for (var i = 0; i < 5 + 8; i ++){
                        if (this.enemigo[i] == null || !this.enemigo[i].active){
                            this.pos_x = Phaser.Math.Between(25, 39);
                            this.pos_y = Phaser.Math.Between(43, 55);
                            this.enemigo[i] = new esqueleto (this, this.pos_x, this.pos_y, 0);
                            break;
                        }
                    }

                    for (var i = 0; i < 5 + 8; i ++){
                        if (this.enemigo[i] == null || !this.enemigo[i].active){
                            this.pos_x = Phaser.Math.Between(25, 39);
                            this.pos_y = Phaser.Math.Between(43, 55);
                            this.enemigo[i] = new esqueleto (this, this.pos_x, this.pos_y, 0);
                            break;
                        }
                    }
                },
            });
        }

        if(true){ //jugadores
            this.hechizos = this.physics.add.group();

            this.jugador1 = new jugador(this, 4, 137, "jugador1", 0); //scene, x, y, texture, frame
            this.jugador2 = new jugador(this, 6, 137, "jugador2", 0);
    
            this.cameras.main.setVisible(false);
        }

        if (true) { //objetos
            if(true){ //cajas
                this.caja = []
                for( var i = 0; i < 12; i ++ ){
                    this.caja[i] = new caja(this, 2, 16 + i, "caja", 0);
                }
                for( var i = 0; i < 12; i ++ ){
                    this.caja[i] = new caja(this, 19, 16 + i, "caja", 0);
                }

                for( var i = 0; i < 10; i ++ ){
                    this.caja[i] = new caja(this, 14, 2 + i, "caja", 0);
                }
                for( var i = 0; i < 10; i ++ ){
                    this.caja[i] = new caja(this, 35, 2 + i, "caja", 0);
                }

                for( var i = 0; i < 6; i ++ ){
                    this.caja[i] = new caja(this, 23, 51 + 1 * i, "caja", 0);
                }
                for( var i = 0; i < 3; i ++ ){
                    this.caja[i] = new caja(this, 24, 50 + 1 * i, "caja", 0);
                }
                for( var i = 0; i < 3; i ++ ){
                    this.caja[i] = new caja(this, 52 + 1 * i, 51, "caja", 0);
                }
                for( var i = 0; i < 3; i ++ ){
                    this.caja[i] = new caja(this, 33 + 1 * i, 16, "caja", 0);
                }
                for( var i = 0; i < 2; i ++ ){
                    this.caja[i] = new caja(this, 33 + 1 * i, 17, "caja", 0);
                }
            }

            this.next_level = new next_level(this, 16 * 16, 16);
        }
    }

    update() {
        this.jugador1.update("jugador1", this);
        this.jugador2.update("jugador2", this);

        this.enemigos.getChildren().forEach((enemigos) => {
            enemigos.update()
        })

        this.fantasmas.getChildren().forEach((enemigos) => {
            enemigos.update()
        })

        for (var i = 0; i < 5; i ++){
            if (this.puerta[i].active){
                this.puerta[i].update()
            }
        }

        //hud
        this.scene.get("Hud_Coop").update_coins(this.monedas);

        this.next_level.update()
    }
}