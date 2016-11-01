var repartidores=new Array();
repartidores=  [{"codigo":1, "nombre":"Juan Perez","medio":"Moto"},
   {"codigo":2, "nombre": "Ana Gomez","medio":"Camioneta"},
   {"codigo":3, "nombre": "Juan José","medio":"Bicicleta"}];

function repartidoresDisponibles(){
  var disponibles = new Array();
  var encontrado= false;
  for( var x in repartidores){
    for ( var i in paquetes){
      if (paquetes[i].repartidor === repartidores[x].codigo) {
        encontrado=true;
      }
    }
      if (encontrado) {
        encontrado= false;
      } else {
        disponibles.push(repartidores[x]);
      }
  }
  return disponibles;
}

function getRepartidor(pCodigo){
  var repartidor= new Array();
  for(var x in repartidores){
    if (repartidores[x].codigo === parseInt(pCodigo)) {
      repartidor= repartidores[x];
    }

  }
  return repartidor;
}

function asignarPaquete(codigoRepartidor, codigoPaquete){



}
