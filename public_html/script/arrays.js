function encontrarPorParametro(_array,_nombreParametro,_valorParametro){
        var encontrado= false;
        var i=0;
        while( i < _array.length && !encontrado) {
          if(_array[i][_nombreParametro]=== _valorParametro){
            encontrado = true;
          }
          i++;
        }
        return encontrado;

}
function getElementoPorParametro(_array,_nombreParametro,_valorParametro){
        var encontrado= new Array();
        var i=0;
        while( i < _array.length && encontrado.length===0) {
          if(_array[i][_nombreParametro]=== _valorParametro){
            encontrado =  _array[i];
          }
          i++;
        }
        return encontrado;

}

function getElementosPorParametro(_array,_nombreParametro,_valorParametro){
        var encontrado= new Array();
        var i=0;
        while( i < _array.length) {
          if(_array[i][_nombreParametro]=== _valorParametro){
            encontrado.push(_array[i]);
          }
          i++;
        }
        return encontrado;

}
