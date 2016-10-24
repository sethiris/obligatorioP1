//dependecias; Jquery


//------------------------Numeros----------------------------------//

function validarNum(pNumero) {
    var retorno = true;
    if (isNaN(pNumero) || pNumero.length === 0) {
        retorno = false;
    }
    return retorno;
}

function validarNumPositivo(pNumero) {
    //valida si es numero positivo, dependencia de validarNum
    // devuelve falso si una de esas dos condiciones no se cumple
    var retorno = true;
    if (!validarNum(num) || num < 0) {
        retorno = false;
    }
    return retorno;
}

//------------------------Strings----------------------------------//

function validarSoloTexto(pTexto) {
    var errores = 0;
    var retorno = true;
    if (esTexto(pTexto)) {
        for (var i = 0; i < pTexto.length - 1; i++) {
            if (!(pTexto.charCodeAt(i) > 64 && pTexto.charCodeAt(i) < 91) && !(pTexto.charCodeAt(i) > 96 && pTexto.charCodeAt(i) < 123)) {
                if (pTexto.charAt(i) != " ") {
                    errores++;
                }
            }
        }
    } else {
        errores++;
    }
    if (errores != 0) {
        retorno = false;
    }
    return retorno;
}

function validarTexto(pTexto) {
    var retorno = false;
    if (isNaN(pTexto) && pTexto.length > 0) {
        retorno = true;
    }
    return retorno;
}
//------------------------Especiales----------------------------------//

function validoCI(pCI) {
    var CIValida = false;
    if (pCI.length === 8) {
        var calculo = pCI.charAt(0) * 2 + pCI.charAt(1) * 9 + pCI.charAt(2) * 8 + pCI.charAt(3) * 7 + pCI.charAt(4) * 6 + pCI.charAt(5) * 3 + pCI.charAt(6) * 4;
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