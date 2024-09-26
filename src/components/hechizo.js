mana = 100

//boton = [tipo de lanzamiento, elemento, daño base, coste de mana]
boton_1 = ["proyectil", "pura", 10, 1]
boton_2 = []
boton_3 = []

function elementos (elemento) {
    if (elemento == "pura") {
        let hechizo = new magia(scene, jugador1.x, jugador1.y, ffffff /* blanco */, 0)

        /* var emiter = scene.add.particles(0, 0, "magia", { 
            speed: 10, // Establece la velocidad inicial de las partículas a 100 unidades (la dirección se determina aleatoriamente)
            lifespan: 100, //tiempo de vida de cada particuña //1000 milisagundos = 1 segundo
            scale: { start: 2, end: 0 }, // Establece la escala de las partículas desde 1 (tamaño completo) hasta 0 (desapareciendo gradualmente)
            blendMode: "ADD", // Aplica un modo de mezcla de "ADD", que crea un efecto de brillo sumando los colores de las partículas al fondo
        }); */
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

function lanzamientos (lanzamiento) {
    if (lanzamiento == "proyectil") {
        hechizo.setVelocity()
    }
}