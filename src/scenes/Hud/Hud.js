import { Scene } from "phaser";

// Hud es la escena que muestra los puntos y el tiempo restante.
export class Hud extends Scene {
    
  constructor() {
    super("Hud");
  }

  init(data) {
    this.text = data.text;
    this.idioma = data.idioma;
    this.times = 120;
    this.puntaje = []
  }

  create() {
    this.tiempo = this.add.text(336 / 2, 16, this.text[6][1] + "\n" + this.times, {fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff',stroke: '#000000', strokeThickness: 4, align: 'center'}).setOrigin(0.5);
    this.puntaje[0] = this.add.text(16, 16, "0", {fontFamily: 'GameBoy', fontSize: 8, color: '#00ff00',stroke: '#000000', strokeThickness: 4, align: 'center'}).setOrigin(0.5);
    this.puntaje[1] = this.add.text(336 - 16, 16, "0", {fontFamily: 'GameBoy', fontSize: 8, color: '#0000ff',stroke: '#000000', strokeThickness: 4, align: 'center'}).setOrigin(0.5);
  }

  update_time (time) {
    this.tiempo.setText(this.text[6][1] + "\n" + time);
  }

  update_points(Jugador1, jugador2) {
    this.puntaje[0].setText(Jugador1);
    this.puntaje[1].setText(jugador2);
  }
}