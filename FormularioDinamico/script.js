document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        let libro = {
            titulo: document.getElementById("titulo").value,
            autor: document.getElementById("autor").value,
            genero: document.getElementById("genero").value,
            paginas: document.getElementById("paginas").value,
            capitulos: document.getElementById("capitulos").value
        };

        agregarTabla(libro);

        e.target.reset();
    });

    function agregarTabla(libro) {
        let cuerpo_tabla = document.getElementById("cuerpo_tabla");
        let fila = document.createElement("tr");

        for (let key in libro) {
            let campo = document.createElement("td");
            campo.textContent = libro[key];
            fila.appendChild(campo);
        }

        // Boton Editar
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn", "btn-warning");
        btnEditar.onclick = function () {
            editarFila(fila, libro);
        };

        // Boton eliminar
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.onclick = function () {
            cuerpo_tabla.removeChild(fila);
        };

        let acciones = document.createElement("td"); 
        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);
        fila.appendChild(acciones);

        cuerpo_tabla.appendChild(fila);
    }
    function editarFila(fila, libro) {
        document.getElementById("titulo").value = libro.titulo;
        document.getElementById("autor").value = libro.autor;
        document.getElementById("genero").value = libro.genero;
        document.getElementById("paginas").value = libro.paginas;
        document.getElementById("capitulos").value = libro.capitulos;

        let btnAgregar = document.querySelector("#formulario button[type='submit']");
        btnAgregar.textContent = "Guardar Cambios";
        btnAgregar.onclick = function (e) {
            e.preventDefault(); 
            guardarCambios(fila, libro);
        };

        function guardarCambios(fila, libro) {
            libro.titulo = document.getElementById("titulo").value;
            libro.autor = document.getElementById("autor").value;
            libro.genero = document.getElementById("genero").value;
            libro.paginas = document.getElementById("paginas").value;
            libro.capitulos = document.getElementById("capitulos").value;
        
            let celdas = fila.getElementsByTagName("td");
            celdas[0].textContent = libro.titulo;
            celdas[1].textContent = libro.autor;
            celdas[2].textContent = libro.genero;
            celdas[3].textContent = libro.paginas;
            celdas[4].textContent = libro.capitulos;
        
            let btnAgregar = document.querySelector("#formulario button[type='submit']");
            btnAgregar.textContent = "Agregar Libro";
            btnAgregar.onclick = function (e) {
                e.preventDefault(); 
                formulario.dispatchEvent(new Event('submit')); 
            };

            document.getElementById("formulario").reset();
        }
    

        if (nuevoTitulo && nuevoAutor && nuevoGenero && nuevasPaginas && nuevosCapitulos) {
            celdas[0].textContent = nuevoTitulo;
            celdas[1].textContent = nuevoAutor;
            celdas[2].textContent = nuevoGenero;
            celdas[3].textContent = nuevasPaginas;
            celdas[4].textContent = nuevosCapitulos;
        }
    }
});
