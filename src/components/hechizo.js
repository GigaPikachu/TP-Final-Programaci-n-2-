import {magia} from "../components/magia.js";
import {magia} from "../components/magia.js";

//boton = [tipo de lanzamiento, elemento, daño base, coste de mana]
const elemento = [
    0xffffff, //puro   0
    0xff0000, //fuego  1
    0x66ff66, //viento 2
    0xffff33, //rayo   3
    0x996633, //tierra 4
    0x0099ff  //agua   5
];
const lanzamiento = ["proyectil", "area", "escudo"]

var hechizo = [0, lanzamiento[1]];

function Hechizo (jugador, scene, texture){
    if(jugador.teclas.T2.isDown && jugador.liverar == true && jugador.accion == false){ //crear la magia y darle elemento
        jugador.anims.stop();
        jugador.setFrame(16);

        jugador.magia = new magia(scene, jugador.x, jugador.y -16, 4, elemento[hechizo[0]], 1);
        scene.hechizos.add(jugador.magia);
        scene.physics.add.collider(jugador.magia, scene.fondo, (hechizo, pared) => {
            hechizo.destroy()
        })
        
        jugador.liverar = false;
    }

    else if (jugador.teclas.T2.isDown && jugador.magia.active){ //mantener cargato el hechizo
        if (hechizo[1] == "proyectil"){
            jugador.magia.radius += jugador.cagar_magia;
            jugador.magia.daño += jugador.cagar_magia;
            jugador.magia.setSize(jugador.magia.radius, jugador.magia.radius);
            jugador.magia.body.setOffset(jugador.magia.radius - 4)
        }
        if (hechizo[1] == "area"){
            jugador.magia.radius += jugador.cagar_magia * 10;
            jugador.magia.daño += jugador.cagar_magia;
            jugador.magia.setSize(jugador.magia.radius, jugador.magia.radius);
        }
    }

    else if (jugador.teclas.T2.isUp && jugador.liverar == false && jugador.magia.active){//lanzamiento
        scene.physics.add.collider(jugador.magia, scene.jugadores, (magia, jugadores) => {
            if(jugadores != jugador){
                magia.destroy()
                jugadores.vida[1] -= magia.daño;
                jugadores.camara.shake(100, 0.03);
            }
        });


        scene.physics.add.collider(jugador.magia, scene.enemigos, (magia, enemigo) => {
            magia.destroy()
            enemigo.vida[1] -= magia.daño;
        });


        if (jugador.liverar == false){
            jugador.magia.y = jugador.y;
            jugador.liverar = true;
        }
        jugador.anims.play(texture + "accion" + jugador.mirar, true);

        scene.time.delayedCall(250, () => {
            jugador.accion = false;
            scene.physics.add.existing(jugador.magia);  

            if (hechizo[1] == "proyectil"){
    
                if (jugador.mirar == "derecha"){
                    jugador.magia.body.setVelocity(500, 0)
                }
    
                else if (jugador.mirar == "izquierda"){
                    jugador.magia.body.setVelocity(-500, 0)
                }
    
                else if (jugador.mirar == "arriba"){
                    jugador.magia.body.setVelocity(0, -500)
                }
                
                else if (jugador.mirar == "abajo"){
                    jugador.magia.body.setVelocity(0, 500)
                }
    
            }
    
            else if(hechizo[1] == "area"){
                jugador.magia.destroy();
                jugador.setFrame(17);
            }

            else if (hechizo[1] == "escudo"){
                const radius = 24; // Radio del círculo
                let speed = 0.05; // Velocidad de rotación (a mayor número, más rápido)
            
                // Calcula la nueva posición del objeto giratorio usando seno y coseno
                jugador.magia.x = jugador.x + radius * Math.cos(angle);
                jugador.magia.y = jugador.y + radius * Math.sin(angle);
            
                // Incrementa el ángulo para hacer que el objeto siga girando
                angle += speed;
                
            }
        });

    }

    else {
        jugador.liverar = true;
    }
}

export {Hechizo}