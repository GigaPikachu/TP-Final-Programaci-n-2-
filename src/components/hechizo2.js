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

var hechizo1 = [1, "proyectil"];
var hechizo2 = [1, "proyectil"];

function Hechizo (jugador, scene, texture){
    if (/* hechizo[1] == "proyectil" */ true ){
        if(jugador.teclas.T1.isDown && jugador.liverar == true && jugador.accion == false && jugador.energia[1] > 20){
            
            for (var i = 4; true; i ++){
                if (jugador.magia[i] == null || !jugador.magia[i].active){
                    jugador.magia_id = i;
                    jugador.magia[i] = new magia(scene, jugador.x, jugador.y -16, 4, elemento[hechizo1[0]], 1);
                    scene.physics.add.existing(jugador.magia[jugador.magia_id]);
                    jugador.energia[1] -= 20;
                    break;
                }
            }

            jugador.anims.stop();
            jugador.setFrame(16);
            
            jugador.liverar = false;
        }
    
        else if (jugador.teclas.T1.isDown && jugador.magia[jugador.magia_id].active){ //mantener cargato el hechizo
            jugador.setVelocity(0, 0);
            jugador.magia[jugador.magia_id].radius += jugador.cagar_magia;
            jugador.magia[jugador.magia_id].daño += jugador.cagar_magia * 3;
            jugador.magia[jugador.magia_id].setSize(jugador.magia[jugador.magia_id].radius, jugador.magia[jugador.magia_id].radius);
            jugador.magia[jugador.magia_id].body.setOffset(jugador.magia[jugador.magia_id].radius - 4)
        }
    
        else if (jugador.teclas.T1.isUp && jugador.liverar == false && jugador.magia[jugador.magia_id].active){//lanzamiento

            scene.hechizos.add(jugador.magia[jugador.magia_id]);
            
            jugador.magia[jugador.magia_id].y = jugador.y; //reposisiona la magia desde arriba del jugador a el centro del jugador
            jugador.liverar = true;
            jugador.anims.play(texture + "accion" + jugador.mirar, true);
    
            scene.time.delayedCall(250, () => {
        
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

                if (scene.scene.key == "VS"){
                    scene.physics.add.collider(jugador.magia[jugador.magia_id], scene.jugadores, (magia, jugadores) => { //golpear al otro jugador
                        if(jugadores != jugador){ //verifica que el jugador golpeado no sea a si mismo
                            magia.destruir(scene)
                            jugadores.vida[1] -= magia.daño;
                            jugadores.camara.shake(100, 0.03);
                            jugadores.hurt.play()
                        }
                    });
                }
    
                scene.physics.add.collider(scene.hechizos, scene.fondo, (hechizo, pared) => {
                    hechizo.destruir(scene)
                })
        
                scene.physics.add.overlap(jugador.magia[jugador.magia_id], scene.enemigos, (magia, enemigo) => { //golpea a un enemigo
                    if (enemigo.invulnerable === false){
                        enemigo.vida[1] -= magia.daño;
                        enemigo.invulnerable = true;
        
                        scene.time.addEvent({
                            delay: enemigo.tiempo_invul,
                            loop: false,
                            callback: () => {
                                enemigo.invulnerable = false
                            },
                        });
                    }
                    magia.destruir(scene)
                });
            })
        }
    }

    if (true){ // impulso
        if(jugador.teclas.T2.isDown && jugador.accion == false && jugador.energia[1] >= 30 && jugador.impulso[0] == false && jugador.impulso[1] == false){
            jugador.energia[1] -= 30
            jugador.impulso[0] = true;
            jugador.impulso[1] = true;
            jugador.invulnerable = true;

            if (jugador.mirar == "derecha"){
                jugador.setFrame(15);
                jugador.body.setVelocityX(500);
            }

            else if (jugador.mirar == "izquierda"){
                jugador.setFrame(13);
                jugador.body.setVelocityX(-500);
            }

            else if (jugador.mirar == "arriba"){
                jugador.setFrame(11);
                jugador.body.setVelocityY(-500);
            }

            else if (jugador.mirar == "abajo"){
                jugador.setFrame(9);
                jugador.body.setVelocityY(500);
            }

            scene.time.addEvent({
                delay: 150,
                loop: false,
                callback: () => {
                    jugador.impulso[0] = false
                    jugador.invulnerable = false;
                
                    scene.time.addEvent({
                        delay: 1000,
                        loop: false,
                        callback: () => {
                            jugador.impulso[1] = false;
                        },
                    });
                },
            });
        }
    }
/* 
    if ( hechizo[1] == "area" true ){
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
    }*/

    if (/* hechizo[1] == "escudo" */ true){ //crear magia escudo
        if(jugador.teclas.T3.isDown && jugador.accion == false && jugador.energia[1] > 60){
            jugador.setVelocity(0, 0);
            if (jugador.escudo != null || jugador.escudo == []){
                for (var h = 1; h < 4; h ++){
                    jugador.magia[jugador.escudo[h]].destruir(scene);
                }
            }

            jugador.escudo = [];
            for (var h = 1; h < 4; h ++){
                for (var i = 0; true; i ++){
                    if (jugador.magia[i] == null || !jugador.magia[i].active){
                        jugador.magia_id = i;
                        jugador.escudo[h] = jugador.magia_id;
                        jugador.magia[i] = new magia(scene, jugador.x, jugador.y, 4, elemento[hechizo2[0]], 1);
                        jugador.magia[i].angulo = 100 / 3 * h;
                        jugador.energia[1] -= 20;
                        
                        scene.physics.add.existing(jugador.magia[i]);

                        if (scene.scene.key == "VS"){
                            scene.physics.add.collider(jugador.magia[i], scene.jugadores, (magia, jugadores) => { //golpear al otro jugador
                                if(jugadores != jugador){ //verifica que el jugador golpeado no sea a si mismo
                                    jugadores.vida[1] -= magia.daño;
                                    jugadores.hurt.play()
                                    jugadores.camara.shake(100, 0.03);
                                }
                            });
                        }
                
                        scene.physics.add.collider(jugador.magia[i], scene.enemigos, (magia, enemigo) => { //golpea a un enemigo
                            if (enemigo.invulnerable === false){
                                enemigo.vida[1] -= magia.daño;
                                enemigo.invulnerable = true;
                
                                scene.time.addEvent({
                                    delay: enemigo.tiempo_invul,
                                    loop: false,
                                    callback: () => {
                                        enemigo.invulnerable = false
                                    },
                                });
                            }
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
                if (jugador.escudo != null){
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
}

export {Hechizo}