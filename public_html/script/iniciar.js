$('document').ready(iniciarPrograma);

function iniciarPrograma() {
    precargaUsuarios();
    $(".banner").hide();
    $("#divMenu").hide();
    $("#divPendientes").hide();
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
    precargaEntregas();
    $("#liAsignar").click(mostrarDisponibles);
    $("#btnNuevoPaquete").click(ingresarNuevoPaquete);
    $("#btnAsignarRepartidor").click(asignarRepartidor);
    mostrarPendEntrega();
    $("#btnBuscarPaquete").click(buscarPaquete);
    $("#btnEntXRepart").click(mostrarEntregadosPorRepart);
    $("#liConsultar").click(limpiarBusqueda);
}

function limpiarBusqueda() {
    $("#ulBuscarPaquete").html("<a><a>");
    $("#ulBuscarPaquete").listview('refresh');
}


function guardarEstado() {
    var codigo = parseInt(quitarLetraID($(this).attr("id")));
    var entrega = getElementoPorParametro(entregas, "paquete", codigo);
    var enViajeHora = $("#txtEnViajeHora").val();
    var enViajeMin = $("#txtEnViajeMin").val();
    var entregadoHora = $("#txtEntregadoHora").val();
    var entregadoMin = $("#txtEntregadoMin").val();
    var mensaje = "";
    if (validarNumPositivo(enViajeHora) && validarNumPositivo(enViajeMin)) {
        var horaFormato = enViajeHora + ":" + enViajeMin;
        if (ordenarFechas(horaFormato, entrega.ER) === -1) {
            entrega.EV = horaFormato;
            $("#txtBuscarPaquete").val(codigo);
            $("#btnBuscarPaquete").click();
            mensaje = "Estado en viaje ingresado Correctamente";
        } else {
            mensaje += "El estado de en viaje debe ser posterior al de entregado al repartidor";
        }

    }
    if (validarNumPositivo(entregadoHora) && validarNumPositivo(entregadoMin) && entrega.EV !== null) {
        var entregadoFormato = entregadoHora + ":" + entregadoMin;
        if (ordenarFechas(entregadoFormato, entrega.EV) === -1) {
            entrega.ED = entregadoHora + ":" + entregadoMin;
            entrega.costo = calcularCostoEntrega(entrega);
            $("#txtBuscarPaquete").val(codigo);
            $("#btnBuscarPaquete").click();
            mostrarPendEntrega();
            mensaje = "Entregado correctamente";
        } else {
            mensaje += "<br>El estado Entregado debe ser posterior a todos los anteriores";

        }
    } else {
        if (mensaje === "") {
            mensaje += "<br>Para asignar como entregado deben estar todos los estados";
        }

    }


    $("#divMsgBuscarPaquete").html(mensaje);

}

function buscarPaquete() {
    var mensaje = "";
    var codigo = parseInt($("#txtBuscarPaquete").val());
    var encontrado = false;
    if (validarNum(codigo)) {
        var paquete = getElementosPorParametro(paquetes, "codigo", codigo);
        var entrega = getElementosPorParametro(entregas, "paquete", codigo);
        mensaje = mostrarReportePaquete(paquete, entrega, usuarioActual.tipo);
        if (mensaje !== null) {
            encontrado = true;
        } else {
            mensaje = "No existe el paquete buscado";
        }
    } else {
        mensaje = "Debe ingresar un codigo de paquete";
    }
    if (encontrado) {
        if (usuarioActual.tipo === 1 || usuarioActual.cedula === paquete[0].ciRemitente || usuarioActual.cedula === paquete[0].ciDestinatario) {
            $("#ulBuscarPaquete").html(mensaje);
            $("#ulBuscarPaquete").listview('refresh');
            $("#divMsgBuscarPaquete").html("");
            $("#btnGuardarEstados" + codigo).click(guardarEstado);
            $("#txtEnViajeHora").keydown(function (e) {
                var hora = $(this).val();
                if (!keyHora(e.keyCode, hora)) {
                    e.preventDefault();
                }
            });
            $("#txtEnViajeMin").keydown(function (e) {
                var hora = $(this).val();
                if (!keyMinutos(e.keyCode, hora)) {
                    e.preventDefault();
                }
            });
            $("#txtEntregadoHora").keydown(function (e) {
                var hora = $(this).val();
                if (!keyHora(e.keyCode, hora)) {
                    e.preventDefault();
                }
            });
            $("#txtEntregadoMin").keydown(function (e) {
                var hora = $(this).val();
                if (!keyMinutos(e.keyCode, hora)) {
                    e.preventDefault();
                }
            });
        } else {
            mensaje = "Numero de paquete no encontrado";
            $("#divMsgBuscarPaquete").html(mensaje);
            $("#ulBuscarPaquete").html("");
        }

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
    for (var x = 0; x < disponibles.length; x++) {
        $("#" + disponibles[x].codigo).click(seleccionarRepartidor);
    }
    $("#ulPaquetesPendientes").html(mostrarPaquetes(pendientes));
    $("#ulPaquetesPendientes").listview('refresh');
    for (var i = 0; i < pendientes.length; i++) {
        $("#P" + pendientes[i].codigo).click(seleccionarPaquete);
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
        for (var x = 0; x < paquetesDisponibles.length; x++) {
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
                            paqueteActual.repartidor = idRepartidor;
                            paqueteActual.ER = agregarHoraActual();
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
    for (var x = 0; x < _string.length; x++) {
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
    for (var x = 0; x < repartidores.length; x++) {
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
            $(".banner").show();
            $("#divLogin").hide();
            $("#divMenu").show();
            menuShow();
            $("#divMsgLogin").hide();
            $("#liConsultar").click(); //Para que inicie  siempre en la primera pestaña
            $("#divPendientes").show();
            break;
        case 2:
            usuarioActual = getElementoPorParametro(usuarios, "cedula", usuario);
            $(".banner").show();
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
    $("#divPendientes").hide();
}
function menuShow() {
    $("#liNuevo").show();
    $("#liAsignar").show();
    $("#liReporte").show();
    $("#divPendientes").show();
}

function logout() {
    $("#divMenu").hide();
    $("#divPendientes").hide();
    $(".banner").hide();
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
