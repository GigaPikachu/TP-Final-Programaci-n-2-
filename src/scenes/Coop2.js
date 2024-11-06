import { Scene } from 'phaser';

import { caja } from "../entities/caja.js"
import { vendedor } from "../entities/objetos/vendedor.js";
import { jugador } from "../entities/jugador2.js"

import { slime } from "../entities/enemy/slime.js"
import { fantasma } from "../entities/enemy/fantasma.js"
import { esqueleto } from "../entities/enemy/esqueleto.js"

import { next_level } from "../components/next_level.js"
import { puerta } from "../entities/puzles/puerta.js"
import { candado } from "../entities/puzles/candado.js"
import { P_boton } from "../entities/puzles/P_boton.js"

const time_gen_enemy = 5000;
const enemy_max = 10; // enemigos maximos (menos 1)

export class Coop2 extends Scene {
    constructor () {
        super('Coop2');
    }

    init(data) {
        this.text = data.text;
        this.idioma = data.idioma;
        this.vida = [];
        this.vida[0] = data.vida[0] || 100;
        this.vida[1] = data.vida[1] || 100;

        // Hud
        this.monedas = 0;
        this.scene.launch("Hud_Coop", { text: this.text, idioma: this.idioma });
    }

    create() {

        if(true){ //fondo
            this.map = this.make.tilemap({key:"Nivel_2"})
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
            this.puerta[0] = new P_boton(this, 36, 24, 0, 35, 20, 38, 20, 0, 0) //scene, x, y, frame, b1x, b1y, b2x, b2y, x2, y2

            this.puerta[1] = new P_boton(this, 36, 40, 0, 35, 37, 38, 37, 0, 0) //scene, x, y, frame, b1x, b1y, b2x, b2y, x2, y2

            this.puerta[2] = new puerta(this, 10, 15, 0, 6, 21, 15, 21) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[3] = new P_boton(this, 15, 50, 0, 13, 55, 13, 52, 0, 0) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[4] = new puerta(this, 24, 12, 0, 19, 7, 30, 7) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[5] = new candado(this, 21, 44, 0, 36.5, 20,);

            this.puerta[6] = new P_boton(this, 10, 27, 0, 9, 29, 12, 29, 10, 32) //scene, x, y, frame, b1x, b1y, b2x, b2y, x2, y2

            this.puerta[7] = new P_boton(this, 4, 50, 0, 3, 44, 5, 44, 4, 40) //scene, x, y, frame, b1x, b1y, b2x, b2y, x2, y2

            this.vendedor = new vendedor(this, 18, 54, 2);
        }

        if (true){ //enemigos
            this.enemigo = []
            this.enemigo[0] = new esqueleto (this, 66, 20, 0);
            this.enemigo[1] = new fantasma(this, 71, 36, 0);
            this.enemigo[2] = new fantasma(this, 67, 40, 0);
            this.enemigo[3] = new fantasma(this, 71, 46, 0);

            this.time.addEvent({
                delay: time_gen_enemy,
                loop: true,
                callback: () => {
                    if (this.puerta[2].active){
                        for (var i = 8; i < 13; i ++){
                            if (this.enemigo[i] == null || !this.enemigo[i].active){
                                this.pos_x = Phaser.Math.Between(19, 30);
                                this.pos_y = Phaser.Math.Between(2, 10);
                                this.enemigo[i] = new slime(this, this.pos_x, this.pos_y, "slime", 0);
                                break;
                            }
                        }
                    }

                    for (var i = 13; i < 18; i ++){
                        if (this.enemigo[i] == null || !this.enemigo[i].active){
                            this.pos_x = Phaser.Math.Between(19, 30);
                            this.pos_y = Phaser.Math.Between(2, 10);
                            this.enemigo[i] = new esqueleto (this, this.pos_x, this.pos_y, 0);
                            break;
                        }
                    }

                    for (var i = 5; i < 8; i ++){
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

            this.jugador1 = new jugador(this, 26, 27, "jugador1", 0, this.vida[0]); //scene, x, y, texture, frame
            this.jugador2 = new jugador(this, 26 , 29, "jugador2", 0, this.vida[1]);
    
            this.cameras.main.setVisible(false);
        }

        if (true) { //objetos
            if(true){ //cajas
                this.caja = []
                for( var i = 0; i < 6; i ++ ){//caja uno de zona de fantasmas
                    this.caja[i] = new caja(this, 65, 35 + i + i, "caja", 0);
                }
                for( var i = 0; i < 6; i ++ ){//caja dos de zona de fantasmas
                    this.caja[i] = new caja(this, 73, 35 + i + i, "caja", 0);
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

            this.next_level = new next_level(this, 26, 23, 1);
        }
    }

    update() {
        console.clear();
        this.jugador1.update("jugador1", this);
        this.jugador2.update("jugador2", this);

        this.enemigos.getChildren().forEach((enemigos) => {
            enemigos.update()
        })

        this.fantasmas.getChildren().forEach((enemigos) => {
            enemigos.update()
        })

        for (var i = 0; i < 10; i ++){
            if (this.puerta[i] != null){
                if (this.puerta[i].active){
                    this.puerta[i].update()
                }
            }
        }

        //hud
        this.scene.get("Hud_Coop").update_coins(this.monedas);

        this.next_level.update()
    }
}