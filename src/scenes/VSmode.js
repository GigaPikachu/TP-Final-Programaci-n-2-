import { Scene } from 'phaser';

import { caja } from "../entities/caja.js"
import { jugador } from "../entities/jugador2.js"
import { slime } from "../entities/slime.js"
import { bandera } from "../entities/bandera.js"

const time_gen_enemy = 5000;
const enemy_max = 5;


export class VS extends Scene {
    constructor () {
        super('VS');
    }

    init(data) {
        this.game_over_timeout = 120;
        this.text = data.text;
        this.scene.launch("Hud", { text: this.text })

        this.timmer_event = this.time.addEvent({
          delay: 1000,
          loop: true,
          callback: () => {
            this.game_over_timeout--;
            this.scene.get("Hud").update_time(this.game_over_timeout);
    
            if (this.game_over_timeout === 0) {
              this.scene.stop("Hud");
              this.scene.start("GameOver", {text: this.text, jugador1: this.jugador1.puntos, jugador2: this.jugador2.puntos});
            }
          },
        });
    }

    create() {
        if(true){ //fondo
            var map = this.make.tilemap({key:"map"})
            var tileset = map.addTilesetImage("Tiles", "tileset");
            this.fondo = map.createLayer("Capa de patrones 1", tileset)
            this.fondo.setCollisionByProperty({colicionador: true})
        }

        if (true){ //enemigos
            this.enemigos = this.physics.add.group();

            this.slime = []
            this.slime[0] = new slime(this, 144, 64, "slime2", 0);

            this.time.addEvent({
                delay: time_gen_enemy,
                loop: true,
                callback: () => {
                    for (var i = 0; i < enemy_max; i ++){
                        if (this.slime[i] == null || !this.slime[i].active){
                            this.pos_x = Phaser.Math.Between(96 + 8, 224 - 8);
                            this.pos_y = Phaser.Math.Between(48 + 8, 208 - 8);
                            this.slime[i] = new slime(this, this.pos_x, this.pos_y, "slime2", 0);
                            break;
                        }
                    }
                },
            });
        }

        if(true){ //jugadores
            this.jugadores = this.physics.add.group();
            this.hechizos = this.physics.add.group();

            this.jugador1 = new jugador(this, 160, 144, "jugador1", 0); //scene, x, y, texture, frame
            this.jugador2 = new jugador(this, 160 + 32, 144, "jugador2", 0);
    
            this.cameras.main.setVisible(false);
        }

        if (true) { //objetos
            this.banderas = this.physics.add.group()
            this.bandera = new bandera (this, 160, 144 + 64 + 32, 0);
            this.bandera = new bandera (this, 160, 16, 0);

            this.objetos = this.physics.add.group();
            this.caja = new caja(this, 64, 64, "caja", 0)
            this.caja1 = new caja(this, 64+16, 64, "caja", 0)
            this.caja2 = new caja(this, 64, 64+16, "caja", 0)
            this.caja3 = new caja(this, 64, 64-16, "caja", 0)
        }
    }

    update() {
        this.jugador1.update("jugador1", this);
        this.jugador2.update("jugador2", this);
        this.jugador1.puntos = 0;
        this.jugador2.puntos = 0;

        this.enemigos.getChildren().forEach((enemigos) => {
            enemigos.update()
        })

        //actualizar puntos
        this.banderas.getChildren().forEach((bandera) => {
            bandera.update()
            if (bandera.frame.name == 1){
                this.jugador1.puntos ++;
            }

            else if (bandera.frame.name == 2){
                this.jugador2.puntos ++;
            }
        })
        this.scene.get("Hud").update_points(this.jugador1.puntos, this.jugador2.puntos);
    }
}