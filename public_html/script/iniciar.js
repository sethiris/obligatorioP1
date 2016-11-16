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
    var disponibles = repartidoresDisponibles();
    var pendientes = paqueteSinRepartir();
    $("#ulRepartidoresDisponibles").html(mostrarRepartidores(disponibles));
    $("#ulRepartidoresDisponibles").listview('refresh');
    $("#ulPaquetesPendientes").html(mostrarPaquetes(pendientes));
    $("#ulPaquetesPendientes").listview('refresh');

}


function seleccionarRepartidor(id) {
  var repartidor=getRepartidor(parseInt(id));
  var idPaquete= quitarLetraID($(".PaqueteSeleccionado").attr("id"))
  var paquetesDisponibles= new Array();
  $(".RepartidorSeleccionado").removeClass("RepartidorSeleccionado");
  $("#"+id).addClass("RepartidorSeleccionado");
  if (!validarNum(idPaquete)) {
    paquetesDisponibles= disponiblesPorPeso(paqueteSinRepartir(),repartidor.medio);
    $("#ulPaquetesPendientes").html(mostrarPaquetes(paquetesDisponibles));
    $("#ulPaquetesPendientes").listview('refresh');
  }


}
var entregas = new Array();

function asignarRepartidor(){
  var idPaquete= quitarLetraID($(".PaqueteSeleccionado").attr("id"));
  var idRepartidor = quitarLetraID($(".RepartidorSeleccionado").attr("id"));
  var mensaje="";
  var tiempo = new Date();
  if (validarNum(idPaquete)) {
    if(validarNum(idRepartidor)){
        entregas.push({"paquete":idPaquete,"repartidor":idRepartidor,"ER":tiempo.getHours() + ":" + tiempo.getMinutes() })
        mensaje= "Entregado a repartidor correctamente";
        mostrarDisponibles();
      }else {
        mensaje="Debe seleccionar un repartidor"
      }
  } else {
     mensaje= "Debe seleccionar un paquete y un repartidor";
  }
  alert(mensaje);
}

function quitarLetraID(_string){
   // esta funcion es usada para quitar la letra de identificacion
   //en las listas del ID del objeto, para poder asignar
   //la clase cuando esta seleccionado
  var sinletra="";
  for (var x in _string) {
      if (!isNaN(_string[x])) {
        sinletra+=_string[x];
      }
  }
  return sinletra;
}

function seleccionarPaquete(id){
  var identificador=parseInt(quitarLetraID(id));
  var repartidor= $(".RepartidorSeleccionado").attr("id");
  $(".PaqueteSeleccionado").removeClass("PaqueteSeleccionado");
  var mensaje="";
  $("#P"+identificador).addClass("PaqueteSeleccionado");

    var paquete=getElementoPorParametro(paquetes,"codigo",identificador);
    var repartidores=repartidoresDisponiblesPeso(paquete.peso);
    $("#ulRepartidoresDisponibles").html(mostrarRepartidores(repartidores));
    $("#ulRepartidoresDisponibles").listview('refresh');
    $("#"+repartidor).addClass("RepartidorSeleccionado");


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
