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

function validarSoloTexto(pTexto) {//valida que no haya ningún número dentro del campo de texto
    var errores = 0;
<<<<<<< HEAD
    var esTexto = true;
    if (validarTexto(pTexto)) {
        var i = 0;
        while( i < pTexto.length && esTexto) {
            if (!(pTexto.charCodeAt(i) > 64 && pTexto.charCodeAt(i) < 91) && !(pTexto.charCodeAt(i) > 96 && pTexto.charCodeAt(i) < 123)) {
                if (pTexto.charAt(i) != " ") {
                    esTexto=false;
                }
=======
    var soloTexto = true;
    if (validarTexto(pTexto)) {
        for (var i = 0; i < pTexto.length; i++) {
            if (!(pTexto.charCodeAt(i) > 64 && pTexto.charCodeAt(i) < 91) ||
                    !(pTexto.charCodeAt(i) > 96 && pTexto.charCodeAt(i) < 123) || pTexto.charAt(i) !== " ") {
                //de 65 a 90 son letras mayúsculas; de 97 a 122 son letras minúsculas
                errores++;
>>>>>>> origin/master
            }
            i++;
        }
    }
<<<<<<< HEAD
    else{
      esTexto=false;
    }
    return esTexto;
=======
    if (errores !== 0) {
        soloTexto = false;
    }
    return soloTexto;
>>>>>>> origin/master
}

function validarTexto(pTexto) {
    var txtValido = false;
    if (pTexto.length > 0) {
        txtValido = true;
    }
    return txtValido;
}
//------------------------Especiales----------------------------------//

function validoCI(pCI) {
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
