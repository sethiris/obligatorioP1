var repartidores=new Array();
repartidores=  [{"codigo":1, "nombre":"Juan Perez","medio":"Moto"},
   {"codigo":2, "nombre": "Ana Gomez","medio":"Camioneta"},
   {"codigo":3, "nombre": "Juan José","medio":"Bicicleta"}];

function repartidoresDisponibles(){
  var disponibles = new Array();
  var encontrado= false;
  var i=0;
  for( var x in repartidores){
    while( i< paquetes.length && !encontrado){
      if (paquetes[i].repartidor === repartidores[x].codigo) {
        encontrado=true;
      }
      i++;
    }
      if (encontrado) {
        encontrado= false;
        i=0;
      } else {
        disponibles.push(repartidores[x]);
        i=0;
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
