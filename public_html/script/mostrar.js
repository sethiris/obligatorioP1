function mostrarRepartidores(pRepartidores, pIdentificador) {
    var mensaje = "<li data-role='list-divider'>Repartidores</li>";
    var icono = "";
    for (var x = 0; x < pRepartidores.length; x++) {
        switch (pRepartidores[x].medio) {
            case "Bicicleta":
                icono = "<i class='fa fa-bicycle' aria-hidden='true'></i>";
                break;
            case "Moto":
                icono = "<i class='fa fa-motorcycle' aria-hidden='true'></i>";
                break;
            case "Camioneta":
                icono = "<i class='fa fa-car' aria-hidden='true'></i> ";
                break;
            default:
        }
        mensaje += "<li id=" + pIdentificador + pRepartidores[x].codigo + ">" + icono;
        mensaje += "  " + pRepartidores[x].nombre + "</li>";
    }
    return mensaje;
}


function mostrarPaquetes(pPaquetes, pIdentificador) {
    var mensaje = "<li data-role='list-divider'>Paquetes</li>";
    var icono = "<i class='fa fa-cube' aria-hidden='true'></i>";
    if (pIdentificador === undefined) pIdentificador = "";
    if (pPaquetes.length > 0) {
        for (var x = 0; x < pPaquetes.length; x++) {
            mensaje += "<li id=P" + pIdentificador + pPaquetes[x].codigo + "> " + icono;
            mensaje += " Codigo:" + pPaquetes[x].codigo + " Remitente: " + pPaquetes[x].ciRemitente + " Destinatario:" + pPaquetes[x].ciDestinatario + "</li>";
        }
    } else {
        mensaje = null;
    }

    return mensaje;
}

function mostrarReportePaquete(_paquetes, _entregas, _usuario) {
    var mensaje = "<li data-role='list-divider'>Paquetes</li>";
    var icono = "<i class='fa fa-cube' aria-hidden='true'";
    if (_paquetes.length > 0) {
        for (var x = 0; x < _paquetes.length; x++) {
            var entregadoR = "--";
            var enViaje = "--";
            var entregado = "--";
            if (_entregas[x].ER === null) {
                icono += "style='color:black'";
            } else {
                if (_entregas[x].EV === null) {
                    entregadoR = _entregas[x].ER;
                    if (_usuario === 1) {
                        enViaje = "<br><input class='ui-input-text' id='txtEnViajeHora' placeholder='HH'></input>:";
                        enViaje += "<input class='ui-input-text' id='txtEnViajeMin' placeholder='MM'></input>";
                        entregado = "<br><input class='ui-input-text' id='txtEntregadoHora' placeholder='HH'></input>:";
                        entregado += "<input class='ui-input-text' id='txtEntregadoMin' placeholder='MM'></input>";
                    }
                    icono += "style='color:yellow'";
                } else {
                    if (_entregas[x].ED === null) {
                        entregadoR = _entregas[x].ER;
                        enViaje = _entregas[x].EV;
                        if (_usuario === 1) {
                            entregado = "<br><input class='ui-input-text' id='txtEntregadoHora' placeholder='HH'></input>:";
                            entregado += "<input class='ui-input-text' id='txtEntregadoMin' placeholder='MM'></input>";
                        }
                        icono += "style='color:blue'";
                    } else {
                        entregadoR = _entregas[x].ER;
                        enViaje = _entregas[x].EV;
                        entregado = _entregas[x].ED;
                        icono += "style='color:green'";
                        var costo = _entregas[x].costo;
                    }
                }
            }

            icono += "></i>";
            mensaje += "<li> " + icono;
            mensaje += "<div id='divEstados'class='ui-grid-c'>";
            mensaje += "<div class='ui-block-a'> Codigo:" + _paquetes[x].codigo + "</div>";
            mensaje += " <div class='ui-block-b'>Remitente: " + _paquetes[x].ciRemitente + "</div>";
            mensaje += " <div class='ui-block-c'>Destinatario:" + _paquetes[x].ciDestinatario + "</div>";
            if (costo > 0) {
                mensaje += " <div class='ui-block-d'>Costo:$" + costo + "</div></li>";
            }
            mensaje += "<li>";
            mensaje += "<div id='divEstados'class='ui-grid-c'>";
            mensaje += "<div class='ui-block-a'> Recibido:" + _entregas[x].RE + "</div>";
            mensaje += "<div class='ui-block-b'> Asignado a repartidor:" + entregadoR + "</div>";
            mensaje += "<div class='ui-block-c'> En viaje" + enViaje + "</div>";
            mensaje += "<div class='ui-block-d'> Entregado:" + entregado + "</div>";
            mensaje += "</div> ";
            if (_usuario === 1 && _entregas[x].ED === null && _entregas[x].ER !== null)
                mensaje += "</li><li><input class='ui-btn ui shadow' id='btnGuardarEstados" + _paquetes[x].codigo + "' type='button' value='Guardar'></input>";
        }
        mensaje += "</div></li>";
    } else {
        mensaje = null;
    }

    return mensaje;
}

function PrimeraMayuscula(string) {
    var aux = string.toUpperCase().charAt(0);
    for (var i = 1; i < string.length; i++) {
        aux += string.charAt(i);
    }
    return aux;
}
