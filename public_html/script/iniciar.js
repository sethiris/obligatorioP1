$('document').ready(iniciarPrograma);

function iniciarPrograma() {
    $("#divMenu").hide();
    $("#btnLogin").click(login);
    $(".Logout").click(logout);
    $("#txtClave").keyup(function(e){ //se crea funcion anonima que toma como parametro el evento de keyup
    if(e.keyCode === 13) // 13 corresponde al codigo ascii del enter
    {
      login();
    }});

   $("#liAsignar").click(mostrarDisponibles);
  $("#txtNombreDestinatario").blur(validarNombreDestinatario);

}

function validarNombreDestinatario(){
    var nombreD=$("#txtNombreDestinatario").val();
    if (validarSoloTexto(nombreD)) {

    } else {
      alert("Nombre no valido");
    }
}

function mostrarDisponibles(){
    var disponibles= repartidoresDisponibles();
    var pendientes = paqueteSinRepartir();
    $("#ulRepartidoresDisponibles").html(mostrarRepartidores(disponibles));
    $("#ulRepartidoresDisponibles").listview('refresh');
    $("#ulPaquetesPendientes").html(mostrarPaquetes(pendientes));
    $("#ulPaquetesPendientes").listview('refresh');

}

function seleccionarRepartidor(id) {
  var repartidor=getRepartidor(id);
  var paquetesDisponibles= new Array();
  $(".RepartidorSeleccionado").removeClass("RepartidorSeleccionado");
  $("#"+id).addClass("RepartidorSeleccionado");
switch (repartidor.medio) {
  case "Moto":
  paquetesDisponibles= disponiblesPorPeso(paqueteSinRepartir(),50);
  break;
  case "Camioneta":
  paquetesDisponibles= disponiblesPorPeso(paqueteSinRepartir(),1000);
  break;
  case "Bicicleta":
  paquetesDisponibles= disponiblesPorPeso(paqueteSinRepartir(),20);
  break;
  default:

  }
  $("#ulPaquetesPendientes").html(mostrarPaquetes(paquetesDisponibles));
  $("#ulPaquetesPendientes").listview('refresh');

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
