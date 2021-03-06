var paquetes = new Array();

function precargaPaquetes() {
    var paquete1 = agregarPaquete(41987376, "Matias", "Gonzalez", 50555867, "Juan Jose", "Sethiris", "Amezaga 2230", 500);
    var paquete2 = agregarPaquete(55996612, "David", "Finzer", 41987376, "Matias", "Gonzalez", "8 de octubre 2211", 20);
    var paquete3 = agregarPaquete(50555867, "Juan Jose", "Sethiris", 41987376, "Matias", "Gonzalez", "8 de octubre 2211", 1000);
    var paquete4 = agregarPaquete(55996612, "David", "Finzer", 50555867, "Juan Jose", "Sethiris", "Benito Chain 1123", 21);
    var paquete5 = agregarPaquete(25311195, "Javier", "Lopez", 50555867, "Juan Jose", "Sethiris", "Uruguay 897", 17);
    var paquete6 = agregarPaquete(41987376, "Matias", "Gonzalez", 55996612, "David", "Finzer", "Cno Carrasco 111", 1);
    var paquete7 = agregarPaquete(55996612, "David", "Finzer", 25311195, "Javier", "Lopez", "Propios 1312", 50);
    var paquete8 = agregarPaquete(50555867, "Juan Jose", "Sethiris", 25311195, "Javier", "Lopez", "Propios 1312", 544);
    var paquete9 = agregarPaquete(55996612, "David", "Finzer", 25311195, "Javier", "Lopez", "Propios 1312", 33);
    var paquete10 = agregarPaquete(55996612, "David", "Finzer", 41987376, "Matias", "Gonzalez", "Benito Lamas 2611", 260);
    var paquete11 = agregarPaquete(41987376, "Matias", "Gonzalez", 50555867, "Juan Jose", "Sethiris", "Uruguay 897", 13);
    var paquete12 = agregarPaquete(41987376, "Matias", "Gonzalez", 55996612, "David", "Finzer", "Benito Lamas 2611", 999);
}
//array indexado que contiene todos los paquetes y
//sus datos que fueron ingresados.
//Cada paquete es un array asociativo

var numPaquete = 0; //creo un contador que determinaré el número de cada paquete

//funcionalidad que agrega los datos de un paquete a un array llamado paquetes
function agregarPaquete(pCIRemitente, pNomRemitente, pApeRemitente, pCIDestinat, pNomDestinat, pApeDestinat, pDirDestinat, pPeso) {
    var paqueteAgregado = false;
    if (validarCI(pCIRemitente) && validarSoloTexto(pNomRemitente) &&
            validarSoloTexto(pApeRemitente) && validarCI(pCIDestinat) &&
            validarSoloTexto(pNomDestinat) && validarSoloTexto(pApeDestinat) &&
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
        paquetes.push(paquete);
        /*
         paquete.push({"codigo": numPaquete, "ciRemitente": pCIRemitente, "nomRemitente": pNomRemitente,
         "apeRemitente": pApeRemitente, "ciDestinatario": pCIDestinat, "nomDestinatario": pNomDestinat,
         "apeDestinatario": pApeDestinat, "dirDestinatario": pDirDestinat, "peso": pPeso});
         paquetes.push(paquete);*/
        paqueteAgregado = true;
        var fechaActual = new Date();

        entregas.push({
            "paquete": numPaquete,
            "repartidor": null,
            "RE": agregarHoraActual(),
            "ER": null,
            "EV": null,
            "ED": null,
            "costo": null
        });
    }
    return paqueteAgregado;
}

// RE recepcionado en la empresa
// ER entregado al repartidor
// EV  en viaje
// ED entregado a destinatario

function paqueteSinRepartir() {
    var sinRepartir = new Array();
    for (var x = 0; x < entregas.length; x++) {
        if (entregas[x].ER === null) {
            sinRepartir.push(getElementoPorClave(paquetes, "codigo", entregas[x].paquete));
        }
    }
    return sinRepartir;
}


function disponiblesPorPeso(_paquetes, _medio) {
    var paquetesDisponibles = new Array();
    var desde = 0;
    var hasta = 0;
    for (var x = 0; x < limitesPaquetes.length; x++) {
        for (var i in limitesPaquetes[x]) {
            if (i === _medio) {
                desde = limitesPaquetes[x][i].desde;
                hasta = limitesPaquetes[x][i].hasta;
            }
        }
    }

    for (var x = 0; x < _paquetes.length; x++) {
        if (_paquetes[x].peso <= hasta && _paquetes[x].peso >= desde) {
            paquetesDisponibles.push(_paquetes[x]);
        }
    }
    return paquetesDisponibles;

}
