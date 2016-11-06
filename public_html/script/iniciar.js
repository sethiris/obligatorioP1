$('document').ready(iniciarPrograma);

function iniciarPrograma() {
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

    $("#liAsignar").click(mostrarDisponibles);
    $("#btnNuevoPaquete").click(ingresarNuevoPaquete);
    $("#btnAsignarPaquete").click(asignarRepartidor);

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

function validarCIRemitente() {//función que avisa si la ci ingresada por el usuario es correcta
    $("#divMsgNuevoPaquete").empty();
    var CIRemitente = $("#txtCIRemitente").val();
    if (!validarCI(CIRemitente)) {
        var mensaje = "La CI no es correcta";
        $("#txtCIRemitente").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function validarNomRemitente() {//función que avisa si el nom ingresadp por el usuario es correcto
    $("#divMsgNuevoPaquete").empty();
    var NomRemitente = $("#txtNombreRemitente").val();
    if (!validarSoloTexto(NomRemitente)) {
        var mensaje = "El nombre no es correcto";
        $("#txtNombreRemitente").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function validarApeRemitente() {//función que avisa si el ape ingresado por el usuario es correcto
    $("#divMsgNuevoPaquete").empty();
    var ApeRemitente = $("#txtApellidoRemitente").val();
    if (!validarSoloTexto(ApeRemitente)) {
        var mensaje = "El apellido no es correcto";
        $("#txtApellidoRemitente").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function validarCIDestinatario() {//función que avisa si la ci ingresada por el usuario es correcta
    $("#divMsgNuevoPaquete").empty();
    var CIDestinat = $("#txtCIDestinatario").val();
    if (!validarCI(CIDestinat)) {
        var mensaje = "La CI no es correcta";
        $("#txtCIDestinatario").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function validarNomDestinatario() {//función que avisa si el nom ingresadp por el usuario es correcto
    $("#divMsgNuevoPaquete").empty();
    var NomDestinat = $("#txtNombreDestinatario").val();
    if (!validarSoloTexto(NomDestinat)) {
        var mensaje = "El nombre no es correcto";
        $("#txtNombreDestinatario").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function validarApeDestinatario() {//función que avisa si el ape ingresado por el usuario es correcto
    $("#divMsgNuevoPaquete").empty();
    var ApeDestinat = $("#txtApellidoDestinatario").val();
    if (!validarSoloTexto(ApeDestinat)) {
        var mensaje = "El apellido no es correcto";
        $("#txtApellidoDestinatario").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function validarDirDestinatario() {//función que avisa si la dir ingresada por el usuario es correcta
    $("#divMsgNuevoPaquete").empty();
    var DirDestinat = $("#txtDireccionDestinatario").val();
    if (!validarSoloTexto(DirDestinat)) {
        var mensaje = "Ingrese una dirección";
        $("#txtDireccionDestinatario").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function validarPesoPaquete() {//función que avisa si el peso ingresado por el usuario es posible enviarlo
    $("#divMsgNuevoPaquete").empty();
    var peso = $("#txtPesoPaquete").val();
    if (!validarPeso(peso)) {
        var mensaje = "El peso no puede ser superior a 1000kgs.";
        $("#txtPesoPaquete").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);

}

function mostrarDisponibles() {
    $("#ulRepartidoresDisponibles").html("<li data-role='list-divider'>Repartidores</li>");
    var disponibles = repartidoresDisponibles();
    for (var x in disponibles) {
        switch (disponibles[x].medio) {
            case "Moto":
                $("#ulRepartidoresDisponibles").append("<li id=li" + disponibles[x].codigo + "> <i class='fa fa-motorcycle' aria-hidden='true'></i> " + disponibles[x].nombre + "</li>");
                break;
            case "Camioneta":
                $("#ulRepartidoresDisponibles").append("<li id=li" + disponibles[x].codigo + "> <i class='fa fa-car' aria-hidden='true'></i> " + disponibles[x].nombre + "</li>");
                break;
            case "Bicicleta":
                $("#ulRepartidoresDisponibles").append("<li id=li" + disponibles[x].codigo + "> <i class='fa fa-bicycle' aria-hidden='true'></i> " + disponibles[x].nombre + "</li>");
                break;
            default:

        }

        $('#li' + disponibles[x].codigo).click(SeleccionarRepartidor);


    }
    $("#ulRepartidoresDisponibles").listview('refresh');
    //

}

function asignar(pCodigo) {
    var repartidor = getRepartidor(pCodigo.data.codigo);
    switch (repartidor.medio) {
        case "Moto":
            alert("Seleccione un paquete de la lista para asignar: (Se muestran solo los paquetes hasta 50 kilos)");
            break;
        case "Camioneta":
            alert("Seleccione un paquete de la lista para asignar: (Se muestran solo los paquetes hasta 1000 kilos)");
            break;
        case "Bicicleta":
            alert("Seleccione un paquete de la lista para asignar: (Se muestran solo los paquetes hasta 20 kilos)");
            break;
        default:

    }


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
            $("#divLogin").hide();
            $("#divMenu").show();
            $("#ulMenu2").hide();
            $("#ulMenu1").show();
            $("#divMsgLogin").hide();
            $("#iniciar").click(); //Para que inicie  siempre en la primera pestaña
            break;
        case 2:
            $("#divMenu").show();
            $("#ulMenu1").hide();
            $("#ulMenu2").show();

            $("#divMsgLogin").hide();
            $("#divLogin").hide();
            $("#iniciar2").click();
            break;
        default:

    }
    $("#divMsgLogin").html(mensaje);

}

function logout() {
    $("#divMenu").hide();
    $("#divLogin").show();
    $("#divMsgLogin").show();

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

function asignarRepartidor(){
    agregarRepartidor(numPaquete,)
}