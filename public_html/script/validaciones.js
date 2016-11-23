//dependecias; Jquery


//------------------------Numeros----------------------------------//

function validarNum(pNumero) {
    var numValido = true;
    if (isNaN(pNumero) || pNumero.length === 0) {
        numValido = false;
    }
    return numValido;
}

function validarNumPositivo(pNumero) {
    //valida si es numero positivo, dependencia de validarNum
    // devuelve falso si una de esas dos condiciones no se cumple
    var numPositivo = false;
    if (validarNum(pNumero)) {
        if (pNumero >= 0) {
            numPositivo = true;
        }
    }
    return numPositivo;
}

//------------------------Strings----------------------------------//

function validarSoloTexto(pTexto) { //valida que no haya ningún número dentro del campo de texto
    var soloTxt = false;
    if (validarTexto(pTexto) && isNaN(pTexto)) {
        soloTxt = true;
    }
    return soloTxt;
}

function validarTexto(pTexto) {
    var txtValido = false;
    if (pTexto.length > 0) {
        txtValido = true;
    }
    return txtValido;
}
//------------------------Especiales----------------------------------//

function validarCI(pCI) {
    var CIValida = false;
    pCI = pCI.toString();
    if (pCI.length === 8) {
        var digito1 = parseInt(pCI.charAt(0));
        var digito2 = parseInt(pCI.charAt(1));
        var digito3 = parseInt(pCI.charAt(2));
        var digito4 = parseInt(pCI.charAt(3));
        var digito5 = parseInt(pCI.charAt(4));
        var digito6 = parseInt(pCI.charAt(5));
        var digito7 = parseInt(pCI.charAt(6));
        var calculo = digito1 * 2 + digito2 * 9 + digito3 * 8 + digito4 * 7 + digito5 * 6 + digito6 * 3 + digito7 * 4;
        //se toman los primeros 7 números y se multiplican cada uno por 2987634
        var verificadorUsuario = parseInt(pCI.charAt(pCI.length - 1));
        //convierto a num el ultimo digito ingresado por el usuario para comparar
        //luego si esel verificador correcto, o sea, si es valida la CI
        var verificador = 0;
        ////contador para ver cuantos numeros debo sumar al calculo para llegar al mayormultiplo de 10 mas cercano
        var ite = calculo;
        while (!(ite % 10 === 0)) {
            //se toma el resultado del calculo y se busca el mayor número que
            //termina en 0 y la diferencia
            //estre este número y el delcalculo es elvalor del dígito verificador
            verificador++;
            ite++;
        }

        if (verificadorUsuario === verificador) {
            CIValida = true;
        }
    }
    return CIValida;
}
//valida que el peso este dentro del límite permitido para cargar por la empresa
function validarPeso(pPeso) {
    var valido = false;
    if (validarNumPositivo(pPeso)) {
        var pPesoNum = parseFloat(pPeso);
        if (pPesoNum <= 1000) {
            valido = true;
        }
    }
    return valido;
}

//------------------------De ingreso de datos en sistema----------------------------------//

function validarCIRemitente() { //función que avisa si la ci ingresada por el usuario es correcta
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

function validarNomRemitente() { //función que avisa si el nom ingresadp por el usuario es correcto
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

function validarApeRemitente() { //función que avisa si el ape ingresado por el usuario es correcto
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

function validarCIDestinatario() { //función que avisa si la ci ingresada por el usuario es correcta
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

function validarNomDestinatario() { //función que avisa si el nom ingresadp por el usuario es correcto
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

function validarApeDestinatario() { //función que avisa si el ape ingresado por el usuario es correcto
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

function validarDirDestinatario() { //función que avisa si la dir ingresada por el usuario es correcta
    $("#divMsgNuevoPaquete").empty();
    var DirDestinat = $("#txtDireccionDestinatario").val();
    var mensaje = "";
    if (!validarSoloTexto(DirDestinat)) {
        mensaje = "Ingrese una dirección";
        $("#txtDireccionDestinatario").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);
}

function validarPesoPaquete() { //función que avisa si el peso ingresado por el usuario es posible enviarlo
    $("#divMsgNuevoPaquete").empty();
    var peso = $("#txtPesoPaquete").val();
    var mensaje = "";
    if (!validarPeso(peso)) {
        mensaje = "El peso no puede ser superior a 1000kgs.";
        $("#txtPesoPaquete").addClass("error");
    } else {
        mensaje = "";
    }
    $("#divMsgNuevoPaquete").html(mensaje);

}

function keyHora(pKeyCode, pHora) {
    var validado = true;
    if (pKeyCode !== 8 && pKeyCode !== 9) {
        if (pHora.length <= 2) {
            if (pHora.length <= 1) {
                if (pKeyCode < 48 || pKeyCode > 50) validado = false;
            } else {
                if (pHora[0] === "2") {
                    if (pKeyCode < 48 || pKeyCode > 51) validado = false;
                } else {
                    if (pKeyCode < 48 || pKeyCode > 57) validado = false;
                }

            }
        } else {
            validado = false;
        }

    }
    return validado;
}


function keyMinutos(ppKeyCode, pHora) {
    var validado = true;
    if (ppKeyCode !== 8 && ppKeyCode !== 9) {
        if (pHora.length <= 2) {
            if (pHora.length === 1) {
                if (ppKeyCode < 48 || ppKeyCode > 53) validado = false;
            } else {
                if (ppKeyCode < 48 || ppKeyCode > 57) validado = false;

            }
        } else {
            validado = false;
        }

    }
    return validado;
}

function ordenarFechas(pHora1, pHora2) {
    var fecha = separarTiempo(pHora1);
    var fecha2 = separarTiempo(pHora2);
    var orden = null;
    if (fecha[0] > fecha2[0]) {
        orden = -1;
    } else {
        if (fecha[0] === fecha2[0]) {
            if (fecha[1] > fecha2[1]) {
                orden = -1;
            } else {
                if (fecha[1] === fecha2[1]) {
                    orden = 0;
                } else {
                    orden = 1;
                }

            }

        } else {
            orden = 1;
        }

    }
    return orden;
}

function separarTiempo(string) {
    var hora = parseInt(string[0] + string[1]);
    var minutos = parseInt(string[3] + string[4]);
    var tiempo = new Array();
    tiempo.push(hora);
    tiempo.push(minutos);
    return tiempo;
}
