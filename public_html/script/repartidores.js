var repartidores = new Array();

function precargaRepartidores() {
    repartidores.push({"codigo": 1, "nombre": "Juan Perez", "medio": "Moto"},
            {"codigo": 2, "nombre": "Ana Gomez", "medio": "Camioneta"},
            {"codigo": 3, "nombre": "Juan José", "medio": "Bicicleta"},
            {"codigo": 4, "nombre": "Carlos", "medio": "Moto"});

}

  limitesPaquetes = [{"Bicicleta":{"desde":0, "hasta":20, "costo": 100}},
   {"Moto":{"desde":21, "hasta":50, "costo":200}},
   {"Camioneta": {"desde":51, "hasta":1000, "costo":500}}];

function repartidoresDisponibles(){
  var disponibles = new Array();
  var encontrado= false;
  var i=0;
  for( var x in repartidores){
    while( i< entregas.length && !encontrado){
      if (entregas[i].repartidor === repartidores[x].codigo && entregas[i].ED === null) {
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

function repartidoresDisponiblesPeso(peso){
   var disponibles = new Array();
   var todos= repartidoresDisponibles();

   for (var x in limitesPaquetes) {
     for(var i in  limitesPaquetes[x]){
     if (peso>=limitesPaquetes[x][i].desde && peso<= limitesPaquetes[x][i].hasta) {
       var todosDelMedio = getElementosPorParametro(todos,"medio",i);
       for (var y in todosDelMedio) {
         disponibles.push(todosDelMedio[y]);
       }
     }
   }
   }

   return disponibles;
}



function getRepartidor(pCodigo) {
    var repartidor = new Array();
    for (var x in repartidores) {
        if (repartidores[x].codigo === parseInt(pCodigo)) {
            repartidor = repartidores[x];
        }

    }
    return repartidor;
}
