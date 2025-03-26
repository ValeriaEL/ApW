const api_key = "5e078dd02a75d2eee6653368a58fb5da";
const contenedorClima = document.getElementById("contenedorClima");
const mensajeError = document.getElementById("mensaje_error");
const boton = document.getElementById("btn_consultar");

const ciudadesPorDefecto = ["Ciudad de México", "Buenos Aires", "Madrid"];

// ciudades guardadas
document.addEventListener("DOMContentLoaded", () => {
    let ciudadesGuardadas = JSON.parse(localStorage.getItem("ciudades")) || [];

    if (ciudadesGuardadas.length === 0) {
        ciudadesGuardadas = [ciudadesPorDefecto];
        localStorage.setItem("ciudades", JSON.stringify(ciudadesGuardadas));
    }

    ciudadesGuardadas.forEach(ciudad => obtenerClima(ciudad));
});

//consultar el clima
boton.onclick = function () {
    let ciudad = document.getElementById("campo_ciudad").value.trim();

    if (ciudad) {
        if (!ciudadYaAgregada(ciudad)) {
            obtenerClima(ciudad);
            guardarCiudad(ciudad);
            document.getElementById("campo_ciudad").value = "";
        } else {
            mostrarError(`La ciudad ${ciudad} ya está en la lista.`);
        }
    } else {
        mostrarError("Por favor, ingresa una ciudad válida.");
    }
};

// verifica si la ciudad ya se agrego
function ciudadYaAgregada(ciudad) {
    return Array.from(contenedorClima.children).some(card =>
        card.querySelector(".nombre-ciudad").textContent.toLowerCase() === ciudad.toLowerCase()
    );
}

//para obtener el clima
async function obtenerClima(ciudad) {
    let units = "metric";
    let lang = "es";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${api_key}&units=${units}&lang=${lang}`;

    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();

        if (data.cod === 200) {
            mostrarClima(data);
            mensajeError.innerHTML = "";
        } else {
            mostrarError(`No se encontró la ciudad: ${ciudad}`);
        }
    } catch (error) {
        mostrarError("Hubo un error al obtener los datos.");
        console.error("Error:", error);
    }
}

// Función para mostrar el clima en tarjetas con opcion de edición
function mostrarClima(data) {
    const { name, main, weather } = data;
    const temperatura = Math.round(main.temp);
    const humedad = main.humidity;
    const descripcion = weather[0].description;
    const icono = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-md-4", "mb-3", "fade-in");

    tarjeta.innerHTML = `
    <div class="card p-3 text-center">
        <h3 class="nombre-ciudad" contenteditable="true" onblur="actualizarCiudad(this)">${name}</h3>
        <div class="icono-clima">
            <img src="${icono}" alt="${descripcion}">
        </div>
        <p class="temperatura"><strong>${temperatura}°C</strong></p>
        <p>${descripcion}</p>
        <p>Humedad: ${humedad}%</p>
        <button class="btn btn-actualizar" onclick="actualizarClima(this)">Actualizar</button>
        <button class="btn btn-eliminar" onclick="eliminarCiudad('${name}', this)">Eliminar</button>
    </div>
`;


    contenedorClima.appendChild(tarjeta);
}

// Función para actualizar el nombre de la ciudad en localStorage
function actualizarCiudad(elemento) {
    let ciudadAntigua = elemento.dataset.original || elemento.textContent.trim();
    let ciudadNueva = elemento.textContent.trim();

    if (ciudadNueva && ciudadNueva !== ciudadAntigua) {
        let ciudadesGuardadas = JSON.parse(localStorage.getItem("ciudades")) || [];
        let index = ciudadesGuardadas.indexOf(ciudadAntigua);

        if (index !== -1) {
            ciudadesGuardadas[index] = ciudadNueva;
            localStorage.setItem("ciudades", JSON.stringify(ciudadesGuardadas));
        }
    }
}

// Función para actualizar el clima de una ciudad específica
function actualizarClima(boton) {
    let ciudad = boton.parentElement.querySelector(".nombre-ciudad").textContent.trim();
    if (ciudad) {
        boton.parentElement.parentElement.remove(); // Elimina la tarjeta anterior
        obtenerClima(ciudad);
    }
}

// Función para mostrar errores
function mostrarError(mensaje) {
    mensajeError.innerHTML = mensaje;
    setTimeout(() => {
        mensajeError.innerHTML = "";
    }, 3000);
}

// Función para guardar ciudades en localStorage
function guardarCiudad(ciudad) {
    let ciudadesGuardadas = JSON.parse(localStorage.getItem("ciudades")) || [];

    if (!ciudadesGuardadas.includes(ciudad)) {
        ciudadesGuardadas.push(ciudad);
        localStorage.setItem("ciudades", JSON.stringify(ciudadesGuardadas));
    }
}

// Función para eliminar una ciudad
function eliminarCiudad(ciudad, boton) {
    boton.parentElement.parentElement.remove();

    let ciudadesGuardadas = JSON.parse(localStorage.getItem("ciudades")) || [];
    ciudadesGuardadas = ciudadesGuardadas.filter(c => c !== ciudad);
    localStorage.setItem("ciudades", JSON.stringify(ciudadesGuardadas));
}
