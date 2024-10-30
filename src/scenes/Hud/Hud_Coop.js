import { Scene } from "phaser";

// Hud es la escena que muestra los puntos y el tiempo restante.
export class Hud_Coop extends Scene {
    
  constructor() {
    super("Hud_Coop");
  }

  init(data) {
    this.text = data.text;
    this.idioma = data.idioma;
  }

  create() {
    this.vision1 = this.physics.add.image(0, 0, "vision").setOrigin(0);
    this.vision2 = this.physics.add.image(176, 0, "vision").setOrigin(0);

    this.monedas = [];
    this.monedas[0] = this.physics.add.image(164, 0, "moneda").setOrigin(0);
    this.monedas[1] = this.add.text(169, 14, "0", {fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff',stroke: '#000000', strokeThickness: 4, align: 'center'}).setOrigin(0.5);
  }

  update_coins(coins){
    this.monedas[1].setText(coins);
  }
}