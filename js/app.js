//Selectors
const formularioGeneracion = document.querySelector('#generacion');
const listado = document.querySelector('#listado-generacion tbody')
const botonEliminar = document.querySelector('#boton-eliminar ul')
const total = document.querySelector('#suma-dispositivo');

//Eventos
eventListeners();

function eventListeners() {
    formularioGeneracion.addEventListener('submit', agregarGeneracion);

}


class Generacion {
    constructor(){
        this.dispositivos = [];
        this.generado = Number(generado);
            
    }

    nuevoDispositivo(dispositivo) {
        this.dispositivos = [...this.dispositivos, dispositivo ];
       
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
            const { nombre, cantidad, potencia, horas, id} = dispositivo;

        
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
        <td>${potencia}</td>
        <td>${horas}</td>
             `;

         
    
        //Adding html to the cart container
        listado.appendChild(row);

        });
    }

    // sumarGeneracion(sumarGenerado) {

    //     document.querySelector('#suma-dispositivo').textContent = sumarGenerado;
        
       
    // }

}


const ui = new UI();



let generacion;

//Funciones

function agregarGeneracion(e) {

    generacion = new Generacion();

    e.preventDefault();


    //leer datos para validacion de formulario
    const nombre = document.querySelector('#nombre').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    const potencia = Number(document.querySelector('#potencia').value);
    const horas = Number(document.querySelector('#horas').value);


    // Comprobar que los campos no esten vacios
    if (nombre === '' || cantidad === '' || potencia === '' || horas === '') {
        // 2 parametros: mensaje y tipo
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        console.log('vacio');

        return;

    }

    //Generar objeto con la generacion

    const dispositivo = { nombre, cantidad, potencia, horas, id: Date.now() };

    //añade nueva generacion
    generacion.nuevoDispositivo(dispositivo);

    
    // generacion.nuevoDispositivo(dispositivo);
    ui.imprimirAlerta('Generacion agregada correctamente');

    //Imprimir lista de generacion
    const { dispositivos } = generacion;
    
    ui.agregarGeneracionListado(dispositivos);

    // console.log(dispositivos)

   ///Pruebas

   let suma;

function sumarGeneracion() {
        
    suma = (cantidad * potencia / 12) * horas;
}


sumarGeneracion();



function actualizargeneracion() {

    const sumado =  suma.toFixed(2); 


    const totales = document.createElement('li')
    totales.classList.add('lista-totales');

    
    totales.innerHTML = `${sumado}`;    
total.appendChild(totales) 
 
  


}

actualizargeneracion();

}


