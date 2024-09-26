import { magia } from "./magia";
export class hechizos extends Phaser.GameObjects.Group {
    constructor(scene, lanzamiento, elemento, daño, mana, habilidad) {
      super(scene);
      this.elementos(scene, elemento, daño, mana);
      this.lanzamiento(scene, lanzamiento);
    }

    elementos(scene, elemento){
        if (mana < jugador.mana()){
            if (elemento == "fuego"){
                color
                let magia = new magia(scene, jugador1.x, jugador1.y, ffffff /* blanco */, 0)
            }
            
            if (elemento == "fuego") {
                let hechizo = new magia(scene, jugador1.x, jugador1.y, 0xffffff /* blanco */, 0)
            }
            
            if (elemento == "viento") {
                let hechizo = new magia(scene, jugador1.x, jugador1.y, 0xff5722 /* blanco */, 0)
            }
            
            if (elemento == "rayo") {
                let hechizo = new magia(scene, jugador1.x, jugador1.y, 0x4fc3f7 /* blanco */, 0)
            }
            
            if (elemento == "tierra") {
                let hechizo = new magia(scene, jugador1.x, jugador1.y, 0x4fc3f7 /* blanco */, 0)
            }
            
            if (elemento == "agua") {
                let hechizo = new magia(scene, jugador1.x, jugador1.y, 0x42a5f5 /* blanco */, 0)
            }
        }
    }

    lanzamiento(){
        if (lanzamiento == "proyectil") {
            
        }
        magia.setVelocity()
    }
}