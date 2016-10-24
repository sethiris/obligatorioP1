$('document').ready(iniciarPrograma);

function iniciarPrograma(){
      $("#divMenu").hide();
      $("#btnLogin").click(login);
      $(".Logout").click(logout);
}

function login(){
  var mensaje= "";
  var usuario= parseInt($("#txtUsuario").val());
  var pass = $("#txtClave").val();
  var resultado= validarLogin(usuario,pass)
  switch (resultado) {
    case -1:
      mensaje="La contraseña es incorrecta";
    break;
    case 0:
      mensaje="El usuario no existe";
    break;
    case 1:
      $("#divMenu").show();
      $("#divLogin").hide();
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

function logout(){
  $("#divMenu").hide();
  $("#divLogin").show();
  $("#divMsgLogin").show();

}