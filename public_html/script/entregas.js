var entregas = new Array();

function precargaEntregas() {
    entregas[0] = {"paquete": 1, "repartidor": 2, "RE": "00:00", "ER": "09:00", "EV": "11:10", "ED": "11:30", "costo": 250000};
    entregas[1] = {"paquete": 2, "repartidor": 3, "RE": "00:30", "ER": "09:03", "EV": "10:00", "ED": "10:25", "costo": 2000};
    entregas[2] = {"paquete": 3, "repartidor": 6, "RE": "01:06", "ER": "11:40", "EV": "11:52", "ED": "12:23", "costo": 500000};
    entregas[3] = {"paquete": 4, "repartidor": 4, "RE": "09:21", "ER": "11:40", "EV": "17:30", "ED": null, "costo": null};
    entregas[4] = {"paquete": 5, "repartidor": 3, "RE": "09:42", "ER": "10:05", "EV": "11:10", "ED": null, "costo": null};
    entregas[5] = {"paquete": 6, "repartidor": 6, "RE": "11:59", "ER": "12:25", "EV": "14:45", "ED": null, "costo": null};
    entregas[6] = {"paquete": 7, "repartidor": 1, "RE": "12:30", "ER": "14:03", "EV": null, "ED": null, "costo": null};
    entregas[7] = {"paquete": 8, "repartidor": 2, "RE": "13:02", "ER": "14:56", "EV": null, "ED": null, "costo": null};
    entregas[8] = {"paquete": 9, "repartidor": null, "RE": "14:05", "ER": null, "EV": null, "ED": null, "costo": null};
    entregas[9] = {"paquete": 10, "repartidor": 9, "RE": "14:06", "ER": "14:26", "EV": null, "ED": null, "costo": null};
    entregas[10] = {"paquete": 11, "repartidor": null, "RE": "14:55", "ER": null, "EV": null, "ED": null, "costo": null};
    entregas[11] = {"paquete": 12, "repartidor": null, "RE": "15:30", "ER": null, "EV": null, "ED": null, "costo": null};
}

function ListarPendEntrega() {
    var cantPend = 0;
    var mensaje = "<li>Pendientes de entrega</li>";
    var pendientes = new Array();
    for (var ite = 0; ite < entregas.length; ite++) {
        var entregaActual = entregas[ite];
        if (entregaActual.ER !== null && entregaActual.ED === null) {
            pendientes.push(getElementoPorClave(paquetes, "codigo", entregaActual.paquete));
            cantPend++;
        }
    }
    if (mostrarPaquetes(pendientes) !== null) {
        mensaje += mostrarPaquetes(pendientes, "pendiente") + "<li>Total: " + cantPend + "</li>";
    }
    return mensaje;
}

function mostrarPendEntrega() {
    var paquetesPend = ListarPendEntrega();
    $("#ulPendientes").html(paquetesPend);
    $("#ulPendientes").listview("refresh");
}

function calcularCostoEntrega(_entrega) {
    var costo = 0;
    var importeTotal = 0;
    var repartidor = getElementoPorClave(repartidores, "codigo", _entrega.repartidor);
    var paquete = getElementoPorClave(paquetes, "codigo", _entrega.paquete);
    for (var x = 0; x < limitesPaquetes.length; x++) {
        for (var i in limitesPaquetes[x])
            if (i === repartidor.medio) {
                costo = parseInt(limitesPaquetes[x][i].costo);
            }
    }
    importeTotal = parseInt(paquete.peso) * costo;
    return importeTotal;
}
/*
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
 */

function entregadosPorRepartidor(pRepartidor) {
    var mensaje = "";
    var entregados = new Array();
    for (var ite = 0; ite < entregas.length; ite++) {
        var entregaActual = entregas[ite];
        if (entregaActual.repartidor === pRepartidor && entregaActual.ED !== null) {
            entregados.push({
                "paquete": entregaActual.paquete,
                "hora": entregaActual.ED,
                "costo": entregaActual.costo
            });
        }
    }

    entregados.sort(ordenarXHoraDescendente);

    mensaje += crearLista(entregados, "ulEntregadoPorRepartidor", "<b>Paquetes entregados por repartidor</b>", "No ha entregado ningun paquete aun");
    return mensaje;
}

function crearLista(_array, pIdLista, pTitulo, pError) {
    var mensaje = "<ul data-role='listview' data-inset='true' id='" + pIdLista + "'>";
    mensaje += "<li data-role='list-divider'>" + pTitulo + "</li>";
    if (_array.length > 0 && _array !== undefined) {
        for (var i = 0; i < _array.length; i++) {
            mensaje += "<li>";
            for (var x in _array[i]) {
                mensaje += PrimeraMayuscula(x) + ":" + _array[i][x] + "&nbsp";
            }
            mensaje += "</li>";
        }
    } else {
        mensaje += "<li>" + pError + "</li>";
    }
    mensaje += "</ul>";
    return mensaje;

}


function mostrarEntregadosPorRepart() {
    //crearTabla(repartidores);
    /*var repartidor = $(this).attr();
     var entregados = entregadosPorRepartidor(repartidor);*/
    $("#ulReporte").html(mostrarRepartidores(repartidores, "R"));
    for (var i = 0; i < repartidores.length; i++) {
        var repartidorActual = repartidores[i];
        $("#R" + repartidorActual.codigo).click(seleccionoRepartidor);
    }
    $("#ulReporte").listview("refresh");
}


function seleccionoRepartidor() {
    var seleccionado = quitarLetraID($(this).attr("id"));
    $(".ReporteSeleccionado").removeClass("ReporteSeleccionado");
    $("#R" + seleccionado).addClass("ReporteSeleccionado");
    $("#divEntXRep").html(entregadosPorRepartidor(seleccionado));
    $("#ulEntregadoPorRepartidor").listview();
}

function ordenarXHoraDescendente(pEntregaA, pEntregaB) {
    var orden = ordenarFechas(pEntregaA.hora, pEntregaB.hora);
    return orden;
}

//Crea una tabla que muestre todos lo valores de un array indexado
function crearTabla(pArray) {
    var tablaDatos = "<div class='Table'>"; //ingreso tabla

    tablaDatos += "<div class = 'Heading'>"; //creo los heading de cada columna
    for (var clave in pArray[0]) { //creo para cada celda del heading, elnombre de la clave
        tablaDatos += "<div class = 'Cell'>" + clave + "</div>";
    }
    tablaDatos += "</div>";

    for (var ite = 0; ite < pArray.length; ite++) {
        tablaDatos += "<div class='Row'>";
        //en cada celda voy a msotrar un dato de ese elemento por cada clave
        for (var clave in pArray[ite]) {
            tablaDatos += "<div class='Cell'>" + pArray[ite][clave] + "</div>";
        }
        tablaDatos += "</div>";

    }

    tablaDatos += "</div>";

    return tablaDatos;
}
