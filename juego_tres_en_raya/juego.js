"use strict";
// TypeScript: Podemos indicar el todos las variables :number pero con la inferencia de tipos no es necesario
let juegan = Math.floor(Math.random() * 2) == 1 ? "X" : "O";
// Para comprobar si se ha jugado 9 veces
let jugados = 0;
let victoriasX = 0;
let victoriasO = 0;
function guardarVictorias() {
    /* TypeScript: setItem espera un string y las variables son number, con lo que hay que convertirlas a string.
    Una manera sencilla es concatenádonles una cadena vacía */
    localStorage.setItem("victoriasX", victoriasX + "");
    localStorage.setItem("victoriasO", victoriasO + "");
}
function cargarVictorias() {
    let victoria = localStorage.getItem("victoriasX");
    if (victoria != null) {
        // TypeScript: victoria es string con lo que hay que convertirla a number
        victoriasX = parseInt(victoria);
    }
    victoria = localStorage.getItem("victoriasO");
    if (victoria != null) {
        // TypeScript: Lo mismo aquí
        victoriasO = parseInt(victoria);
    }
    // TypeScript: Hay que convertir los number en texto y usar ! pues getElementById puede devolver null
    document.getElementById("victoriasX").textContent = victoriasX + "";
    document.getElementById("victoriasO").textContent = victoriasO + "";
}
// TypeScript: indicamos el tipo del parámetro
function mostrarResultado(mensaje) {
    // TypeScript: Usamos ! pues getElementById puede devolver null
    const resultado = document.getElementById("resultado");
    resultado.getElementsByTagName("p")[0].textContent = mensaje;
    resultado.style.display = "block";
    // TypeScript: lo mismo
    document.getElementById("partida").removeEventListener("click", jugar);
}
// TypeScript: indicamos el tipo del parámetro
function animar(casilla) {
    casilla.style.animation = "";
    casilla.offsetWidth;
    casilla.style.animation = "victoria 1s";
}
// TypeScript: indicamos los tipos de los parámetros
function comprobarVictoria(c1, c2, c3) {
    const c1Texto = c1.textContent;
    const c2Texto = c2.textContent;
    const c3Texto = c3.textContent;
    if (c1Texto == c2Texto && c1Texto == c3Texto && c3Texto != "") {
        mostrarResultado("Han ganado las " + juegan);
        c1.style.backgroundColor = "red";
        c2.style.backgroundColor = "red";
        c3.style.backgroundColor = "red";
        animar(c1);
        animar(c2);
        animar(c3);
        if (juegan == "X") {
            victoriasX++;
            // TypeScript: Hay que convertir el number en texto y usar ! pues getElementById puede devolver null
            document.getElementById("victoriasX").textContent = victoriasX + "";
        }
        else {
            victoriasO++;
            // TypeScript: Hay que convertir el number en texto y usar ! pues getElementById puede devolver null
            document.getElementById("victoriasO").textContent = victoriasO + "";
        }
        guardarVictorias();
        return true;
    }
    return false;
}
// TypeScript: indicamos el tipo del parámetro
function jugar(evt) {
    // TypeScript: debemos indicar el tipo evt.target para que no de error en textContent
    if (evt.target.textContent != "") {
        const audio = new Audio("error.mp3");
        audio.play();
        //new Audio("error.mp3").play();
        return;
    }
    // TypeScript: debemos indicar el tipo evt.target para que no de error en textContent
    evt.target.textContent = juegan;
    jugados++;
    // TypeScript: usarmos ! pues getElementById puede devolver null
    const c1 = document.getElementById("c1");
    const c2 = document.getElementById("c2");
    const c3 = document.getElementById("c3");
    const c4 = document.getElementById("c4");
    const c5 = document.getElementById("c5");
    const c6 = document.getElementById("c6");
    const c7 = document.getElementById("c7");
    const c8 = document.getElementById("c8");
    const c9 = document.getElementById("c9");
    if (comprobarVictoria(c1, c2, c3) || comprobarVictoria(c4, c5, c6) ||
        comprobarVictoria(c7, c8, c9) || comprobarVictoria(c1, c4, c7) ||
        comprobarVictoria(c2, c5, c8) || comprobarVictoria(c3, c6, c9) ||
        comprobarVictoria(c1, c5, c9) || comprobarVictoria(c3, c5, c7)) {
        return true;
    }
    if (jugados == 9) {
        mostrarResultado("Han empatado");
        return;
    }
    if (juegan == "X") {
        juegan = "O";
    }
    else {
        juegan = "X";
    }
    //juegan = juegan == "X" ? "O" : "X";
    // TypeScript: usarmos ! pues getElementById puede devolver null
    document.getElementById("juegan").textContent = juegan;
}
function cerrarResultado() {
    // TypeScript: usarmos ! pues getElementById puede devolver null
    document.getElementById("resultado").style.display = "none";
}
function nuevaPartida() {
    jugados = 0;
    juegan = Math.floor(Math.random() * 2) == 1 ? "X" : "O";
    // TypeScript: usarmos ! pues getElementById puede devolver null
    document.getElementById("juegan").textContent = juegan;
    // TypeScript: getElementsByClassName devuelve una colección de tipo HTMLCollectionOf<HTMLElement> cuyos elementos no tienen
    // propiedad style, por lo que le decimos que sea de HTMLElement.
    const casillas = document.getElementsByClassName("casilla");
    for (const c of casillas) {
        c.textContent = "";
        c.style.backgroundColor = "";
    }
    // TypeScript: usarmos ! pues getElementById puede devolver null
    document.getElementById("partida").addEventListener("click", jugar);
}
function reiniciarPartida() {
    //if(confirm("¿Reiniciar?")) {
    const respuesta = confirm("¿Reiniciar?");
    if (respuesta == true) {
        victoriasO = 0;
        victoriasX = 0;
        // TypeScript: usarmos ! pues getElementById puede devolver null y convertimos number en string
        document.getElementById("victoriasX").textContent = victoriasX + "";
        document.getElementById("victoriasO").textContent = victoriasO + "";
        guardarVictorias();
        nuevaPartida();
    }
}
function inicializar() {
    cargarVictorias();
    // TypeScript: usarmos ! pues getElementById puede devolver null
    document.getElementById("juegan").textContent = juegan;
    document.getElementById("partida").addEventListener("click", jugar);
    document.getElementById("cerrar").addEventListener("click", cerrarResultado);
    document.getElementById("nueva").addEventListener("click", nuevaPartida);
    document.getElementById("reiniciar").addEventListener("click", reiniciarPartida);
}
inicializar();
