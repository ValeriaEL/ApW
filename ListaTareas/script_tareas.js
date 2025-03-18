const boton = document.getElementById("agregar");
let tareas = [];

boton.onclick = function() {
    agregarTarea();
}

function agregarTarea() {
    let campo = document.getElementById("tarea");
    let tarea = campo.value.trim(); // Elimina los espacios en blanco


    let lista = document.getElementById("lista_tareas");
    tareas.push(tarea);

    let li = document.createElement("li");
    
    // crea el texto de la tarea como un div para poder modificar
    let tareaTexto = document.createElement("div");
    tareaTexto.classList.add("tarea-texto");
    tareaTexto.innerText = tarea;

    // boton de eliminar
    let boton_eliminar = document.createElement("button");
    boton_eliminar.innerHTML = "Eliminar";
    boton_eliminar.classList.add("btn-eliminar", "ms-3");

    // para eliminar la tarea
    boton_eliminar.onclick = function() {
        lista.removeChild(li);
        tareas = tareas.filter(t => t !== tarea); // remueve las tareas
    };

    // boton de actualizar
    let boton_actualizar = document.createElement("button");
    boton_actualizar.innerHTML = "Actualizar";
    boton_actualizar.classList.add("btn-actualizar", "ms-3");

    // activar el modo de edición cuando se haga clic en el botón de actualizar
    boton_actualizar.onclick = function() {
        // si el texto esta siendo editado
        if (tareaTexto.isContentEditable) {
            // desactiva el modo de edicion y actualizar la tarea
            tareaTexto.setAttribute("contenteditable", "false");
            tarea = tareaTexto.innerText.trim(); // guarda la actualizacion
            tareas = tareas.map(t => t === tarea ? tareaTexto.innerText.trim() : t); // actualoiza la tarea
            console.log("Tarea actualizada: ", tarea);
        } else {
            tareaTexto.setAttribute("contenteditable", "true");
            tareaTexto.focus();
        }
    };

    li.appendChild(tareaTexto); // div con el texto de la tarea
    li.appendChild(boton_eliminar); // agregar el boton de eliminar
    li.appendChild(boton_actualizar); // agregar el boton de actualizar

    // Para tachar la tarea al hacer clic en ella
    tareaTexto.onclick = function() {
        tareaTexto.classList.toggle("tachado"); 
    };

    lista.appendChild(li);
    campo.value = ""; 
}

