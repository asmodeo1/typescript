import { Hotel } from "./hotel.js";
import { Huesped } from "./huesped.js";
import { cargar, guardar } from "./almacenamiento.js"
import { Habitacion } from "./habitacion.js";

/**
 * Hace el checkIn o checkOut de la habitación pulsada
 * @param {Event} evt - información del evento 
 */
function checkInOut(evt: Event) {
    // No vale evt.target pues si hacemos click en los p, esos serían el target
    const elemento = <HTMLElement>evt.currentTarget;
    const habitacion = hotel.obtenerHabitacion(Number(elemento.dataset.numeroHabitacion))!;
    // No comprobamos si devuelve null pues nunca debería pasar
    if(habitacion.isOcupada()) {
        // Dejamos libre la habitación
        habitacion.ocupada = false;
        elemento.classList.toggle("ocupada");
        actualizarInformacion();
        /* No es lo más óptimo volver a guardar todas las habitaciones pero con almacenamiento
        local no hay posibilidad de modificar solo un trozo. Una alternativa sería guardar
        cada habitación por separado */
        guardar(hotel.obtenerHabitaciones());
    } else {
        // Guardamos en la variable global la habitación que se quiere ocupar y la caja 
        habitacionSeleccionada = habitacion;
        cajaHabitacionSeleccionada = elemento;
        document.getElementById("formulario")!.style.display = "flex";
        (document.getElementById("nombre") as HTMLInputElement).value = "";
        let fecha = new Date();
        (document.getElementById("fechaEntrada") as HTMLInputElement).valueAsDate = fecha;
        (document.getElementById("fechaSalida") as HTMLInputElement).valueAsDate = fecha;
    }
    // El if podría quedar así
    //habitacion.ocupada = !habitacion.isOcupada();
    // O 
    // habitacion.ocupada = habitacion.isOcupada() ? false : true;
}

/**
 * Actaliza la información de habitaciones lirbes, ocupadas y porcentaje de ocupación
 */
function actualizarInformacion() {
    const habitacionesOcupadas = document.getElementById("habitacionesOcupadas")!;
    const habitacionesLibres = document.getElementById("habitacionesLibres")!;
    const porcentajeOcupacion = document.getElementById("porcentajeOcupacion")!;
    habitacionesOcupadas.textContent = hotel.numeroHabitacionesOcupadas() + "";
    habitacionesLibres.textContent = hotel.numeroHabitacionesLibres() + "";
    porcentajeOcupacion.textContent = hotel.porcentajeOcupacion() + "";
}

function inicializacion() {
    const habitacionesCargadas = cargar();
    // Vemos si había o no datos guardados
    if(habitacionesCargadas == null) {
        hotel = new Hotel(100);
    } else {
        // Creamos un hotel sin habitaciones
        hotel = new Hotel(0);
        hotel.cargarHabitaciones(habitacionesCargadas);
    }

    const habitacionesHotel = hotel.obtenerHabitaciones();
    const habitaciones = document.getElementById("habitaciones")!;
    for (const h of habitacionesHotel) {
        const elemento = document.createElement("div");
        habitaciones.appendChild(elemento);
        // Guardamos el número de habitación para que cuando pulsemos en el elemento, sepamos
        // de manera fácil cual es la habitación pulsada
        elemento.dataset.numeroHabitacion = h.numero + "";
        elemento.classList.add("habitacion");
        if(h.isOcupada()) {
            elemento.classList.add("ocupada");
        }
        elemento.addEventListener("click", checkInOut);
        let fechaEntrada = "";
        if(h.fechaEntrada != null) {
            fechaEntrada = `<p>E: ${h.fechaEntrada}</p>`;
        }
        let fechaSalida = "";
        if(h.fechaSalida != null) {
            fechaSalida = `<p>S: ${h.fechaSalida}</p>`;
        }
        elemento.innerHTML = `<p>Número: ${h.numero}</p><p>Camas: ${h.camas}</p>`
            + fechaEntrada + fechaSalida;
    }
    // Debemos mostrar al comienzo cuantas habitaciones libres hay
    actualizarInformacion();
    guardar(hotel.obtenerHabitaciones());
}

function aceptarReserva() {
    const nombre = <HTMLInputElement>document.getElementById("nombre");
    const fechaEntrada = <HTMLInputElement>document.getElementById("fechaEntrada");
    const fechaSalida = <HTMLInputElement>document.getElementById("fechaSalida");
    let mensaje = "";
    if(nombre.checkValidity() == false) {
        mensaje = "<p>Falta el nombre o tiene menos de 5 caracteres</p>";
    }
    if(fechaEntrada.checkValidity() == false) {
        mensaje += "<p>Falta la fecha de entrada</p>";
    }
    if(fechaSalida.checkValidity() == false) {
        mensaje += "<p>Falta la fecha de salida</p>";
    }
    if(fechaEntrada.valueAsDate! > fechaSalida.valueAsDate!) {
        mensaje += "<p>La fecha de entrada debe ser menor o igual a la de salida</p>";
    }
    if(mensaje == "") {
        document.getElementById("errores")!.innerHTML = "";
        document.getElementById("formulario")!.style.display = "none";
        // Vamos a ocupar la habitación
        habitacionSeleccionada!.ocupada = true;
        habitacionSeleccionada!.huesped = new Huesped(nombre.value);
        habitacionSeleccionada!.fechaEntrada = fechaEntrada.value;
        habitacionSeleccionada!.fechaSalida = fechaSalida.value;
        cajaHabitacionSeleccionada!.classList.toggle("ocupada");
        cajaHabitacionSeleccionada!.innerHTML += `<p>E: ${fechaEntrada.value}</p><p>S: ${fechaSalida.value}</p>`;
        guardar(hotel.obtenerHabitaciones());
        actualizarInformacion();
    } else {
        document.getElementById("errores")!.innerHTML = mensaje;
    }
}

function cerrarVentanaReserva() {
    document.getElementById("formulario")!.style.display = "none";
}


let hotel: Hotel;
// Para que el formulario sepa que habitación es la que se quiere ocupar
let habitacionSeleccionada: Habitacion | null = null;
let cajaHabitacionSeleccionada: HTMLElement | null  = null;

inicializacion();

document.getElementById("aceptarReserva")!.addEventListener("click", aceptarReserva);
document.getElementById("cerrarVentanaReserva")!.addEventListener("click", cerrarVentanaReserva);





