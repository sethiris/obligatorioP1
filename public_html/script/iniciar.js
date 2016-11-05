$('document').ready(iniciarPrograma);

function iniciarPrograma() {
    $("#divMenu").hide();
    $("#btnLogin").click(login);
    $(".Logout").click(logout);
    $("#btnIngresarNuevoPaquete").click(ingresarNuevoPaquete);
    $("#txtClave").keyup(function(e){ //se crea funcion anonima que toma como parametro el evento de keyup
    if(e.keyCode === 13) // 13 corresponde al codigo ascii del enter
    {
      login();
    }});

   $("#liAsignar").click(mostrarDisponibles);

    //$("#txtCIRemitente").blur(validarRemitente); hacer la funcionalidad para todos los campos
}
function mostrarDisponibles(){
    $("#ulRepartidoresDisponibles").html("<li data-role='list-divider'>Repartidores</li>");
    var disponibles= repartidoresDisponibles();
    for (var x in disponibles) {
      switch (disponibles[x].medio) {
        case "Moto":
          $("#ulRepartidoresDisponibles").append("<li id=li"+ disponibles[x].codigo + "> <i class='fa fa-motorcycle' aria-hidden='true'></i> " + disponibles[x].nombre + "</li>");
          break;
        case "Camioneta":
          $("#ulRepartidoresDisponibles").append("<li id=li"+ disponibles[x].codigo + "> <i class='fa fa-car' aria-hidden='true'></i> " + disponibles[x].nombre + "</li>");
          break;
          case "Bicicleta":
            $("#ulRepartidoresDisponibles").append("<li id=li"+ disponibles[x].codigo + "> <i class='fa fa-bicycle' aria-hidden='true'></i> " + disponibles[x].nombre + "</li>");
            break;
        default:

      }

      $('#li'+ disponibles[x].codigo ).bind('click', { codigo: disponibles[x].codigo }, hola);


    }
    $("#ulRepartidoresDisponibles").listview('refresh');
    //

}

function hola (pCodigo) {
  var repartidor=getRepartidor(pCodigo.data.codigo);
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

function validarRemitente(pCI, pNom, pApell) {
    var valido = false;
    if (validoCI(pCI) && validarSoloTexto(pNom) && validarSoloTexto(pApell)) {
        valido = true;
    }
    return valido;
}

var paquete = new Array();

function ingresarNuevoPaquete() {
    var CI = parseInt($("#txtCIRemitente").val());
    var nom = $("#txtNombreRemitente").val();
    var apellido = $("#txtApellidoRemitente").val();
    if (validarRemitente(CI,nom,apellido)){
        paquete.push("0001");
    }
    
}
