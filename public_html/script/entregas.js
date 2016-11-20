var entregas = new Array();

function ListarPendEntrega() {
    var cantPend = 0;
    var mensaje = "<li>Pendientes de entrega</li>";
    var pendientes = new Array();

    for (var ite = 0; ite < entregas.length; ite++) {
        var entregaActual = entregas[ite];
        if (entregaActual["ER"] !== null && entregaActual["ED"] === null) {
            pendientes.push(getElementoPorParametro(paquetes, "codigo", entregaActual.paquete));
            cantPend++;
        }
    }
    if (mostrarPaquetes(pendientes) != null) {
      mensaje += mostrarPaquetes(pendientes) + "<li>Total: " + cantPend + "</li>";
    }
    return mensaje;
}

function mostrarPendEntrega() {
    var paquetesPend = ListarPendEntrega();
    $("#ulPendientes").html(paquetesPend);
    $("#ulPendientes").listview("refresh");
}
function calcularCostoEntrega(_entrega){
    var costo=0;
    var importeTotal=0;
    var repartidor = getElementoPorParametro(repartidores,"codigo",_entrega.repartidor);
    var paquete = getElementoPorParametro(paquetes,"codigo",_entrega.paquete);
    for(var x in limitesPaquetes){
        for(var i in limitesPaquetes[x])
            if(i === repartidor.medio){
                costo= parseInt(limitesPaquetes[x][i].costo);
            }
    }
    importeTotal= parseInt(paquete.peso) * costo;
    return importeTotal;
}

function calcularCostoEnvio(pPaquete, pMedio) {
    var costo;
    var kilos;
    var importeTotal;
    var ite = 0;
    var encontrado= false;
    while (ite < limitesPaquetes.length && !encontrado) {
        var medioActual = limitesPaquetes[ite];
        if (medioActual === pMedio) {
            costo = medioActual.costo;
        }
        ite++;
    }
    encontrado=false;
    var iteB = 0;
    while (iteB < paquetes.length && !encontrado) {
        var paqueteActual = paquetes[iteB];
        if (paqueteActual=== pPaquete) {
            kilos = paqueteActual.peso;
        }
        iteB++;
    }
    importeTotal = costo * kilos;
    return importeTotal;
}


function entregadosPorRepartidor(pRepartidor) {
    var mensaje = "<b>Paquetes entregados por repartidor:</b><br><br>";
    var entregados = new Array();
    for (var ite = 0; entregas.length; ite++) {
        var entregaActual = entregas[ite];
        if (entregaActual.repartidor === pRepartidor && entregaActual.ED !== null) {
            entregados.paquete = entregaActual.paquete;
            entregados.hora = entregaActual.ED;
            entregados.costo = entregaActual.costo;
        }
    }
    entregados.sort(ordenarXHoraDescendente);

    mensaje += crearTabla(entregados);

    return mensaje;
}

function mostrarEntregadosPorRepart() {
    crearTabla(repartidores);
    var repartidor = $(this).attr();
    var entregados = entregadosPorRepartidor(repartidor);
    $("#divEntXRep").append(entregados);
}
function ordenarXHoraDescendente(pHoraA, pMinA, pHoraB, pMinB) {
    var orden = 0;
    if (pHoraA > pHoraB) {
        orden = -1;
    }
    if (pHoraA < pHoraB) {
        orden = 1;
    }
    if (pHoraA < pHoraB) {
        if (pMinA > pMinB) {
            orden = -1;
        }
        if (pMinA < pMinB) {
            orden = 1;
        }

    }
    return orden;
}

//Crea una tabla que muestre todos lo valores de un array indexado
function crearTabla(pArray) {
    var tablaDatos = "<div class='Table'>"; //ingreso tabla

    for (var ite = 0; ite < pArray.length; ite++) {
//recorre la cant de elementos del array index. Cada elemento es un length
        tablaDatos += "<div class = 'Heading'>"; //creo los heading de cada columna
        for (var clave in pArray[ite]) {//creo para cada celda del heading, elnombre de la clave
            tablaDatos += "<div class = 'Cell'>" + clave + "</div>";
        }
        tablaDatos += "</div>";

//para cada elemento, creo una fila
        tablaDatos += "<div class='Row'>";
        //en cada celda voy a msotrar un dato de ese elemento por cada clave
        for (var clave in pArrayAsoc) {
            tablaDatos += "<div class='Cell'>" + pArray[ite][clave] + "</div>";
        }
        tablaDatos += "</div>";
    }
    tablaDatos += "</div>";
    return tablaDatos;
}
