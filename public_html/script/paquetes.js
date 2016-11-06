var paquetes = new Array();
paquetes.push({"codigo":1,"ER":null,"peso":20});
paquetes.push({"codigo":2,"ER":null,"peso":50});
paquetes.push({"codigo":3,"ER":null,"peso":1000});










// RE recepcionado en la empresa
// ER entregado al repartidor
// EV  en viaje
// ED entregado a destinatario

function paqueteSinRepartir(){
    var sinRepartir= new Array();
    for (var x in paquetes) {
        if (paquetes[x].ER === null) {
          sinRepartir.push(paquetes[x]);
        }
    }
  return sinRepartir;
}

function disponiblesPorPeso(_paquetes,peso){
      var filtrados = new Array();
      for (var x in _paquetes) {
        if (_paquetes[x].peso<= peso) {
          filtrados.push(_paquetes[x]);
        }
      }
      return filtrados;

}
