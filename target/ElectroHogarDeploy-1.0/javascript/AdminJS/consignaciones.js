/* global Swal */
function cargarDatosAdmin() {
    validarSession();
    cargarDatosBanco();
    cargarConsignacionesGeneralAdmin();
    cargarEstados('sltEstadoConsignacionAdmin');
    obtenerNombreUsuario();
    cargarSedes('sltSedeConsignacionAdmin');
}

var filtro = document.getElementById('sltSedeConsignacionAdmin');

filtro.addEventListener('change', function () {
    validarSession();
    var estado = document.getElementById('sltEstadoConsignacionAdmin').value;



    if (estado === '' || estado === null || estado === undefined) {
        var sede = filtro.value;
        if (sede === '' || sede === null) {
            Swal.fire({
                icon: 'error',
                title: 'El Campo de Sede esta vacio',
                text: 'Seleccione una sede valida',
                footer: '<a href="">Why do I have this issue?</a>'

            });
        } else {
            cargarSoloBySede(sede);
        }

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
    validarSession();

    var stado = document.getElementById('sltEstadoConsignacionAdmin').value;
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
    validarSession();
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
                var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var accion = "<td><button  class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>" + observa + imagen + detalles + "</td>";

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
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
function abrirModalImagen(idConsignacion) {
    validarSession();
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

function cargarBySedeByFecha(sede, fecha) {
    validarSession();
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
                var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var accion = "<td><button  class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>" + observa + imagen + detalles + "</td>";

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
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
    validarSession();
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
                var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var accion = "<td><button  class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>" + observa + imagen + detalles + "</td>";

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
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


function cargarSoloBySede(sede) {
    validarSession();
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
                var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var accion = "<td><button  class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>" + observa + imagen + detalles + "</td>";

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
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

function cargarBySedeByEstadoByFecha(estado, sede, fecha) {
    validarSession();
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
                var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var accion = "<td><button  class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>" + observa + imagen + detalles + "</td>";

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
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


function cargarByEstadoAndSede(estado, sede) {
    validarSession();
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
                var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var accion = "<td><button  class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>" + observa + imagen + detalles + "</td>";

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
            } else {
                var detalles = '<button class="btn btn-secondary btn-sm" onclick="detallesCartera(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button  id="btn_image' + value.idConsignacion + '" onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var observa = '<td><a href="#" id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>' + imagen + detalles + '</td>';
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



function traerClienteAdmin() {
    validarSession();
    var cedula = document.getElementById('txtCliente').value;


    if (cedula === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error al Consultar la Cedula',
            text: 'Ingrese un Valor',
            footer: '<a href="">Why do I have this issue?</a>'

        });
    } else {



        $.ajax({
            method: "GET",
            url: "ServletControladorConsignaciones?accion=listarClienteByCedula&cedula=" + cedula

        }).done(function (data) {
            var datos = JSON.stringify(data);
            var json = JSON.parse(datos);
            document.getElementById('nuevoCliente').style.display = "none";
            document.getElementById('cedulaCliente').style.display = "none";
            document.getElementById('sltSedeConAdmin').style.display = "none";


            $("#tblCliente tbody").empty();


            if (json.length > 0) {
                document.getElementById('nuevoCliente').style.display = "none";



                var contador = 1;

                $.each(json, function (key, value) {

                    $("#tblCliente tbody").append('<tr> <td><input type="checkbox" value=' + value.idObligacion + ' id="obligacion' + contador + '" name="obligacion" required></td><td>' + value.nombre_titular + '</td><td>' + value.saldo_capital + '</td><td>' + value.fecha_obligacion + '</td><td>' + value.nombre_sede + '</td></tr>');
                    contador = contador + 1;
                });

                document.getElementById('tblCliente').style.display = "block";




                console.log(json);

            } else {
                document.getElementById('tblCliente').style.display = "none";
                document.getElementById('nuevoCliente').style.display = "block";
                document.getElementById('sltSedeConAdmin').style.display = "block";
                document.getElementById('cedulaCliente').style.display = "block";
                document.getElementById('txtCliente').readonly = "true";
                cargarSedes('sltSedeConAdmin');
                Swal.fire({
                    icon: 'error',
                    title: 'El Cliente no Existe',
                    text: 'No se encontro un cliente relacionado con el documento ingresado'
                });
            }




        }).fail(function () {

            window.location.replace("login.html");
        }).always(function () {

        });

    }



}


function cargarBySedeByEstadoByFecha(estado, sede, fecha) {
    validarSession();
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=obtenerConsignacionesBySedeByEstadoByFecha&estado=" + estado + "&sede=" + sede + "&fecha=" + fecha

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#dataTable tbody").empty();

        var contador = 1;

        $.each(json, function (key, value) {
            if (value.nombre_estado === "Devuelta") {
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var observa = '<a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                var accion = "<td><a href='#' class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></a>" + observa + detalles + "</td>";
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
                document.getElementById('btnCancelarConsignacion').style.display = "block";
                document.getElementById('nuevoEstado').value = "Pendiente";


            } else {
                if (value.nombre_estado === "Pendiente") {
                    var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var observa = '<a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                    var accion = "<td><a href='#' class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></a>" + observa + detalles + "</td>";
                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                    contador = contador + 1;
                } else {
                    if (value.nombre_estado === "Devuelta-Caja") {
                        var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var observa = '<a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                        var accion = "<td><a href='#' class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></a>" + observa + detalles + "</td>";
                        $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                        contador = contador + 1;
                        document.getElementById('btnCancelarConsignacion').style.display = "block";
                        document.getElementById('nuevoEstado').value = "Comprobado";
                    } else {
                        var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var observa = '<a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                        $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td><td>' + observa + detalles + '</td></tr>');
                        contador = contador + 1;
                    }

                }
            }


        });

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}


function cargarBySede(estado, sede) {
    validarSession();
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=obtenerConsignacionesBySede&estado=" + estado + "&sede=" + sede

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);

        $("#dataTable tbody").empty();

        var contador = 1;

        $.each(json, function (key, value) {
            if (value.nombre_estado === "Devuelta") {
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var observa = '<a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                var accion = "<td><a href='#' class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></a>" + observa + detalles + "</td>";
                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                contador = contador + 1;
                document.getElementById('btnCancelarConsignacion').style.display = "block";
                document.getElementById('nuevoEstado').value = "Pendiente";


            } else {
                if (value.nombre_estado === "Pendiente") {
                    var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var observa = '<a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                    var accion = "<td><a href='#' class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></a>" + observa + detalles + "</td>";
                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                    contador = contador + 1;
                } else {
                    if (value.nombre_estado === "Devuelta-Caja") {
                        var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var observa = '<a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                        var accion = "<td><a href='#' class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></a>" + observa + detalles + "</td>";
                        $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
                        contador = contador + 1;
                        document.getElementById('btnCancelarConsignacion').style.display = "block";
                        document.getElementById('nuevoEstado').value = "Comprobado";
                    } else {
                        var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var observa = '<a href="#" id="btn_observa" onclick="abrirModalObservacionesCartera(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></a>';
                        $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td><td>' + observa + detalles + '</td></tr>');
                        contador = contador + 1;
                    }

                }
            }


        });

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}


function cargarSedes(dato) {
    validarSession();
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "ServletSedes?accion=listarSede"

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);


        $.each(json, function (key, value) {
            $("#" + dato).append('<option value="' + value.idSede + '" >' + value.nombre_sede + '</option>');
        });

    }).fail(function () {
        window.location.replace("login.html");
    }).always(function () {
    });
}

function validarReporte() {
    $.ajax({
        method: "GET",
        url: "ServletControladorFiles?accion=validarReporte"



    }).done(function (data) {

        var dato = data;

        if (dato >= 50 && dato <= 60) {
            Swal.fire({
                title: 'Generar Reporte',
                text: "Deber Generar el Reporte Para Continuar",
                icon: 'Advertencia',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Generar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    generarReporte();

                }
            });
        }else{
            abrirModalObservaciones();
        }


        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}


function abrirModalObservaciones() {
    var recibo = document.getElementById('txtNumRecibo').value;
    var valor = document.getElementById('txtValor').value;
    var fecha = document.getElementById('dateCreacion').value;
    var sede = document.getElementById('sltBancoCartera').value;

    var cedula = document.getElementById('txtCliente').value;

    if (cedula === "") {

        Swal.fire({
            icon: 'error',
            title: 'Error al guardar la consignacion',
            text: 'Alguno de los Campos estan Vacios',
            footer: '<a href="">Why do I have this issue?</a>'
        });
    } else {

        if (document.getElementById('obligacion1') === null) {

            var nombreNuevo = document.getElementById('nuevoCliente').value;
            var cedulaNuevo = document.getElementById('cedulaCliente').value;
            var sedeNuevo = document.getElementById('sltSedeConAdmin').value;
            if (nombreNuevo === "" || cedulaNuevo === "" || sedeNuevo === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar la consignacion',
                    text: 'Alguno de los Campos estan ',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            } else {

                $('#modalConsignacion').modal('show');


            }

        } else {
            var cliente = document.getElementById('obligacion1').checked;

            var cantidad = document.getElementById('cantidad').value;

            if (cantidad > 1) {
                var cliente2 = document.getElementById('obligacion2').checked;

                if (cantidad > 2) {
                    var cliente3 = document.getElementById('obligacion3').checked;

                }

            } else {

                cliente2 = true;
                cliente3 = true;

            }

            var file = document.getElementById('file').files;
            if (recibo === "" || valor === "" || fecha === "" || sede === "" || file.length === 0 || cliente === false) {
                if (cliente2 === false) {
                    if (cliente3 === false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al guardar la consignacion',
                            text: 'Alguno de los Campos estan Vacios',
                            footer: '<a href="">Why do I have this issue?</a>'
                        });
                        recibo.focus();
                    } else {
                        $('#modalConsignacion').modal('show');
                        cliente = "";
                        cliente2 = "";
                        cliente3 = "";
                    }
                } else {
                    $('#modalConsignacion').modal('show');
                    cliente = "";
                    cliente2 = "";
                    cliente3 = "";
                }


            } else {
                $('#modalConsignacion').modal('show');
                cliente = "";
                cliente2 = "";
                cliente3 = "";
            }
        }

    }


}


function cargarConsignacionesGeneralAdmin() {

    validarSession();

    var rol = document.getElementById('rol').value;

    var valor = "";

    if (rol === 'Caja') {
        valor = "Comprobado";
    } else {
        if (rol === 'Cartera') {
            valor = "Aplicada";
        } else {
            valor = "Pendiente";
        }
    }




    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones?accion=listarConsignacionesByEstado&estado=" + valor

    }).done(function (data) {
        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);


        $("#dataTable tbody").empty();

        var contador = 1;

        $.each(json, function (key, value) {
            var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
            var observa = '<button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
            var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
            var accion = "<td><button  class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>" + observa + imagen + detalles + "</td>";

            $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + accion + '</tr>');
            contador = contador + 1;
        });



        console.log(json);


    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });



}


function detalles(id) {
    validarSession();
    $('#modalDetalles').modal('show');

    obtenerSedeByIdConsignacion(id);

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

function obtenerSedeByIdConsignacion(idConsignacion) {
    validarSession();
    $("#tableSedeDetalles tbody").empty();
    $.ajax({
        method: "GET",
        url: "ServletSedes?accion=obtenerSedeByIdConsignacion&idConsignacion=" + idConsignacion

    }).done(function (data) {

        var datos = data;


        $("#tableSedeDetalles").append('<tr> <td>' + datos + '</td></tr>');





    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function cargarDatosBanco() {
    validarSession();
    obtenerNombreUsuario();


    event.preventDefault();

    $.ajax({
        method: "GET",
        url: "ServletControladorCartera?accion=llenarBanco"

    }).done(function (data) {

        var datos = JSON.stringify(data);
        var json = JSON.parse(datos);
        var html = "";

        $.each(json, function (key, value) {
            if (value.idPlataforma === 1) {
                $("#sltBancoCartera").append('<option value="' + value.idPlataforma + '" >' + value.nombre_plataforma + '--' + value.tipo_pago + '</option>');
            } else {
                $("#sltBancoCartera").append('<option value="' + value.idPlataforma + '" >' + value.nombre_plataforma + '--' + value.tipo_pago + '</option>');
            }

        });






    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });


}

function validarObservacion() {
    validarSession();
    var obs = document.getElementById('observacionGuardarConsig').value;
    if (obs === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error al guardar la consignacion',
            text: 'Campo de Observacion Vacio, Por Favor Ingrese una Observacion',
            footer: '<a href="">Why do I have this issue?</a>'
        });
    } else {
        document.getElementById('observaRecibo').value = obs;
        document.getElementById('observaIguales').value = obs;

        validarExistenciaByReciboConObservacion();
        $('#modalConsignacion').modal('hide');

    }
}


function guardarConsignacionConObservacion() {

    var obser = document.getElementById('observaIguales').value;
    if (obser === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error al guardar la consignacion',
            text: 'Campo de Observacion Vacio, Por Favor Ingrese una Observacion',
            footer: '<a href="">Why do I have this issue?</a>'
        });
    } else {
        var form = document.getElementById('formConsignacion');
        var formData = new FormData(form);




        $.ajax({
            method: "POST",
            url: "ServletControladorCartera?accion=guardarConsignacion",
            data: formData,
            processData: false,
            contentType: false

        }).done(function (data) {

            var idConsignacion = data;



            if (idConsignacion !== 0) {

                crearObservacion(obser, idConsignacion);





            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar la consignacion',
                    text: 'No se logro guardar la consignacion, por favor revise bien la informacion o reporte el error',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            }




            // imprimimos la respuesta
        }).fail(function () {

            window.location.replace("login.html");
        }).always(function () {

        });





    }
}

function crearObservacion(obser, idConsignacion) {
    var datos = {};
    datos.observacion = obser;
    datos.idConsignacion = idConsignacion;

    $.ajax({
        method: "POST",
        url: "ServletObservaciones?accion=guardarObservacion",
        data: datos,
        dataType: 'JSON'

    }).done(function (data) {

        var dato = data;

        if (dato !== 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Consignacion Guardada Exitosamente',
                showConfirmButton: false,
                timer: 2000


            });

            setTimeout(recargarPaginaAdmin, 2000);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar la consignacion',
                text: 'No se logro guardar la consignacion, por favor revise bien la informacion o reporte el error',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }




        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}


function noCrearObservacion() {
    validarSession();
    validarExistenciaByRecibo();

}

function vaguardarConsignacionConObservacionCarteralidar() {
    validarExistenciaByReciboConObservacion();

}

function validarExistenciaByReciboConObservacion() {
    var recibo = document.getElementById('txtNumRecibo').value;
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarExistenciaByRecibo&recibo=" + recibo

    }).done(function (data) {

        var dato = JSON.stringify(data);
        var json = JSON.parse(dato);

        if (Object.keys(json).length > 0) {
            $('#ModalConsignacionesIgualesRecibo').modal('show');
            $("#tableIgual tbody").empty();
            var contador = 1;
            $.each(json, function (key, value) {
                $("#tableIgual tbody").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.valor + '</td><td>' + value.nombre_titular + '</td><td>' + value.nombre_sede + '</td></tr>');
                contador = contador + 1;
            });

            var btnRecibos = document.getElementById('btnRecibos');
            btnRecibos.addEventListener('click', () => {
                validarExistenciaConObservaAdmin();
            });

        } else {
            validarExistenciaConObservaAdmin();
        }

    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}


function validarExistenciaByRecibo() {
    var recibo = document.getElementById('txtNumRecibo').value;
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarExistenciaByRecibo&recibo=" + recibo

    }).done(function (data) {

        var dato = JSON.stringify(data);
        var json = JSON.parse(dato);

        if (Object.keys(json).length > 0) {
            $('#ModalConsignacionesIgualesRecibo').modal('show');
            $("#tableIgual tbody").empty();
            var contador = 1;
            $.each(json, function (key, value) {
                $("#tableIgual tbody").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.valor + '</td><td>' + value.nombre_titular + '</td><td>' + value.nombre_sede + '</td></tr>');
                contador = contador + 1;
            });

            var btnRecibo = document.getElementById('btnRecibos');
            btnRecibo.addEventListener('click', () => {
                validarExistenciaSinObservaAdmin();
            });
        } else {
            validarExistenciaSinObservaAdmin();
        }

    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function validarExistenciaConObservaAdmin() {
    var datos = {};
    datos.valor = document.getElementById('txtValor').value;
    datos.fecha = document.getElementById('dateCreacion').value;

    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarConsignacion",
        data: datos,
        dataType: 'JSON'


    }).done(function (data) {

        var dato = data;

        if (dato > 0) {

            traerConsinacionesFechaValorAdminObser(datos);

        } else {
            guardarConsignacionConObservacion();
        }
        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function validarExistenciaSinObservaAdmin() {
    var datos = {};
    datos.valor = document.getElementById('txtValor').value;
    datos.fecha = document.getElementById('dateCreacion').value;

    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=validarConsignacion",
        data: datos,
        dataType: 'JSON'


    }).done(function (data) {

        var dato = data;

        if (dato > 0) {

            traerConsinacionesFechaValorAdmin(datos);

        } else {
            guardarConsig();
        }
        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function traerConsinacionesFechaValorAdmin(datos) {
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=listarConsignacionesFechaValor",
        data: datos,
        dataType: 'JSON'


    }).done(function (data) {

        var dato = JSON.stringify(data);
        var json = JSON.parse(dato);


        if (Object.keys(json).length > 0) {
            $('#ModalConsignacionesIguales').modal('show');
            $("#tableIgual tbody").empty();
            var contador = 1;
            $.each(json, function (key, value) {
                $("#tableIgual tbody").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.valor + '</td><td>' + value.nombre_titular + '</td><td>' + value.nombre_sede + '</td></tr>');
                contador = contador + 1;
            });
            var btnIguales = document.getElementById('btnIguales');
            btnIguales.addEventListener('click', () => {
                guardarConsig();
            });

        } else {

        }
        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function traerConsinacionesFechaValorAdminObser(datos) {
    $.ajax({
        method: "GET",
        url: "ServletControladorConsignaciones2?accion=listarConsignacionesFechaValor",
        data: datos,
        dataType: 'JSON'


    }).done(function (data) {

        var dato = JSON.stringify(data);
        var json = JSON.parse(dato);


        if (Object.keys(json).length > 0) {
            $('#ModalConsignacionesIguales').modal('show');
            $("#tableIgual tbody").empty();
            var contador = 1;
            $.each(json, function (key, value) {
                $("#tableIgual tbody").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.fecha_pago + '</td><td>' + value.valor + '</td><td>' + value.nombre_titular + '</td><td>' + value.nombre_sede + '</td></tr>');
                contador = contador + 1;
            });

            var btnIguales = document.getElementById('btnIguales');
            btnIguales.addEventListener('click', () => {
                guardarConsignacionConObservacion();
            });

        } else {

        }
        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });
}

function validarGuardarAdmin() {
    var obs = document.getElementById('observaIguales').value;


    if (obs === "") {
        guardarConsig();
    } else {
        guardarConsignacionConObservacion();
    }

}


function guardarConsig() {
    validarSession();
    var form = document.getElementById('formConsignacion');
    var formData = new FormData(form);


    $.ajax({
        method: "POST",
        url: "ServletControladorCartera?accion=guardarConsignacion",
        data: formData,
        processData: false,
        contentType: false

    }).done(function (data) {

        var datos = data;


        window.location.reload();

        if (datos !== 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Consignacion Guardada Exitosamente',
                showConfirmButton: false,
                timer: 2000


            });

            roles(datos.nombre_rol);




        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar la consignacion',
                text: 'No se logro guardar la consignacion, por favor revise bien la informacion o reporte el error',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }

        window.location.reload();


        // imprimimos la respuesta
    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });

}

function  abrirModalObservacionesAdmin(id_consignacion) {


    $('#staticBackdropObserAdmin').modal('show');

    traerObservaciones(id_consignacion);
    document.getElementById('idConsignacion').value = id_consignacion;

}

var enviar = document.getElementById('enviarObservacionCon').addEventListener("click", function () {
    var id_consignacion = document.getElementById('idConsignacion').value;
    observacionesConsignacion(id_consignacion);
});

function observacionesConsignacion(id_consignacion) {
    validarSession();
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
                $('#staticBackdropObserAdmin').modal('hide');


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
    validarSession();
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

var select = document.getElementById('sltEstadoConsignacionAdmin');

select.addEventListener('change', (event) => {
    validarSession();
    event.preventDefault();
    var valor = document.getElementById('sltEstadoConsignacionAdmin').value;


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
                if (valor === 'Devuelta') {
                    var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                    var editar = "<button  class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>";
                    var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var obser = '<td><button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>' + editar + imagen + detalles + '</td>';
                    //var comprobar = '<td><a href="#" id="btn_comprobar" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm" disabled><i class="fas fa-check"></i></a>' +  obser + '</td>';
                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + obser + '</tr>');
                    contador = contador + 1;
                    document.getElementById('btnCancelarConsignacion').style.display = "block";
                    document.getElementById('nuevoEstado').value = "Pendiente";
                } else {
                    var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var imagen = '<button  onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                    var obser = '<td><button  id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>' + imagen + detalles + '</td>';
                    //var comprobar = '<td><a href="#" id="btn_comprobar" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm" disabled><i class="fas fa-check"></i></a>' +  obser + '</td>';
                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + obser + '</tr>');
                    contador = contador + 1;
                }


            } else {
                var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                var imagen = '<button onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                var obser = '<button id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                var comprobar = '<td><button id="btn_comprobar" onclick="editarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-pen"></i></button>' + obser + imagen + detalles + '</td>';

                $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
                contador = contador + 1;
            }

        });




        console.log(json);


    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });

});


function consignacionesCedulaAdmin() {
    validarSession();

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
                    if (value.nombre_estado === 'Devuelta') {
                        var imagen = '<button onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                        var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var editar = "<button class='btn btn-primary btn-sm' onclick='editarConsignacion(" + value.idConsignacion + ")'><i class='fas fa-pen'></i></button>";
                        var obser = '<td><button id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>' + editar + imagen + detalles + '</td>';
                        //var comprobar = '<td><a href="#" id="btn_comprobar" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm" disabled><i class="fas fa-check"></i></a>' +  obser + '</td>';
                        $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + obser + '</tr>');
                        contador = contador + 1;
                    } else {
                        var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                        var imagen = '<button onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                        var obser = '<td><button id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>' + imagen + detalles + '</td>';
                        //var comprobar = '<td><a href="#" id="btn_comprobar" onclick="comprobarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm" disabled><i class="fas fa-check"></i></a>' +  obser + '</td>';
                        $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + obser + '</tr>');
                        contador = contador + 1;
                    }

                } else {
                    var detalles = '<button class="btn btn-secondary" onclick="detalles(' + value.idConsignacion + ');"><i class="fas fa-info"></i></button>';
                    var imagen = '<button onclick="abrirModalImagen(' + value.idConsignacion + ')" class="btn btn-success btn-sm"><i class="fas fa-image"></i></button>';
                    var obser = '<button id="btn_observa" onclick="abrirModalObservacionesAdmin(' + value.idConsignacion + ');" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>';
                    var comprobar = '<td><button id="btn_comprobar" onclick="editarConsignacion(' + value.idConsignacion + ');" class="btn btn-primary btn-sm"><i class="fas fa-pen"></i></button>' + obser + imagen + detalles + '</td>';

                    $("#dataTable").append('<tr> <td>' + contador + '</td><td>' + value.num_recibo + '</td><td>' + value.numero_documento + '</td><td>' + value.nombre_titular + '</td><td>' + value.fecha_pago + '</td><td>' + value.fecha_creacion + '</td><td>' + value.valor + '</td><td>' + value.nombre_estado + '</td><td>' + value.nombre_sede + '</td><td>' + value.nombre_plataforma + '</td>' + comprobar + '</tr>');
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

            cargarConsignacionesGeneral();
        }




    }).fail(function () {

        window.location.replace("login.html");
    }).always(function () {

    });


}

function recargarPaginaAdmin() {
    window.location.reload();
}

