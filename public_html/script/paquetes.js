var paquetes = new Array();
paquetes.push({"codigo":1,"ciRemitente":50555867,"ciDestinatario":12345678,"ER":null,"peso":20});
paquetes.push({"codigo":2,"ciRemitente":12345678,"ciDestinatario":12345678,"ER":null,"peso":50});
paquetes.push({"codigo":3,"ciRemitente":1,"ciDestinatario":12345678,"ER":null,"peso":1000});









//array indexado que contiene todos los paquetes y
//sus datos que fueron ingresados.
//Cada paquete es un array asociativo

var numPaquete = 0//creo un contador que determinaré el número de cada paquete

//funcionalidad que agrega los datos de un paquete a un array llamado paquetes
function agregarPaquete(pCIRemitente, pNomRemitente, pApeRemitente, pCIDestinat, pNomDestinat, pApeDestinat, pDirDestinat, pPeso) {
    var paqueteAgregado = false;
    if (validarCI(pCIRemitente) && validarSoloTexto(pNomRemitente) &&
            validarSoloTexto(pApeRemitente) && validarCI(pCIDestinat)
            && validarSoloTexto(pNomDestinat) && validarSoloTexto(pApeDestinat) &&
            validarTexto(pDirDestinat) && validarPeso(pPeso)) {
        numPaquete++;
        var paquete = {};
         paquete.codigo = numPaquete;
         paquete.ciRemitente = pCIRemitente;
         paquete.nomRemitente = pNomRemitente;
         paquete.apeRemitente = pApeRemitente;
         paquete.ciDestinatario = pCIDestinat;
         paquete.nomDestinatario = pNomDestinat;
         paquete.apeDestinatario = pApeDestinat;
         paquete.dirDestinatario = pDirDestinat;
         paquete.peso = pPeso;
         paquete.repartidor = null;
        paquetes.push(paquete);
/*
        paquete.push({"codigo": numPaquete, "ciRemitente": pCIRemitente, "nomRemitente": pNomRemitente,
            "apeRemitente": pApeRemitente, "ciDestinatario": pCIDestinat, "nomDestinatario": pNomDestinat,
            "apeDestinatario": pApeDestinat, "dirDestinatario": pDirDestinat, "peso": pPeso, "repartidor": null});
        paquetes.push(paquete);*/
        paqueteAgregado = true;
    }
    return paqueteAgregado;
}

function agregarRepartidor(pCodPaquete, pRepartidor) {
    for (var ite = 0; ite < paquetes.length; ite++) {

        for (codigo in paquete) {
            if (paquetes.repartidor === null) {
                paquetes.repartidor = pRepartidor;
            }
        }
    }
}




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

function disponiblesPorPeso(_paquetes,medio){
      var filtrados = new Array();
      var desde=0;
      var hasta=0;
      for(var x in limitesPaquetes){
        for(var i in limitesPaquetes[x]){
        if (i===medio) {
          desde=limitesPaquetes[x][i].desde;
          hasta=limitesPaquetes[x][i].hasta;
        }
      }
      }
      for (var x in _paquetes) {
        if (_paquetes[x].peso<= hasta && _paquetes[x].peso>= desde) {
          filtrados.push(_paquetes[x]);
        }
      }
      return filtrados;

}
