var paquetes = new Array();
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
        var paquete = new Array();
        /*paquete.Codigo = numPaquete;
         paquete.CiRemitente = pCIRemitente;
         paquete.nomRemitente = pNomRemitente;
         paquete.apeRemitente = pApeRemitente;
         paquete.ciDestinatario = pCIDestinat;
         paquete.nomDestinatario = pNomDestinat;
         paquete.apeDestinatario = pApeDestinat;
         paquete.dirDestinatario = pDirDestinat;
         paquete.peso = pPeso;
         paquetes.repartidor = null;*/
        //paquetes.push(paquete);

        paquete.push({"codigo": numPaquete, "ciRemitente": pCIRemitente, "nomRemitente": pNomRemitente,
            "apeRemitente": pApeRemitente, "ciDestinatario": pCIDestinat, "nomDestinatario": pNomDestinat,
            "apeDestinatario": pApeDestinat, "dirDestinatario": pDirDestinat, "peso": pPeso, "repartidor": null});
        paquetes.push(paquete);
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