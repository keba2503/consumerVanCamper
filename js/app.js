//Selectors Generacion
const formularioGeneracion = document.querySelector('#generacion');
const listado = document.querySelector('#listado-generacion tbody')
const botonEliminar = document.querySelector('#boton-eliminar ul')



//Selectores consumo
const formularioConsumo = document.querySelector('#consumo');
const listadoConsumo = document.querySelector('#listado-consumo tbody');
const botonEliminarConsumo = document.querySelector('#boton-eliminar-consumo ul')

//Eventos

eventListeners();

function eventListeners() {
    formularioGeneracion.addEventListener('submit', agregarGeneracion);
    formularioConsumo.addEventListener('submit', agregarConsumo);
}

class Generacion {
    constructor() {
        this.dispositivos = [];
        this.dispositivosConsumo = [];
        this.sumaGeneracion = 0;
        this.sumaConsumo = 0;
    }

    nuevoDispositivo(dispositivo) {
        this.dispositivos = [...this.dispositivos, dispositivo];

        this.calcularRestanteGeneracion();
      

    }

    nuevoDispositivoConsumo(dispositivoConsumo) {
        this.dispositivosConsumo = [...this.dispositivosConsumo, dispositivoConsumo];
        this.calcularRestanteConsumo();
    }

    calcularRestanteGeneracion() {

        let total = 0;
        this.dispositivos.forEach(function (dispositivo) { total += dispositivo.totalPrueba; });
        this.sumaGeneracion = total;
        console.log(this.sumaGeneracion)
    }

    calcularRestanteConsumo() {

        let total = 0;
        this.dispositivosConsumo.forEach(function (dispositivoConsumo) { total += dispositivoConsumo.totalPruebaConsumo; });
        this.sumaConsumo = total;
        console.log(this.sumaConsumo)
    }
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


    //Agregar nuevo dispositivo de generacion

    agregarGeneracionListado(dispositivos) {
        // this.limpiarHTML();

        //iterar sobre los gastos

        dispositivos.forEach(dispositivo => {
            const { nombre, cantidad, totalPrueba } = dispositivo;

            const row = document.createElement('tr');

            //Boton para borrar el gasto
            const boton = document.createElement('li')
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger');
            btnBorrar.setAttribute("type", "button");
            btnBorrar.innerHTML = 'Borrar &times';
            boton.appendChild(btnBorrar);
            botonEliminar.appendChild(boton);

            row.innerHTML =
                `<td>${cantidad}</td>
        <td>${nombre}</td>
        <td>${totalPrueba}</td>
                         `;



            //Adding html to the cart container
            listado.appendChild(row);

        });
        
    }    
}


class UICONSUMO {

    agregarConsumoListado(dispositivosConsumo) {
        // this.limpiarHTML();
    
        //iterar sobre los gastos
    
        dispositivosConsumo.forEach(dispositivoConsumo => {
            const { nombreConsumo, cantidadConsumo, totalPruebaConsumo} = dispositivoConsumo;
    
            const row = document.createElement('tr');
    
            //Boton para borrar el gasto
            const boton = document.createElement('li')
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger');
            btnBorrar.setAttribute("type", "button");
            btnBorrar.innerHTML = 'Borrar &times';
            boton.appendChild(btnBorrar);
            botonEliminarConsumo.appendChild(boton);
    
            row.innerHTML =
                `<td>${cantidadConsumo}</td>
        <td>${nombreConsumo}</td>
        <td>${totalPruebaConsumo}</td>
                         `;
    
    
    
            //Adding html to the cart container
            listadoConsumo.appendChild(row);
    
        });
        
    }
   
}

const ui = new UI();
const uiConsumo = new UICONSUMO();
generacion = new Generacion();
consumo = new Generacion();



//Funciones

function agregarGeneracion(e) {
    e.preventDefault();
    //leer datos para validacion de formulario
    const nombre = document.querySelector('#nombre').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    const potencia = Number(document.querySelector('#potencia').value);
    const horas = Number(document.querySelector('#horas').value);
    const consumicion = (cantidad * potencia / 12) * horas;
    const totalPrueba = Number(consumicion.toFixed(2));

    // Comprobar que los campos no esten vacios
    if (nombre === '' || cantidad === '' || potencia === '' || horas === '') {
        // 2 parametros: mensaje y tipo
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;

    } else {

        //Generar objeto con la generacion
        const dispositivo = { nombre, cantidad, potencia, horas, totalPrueba, id: Date.now() };

        //añade nueva generacion
        generacion.nuevoDispositivo(dispositivo);

        // generacion.nuevoDispositivo(dispositivo);
        ui.imprimirAlerta('Generacion agregada correctamente');

        //Imprimir lista de generacion
        const { dispositivos } = generacion;
        console.log(dispositivos);
        ui.agregarGeneracionListado(dispositivos);

   }


}



///Consumo



function agregarConsumo(e) {
   e.preventDefault();

//     //leer datos para validacion de formulario
    const nombreConsumo = document.querySelector('#nombre-consumo').value;
    const cantidadConsumo = Number(document.querySelector('#cantidad-consumo').value);
    const potenciaConsumo = Number(document.querySelector('#potencia-consumo').value);
    const horasConsumo = Number(document.querySelector('#horas-consumo').value);
    const consumicionConsumo = (cantidadConsumo * potenciaConsumo / 12) * horasConsumo;
    const totalPruebaConsumo = Number(consumicionConsumo.toFixed(2));

    // Comprobar que los campos no esten vacios
    if (nombreConsumo === '' || cantidadConsumo === '' || potenciaConsumo === '' || horasConsumo === '') {
        // 2 parametros: mensaje y tipo
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;

    } else {

        //Generar objeto con la generacion
        const dispositivoConsumo = { nombreConsumo, cantidadConsumo, potenciaConsumo, horasConsumo, totalPruebaConsumo, id: Date.now() };

        //añade nueva generacion
        consumo.nuevoDispositivoConsumo(dispositivoConsumo);

        // generacion.nuevoDispositivo(dispositivo);
        ui.imprimirAlerta('Generacion agregada correctamente');

        //Imprimir lista de generacion
        const { dispositivosConsumo } = consumo;
        console.log(dispositivosConsumo);
        uiConsumo.agregarConsumoListado(dispositivosConsumo);

   }


    }











