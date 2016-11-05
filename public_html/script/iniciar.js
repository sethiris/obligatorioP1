$('document').ready(iniciarPrograma);

function iniciarPrograma() {
    $("#divMenu").hide();
    $("#btnLogin").click(login);
    $(".Logout").click(logout);
    $("#btnIngresarNuevoPaquete").click(ingresarNuevoPaquete);
    //$("#txtCIRemitente").blur(validarRemitente); hacer la funcionalidad para todos los campos
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
