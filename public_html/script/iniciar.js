$('document').ready(iniciarPrograma);

function iniciarPrograma() {
    precargaUsuarios();
    $("#divMenu").hide();
    $("#btnLogin").click(login);
    $(".Logout").click(logout);
    $("#txtClave").keyup(function (e) { //se crea funcion anonima que toma como parametro el evento de keyup
        if (e.keyCode === 13) // 13 corresponde al codigo ascii del enter
        {
            login();
        }
    });
    precargaBlur();//asigna todas las validaciones con blur al cargar el sitio
    precargaPaquetes();
    precargaRepartidores();
    $("#liAsignar").click(mostrarDisponibles);
    $("#btnNuevoPaquete").click(ingresarNuevoPaquete);
    $("#btnAsignarRepartidor").click(asignarRepartidor);
    mostrarPendEntrega();
    $("#btnBuscarPaquete").click(buscarPaquete)
    $("#btnEntXRepart").click(mostrarEntregadosPorRepart);
}
function buscarPaquete() {
    var mensaje = "";
    var codigo = parseInt($("#txtBuscarPaquete").val());
    var encontrado = false;
    if (validarNum(codigo)) {
        var paquete = getElementosPorParametro(paquetes, "codigo", codigo);
        var entrega = getElementosPorParametro(entregas, "paquete", codigo);
        mensaje = mostrarReportePaquete(paquete, entrega, usuarioActual.tipo);
        if (mensaje != null) {
            encontrado = true;
        } else {
            mensaje = "No existe el paquete buscado";
        }
    } else {
        mensaje = "Debe ingresar un codigo de paquete";
    }

    if (encontrado) {
        $("#ulBuscarPaquete").html(mensaje);
        $("#ulBuscarPaquete").listview('refresh');
        $("#divMsgBuscarPaquete").html("");
    } else {
        $("#divMsgBuscarPaquete").html(mensaje);
        $("#ulBuscarPaquete").html("");
    }
}

function precargaBlur() {
    //blur para ingreso nuevo paquete
    $("#txtCIRemitente").blur(validarCIRemitente);
    $("#txtNombreRemitente").blur(validarNomRemitente);
    $("#txtApellidoRemitente").blur(validarApeRemitente);
    $("#txtCIDestinatario").blur(validarCIDestinatario);
    $("#txtNombreDestinatario").blur(validarNomDestinatario);
    $("#txtApellidoDestinatario").blur(validarApeDestinatario);
    $("#txtDireccionDestinatario").blur(validarDirDestinatario);
    $("#txtPesoPaquete").blur(validarPesoPaquete);
}

function mostrarDisponibles() {
    var disponibles = repartidoresDisponibles();
    var pendientes = paqueteSinRepartir();
    $("#ulRepartidoresDisponibles").html(mostrarRepartidores(disponibles));
    $("#ulRepartidoresDisponibles").listview('refresh');
    for (var x in disponibles) {
        $("#" + disponibles[x].codigo).click(seleccionarRepartidor);
    }
    $("#ulPaquetesPendientes").html(mostrarPaquetes(pendientes));
    $("#ulPaquetesPendientes").listview('refresh');
    for (var x in pendientes) {
        $("#P" + pendientes[x].codigo).click(seleccionarPaquete);
    }
}

function seleccionarRepartidor() {
    var id = parseInt($(this).attr("id"));
    var repartidor = getRepartidor(id);
    var idPaquete = quitarLetraID($(".PaqueteSeleccionado").attr("id"));
    var paquetesDisponibles = new Array();
    $(".RepartidorSeleccionado").removeClass("RepartidorSeleccionado");
    $("#" + id).addClass("RepartidorSeleccionado");
    if (!validarNum(idPaquete)) {
        paquetesDisponibles = disponiblesPorPeso(paqueteSinRepartir(), repartidor.medio);
        $("#ulPaquetesPendientes").html(mostrarPaquetes(paquetesDisponibles));
        $("#ulPaquetesPendientes").listview('refresh');
        for (var x in paquetesDisponibles) {
            $("#P" + paquetesDisponibles[x].codigo).click(seleccionarPaquete);
        }
    }

}
var entregas = new Array();

function asignarRepartidor() {
    var idPaqueteTxt = quitarLetraID($(".PaqueteSeleccionado").attr("id"));
    var idRepartidorTxt = $(".RepartidorSeleccionado").attr("id");
    var mensaje = "";
    var tiempo = new Date();
    if (validarNum(idPaqueteTxt)) {
        if (validarNum(idRepartidorTxt)) {
            var idPaquete = parseInt(idPaqueteTxt);
            var idRepartidor = parseInt(idRepartidorTxt);
            var ite = 0;
            while (ite < entregas.length) {
                var paqueteActual = entregas[ite];

                for (var i in paqueteActual) {
                    if (i === "paquete") {
                        if (paqueteActual[i] === idPaquete) {
                            paqueteActual["repartidor"] = idRepartidor;
                            paqueteActual["ER"] = agregarHoraActual();
                        }
                    }
                }
                ite++;
            }

            mensaje = "Entregado a repartidor correctamente";
            mostrarDisponibles();
            mostrarPendEntrega();
        } else {
            mensaje = "Debe seleccionar un repartidor"
        }
    } else {
        mensaje = "Debe seleccionar un paquete y un repartidor";
    }
    $("#divMsgAsignar").html(mensaje);
}

function quitarLetraID(_string) {
    // esta funcion es usada para quitar la letra de identificacion
    //en las listas del ID del objeto, para poder asignar
    //la clase cuando esta seleccionado
    var sinletra = "";
    for (var x in _string) {
        if (!isNaN(_string[x])) {
            sinletra += _string[x];
        }
    }
    return sinletra;
}


function seleccionarPaquete() {
    var identificador = parseInt(quitarLetraID($(this).attr("id")));
    var repartidor = $(".RepartidorSeleccionado").attr("id");
    $(".PaqueteSeleccionado").removeClass("PaqueteSeleccionado");
    var mensaje = "";
    $("#P" + identificador).addClass("PaqueteSeleccionado");
    var paquete = getElementoPorParametro(paquetes, "codigo", identificador);
    var repartidores = repartidoresDisponiblesPeso(paquete.peso);
    $("#ulRepartidoresDisponibles").html(mostrarRepartidores(repartidores));
    $("#ulRepartidoresDisponibles").listview('refresh');
    for (var x in repartidores) {
        $("#" + repartidores[x].codigo).click(seleccionarRepartidor);
    }
    $("#" + repartidor).addClass("RepartidorSeleccionado");



}

function login() {
    var mensaje = "";
    var usuario = parseInt($("#txtUsuario").val());
    var pass = $("#txtClave").val();
    var resultado = validarLogin(usuario, pass);
    switch (resultado) {
        case -1:
            mensaje = "La contraseña es incorrecta";
            break;
        case 0:
            mensaje = "El usuario no existe";
            break;
        case 1:
            usuarioActual = getElementoPorParametro(usuarios, "cedula", usuario);
            $("#divLogin").hide();
            $("#divMenu").show();
            menuShow();
            $("#divMsgLogin").hide();
            $("#liConsultar").click(); //Para que inicie  siempre en la primera pestaña
            $("#divPendientes").show();
            break;
        case 2:
            usuarioActual = getElementoPorParametro(usuarios, "cedula", usuario);
            $("#divLogin").hide();
            $("#divMenu").show();
            menuHide();
            $("#divMsgLogin").hide();
            $("#liConsultar").click();
            $("#divPendientes").hide();
            break;
        default:

    }
    $("#divMsgLogin").html(mensaje);

}
function menuHide() {
    $("#liNuevo").hide();
    $("#liAsignar").hide();
    $("#liReporte").hide();
}
function menuShow() {
    $("#liNuevo").show();
    $("#liAsignar").show();
    $("#liReporte").show();
}

function logout() {
    $("#divMenu").hide();
    $("#divLogin").show();
    $("#divMsgLogin").show();
    limpiar();
    usuarioActual = null;
}

function limpiar() {
    $("#divMsgBuscarPaquete").html("");
    $("#divMsgNuevoPaquete").html("");
    $("#ulBuscarPaquete").html("<a></a>");
    $("input").val("");
}

function ingresarNuevoPaquete() {
    var ciRemitente = $("#txtCIRemitente").val();
    var nomRemitente = $("#txtNombreRemitente").val();
    var apeRemitente = $("#txtApellidoRemitente").val();
    var ciDestinat = $("#txtCIDestinatario").val();
    var nomDestinat = $("#txtNombreDestinatario").val();
    var apeDestinat = $("#txtApellidoDestinatario").val();
    var dirDestinat = $("#txtDireccionDestinatario").val();
    var peso = $("#txtPesoPaquete").val();
    var mensaje = "";
    if (agregarPaquete(ciRemitente, nomRemitente, apeRemitente, ciDestinat,
            nomDestinat, apeDestinat, dirDestinat, peso)) {
        mensaje = "Paquete ingresado con éxito. Su número de envío es: " + numPaquete;
    } else {
        mensaje = "Favor complete todos los campos";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function agregarHoraActual() {
    var tiempoActual = new Date();
    var horaActual = tiempoActual.getHours();
    var minActual = tiempoActual.getMinutes();
    if (horaActual < 10) {
        horaActual.toString();
        horaActual = "0" + horaActual;
    }
    if (minActual < 10) {
        minActual.toString();
        minActual = "0" + minActual;
    }
    var tiempo = horaActual + ":" + minActual;
    return tiempo;
}
