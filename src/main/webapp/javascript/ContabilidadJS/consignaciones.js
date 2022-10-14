
/* global Swal */

function cargarDatosContabilidad() {
    
    cargarEstados('sltEstadoConsignacionContabilidad');
    listarConsignacionesContabilidad();
    obtenerNombreUsuario();
    cargarSedes('sltSedeConsignacionContabilidad');
    validarConsigTemporalContabilidad();

}

function validarConsigTemporalContabilidad(){
     $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarConsignacionesContabilidadTemporal"

    }).done(function (data) {
        
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}


var filtro = document.getElementById('sltSedeConsignacionContabilidad');

filtro.addEventListener('change', function () {
    var estado = document.getElementById('sltEstadoConsignacionContabilidad').value;


    if (estado === '' || estado === null || estado === undefined) {
        var sede = filtro.value;
        cargarSoloBySede(sede);
    } else {
        var sede = filtro.value;
        if (sede === '') {
            Swal.fire({
                icon: 'error',
                title: 'El Campo de Sede esta vacio',
                text: 'Ingrese una fecha valida',
                footer: '<a href="">Why do I have this issue?</a>'

            });
        } else {
            cargarByEstadoAndSede(estado, sede);
        }

    }
});


var fecha = document.getElementById('date');
fecha.addEventListener('change', function () {
    var stado = document.getElementById('sltEstadoConsignacionContabilidad').value;
    var sede = filtro.value;
    if (stado === '' || stado === null) {
        if (sede === '' || sede === null) {
            if (fecha.value === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'El Campo de fecha esta vacio',
                    text: 'Ingrese una fecha valida',
                    footer: '<a href="">Why do I have this issue?</a>'

                });
            } else {
                cargarByFecha(fecha.value);
            }

        } else {
            if (fecha.value === '' || sede === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'El Campo de fecha esta vacio',
                    text: 'Ingrese una fecha valida',
                    footer: '<a href="">Why do I have this issue?</a>'

                });
            } else {
                cargarBySedeByFecha(sede, fecha.value);
            }

        }
    } else {
        if (sede === '' || sede === null) {
            cargarByEstadoBySede(stado, fecha.value);
        } else {
            cargarBySedeByEstadoByFecha(stado, sede, fecha.value);
        }
    }
});


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
            if (value.nombre_estado === "Pendiente") {
                 var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen +detalles+ '</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
            } else {
                 var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles+'</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '/tr>');
                contador = contador + 1;
            }
        }



        );

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}

function cargarBySedeByFecha(sede, fecha) {
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=obtenerConsignacionesSedeByFecha&sede=" + sede + "&fecha=" + fecha

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#dataTable tbody").empty();

        var contador = 1;


        $.each(json, function (key, value) {
            if (value.nombre_estado === "Pendiente") {
                 var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen +detalles+ '</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
            } else {
                 var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles+'</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '/tr>');
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
            if (value.nombre_estado === "Pendiente") {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen + detalles+'</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles+'</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '/tr>');
                contador = contador + 1;
            }
        }



        );

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}


function cargarSoloBySede(sede) {
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=obtenerConsignacionesSede&sede=" + sede

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#dataTable tbody").empty();

        var contador = 1;


        $.each(json, function (key, value) {
            if (value.nombre_estado === "Pendiente") {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen + detalles+'</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles+'</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '/tr>');
                contador = contador + 1;
            }
        }



        );

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });

}

function cargarBySedeByEstadoByFecha(estado, sede, fecha) {
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=obtenerConsignacionesBySedeByEstadoByFecha&estado=" + estado + "&sede=" + sede + "&fecha=" + fecha

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#dataTable tbody").empty();

        var contador = 1;


        $.each(json, function (key, value) {
            if (value.nombre_estado === "Pendiente") {
                 var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen + detalles+'</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
            } else {
                 var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles+'</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '/tr>');
                contador = contador + 1;
            }
        }



        );

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}


function cargarByEstadoAndSede(estado, sede) {
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=obtenerConsignacionesBySede&estado=" + estado + "&sede=" + sede

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#dataTable tbody").empty();

        var contador = 1;

        $.each(json, function (key, value) {
            if (value.nombre_estado === "Pendiente") {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen + detalles+'</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles+'</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + observa + '/tr>');
                contador = contador + 1;
            }
        }


        );


    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}



function listarConsignacionesContabilidad() {
    
    var valor = "Pendiente";
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=listarConsignacionesByEstado&estado=" + valor

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);



        $("#dataTable tbody").empty();

        var contador = 1;

        var ids = [];


        $.each(json, function (key, value) {

            var index = 0;
            var count = 0;
            var valid = validarIfExistTableTempContabilidad(value.idConsignacion);


            var validEstado = null;
            if (valid !== "0") {
                ids.push(valid);
                validEstado = validarEstadoContabilidad(valid);


            }

            if (ids.length > 0) {
                if (validEstado !== "0" && Number(valid) === value.idConsignacion) {


                    document.getElementById('sltEstadoConsignacionContabilidad').disabled = true;
                    document.getElementById('txtCedula').disabled = true;

                    var detalles = '<button class="btn btn-secondary" onclick="detallesContabilidad(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var imagen = '<button  id="btn_image' + value.idConsignacion + '"  class="btn btn-success btn-sm disabled" ><i class="fas fa-ban"></i></button>';
                    var observa = '<button id="btn_observa' + value.idConsignacion + '" class="btn btn-info btn-sm disabled" ><i class="fas fa-eye"></i></button>';
                    var devolver = '<button id="btn_devolverCon' + value.idConsignacion + '" onclick="CancelardevolverConsignacionIndiv(' + value.idConsignacion + ')" class="btn btn-danger btn-sm " ><i class="fas fa-times"></i></button>';
                    var accion = '<td><button  id="btn_comprobar' + value.idConsignacion + '"  class="btn btn-primary btn-sm disabled" ><i class="fas fa-ban"></i></button>' + devolver + observa + imagen + detalles+'</td>';

                    $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                    contador = contador + 1;
                    validEstado = null;
                } else {
                    if (validEstado === "0" && Number(valid) === value.idConsignacion) {

                        document.getElementById('sltEstadoConsignacionContabilidad').disabled = true;
                        document.getElementById('txtCedula').disabled = true;

                        var detalles = '<button class="btn btn-secondary" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var imagen = '<button  id="btn_image' + value.idConsignacion + '" class="btn btn-success btn-sm disabled" ><i class="fas fa-ban"></i></button>';
                        var observa = '<button  id="btn_observa' + value.idConsignacion + '" class="btn btn-info btn-sm disabled" ><i class="fas fa-ban"></i></button>';
                        var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" class="btn btn-warning btn-sm disabled" ><i class="fas fa-ban"></i></button>';
                        var accion = '<td><button id="btn_cancelarCon' + value.idConsignacion + '" onclick="cancelarConsignacionIndiv(' + value.idConsignacion + ');" class="btn btn-danger btn-sm " ><i class="fas fa-times"></i></button>' + devolver + observa + imagen + detalles+'</td>';

                        $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                        contador = contador + 1;
                        validEstado = null;
                    } else {
                        var detalles = '<button class="btn btn-secondary" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var imagen = '<button id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                        var observa = '<button id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                        var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                        var accion = '<td><button id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ', this.id);" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + observa + imagen + detalles+'</td>';

                        $("#dataTable").append('<tr><td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                        contador = contador + 1;
                        validEstado = null;
                    }



                }


            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ', this.id);" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                //var modalDevolver = '<button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#staticBackdrop"><i class="fas fa-backward"></i></button>';
                var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen + detalles+ '</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
                validEstado = null;
            }





        });

        if (ids.length > 0) {

            var botonGroup = '<a href="#" class="btn btn-primary" onclick="guardarCambios();">Guardar Cambios</a> <a href="#" class="btn btn-danger" onclick="cancelarCambios();">Cancelar Cambios</a>';
            document.getElementById('btn_group').innerHTML = botonGroup;

        }


        console.log(json);


    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {

    });
}

function detallesContabilidad(id) {
    $('#modalDetalles').modal('show');

    obtenerSedeByIdConsignacionContabilidad(id);

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


function obtenerSedeByIdConsignacionContabilidad(idConsignacion) {
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


function validarEstadoContabilidad(idConignacion) {
    
    var valid = $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarEstado&idConsignacion=" + idConignacion,
        async: false
    });

    return valid.responseText;
}

function cargarSedes(nombre) {
    
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "ServletSedes?accion=listarSede"

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);


        $.each(json, function (key, value) {
            $("#" + nombre).append('<option value="' + value.idSede + '" >' + value.nombre_sede + '</option>');
        });

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}


function validarIfExistTableTempContabilidad(idConsignacion) {
    
    var valid = $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarIfExistContabilidad&idConsignacion=" + idConsignacion,
        async: false
    });

    return valid.responseText;
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




function abrirModal(idConsignacion, id) {

    $('#staticBackdrop').modal('show');
    document.getElementById('idConsignacion').value = idConsignacion;

}

var cerrar = document.getElementById('cerrarModal');
cerrar.addEventListener('click', (event) => {

    document.getElementById('observacionDevolucion').value = " ";
});



var enviar = document.getElementById('enviarObservacion');
enviar.addEventListener("click", function () {
    var observa = document.getElementById('observacionDevolucion').value;
    var id_consignacion = document.getElementById('idConsignacion').value;

    if (observa === "") {
        Swal.fire({
            icon: 'error',
            title: 'El Campo de Observacion esta vacio',
            text: 'Ingrese una Observacion valida',
            footer: '<a href="">Why do I have this issue?</a>'

        });
        observa.focus();
    } else {

        var datos = {};
        datos.idConsignacion = id_consignacion;
        datos.observacion = observa;

        $.ajax({
            method: "POST",
            url: "ServletControladorConsignaciones?accion=ConsignacionTemporalDevolver",
            data: datos,
            dataType: 'JSON'


        }).done(function (data) {
            var resp = data;


            if (resp > 0) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Consignacion Devuelta Correctamente',
                    showConfirmButton: false,
                    timer: 2000
                });
                document.getElementById('observacionDevolucion').value = "";
                $('#staticBackdrop').modal('hide');

                $("#btn_devolver" + id_consignacion).empty();
                document.getElementById('btn_devolver' + id_consignacion).outerHTML = '<a href="#" id="btn_devolverCon' + id_consignacion + '"  onclick="CancelardevolverConsignacionIndiv(' + id_consignacion + ');" class="btn btn-danger btn-sm" ><i class="fas fa-times"></i></a></td>';
                document.getElementById('sltEstadoConsignacionContabilidad').disabled = true;
                document.getElementById('txtCedula').disabled = true;
                $("#btn_comprobar" + id_consignacion).empty();
                document.getElementById('btn_comprobar' + id_consignacion).outerHTML = '<a href="#" id="btn_comprobar' + id_consignacion + '"  class="btn btn-primary btn-sm disabled" ><i class="fas fa-ban"></i></a></td>';
                $("#btn_observa" + id_consignacion).empty();
                document.getElementById('btn_observa' + id_consignacion).outerHTML = '<a href="#" id="btn_observa' + id_consignacion + '"  class="btn btn-info btn-sm disabled" ><i class="fas fa-ban"></i></a></td>';
                $("#btn_image" + id_consignacion).empty();
                document.getElementById('btn_image' + id_consignacion).outerHTML = '<a href="#" id="btn_image' + id_consignacion + '"  class="btn btn-success btn-sm disabled" ><i class="fas fa-ban"></i></a></td>';
                var botonGroup = '<button  class="btn btn-primary" onclick="guardarCambios();">Guardar Cambios</button> <button  class="btn btn-danger" onclick="cancelarCambios();">Cancelar Cambios</button>';
                document.getElementById('btn_group').innerHTML = botonGroup;





            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Devolver la Consignacion',
                    text: 'Error Desconocido Reporte el Error',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
                $('#staticBackdrop').modal('hide');
                setTimeout(recargarPagina, 2000);

            }




        }).fail(function () {

            window.location.replace("login.html");
        }).always(function () {

        });





    }

});


function CancelardevolverConsignacionIndiv(id_consignacion) {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=cancelarDevolucionConsignacionById&idConsignacion=" + id_consignacion

    }).done(function (data) {

        var json = data;

        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Devolucion Cancelada Correctamente',
                showConfirmButton: false,
                timer: 2000
            });

            $("#btn_comprobar" + id_consignacion).empty();
            document.getElementById('btn_comprobar' + id_consignacion).outerHTML = '<button id="btn_comprobar' + id_consignacion + '"  onclick="comprobarConsignacion(' + id_consignacion + ')" class="btn btn-primary btn-sm " ><i class="fas fa-check"></i></button>';
            $("#btn_devolverCon" + id_consignacion).empty();
            document.getElementById('btn_devolverCon' + id_consignacion).outerHTML = '<button id="btn_devolver' + id_consignacion + '" onclick="abrirModal(' + id_consignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
            $("#btn_observa" + id_consignacion).empty();
            document.getElementById('btn_observa' + id_consignacion).outerHTML = '<button id="btn_observa' + id_consignacion + '" onclick="abrirModalObservacionesContabilidad(' + id_consignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
            $("#btn_image" + id_consignacion).empty();
            document.getElementById('btn_image' + id_consignacion).outerHTML = '<button id="btn_image' + id_consignacion + '" onclick="abrirModalImagen(' + id_consignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Cancelar la Devolucion',
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



var select = document.getElementById('sltEstadoConsignacionContabilidad');

select.addEventListener('change', (event) => {
    
    event.preventDefault();
    var valor = document.getElementById('sltEstadoConsignacionContabilidad').value;


    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=listarConsignacionesByEstado&estado=" + valor

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);


        $("#dataTable tbody").empty();

        var contador = 1;

        $.each(json, function (key, value) {
            if (valor !== 'Pendiente') {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var obser = '<td><button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>' + imagen + detalles+'</td>';
                //var comprobar = '<td><a href="#" id="btn_comprobar" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm" disabled><i class="fas fa-check"></i></a>' +  obser + '</td>';
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + obser + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen + detalles+'</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
            }

        });




        console.log(json);


    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });

});

function buscarPorValor() {
    if (document.getElementById('txtFiltroValor').value === null || document.getElementById('txtFiltroValor').value === '' || document.getElementById('txtFiltroValor').value === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error al Consultar ',
            text: 'Campo del Valor Vacio',
            footer: '<a href="">Why do I have this issue?</a>'
        });
    } else {
        var valor = document.getElementById('txtFiltroValor').value;
        $.ajax({
            method: "GET",
            url: "ServletControladorConsignaciones?accion=listarConsignacionesByValor&valor=" + valor


        }).done(function (data) {
            var datos = JSON.stringify(data);
            var json = JSON.parse(datos);


            $("#dataTable tbody").empty();

            if (json.length > 0) {
                var contador = 1;

                $.each(json, function (key, value) {
                    if (value.nombre_estado !== 'Pendiente') {
                         var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                        var obser = '<td><button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>' + imagen +detalles+ '</td>';

                        //var accion = '<td><a href="#" onclick=""  class="btn btn-primary btn-sm disabled" ><i class="fas fa-check"></i></a>' + obser + '</td>';
                        $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + obser + '</tr>');
                        contador = contador + 1;
                    } else {
                         var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                        var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                        var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></a>';
                        var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen + detalles+'</td>';

                        $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                        contador = contador + 1;
                    }
                });




                console.log(json);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Consultar la Cedula',
                    text: 'No existe una Consignacion(es) relacionada(s) con el valor ingresado ',
                    footer: '<a href="">Why do I have this issue?</a>'

                });

                listarConsignacionesContabilidad();
            }




        }).fail(function () {

            window.location.replace("login.html");
        }).always(function () {

        });

    }
}

function cargarEstados(idSelect) {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorEstados?accion=cargarEstados"

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);
        var html = "";



        $.each(json, function (key, value) {
            if (value.idEstado === 1) {
                $("#" + idSelect).append('<option value="' + value.nombre_estado + '" > ' + value.nombre_estado + '</option>');
            } else {
                $("#" + idSelect).append('<option value="' + value.nombre_estado + '" > ' + value.nombre_estado + '</option>');
            }


        });




    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });

}


function consignacionesByCedulaContabilidad() {
    
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
                if (value.nombre_estado !== 'Pendiente') {
                    var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                    var obser = '<td><button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>' + imagen + detalles+'</td>';

                    //var accion = '<td><a href="#" onclick=""  class="btn btn-primary btn-sm disabled" ><i class="fas fa-check"></i></a>' + obser + '</td>';
                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + obser + '</tr>');
                    contador = contador + 1;
                } else {
                    var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var devolver = '<button  id="btn_devolver' + value.idConsignacion + '" onclick="abrirModal(' + value.idConsignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></button>';
                    var obser = '<button  id="btn_observa' + value.idConsignacion + '" onclick="abrirModalObservacionesContabilidad(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                    var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></a>';
                    var comprobar = '<td><button  id="btn_comprobar' + value.idConsignacion + '" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-check"></i></button>' + devolver + obser + imagen + detalles+'</td>';

                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.nombre_titular + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
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

function comprobarConsignacion(id_consignacion) {
    
    var datos = {};
    datos.idConsignacion = id_consignacion;



    $.ajax({
        method: "POST",
        url: "ServletControladorConsignaciones?accion=ConsignacionTemporal",
        data: datos,
        dataType: 'JSON'
    }).done(function (data) {

        var json = data;

        if (json === "null") {
            window.location.replace("login.html");
        } else {




            if (json > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Consignacion Comprobada Correctamente',
                    showConfirmButton: false,
                    timer: 2000
                });
                document.getElementById('sltEstadoConsignacionContabilidad').disabled = true;
                document.getElementById('txtCedula').disabled = true;
                $("#btn_comprobar" + id_consignacion).empty();
                document.getElementById('btn_comprobar' + id_consignacion).outerHTML = '<a id="btn_cancelarCon' + id_consignacion + '" onclick="cancelarConsignacionIndiv(' + id_consignacion + ');" class="btn btn-danger btn-sm"><i class="fas fa-times"></i></a>';
                $("#btn_devolver" + id_consignacion).empty();
                document.getElementById('btn_devolver' + id_consignacion).outerHTML = '<a href="#" id="btn_devolver' + id_consignacion + '"  class="btn btn-warning btn-sm disabled" ><i class="fas fa-ban"></i></a>';
                $("#btn_observa" + id_consignacion).empty();
                document.getElementById('btn_observa' + id_consignacion).outerHTML = '<a href="#" id="btn_observa' + id_consignacion + '"  class="btn btn-info btn-sm disabled" ><i class="fas fa-ban"></i></a>';
                $("#btn_image" + id_consignacion).empty();
                document.getElementById('btn_image' + id_consignacion).outerHTML = '<a href="#" id="btn_image' + id_consignacion + '"  class="btn btn-success btn-sm disabled" ><i class="fas fa-ban"></i></a>';


            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Comprobar la Consignacion',
                    text: 'Error Desconocido Reporte el Error',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            }
        }
        var botonGroup = '<a href="#" class="btn btn-primary" onclick="guardarCambios();">Guardar Cambios</a> <a href="#" class="btn btn-danger" onclick="cancelarCambios();">Cancelar Cambios</a>';
        document.getElementById('btn_group').innerHTML = botonGroup;


        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });


}

function cancelarConsignacionIndiv(id_consignacion) {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=cancelarCambiosIndividual&idConsignacion=" + id_consignacion

    }).done(function (data) {

        var json = data;

        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cambio Cancelado Correctamente',
                showConfirmButton: false,
                timer: 2000
            });


            $("#btn_cancelarCon" + id_consignacion).empty();
            document.getElementById('btn_cancelarCon' + id_consignacion).outerHTML = '<a href="#" id="btn_comprobar' + id_consignacion + '"  class="btn btn-primary btn-sm " ><i class="fas fa-check"></i></a>';
            $("#btn_devolver" + id_consignacion).empty();
            document.getElementById('btn_devolver' + id_consignacion).outerHTML = '<a href="#" id="btn_devolver' + id_consignacion + '" onclick="abrirModal(' + id_consignacion + ');" class="btn btn-warning btn-sm"><i class="fas fa-backward"></i></a>';
            $("#btn_observa" + id_consignacion).empty();
            document.getElementById('btn_observa' + id_consignacion).outerHTML = '<a href="#" id="btn_observa' + id_consignacion + '" onclick="abrirModalObservacionesContabilidad(' + id_consignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
            $("#btn_image" + id_consignacion).empty();
            document.getElementById('btn_image' + id_consignacion).outerHTML = '<a href="#" id="btn_image' + id_consignacion + '" onclick="abrirModalImagen(' + id_consignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></a>';



        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Cancelar el Cambio',
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




function cancelarCambios() {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=cancelarCambios"

    }).done(function (data) {

        var json = data;




        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cambios Cancelados Correctamente',
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

function guardarCambios() {
    
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=guardarCambios"

    }).done(function (data) {

        var json = data;




        if (json > 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Consignacion Comprobada Correctamente',
                showConfirmButton: false,
                timer: 2000
            });



        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al Comprobar la Consignacion',
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

function imprimirReporte(nombre) {
    
    Swal.fire({
        title: 'Deseas Imprimir el Reporte?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Imprimir Reporte!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "GET",
                url: "ServletControladorFiles?accion=imprimirReporte&name=" + nombre

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
                    $('#staticBackdropObser').modal('hide');


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
    });

}


function  abrirModalObservacionesContabilidad(id_consignacion) {
    

    $('#staticBackdropObserContabilidad').modal('show');

    traerObservaciones(id_consignacion);

    document.getElementById('id_consignacion').value = id_consignacion;


}

var enviar = document.getElementById('enviarObservacionCon').addEventListener("click", function () {
    var id_consignacion = document.getElementById('id_consignacion').value;
    observacionesConsignacion(id_consignacion);
});

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
                $('#staticBackdropObserContabilidad').modal('hide');


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


function traerObservaciones(idConsignacion) {
    
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


function recargarPagina() {
    window.location.reload();
}

