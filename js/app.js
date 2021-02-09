//Selectors Generacion
const formularioGeneracion = document.querySelector('#generacion');
const listado = document.querySelector('#listado-generacion tbody');
const botonEliminar = document.querySelector('#boton-eliminar ul');
const totalGenerado = document.querySelector('#generado');




//Selectores consumo
const formularioConsumo = document.querySelector('#consumo');
const listadoConsumo = document.querySelector('#listado-consumo tbody');
const botonEliminarConsumo = document.querySelector('#boton-eliminar-consumo ul');
const totalConsumido = document.querySelector('#consumido');

//Resultados
const printConsumo = document.querySelector('#print-consumo');
const printGeneracion = document.querySelector('#print-generacion');
const formularioTotales = document.querySelector("#totales");
const capacidadBaterias = document.querySelector('#capacidad-bateria');




//Eventos

eventListeners();

function eventListeners() {
    formularioGeneracion.addEventListener('submit', agregarGeneracion);
    formularioConsumo.addEventListener('submit', agregarConsumo);
    formularioTotales.addEventListener('click', capacidadBateria);
    listadoConsumo.addEventListener('click', eliminarConsumo);
    listado.addEventListener('click', eliminarGeneracion);
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

    eliminarGeneracion(id) {
        this.dispositivos = this.dispositivos.filter(dispositivo => dispositivo.id.toString() !== id);
        this.calcularRestanteGeneracion();
    }



    nuevoDispositivoConsumo(dispositivoConsumo) {
        this.dispositivosConsumo = [...this.dispositivosConsumo, dispositivoConsumo];
        this.calcularRestanteConsumo();
    }

    eliminarConsumo(id) {
        this.dispositivosConsumo = this.dispositivosConsumo.filter(dispositivoConsumo => dispositivoConsumo.id.toString() !== id);
        this.calcularRestanteConsumo();
    }

    calcularRestanteGeneracion() {

        let total = 0;
        this.dispositivos.forEach(function (dispositivo) { total += dispositivo.totalPrueba; });
        this.sumaGeneracion = total;

    }

    calcularRestanteConsumo() {

        let total = 0;
        this.dispositivosConsumo.forEach(function (dispositivoConsumo) { total += dispositivoConsumo.totalPruebaConsumo; });
        this.sumaConsumo = total;

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
        this.limpiarHTML();


        //iterar sobre los gastos

        dispositivos.forEach(dispositivo => {
            const { nombre, cantidad, totalPrueba, id } = dispositivo;


            const row = document.createElement('tr');
            row.dataset.id = id;

            row.innerHTML =
                `<td>${cantidad}</td>
        <td>${nombre}</td>
        <td>${totalPrueba}</td>  
        <td class="eliminar">Eliminar</td>    `;



            //Adding html to the cart container
            listado.appendChild(row);

        });

    }

    actualizarRestante(sumaGeneracion) {

        document.querySelector('#generado').textContent = sumaGeneracion;
        printGeneracion.textContent = sumaGeneracion;
        printGeneracion.value = sumaGeneracion;
    }

    limpiarHTML() {
        while (listado.firstChild) {
            listado.removeChild(listado.firstChild);

        }
    }; 1200
}


class UICONSUMO {

    agregarConsumoListado(dispositivosConsumo) {
        this.limpiarHTML();


        //iterar sobre los gastos

        dispositivosConsumo.forEach(dispositivoConsumo => {
            const { nombreConsumo, cantidadConsumo, totalPruebaConsumo, id } = dispositivoConsumo;

            const row = document.createElement('tr');
            row.dataset.id = id;

            row.innerHTML =
                `<td>${cantidadConsumo}</td>
        <td>${nombreConsumo}</td>
        <td>${totalPruebaConsumo}</td>
        <td class="eliminar">Eliminar</td>  
                         `;



            //Adding html to the cart container
            listadoConsumo.appendChild(row);

        });

    }

    actualizarRestante(sumaConsumo) {

        document.querySelector('#consumido').textContent = sumaConsumo;

        printConsumo.textContent = sumaConsumo;
        printConsumo.value = sumaConsumo;
    }






    limpiarHTML() {
        while (listadoConsumo.firstChild) {
            listadoConsumo.removeChild(listadoConsumo.firstChild);
        }
    }; 1200


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
    const consumicion = ((cantidad * potencia / 12) * horas) * 0.7;
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
        const { dispositivos, sumaGeneracion } = generacion;

        ui.agregarGeneracionListado(dispositivos);

        ui.actualizarRestante(sumaGeneracion);

        formularioGeneracion.reset();

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
        const { dispositivosConsumo, sumaConsumo } = consumo;
        uiConsumo.agregarConsumoListado(dispositivosConsumo);

        uiConsumo.actualizarRestante(sumaConsumo);

        formularioConsumo.reset();

    }


}

function eliminarGeneracion(e) {

    if (e.target.classList.contains('eliminar')) {
        const { id } = e.target.parentElement.dataset;
        generacion.eliminarGeneracion(id);
        // Reembolsar


        // Pasar la cantidad restante para actualizar el DOM
        const { sumaGeneracion } = generacion;
        ui.actualizarRestante(sumaGeneracion);

        // Eliminar del DOM
        e.target.parentElement.remove();


    }

}




function eliminarConsumo(e) {

    const { id } = e.target.parentElement.dataset;
    consumo.eliminarConsumo(id);
    // Reembolsar


    // Pasar la cantidad restante para actualizar el DOM
    const { sumaConsumo } = consumo;
    uiConsumo.actualizarRestante(sumaConsumo);

    // Eliminar del DOM
    e.target.parentElement.remove();



}



function capacidadBateria() {


    const { sumaConsumo } = consumo;
    const { sumaGeneracion } = generacion;

    const cantidadBaterias = Number(document.querySelector("#cantidad-bateria").value);
    const totalGeneracion = printGeneracion.value = Number(sumaGeneracion);
    const totalConsumo = printConsumo.value = Number(sumaConsumo);
    const defitit = (totalGeneracion - totalConsumo).toFixed(2);

    const capacidadBateriasNumero = Number(capacidadBaterias.value);
    const cantidadGeneracionDiaria = Number(document.querySelector('#cantidadGeneracion').value);
    const into = Number(document.querySelector("#in").value);

    const cantidadConsumoDiaria = Number(document.querySelector('#cantidadConsumo').value);
    const intoConsumo = Number(document.querySelector("#inConsumo").value);

    const capacidadConsumo = ((cantidadConsumoDiaria * intoConsumo) / 12).toFixed(2);
    const capacidadgeneracion = ((cantidadGeneracionDiaria * into) / 12).toFixed(2);
    const capacidadCantidadBaterias = capacidadBateriasNumero * cantidadBaterias;
  

    const dias =  (((capacidadCantidadBaterias * 0.6) / - defitit)).toFixed(2);
    

    document.querySelector('#suministro-bateria').textContent = capacidadCantidadBaterias;
    document.querySelector('#deficit').textContent = `Défitit / Superavit diario (con número positivo, serás autosuficiente) (Ah Diario ) = ${defitit} A/h Diario`;
    document.querySelector('#dias').textContent = ` Duración de la batería (Sin bajar del 40%, límite para que la batería no sufra en exceso y se acabe rompiendo)  Dias = ${dias} Días.`;
    document.querySelector('#capacidad-generacion').textContent = capacidadgeneracion;
    document.querySelector('#capacidad-consumo').textContent = capacidadConsumo;






}

