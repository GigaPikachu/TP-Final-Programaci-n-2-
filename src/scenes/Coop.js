import { Scene } from 'phaser';

import { caja } from "../entities/caja.js"
import { jugador } from "../entities/jugador2.js"
import { slime } from "../entities/enemy/slime.js"
import { hongo } from "../entities/enemy/hongo.js"
import { esqueleto } from "../entities/enemy/esqueleto.js"

import { next_level } from "../components/next_level.js"
import { puerta } from "../entities/puerta.js"

const time_gen_enemy = 5000;
const enemy_max = 10; // enemigos maximos (menos 1)

export class Coop extends Scene {
    constructor () {
        super('Coop');
    }

    init(data) {
        this.text = data.text;
        this.idioma = data.idioma;

        // Hud
        this.monedas = 0;
        this.scene.launch("Hud_Coop", { text: this.text, idioma: this.idioma });
    }

    create() {

        if(true){ //fondo
            var map = this.make.tilemap({key:"Nivel_1"})
            var tileset = map.addTilesetImage("Tiled", "tileset");
            this.fondo = map.createLayer("Background", tileset)
            this.fondo.setCollisionByProperty({colicionador: true})

            this.banderas = this.physics.add.group()
            this.jugadores = this.physics.add.group();

            this.puerta = []
            this.puerta[0] = new puerta(this, 36, 25, 0, 35, 18, 38, 18) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[1] = new puerta(this, 36, 41, 0, 26, 36, 38, 36) //scene, x, y, frame, b1x, b1y, b2x, b2y
            this.puerta[2] = new puerta(this, 10, 16, 0, 6, 21, 15, 21) //scene, x, y, frame, b1x, b1y, b2x, b2y
        }

        if (true){ //enemigos
            this.enemigos = this.physics.add.group();

            this.slime = []
            this.slime[0] = new slime(this, 0, 0, "slime", 0);

            this.time.addEvent({
                delay: time_gen_enemy,
                loop: true,
                callback: () => {
                    if (this.puerta[2].active){
                        for (var i = 0; i < 8; i ++){
                            if (this.slime[i] == null || !this.slime[i].active){
                                this.pos_x = Phaser.Math.Between(2, 19);
                                this.pos_y = Phaser.Math.Between(16, 27);
                                this.slime[i] = new slime(this, this.pos_x, this.pos_y, "slime", 0);
                                break;
                            }
                        }
                    }
                },
            });

            this.esqueleto = []
            this.esqueleto[0] = new esqueleto(this, 36, 47, "esqueleto", 0);
            this.esqueleto[1] = new slime(this, 33, 46, "slime", 0);
            this.esqueleto[2] = new esqueleto(this, 38, 46, "esqueleto", 0);
        }

        if(true){ //jugadores
            this.hechizos = this.physics.add.group();

            this.jugador1 = new jugador(this, 420, 408, "jugador1", 0); //scene, x, y, texture, frame
            this.jugador2 = new jugador(this, 420 + 32, 408, "jugador2", 0);
    
            this.cameras.main.setVisible(false);
        }

        if (true) { //objetos
            this.objetos = this.physics.add.group();
            if(true){
                this.caja = []
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

        for (var i = 0; i < 2; i ++){
            if (this.puerta[i].active){
                this.puerta[i].update()
            }
        }

        //hud
        this.scene.get("Hud_Coop").update_coins(this.monedas);

        this.next_level.update()
    }
}