const estados = [
    "ninguno",
    "quemado",
    "congelado",
    "electrocutado",
    "confundido",
]

function cr_estados (scene){
    scene.emitter = scene.add.particles(0, 0, "magia1", { 
        speed: 10, // Establece la velocidad inicial de las partículas a 100 unidades (la dirección se determina aleatoriamente)
        lifespan: 100, //tiempo de vida de cada particuña //1000 milisagundos = 1 segundo
        scale: { start: 2, end: 0 }, // Establece la escala de las partículas desde 1 (tamaño completo) hasta 0 (desapareciendo gradualmente)
        blendMode: "ADD", // Aplica un modo de mezcla de "ADD", que crea un efecto de brillo sumando los colores de las partículas al fondo
    });
}

function up_estados (scene, personaje) {
    if(personaje.estado === estados[1]){ //quemado
        scene.time.delayedCall(1000, () => {
            personaje.vida[1] -= 1;
        })
    }
    
    if(personaje.estado === estados[2]){ //congelado
        personaje.velocidad == 0;
    }

    if(personaje.estado === estados[3]){ //electrocutado
        personaje.velocidad == personaje.velocidad/2;

    }

    if(personaje.estado === estados[4]){ //confundido
        personaje.enemigocerca = null;

        if (personaje.vida[1] > 0){
            personaje.scene.jugadores.getChildren().forEach((miembro) => { //repasa todos los miembros de un grupo
                if (Phaser.Math.Distance.Between(personaje.x, personaje.y, miembro.x, miembro.y) <= distancia_min){
                    this.jugadorcerca = miembro;
                }
            })

            if (personaje.enemigocerca != null){
                personaje.anims.play("salto_slime", true);
                personaje.scene.physics.moveToObject(personaje, personaje.jugadorcerca, personaje.velocidad);
            }

            else if (personaje.enemigocerca == null || personaje.setVelocity(0, 0)){
                personaje.anims.stop()
                personaje.setFrame(0)
                personaje.setVelocity(0, 0);
            }
        }
    }

};

export {cr_estados, up_estados};