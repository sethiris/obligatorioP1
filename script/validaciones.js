//dependecias; Jquery


//------------------------Numeros----------------------------------//

function validarNum(pNumero){
    var retorno=true;
    if(isNaN(pNumero) || pNumero.length === 0 ) {
      retorno=false;
    }
    return retorno;
}

function validarNumPositivo(pNumero){
  //valida si es numero positivo, dependencia de validarNum
  // devuelve falso si una de esas dos condiciones no se cumple
  var retorno=true;
  if (!validarNum(num) || num<0) {
    retorno=false;
  }
  return retorno;
}

//------------------------Strings----------------------------------//

function validarSoloTexto(pTexto){
  var errores=0;
  var retorno=true;
  if (esTexto(pTexto)) {
    for (var i=0; i< pTexto.length-1;i++){
      if(!(pTexto.charCodeAt(i)>64 && pTexto.charCodeAt(i)<91) && !(pTexto.charCodeAt(i)>96 && pTexto.charCodeAt(i)<123)){
        if (pTexto.charAt(i)!= " ") {
          errores++;
        }
      }
    }
  } else {
    errores++;
  }
  if (errores!=0){
    retorno = false;
  }
  return retorno;
}

function validarTexto(pTexto){
  var retorno=false;
  if(isNaN(pTexto) && pTexto.length>0){
    retorno=true;
  }
  return retorno;
}
//------------------------Especiales----------------------------------//
