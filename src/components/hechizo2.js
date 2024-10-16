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


const velocidad = 500;

var hechizo = [1, "proyectil"];

function Hechizo (jugador, scene, texture){
    if (hechizo[1] == "proyectil"){
        if(jugador.teclas.T1.isDown && jugador.liverar == true && jugador.accion == false){
            jugador.anims.stop();
            jugador.setFrame(16);

            
            for (var i = 0; true; i ++){
                if (jugador.magia[i] == null || !jugador.magia[i].active){
                    jugador.magia_id = i;
                    jugador.magia[i] = new magia(scene, jugador.x, jugador.y -16, 4, elemento[hechizo[0]], 1);
                    scene.hechizos.add(jugador.magia[i]);
                    break;
                }
            }

            scene.physics.add.collider(scene.hechizos, scene.fondo, (hechizo, pared) => {
                hechizo.destroy()
            })
            
            jugador.liverar = false;
        }
    
        else if (jugador.teclas.T1.isDown && jugador.magia[jugador.magia_id].active){ //mantener cargato el hechizo
            jugador.magia[jugador.magia_id].radius += jugador.cagar_magia;
            jugador.magia[jugador.magia_id].daño += jugador.cagar_magia;
            jugador.magia[jugador.magia_id].setSize(jugador.magia[jugador.magia_id].radius, jugador.magia[jugador.magia_id].radius);
            jugador.magia[jugador.magia_id].body.setOffset(jugador.magia[jugador.magia_id].radius - 4)
        }
    
        else if (jugador.teclas.T1.isUp && jugador.liverar == false && jugador.magia[jugador.magia_id].active){//lanzamiento
            scene.physics.add.collider(jugador.magia[jugador.magia_id], scene.jugadores, (magia, jugadores) => { //golpear al otro jugador
                if(jugadores != jugador){ //verifica que el jugador golpeado no sea a si mismo
                    magia.destroy()
                    jugadores.vida[1] -= magia.daño;
                    jugadores.camara.shake(100, 0.03);
                }
            });
    
            scene.physics.add.collider(jugador.magia[jugador.magia_id], scene.enemigos, (magia, enemigo) => { //golpea a un enemigo
                magia.destroy()
                enemigo.vida[1] -= magia.daño;
            });
            
            jugador.magia[jugador.magia_id].y = jugador.y; //reposisiona la magia desde arriba del jugador a el centro del jugador
            jugador.liverar = true;
            jugador.anims.play(texture + "accion" + jugador.mirar, true);
    
            scene.time.delayedCall(250, () => {
                scene.physics.add.existing(jugador.magia[jugador.magia_id]);
        
                if (jugador.mirar == "derecha"){
                    jugador.magia[jugador.magia_id].body.setVelocity(velocidad, 0)
                }
    
                else if (jugador.mirar == "izquierda"){
                    jugador.magia[jugador.magia_id].body.setVelocity(-velocidad, 0)
                }
    
                else if (jugador.mirar == "arriba"){
                    jugador.magia[jugador.magia_id].body.setVelocity(0, -velocidad)
                }

                else if (jugador.mirar == "abajo"){
                    jugador.magia[jugador.magia_id].body.setVelocity(0, velocidad)
                }
            })
        }
    }

    else if (hechizo[1] == "area"){
        if(jugador.teclas.T2.isDown){
            jugador.anims.stop();
            jugador.setFrame(16);
    
            if(jugador.liverar == true){
                for (var i = 0; true; i ++){
                    if (jugador.magia[i] == null || !jugador.magia[i].active){
                        jugador.magia_id = i;
                        jugador.magia[i] = new magia(scene, jugador.x, jugador.y, 16, elemento[hechizo[0]], 1);
                        break;
                    }
                }
            }

            jugador.magia[jugador.magia_id].radius += jugador.cagar_magia * 10;
            jugador.magia[jugador.magia_id].daño += jugador.cagar_magia;
            jugador.magia[jugador.magia_id].setSize(jugador.magia[jugador.magia_id].radius, jugador.magia[jugador.magia_id].radius);
            
            jugador.liverar = false;
            jugador.accion = true;
        }

        else if (jugador.teclas.T2.isUp && jugador.liverar == false && jugador.magia[jugador.magia_id].active){//

            scene.physics.add.overlap(jugador.magia[jugador.magia_id], scene.jugadores, (magia, jugadores) => {
                if(jugadores != jugador){
                    jugadores.vida[1] -= 1;
                    jugadores.camara.shake(100, 0.03);
                }
            });

            scene.physics.add.overlap(jugador.magia[jugador.magia_id], scene.enemigos, (magia, enemigo) => {
                enemigo.vida[1] -= magia.daño;
            });

            jugador.liverar = true;

            scene.time.delayedCall(250, () => {
                jugador.setFrame(0);
                jugador.magia[jugador.magia_id].destroy();
            })
        }
    }
    
    else if (hechizo[1] == "detector"){
        if(jugador.teclas.T2.isDown && jugador.liverar == true && jugador.accion == false){
            jugador.anims.stop();
            jugador.setFrame(16);
    
            jugador.magia[jugador.magia_id] = new magia(scene, jugador.x, jugador.y -16, 4, elemento[hechizo[0]], 1);
            scene.hechizos.add(jugador.magia[jugador.magia_id]);
            scene.physics.add.collider(jugador.magia[jugador.magia_id], scene.fondo, (hechizo, pared) => {
                hechizo.destroy()
            })
        }
    
    }
    
    else if (hechizo[1] == "torre"){
    }
    
    else if (hechizo[1] == "escudo"){ //crear magia escudo
        if(jugador.teclas.T3.isDown && jugador.accion == false){
            jugador.escudo = [];
            for (var h = 1; h < 4; h ++){
                for (var i = 0; true; i ++){
                    if (jugador.magia[i] == null || !jugador.magia[i].active){
                        jugador.magia_id = i;
                        jugador.escudo[h] = jugador.magia_id;
                        jugador.magia[i] = new magia(scene, jugador.x, jugador.y, 4, elemento[hechizo[0]], 1);
                        jugador.magia[i].angulo = 100 / 3 * h;
                        
                        scene.physics.add.existing(jugador.magia[i]);

                        scene.physics.add.collider(jugador.magia[i], scene.jugadores, (magia, jugadores) => { //golpear al otro jugador
                            if(jugadores != jugador){ //verifica que el jugador golpeado no sea a si mismo
                                magia.destroy()
                                jugadores.vida[1] -= magia.daño;
                                jugadores.camara.shake(100, 0.03);
                            }
                        });
                
                        scene.physics.add.collider(jugador.magia[i], scene.enemigos, (magia, enemigo) => { //golpea a un enemigo
                            magia.destroy()
                            enemigo.vida[1] -= magia.daño;
                        });
                        break;
                    }
                }
            }

            jugador.anims.stop();
            jugador.setFrame(16);
    
            scene.time.delayedCall(250, () => {
                jugador.setFrame(0);
            })
        }

        else if(jugador.magia[jugador.magia_id] != null) { //lanzar magia
            for (var i = 1; i < 4; i++){
                if(jugador.magia[jugador.escudo[i]].active) {
                    jugador.magia[jugador.escudo[i]].radio = 24; // Radio del círculo
                    jugador.magia[jugador.escudo[i]].speed = 0.05; // Velocidad de rotación (a mayor número, más rápido)
                
                    // Calcula la nueva posición del objeto giratorio usando seno y coseno
                    jugador.magia[jugador.escudo[i]].x = jugador.x + jugador.magia[jugador.escudo[i]].radio * Math.cos(jugador.magia[jugador.escudo[i]].angulo);
                    jugador.magia[jugador.escudo[i]].y = jugador.y + jugador.magia[jugador.escudo[i]].radio * Math.sin(jugador.magia[jugador.escudo[i]].angulo);
                
                    // Incrementa el ángulo para hacer que el objeto siga girando
                    jugador.magia[jugador.escudo[i]].angulo += jugador.magia[jugador.escudo[i]].speed;
                }
            }
        }
    }
}

export {Hechizo}