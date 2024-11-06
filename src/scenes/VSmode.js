import { Scene } from "phaser";

import { caja } from "../entities/caja.js";
import { jugador } from "../entities/jugador2.js";
import { slime } from "../entities/enemy/slime.js";
import { esqueleto } from "../entities/enemy/esqueleto.js";

import { bandera } from "../entities/puzles/bandera.js";

const time_gen_enemy = 5000;
const enemy_max = 5;

export class VS extends Scene {
  constructor() {
    super("VS");
  }

  init(data) {
    this.game_over_timeout = 120;
    this.text = data.text;
    this.idioma = data.idioma;
    this.scene.launch("Hud_VS", { text: this.text, idioma: this.idioma });

    this.timmer_event = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.game_over_timeout--;
        this.scene.get("Hud_VS").update_time(this.game_over_timeout);

        if (this.game_over_timeout === 0) {
          this.scene.stop("Hud_VS");
          this.scene.start("GameOver", {
            text: this.text,
            idioma: this.idioma,
            jugador1: this.jugador1.puntos,
            jugador2: this.jugador2.puntos,
          });
        }
      },
    });
  }

  create() {
    if (true) {
      //fondo
      var map = this.make.tilemap({ key: "Nivel_2" });
      var tileset = map.addTilesetImage("Tiled", "tileset");
      this.fondo = map.createLayer("Background", tileset);
      this.fondo.setCollisionByProperty({ colicionador: true });

      this.banderas = this.physics.add.group();
      this.jugadores = this.physics.add.group();
      this.objetos = this.physics.add.group();
      this.cajas = this.physics.add.group();
      this.enemigos = this.physics.add.group();
      this.fantasmas = this.physics.add.group();
      this.hechizos = this.physics.add.group();
    }

    if (true) {
      //enemigos
      this.enemigo0 = [];
      this.enemigo4 = [];
      this.enemigo3 = [];
      this.enemigo2 = [];
      this.enemigo1 = [];

      this.enemigo1[0] = new slime(this, 0, 0, "slime", 0);
      this.enemigo2[0] = new slime(this, 0, 0, "slime", 0);
      this.enemigo3[0] = new slime(this, 0, 0, "slime", 0);
      this.enemigo4[0] = new slime(this, 0, 0, "slime", 0);
      this.enemigo0[0] = new slime(this, 0, 0, "slime", 0);

      this.time.addEvent({
        delay: time_gen_enemy,
        loop: true,
        callback: () => {
          console.clear();
          for (var i = 0; i < 5; i++) {
            if (this.enemigo0[i] == null || !this.enemigo0[i].active) {
              this.pos_x = Phaser.Math.Between(63, 75);
              this.pos_y = Phaser.Math.Between(36, 44);
              this.enemigo0[i] = new slime(
                this,
                this.pos_x,
                this.pos_y,
                "slime",
                0
              );
              break;
            }
          }

          for (var i = 0; i < 5; i++) {
            if (this.enemigo1[i] == null || !this.enemigo1[i].active) {
              this.pos_x = Phaser.Math.Between(25, 39);
              this.pos_y = Phaser.Math.Between(43, 55);
              this.enemigo1[i] = new esqueleto(this, this.pos_x, this.pos_y, 0);
              break;
            }
          }

          for (var i = 0; i < 5; i++) {
            if (this.enemigo2[i] == null || !this.enemigo2[i].active) {
              this.pos_x = Phaser.Math.Between(19, 30);
              this.pos_y = Phaser.Math.Between(2, 10);
              this.enemigo2[i] = new slime(this, this.pos_x, this.pos_y, 0);
              break;
            }
          }

          for (var i = 0; i < 3; i++) {
            if (this.enemigo3[i] == null || !this.enemigo3[i].active) {
              this.pos_x = Phaser.Math.Between(23, 30);
              this.pos_y = Phaser.Math.Between(24, 29);
              this.enemigo3[i] = new esqueleto(this, this.pos_x, this.pos_y, 0);
              break;
            }
          }

          for (var i = 0; i < 5; i++) {
            if (this.enemigo4[i] == null || !this.enemigo4[i].active) {
              this.pos_x = Phaser.Math.Between(48, 56);
              this.pos_y = Phaser.Math.Between(36, 44);
              this.enemigo2[i] = new slime(this, this.pos_x, this.pos_y, 0);
              break;
            }
          }
        },
      });
    }

    if (true) {
      //jugadores

      this.jugador1 = new jugador(this, 5, 54, "jugador1", 0); //scene, x, y, texture, frame
      this.jugador2 = new jugador(this, 72, 7, "jugador2", 0);

      this.cameras.main.setVisible(false);
    }

    if (true) {
      //objetos
      this.bandera = [];
      this.bandera[0] = new bandera(this, 31, 49, 0);
      this.bandera[1] = new bandera(this, 24, 6, 0);
      this.bandera[2] = new bandera(this, 69, 41, 0);
      this.bandera[3] = new bandera(this, 52, 41, 0);
      this.bandera[4] = new bandera(this, 26, 27, 0);

      if (true) {
        //cajas
        this.caja = [];
        for (var i = 0; i < 6; i++) {
          this.caja[i] = new caja(this, 23, 51 + 1 * i, "caja", 0);
        }
        for (var i = 0; i < 3; i++) {
          this.caja[i] = new caja(this, 24, 50 + 1 * i, "caja", 0);
        }
        for (var i = 0; i < 3; i++) {
          this.caja[i] = new caja(this, 52 + 1 * i, 51, "caja", 0);
        }
        for (var i = 0; i < 3; i++) {
          this.caja[i] = new caja(this, 33 + 1 * i, 16, "caja", 0);
        }
        for (var i = 0; i < 2; i++) {
          this.caja[i] = new caja(this, 33 + 1 * i, 17, "caja", 0);
        }
      }
    }
  }

  update() {
    this.jugador1.update("jugador1", this);
    this.jugador2.update("jugador2", this);
    this.jugador1.puntos = 0;
    this.jugador2.puntos = 0;

    this.enemigos.getChildren().forEach((enemigos) => {
      enemigos.update();
    });

    //actualizar puntos
    this.banderas.getChildren().forEach((bandera) => {
      bandera.update();
      if (bandera.frame.name == 1) {
        this.jugador1.puntos++;
      } else if (bandera.frame.name == 2) {
        this.jugador2.puntos++;
      }
    });
    this.scene
      .get("Hud_VS")
      .update_points(this.jugador1.puntos, this.jugador2.puntos);
  }
}
