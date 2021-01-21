//Selectors
const formularioGeneracion = document.querySelector('#generacion');

//Eventos
eventListeners();

function eventListeners() {
    formularioGeneracion.addEventListener('submit', agregarGeneracion);

}


class UI {


    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        // Si es de tipo error agrega una clase
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        const primario = document.querySelector('.primario');
        primario.appendChild(divMensaje)

        // Quitar el alert despues de 3 segundos
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
        }, 3000);
    }
}


const ui = new UI();


//Funciones

function agregarGeneracion(e) {
    e.preventDefault();


    //leer datos para validacion de formulario
    const nombre = document.querySelector('#nombre').value;
    const cantidad = document.querySelector('#cantidad').value;
    const potencia = document.querySelector('#potencia').value;
    const corriente = document.querySelector('#corriente').value;
    const horas = document.querySelector('#horas').value;


    // Comprobar que los campos no esten vacios
    if (nombre === '' || cantidad === '' || potencia === '' || corriente === '' || horas === '') {
        // 2 parametros: mensaje y tipo
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        console.log('vacio');

        return;

    }

    //Generar objeto con la generacion

    const gasto = { nombre, cantidad, potencia, corriente, horas, id: Date.now() };

    //añade nueva generacion
    generacion.nuevoDispositivo(dispositivo);
    ui.imprimirAlerta('Gasto agregado correctamente');

    //Imprimir lista de generacion
    const { dispositivo } = generacion;
    ui.agregarGastoListado(dispositivo);

    console.log('agregar generacion')
}



