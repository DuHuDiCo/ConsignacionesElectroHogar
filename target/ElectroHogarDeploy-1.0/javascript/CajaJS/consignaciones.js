/* global Swal */

function cargarDatosCaja() {
    
    cargarEstados("sltEstadoConsignacionCaja");
    listarConsignacionesCaja();
    obtenerNombreUsuario();
    validarConsigTemporal();
}


function validarConsigTemporal(){
     $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarConsignacionesCajaTemporal"

    }).done(function (data) {
        
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}


var fecha = document.getElementById('date');
fecha.addEventListener('change', function () {


    var stado = document.getElementById('sltEstadoConsignacionCaja').value;

    if (stado === '' || stado === null) {

        cargarByFecha(fecha.value);


    } else {
        if (fecha.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'El Campo de fecha esta vacio',
                text: 'Ingrese una fecha valida',
                footer: '<a href="">Why do I have this issue?</a>'

            });
        } else {
            cargarByEstadoBySede(stado, fecha.value);
        }

    }
}

);

function cargarByEstadoBySede(estado, fecha) {
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=obtenerConsignacionesByEstadoAndFecha&estado=" + estado + "&fecha=" + fecha

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#dataTable tbody").empty();

        var contador = 1;


        $.each(json, function (key, value) {
             if (value.nombre_estado === "Comprobado") {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModalDevolucion(' + value.idConsignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var accion = '<td><button id="btn_aplicar_' + value.idConsignacion + '" onclick="aplicarConsignacion(' + value.idConsignacion + ', this.id);" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + observa + imagen + detalles + '</td>';

                $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagenCartera(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '/tr>');
                contador = contador + 1;
            }
        }



        );

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}

function cargarByFecha(fecha) {
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=obtenerConsignacionesByFecha&fecha=" + fecha

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#dataTable tbody").empty();

        var contador = 1;


        $.each(json, function (key, value) {
            if (value.nombre_estado === "Comprobado") {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModalDevolucion(' + value.idConsignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var accion = '<td><button id="btn_aplicar_' + value.idConsignacion + '" onclick="aplicarConsignacion(' + value.idConsignacion + ', this.id);" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + observa + imagen + detalles + '</td>';

                $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagenCartera(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '/tr>');
                contador = contador + 1;
            }
        }



        );

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}





function listarConsignacionesCaja() {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=listarConsignacionesCaja"

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);


        $("#dataTable tbody").empty();

        var contador = 1;
        var ids = [];
        $.each(json, function (key, value) {

            var index = 0;
            var count = 0;
            var valid = validarIfExistTableTemp(value.idConsignacion);


            var validEstado = null;
            if (valid !== "0") {
                ids.push(valid);
                validEstado = validarEstado(valid);


            }





            if (ids.length > 0) {
                if (validEstado !== "0" && Number(valid) === value.idConsignacion) {


                    document.getElementById('sltEstadoConsignacionCaja').disabled = true;
                    document.getElementById('txtCedula').disabled = true;

                    var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var imagen = '<button  id="btn_image' + value.idConsignacion + '"  class="btn btn-success btn-sm disabled" ><i class="fas fa-ban"></i></button>';
                    var observa = '<button id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                    var devolver = '<button id="btn_cancelar' + value.idConsignacion + '" onclick="cancelarCambiosIndividualDevolver(' + value.idConsignacion + ')" class="btn btn-danger btn-sm " ><i class="fas fa-times"></i></button>';
                    var accion = '<td><button  id="btn_aplicar_' + value.idConsignacion + '"  class="btn btn-primary btn-sm disabled" ><i class="fas fa-ban"></i></button>' + devolver + observa + imagen + detalles + '</td>';

                    $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                    contador = contador + 1;
                    validEstado = null;
                } else {
                    if (validEstado === "0" && Number(valid) === value.idConsignacion) {

                        document.getElementById('sltEstadoConsignacionCaja').disabled = true;
                        document.getElementById('txtCedula').disabled = true;

                        var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var imagen = '<a href="#" id="btn_image' + value.idConsignacion + '" class="btn btn-success btn-sm disabled" ><i class="fas fa-ban"></i></a>';
                        var observa = '<a href="#" id="btn_observa' + value.idConsignacion + '" class="btn btn-info btn-sm disabled" ><i class="fas fa-ban"></i></a>';
                        var devolver = '<a href="#" id="btn_devolver' + value.idConsignacion + '" class="btn btn-warning btn-sm disabled" ><i class="fas fa-ban"></i></a>';
                        var accion = '<td><button id="btn_cancelar' + value.idConsignacion + '" onclick="cancelarCambiosIndividual(' + value.idConsignacion + ');" class="btn btn-danger btn-sm " ><i class="fas fa-times"></i></button>' + devolver + observa + imagen + detalles + '</td>';

                        $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                        contador = contador + 1;
                        validEstado = null;
                    } else {
                        var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var imagen = '<button id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                        var observa = '<button id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                        var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModalDevolucion(' + value.idConsignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                        var accion = '<td><button id="btn_aplicar_' + value.idConsignacion + '" onclick="aplicarConsignacion(' + value.idConsignacion + ', this.id);" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + observa + imagen + detalles + '</td>';

                        $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                        contador = contador + 1;
                        validEstado = null;
                    }



                }


            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModalDevolucion(' + value.idConsignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var accion = '<td><button id="btn_aplicar_' + value.idConsignacion + '" onclick="aplicarConsignacion(' + value.idConsignacion + ', this.id);" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + observa + imagen + detalles + '</td>';

                $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
                validEstado = null;
            }



        });


        if (ids.length > 0) {

            var botonGroup = '<a href="#" class="btn btn-primary" onclick="guardarCambiosCaja();">Guardar Cambios</a> <a href="#" class="btn btn-danger" onclick="cancelarCambios();">Cancelar Cambios</a>';
            document.getElementById('btn_groupCaja').innerHTML = botonGroup;

        }


        console.log(json);


    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function detallesCaja(id) {
    $('#modalDetalles').modal('show');

    obtenerSedeByIdConsignacionCaja(id);

    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=traerActualizaciones&idConsignacion=" + id

    }).done(function (data) {

        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#tableDetalles tbody").empty();

        var contador = 1;
        $.each(json, function (key, value) {
            $("#tableDetalles").append('<tr> <td>' + contador + '</td><td>' + value.fecha + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre + '</td><td>' + value.num_recibo + '</td></tr>');
            contador = contador + 1;

        });


        console.log(json);



    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}


function obtenerSedeByIdConsignacionCaja(idConsignacion) {
    $("#tableSedeDetalles tbody").empty();
    $.ajax({
        method: "GET",
        url: "ServletSedes?accion=obtenerSedeByIdConsignacion&idConsignacion=" + idConsignacion

    }).done(function (data) {

        var datos = data;
        

        $("#tableSedeDetalles").append('<tr> <td>'+datos+'</td></tr>');





    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}


function validarEstado(idConignacion) {
    
    var valid = $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarEstado&idConsignacion=" + idConignacion,
        async: false
    });

    return valid.responseText;
}


function validarIfExistTableTemp(idConignacion) {
    
    var valid = $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarIfExist&idConsignacion=" + idConignacion,
        async: false
    });

    return valid.responseText;
}


function abrirModalDevolucion(id_consignacion, idEle) {
    document.getElementById('idConsignacion').value = id_consignacion;
    $('#staticBackdropCaja').modal('show');
}

var enviar = document.getElementById('enviarObservacion');
enviar.addEventListener('click', (event) => {
    var idConsignacion = document.getElementById('idConsignacion').value;
    var observacion = document.getElementById('observacionDevolucion').value;
    if (observacion === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error al Guardar la Observacion',
            text: 'Ingrese una Observacion',
            footer: '<a href="">Why do I have this issue?</a>'
        });
    } else {
        devolverConsignacionCaja(idConsignacion, observacion);
    }


});

function devolverConsignacionCaja(id_consignacion, observacion) {
    var datos = {};
    datos.idConsignacion = id_consignacion;
    datos.observacion = observacion;

    $.ajax({
        method: "POST",
        url: "ServletControladorConsignaciones2?accion=devolverConsignacionCaja",
        data: datos,
        dataType: 'JSON'

    }).done(function (data) {
        var datos = data;
        if (datos > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Consignacion devuelta Correctamente',
                showConfirmButton: false,
                timer: 2000
            });
            var botonGroup = '<a href="#" class="btn btn-primary" onclick="guardarCambiosCaja();">Guardar Cambios</a> <a href="#" class="btn btn-danger" onclick="cancelarCambios();">Cancelar Cambios</a>';
            document.getElementById('btn_groupCaja').innerHTML = botonGroup;


            document.getElementById('sltEstadoConsignacionCaja').disabled = true;
            document.getElementById('txtCedula').disabled = true;

            $("#btn_devolver" + id_consignacion).empty();
            document.getElementById("btn_devolver" + id_consignacion).outerHTML = '<button id="btn_cancelar' + id_consignacion + '" onclick="cancelarCambiosIndividualDevolver(' + id_consignacion + ')" class="btn btn-danger btn-sm " ><i class="fas fa-times"></i></button>';
            $("#btn_observa" + id_consignacion).empty();
            document.getElementById("btn_observa" + id_consignacion).outerHTML = '<a href="#" id="btn_observa' + id_consignacion + '" class="btn btn-info btn-sm disabled" ><i class="fas fa-ban"></i></a>';
            $("#btn_image" + id_consignacion).empty();
            document.getElementById("btn_image" + id_consignacion).outerHTML = '<a href="#" id="btn_image' + id_consignacion + '"  class="btn btn-success btn-sm disabled" ><i class="fas fa-ban"></i></a>';
            $("#btn_aplicar_" + id_consignacion).empty();
            document.getElementById("btn_aplicar_" + id_consignacion).outerHTML = '<a href="#" id="btn_aplicar_' + id_consignacion + '"  class="btn btn-primary btn-sm disabled" ><i class="fas fa-ban"></i></a>';
            $('#staticBackdropCaja').modal('hide');

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Devolver la Consignacion',
                text: 'Erro al Devolver la Consignacion, Reporte el Error',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }



    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}


function abrirModalImagen(idConsignacion) {
    $.ajax({
        method: "GET",
        url: "ServletControladorFiles?accion=obtenerRutaImagen&idConsignacion=" + idConsignacion

    }).done(function (data) {
        var datos = data;

        var imagen = document.getElementById('imagenConsigancion');
        imagen.src = datos;
        $('#staticBackdropImage').modal('show');
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });

}

function  abrirModalObservacionesCaja(id_consignacion) {


    $('#staticBackdropObserCaja').modal('show');

    traerObservacionesCaja(id_consignacion);

    document.getElementById('id_consignacion').value = id_consignacion;



}

var enviar = document.getElementById('enviarObservacionConCaja').addEventListener("click", function () {
    var id_consignacion = document.getElementById('id_consignacion').value;
    observacionesConsignacion(id_consignacion);
});


function traerObservacionesCaja(idConsignacion) {
    
    $.ajax({
        method: "GET",
        url: "ServletObservaciones?accion=obtenerObservaciones&idConsignacion=" + idConsignacion

    }).done(function (data) {

        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);
        $("#tableObservaciones tbody").empty();

        var contador = 1;


        if (Object.keys(json).length > 0) {
            $.each(json, function (key, value) {

                $("#tableObservaciones").append('<tr> <td>' + contador + '</td><td>' + value.observacion + '</td><td>' + value.fecha_observacion + '</td><td>' + value.nombre_usuario + '</td></tr>');
                contador = contador + 1;

            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'No Existen Observaciones',
                text: 'No Existen Observaciones en esta Consignacion',
                footer: '<a href="">Why do I have this issue?</a>'
            });

        }

        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });

}

function observacionesConsignacion(id_consignacion) {
    
    var txtObservacion = document.getElementById('txtObservacion').value;

    if (txtObservacion === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error al Guardar la Observacion',
            text: 'El Campo de Observacion se Encuentra Vacio',
            footer: '<a href="">Why do I have this issue?</a>'
        });
    } else {

        var datos = {};
        datos.observacion = txtObservacion;
        datos.idConsignacion = id_consignacion;

        $.ajax({
            method: "POST",
            url: "ServletObservaciones?accion=nuevaObservacion",
            data: datos,
            dataType: 'JSON'
        }).done(function (data) {

            var json = data;

            if (json !== 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Observacion Guardada Correctamente',
                    showConfirmButton: false,
                    timer: 2000
                });
                document.getElementById('txtObservacion').value = "";
                $('#staticBackdropObserCaja').modal('hide');



            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Guardar la Observacion',
                    text: 'Error Desconocido Reporte el Error',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            }

        }).fail(function () {

            window.location.replace("login.html");
        }).always(function () {

        });

    }


}



var select = document.getElementById('sltEstadoConsignacionCaja');

select.addEventListener('change', (event) => {
    
    event.preventDefault();
    var valor = document.getElementById('sltEstadoConsignacionCaja').value;


    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=listarConsignacionesByEstado&estado=" + valor

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        var sede = obtenerSede();


        $("#dataTable tbody").empty();

        var contador = 1;

        $.each(json, function (key, value) {
            if (valor !== 'Comprobado') {
                var imagen = '<a href="#" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></a>';
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var observa = '<td><a href="#" id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '</tr>');
                contador = contador + 1;
            } else {
                if (sede === value.nombre_sede) {
                    var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var imagen = '<a href="#" id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></a>';
                    var observa = '<a href="#" id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                    var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModalDevolucion(' + value.idConsignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                    var aplicar = '<td><a href="#" id="btn_aplicar_' + value.idConsignacion + '" onclick="aplicarConsignacion(' + value.idConsignacion + ', this.id)" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></a>' + devolver + observa + imagen + detalles + '</td>';

                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + aplicar + '</tr>');
                    contador = contador + 1;
                } else {
                    var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var imagen = '<a href="#" id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></a>';
                    var observa = '<a href="#" id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                    var aplicar = '<td>' + observa + imagen + detalles + '</td>';

                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + aplicar + '</tr>');
                    contador = contador + 1;
                }

            }

        });




        console.log(json);


    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });

});



function obtenerSede() {
    
    var sede = $.ajax({
        method: "GET",
        url: "ServletSedes?accion=obtenerSede",
        async: false
    });

    return sede.responseText;
}

function aplicarConsignacion(id_consignacion, id) {
    
    var datos = {};
    datos.idConsignacion = id_consignacion;

    $.ajax({
        method: "POST",
        url: "ServletControladorConsignaciones?accion=ConsignacionTemporalCaja",
        data: datos,
        dataType: 'JSON'
    }).done(function (data) {

        var json = data;




        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Consignacion Aplicada Correctamente',
                showConfirmButton: false,
                timer: 2000
            });

            var botonGroup = '<a href="#" class="btn btn-primary" onclick="guardarCambiosCaja();">Guardar Cambios</a> <a href="#" class="btn btn-danger" onclick="cancelarCambios();">Cancelar Cambios</a>';
            document.getElementById('btn_groupCaja').innerHTML = botonGroup;


            document.getElementById('sltEstadoConsignacionCaja').disabled = true;
            document.getElementById('txtCedula').disabled = true;

            $("#btn_aplicar" + id_consignacion).empty();
            document.getElementById(id).outerHTML = '<button id="btn_cancelar' + id_consignacion + '" onclick="cancelarCambiosIndividual(' + id_consignacion + ');" class="btn btn-danger btn-sm " ><i class="fas fa-times"></i></button>';
            $("#btn_devolver" + id_consignacion).empty();
            document.getElementById("btn_devolver" + id_consignacion).outerHTML = '<a href="#" id="btn_devolver' + id_consignacion + '" class="btn btn-warning btn-sm disabled" ><i class="fas fa-ban"></i></a>';
            $("#btn_observa" + id_consignacion).empty();
            document.getElementById("btn_observa" + id_consignacion).outerHTML = '<a href="#" id="btn_observa' + id_consignacion + '" class="btn btn-info btn-sm disabled" ><i class="fas fa-ban"></i></a>';
            $("#btn_image" + id_consignacion).empty();
            document.getElementById("btn_image" + id_consignacion).outerHTML = '<a href="#" id="btn_image' + id_consignacion + '" class="btn btn-success btn-sm disabled" ><i class="fas fa-ban"></i></a>';


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Aplicar la Consignacion',
                text: 'Error Desconocido Reporte el Error',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }




        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });


}





function recargarPagina() {
    window.location.reload();
}

function consignacionesByCedulaCaja() {
    
    var cedula = document.getElementById('txtCedula').value;

    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=listarConsignacionesByCedula&cedula=" + cedula

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);


        $("#dataTable tbody").empty();

        if (json.length > 0) {
            var contador = 1;

            $.each(json, function (key, value) {
                if (value.nombre_estado !== 'Comprobado') {
                    var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var imagen = '<a href="#" id"btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></a>';
                    //var accion = '<td><a href="#" onclick="" class="btn btn-primary btn-sm disabled" ><i class="fas fa-ban"></i></a></td>';
                    var observa = '<td><a href="#" id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '</tr>');
                    contador = contador + 1;
                } else {
                    var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCaja(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModalDevolucion(' + value.idConsignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                    var observa = '<a href="#" id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesCaja(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                    var imagen = '<a href="#" id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></a>';
                    var accion = '<td><a href="#" id="btn_aplicar_' + value.idConsignacion + '" onclick="aplicarConsignacion(' + value.idConsignacion + ', this.id);" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></a>' + devolver + observa + imagen + detalles + '</td>';
                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.numero_documento + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                    contador = contador + 1;
                }
            });




            console.log(json);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Consultar la Cedula',
                text: 'No existe una Consignacion Relacionada a la Cedula Ingresada',
                footer: '<a href="">Why do I have this issue?</a>'

            });

            listarConsignacionesContabilidad();
        }




    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });

}

function guardarCambiosCaja() {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=guardarCambiosCaja"

    }).done(function (data) {

        var json = data;




        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cambios Guardados Correctamente',
                showConfirmButton: false,
                timer: 2000
            });



        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Guardar',
                text: 'Error Desconocido Reporte el Error',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }

        setTimeout(recargarPagina, 2000);



        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function cancelarCambios() {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=cancelarCambiosCaja"

    }).done(function (data) {

        var json = data;




        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cancelado',
                showConfirmButton: false,
                timer: 2000
            });


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Cancelar los Cambios',
                text: 'Error Desconocido Reporte el Error',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }

        setTimeout(recargarPagina, 2000);



        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function cancelarCambiosIndividualDevolver(id_consignacion) {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=cancelarCambiosIndividual&idConsignacion=" + id_consignacion

    }).done(function (data) {

        var json = data;




        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cambio Cancelado',
                showConfirmButton: false,
                timer: 2000
            });

            $("#btn_aplicar_" + id_consignacion).empty();
            document.getElementById("btn_aplicar_" + id_consignacion).outerHTML = '<a href="#" id="btn_aplicar_' + id_consignacion + '" onclick="aplicarConsignacion(' + id_consignacion + ', this.id);" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></a>';
            $("#btn_cancelar" + id_consignacion).empty();
            document.getElementById("btn_cancelar" + id_consignacion).outerHTML = '<button  id="btn_devolver' + id_consignacion + '" onclick="abrirModalDevolucion(' + id_consignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
            $("#btn_observa" + id_consignacion).empty();
            document.getElementById("btn_observa" + id_consignacion).outerHTML = '<button  id="btn_observa' + id_consignacion + '" onclick="abrirModalObservacionesCaja(' + id_consignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
            $("#btn_image" + id_consignacion).empty();
            document.getElementById("btn_image" + id_consignacion).outerHTML = '<button  id="btn_image' + id_consignacion + '" onclick="abrirModalImagen(' + id_consignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Cancelar los Cambios',
                text: 'Error Desconocido Reporte el Error',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }




        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function cancelarCambiosIndividual(id_consignacion) {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=cancelarCambiosIndividual&idConsignacion=" + id_consignacion

    }).done(function (data) {

        var json = data;




        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cambio Cancelado',
                showConfirmButton: false,
                timer: 2000
            });

            $("#btn_cancelar" + id_consignacion).empty();
            document.getElementById("btn_cancelar" + id_consignacion).outerHTML = '<a href="#" id="btn_aplicar_' + id_consignacion + '" onclick="aplicarConsignacion(' + id_consignacion + ', this.id);" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></a>';
            $("#btn_devolver" + id_consignacion).empty();
            document.getElementById("btn_devolver" + id_consignacion).outerHTML = '<button  id="btn_devolver' + id_consignacion + '" onclick="abrirModalDevolucion(' + id_consignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
            $("#btn_observa" + id_consignacion).empty();
            document.getElementById("btn_observa" + id_consignacion).outerHTML = '<button  id="btn_observa' + id_consignacion + '" onclick="abrirModalObservacionesCaja(' + id_consignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
            $("#btn_image" + id_consignacion).empty();
            document.getElementById("btn_image" + id_consignacion).outerHTML = '<button  id="btn_image' + id_consignacion + '" onclick="abrirModalImagen(' + id_consignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';








        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Cancelar los Cambios',
                text: 'Error Desconocido Reporte el Error',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }




        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}