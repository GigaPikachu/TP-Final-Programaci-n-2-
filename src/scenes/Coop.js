import { Scene } from "phaser";

import { caja } from "../entities/caja.js";
import { vendedor } from "../entities/objetos/vendedor.js";
import { jugador } from "../entities/jugador2.js";

import { slime } from "../entities/enemy/slime.js";
import { fantasma } from "../entities/enemy/fantasma.js";
import { esqueleto } from "../entities/enemy/esqueleto.js";
import { craneo } from "../entities/enemy/craneo.js";

import { next_level } from "../components/next_level.js";
import { puerta } from "../entities/puzles/puerta.js";
import { candado } from "../entities/puzles/candado.js";
import { P_boton } from "../entities/puzles/P_boton.js";

const time_gen_enemy = 5000;
const enemy_max = 10; // enemigos maximos (menos 1)

export class Coop extends Scene {
  constructor() {
    super("Coop");
  }

  init(data) {
    this.text = data.text;
    this.idioma = data.idioma;

    // Hud
    this.monedas = 0;
    this.scene.launch("Hud_Coop", { text: this.text, idioma: this.idioma });
  }

  create() {
    if (true) {
      //fondo
      this.map = this.make.tilemap({ key: "Nivel_1" });
      this.tileset = this.map.addTilesetImage("Tiled", "tileset");
      this.fondo = this.map.createLayer("Background", this.tileset);
      this.fondo.setCollisionByProperty({ colicionador: true });

      this.banderas = this.physics.add.group();
      this.jugadores = this.physics.add.group();
      this.objetos = this.physics.add.group();
      this.cajas = this.physics.add.group();
      this.enemigos = this.physics.add.group();
      this.fantasmas = this.physics.add.group();
      this.hechizos = this.physics.add.group();

      this.puerta = [];
      this.puerta[1] = new puerta(this, 40, 58, 0, 39, 63, 42, 63); //scene, x, y, frame, b1x, b1y, b2x, b2y
      
      this.puerta[2] = new puerta(this, 15, 44, 0, 11, 50, 19, 50); //scene, x, y, frame, b1x, b1y, b2x, b2y
      
      this.puerta[0] = new puerta(this, 19, 6, 0, 10, 8, 36, 6); //scene, x, y, frame, b1x, b1y, b2x, b2y

      this.vendedor = new vendedor(this, 38, 17, 0);
    }

    if (true) {
      //enemigos
      this.enemigo = [];

      this.time.addEvent({
        delay: time_gen_enemy,
        loop: true,
        callback: () => {
          if (this.puerta[0].active) {
            for (var i = 0; i < 5; i++) {
              if (this.enemigo[i] == null || !this.enemigo[i].active) {
                this.pos_x = Phaser.Math.Between(6, 15);
                this.pos_y = Phaser.Math.Between(3, 13);
                this.enemigo[i] = new slime(
                  this,
                  this.pos_x,
                  this.pos_y,
                  "slime",
                  0
                );
                break;
              }
            }
            for (var i = 5; i < 10; i++) {
              if (this.enemigo[i] == null || !this.enemigo[i].active) {
                this.pos_x = Phaser.Math.Between(27, 40);
                this.pos_y = Phaser.Math.Between(3, 9);
                this.enemigo[i] = new slime(
                  this,
                  this.pos_x,
                  this.pos_y,
                  "slime",
                  0
                );
                break;
              }
            }

            for (var i = 10; i < 15; i++) {
              if (this.enemigo[i] == null || !this.enemigo[i].active) {
                this.pos_x = Phaser.Math.Between(8, 22);
                this.pos_y = Phaser.Math.Between(46, 56);
                this.enemigo[i] = new slime(
                  this,
                  this.pos_x,
                  this.pos_y,
                  "slime",
                  0
                );
                break;
              }
            }
          }
        },
      });
      this.enemigo[15] = new esqueleto(this, 18, 65, 0);
      this.enemigo[16] = new slime(this, 22, 62, "slime", 0);
      this.enemigo[17] = new esqueleto(this, 23, 66, 0);

      this.enemigo[18] = new slime(this, 26, 35, "slime", 0);
      this.enemigo[19] = new slime(this, 16, 34, "slime", 0);
      this.enemigo[20] = new slime(this, 38, 24, "slime", 0);
    }

    if (true) {//jugadores
      this.jugador1 = new jugador(this, 5, 62, "jugador1", 0); //scene, x, y, texture, frame
      this.jugador2 = new jugador(this, 6, 62, "jugador2", 0);

      this.cameras.main.setVisible(false);
    }

    if (true) {//objetos
      if (true) {//cajas
        this.caja = [];
        for (var i = 0; i < 7; i++) {
          this.caja[i] = new caja(this, 2, 61 + i, "caja", 0);
        }

        for (var i = 0; i < 5; i++) {
          this.caja[i] = new caja(this, 30, 61 + i, "caja", 0);
        }
        for (var i = 0; i < 5; i++) {
          this.caja[i] = new caja(this, 29, 61 + i, "caja", 0);
        }

        for (var i = 0; i < 12; i++) {
          this.caja[i] = new caja(this, 8, 45 + i, "caja", 0);
        }
        for (var i = 0; i < 5; i++) {
          this.caja[i] = new caja(this, 19 + i * 2, 38, "caja", 0);
        }
      }
      this.next_level = new next_level(this, 19, 2, 1);
    }
  }

  update() {
    console.clear();
    this.jugador1.update("jugador1", this);
    this.jugador2.update("jugador2", this);

    this.enemigos.getChildren().forEach((enemigos) => {
      enemigos.update();
    });

    this.fantasmas.getChildren().forEach((enemigos) => {
      enemigos.update();
    });

    for (var i = 0; i < 10; i++) {
      if (this.puerta[i] != null) {
        if (this.puerta[i].active) {
          this.puerta[i].update();
        }
      }
    }

    //hud
    this.scene.get("Hud_Coop").update_coins(this.monedas);

    this.next_level.update();
  }
}
