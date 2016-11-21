var usuarios = new Array();
var usuarioActual = new Array();

function precargaUsuarios() {
    usuarios.push({
        "cedula": 12345678,
        "clave": "pass001",
        "tipo": 1
    }, {
        "cedula": 23456781,
        "clave": "pass002",
        "tipo": 2
    }, {
        "cedula": 41987376,
        "clave": "pass003",
        "tipo": 2
    }, {
        "cedula": 50555867,
        "clave": "pass004",
        "tipo": 2
    }, {
        "cedula": 55996612,
        "clave": "pass004",
        "tipo": 2
    }, {
        "cedula": 50555867,
        "clave": "pass004",
        "tipo": 2
    }, {
        "cedula": 1,
        "clave": "1",
        "tipo": 1
    }, {
        "cedula": 2,
        "clave": "2",
        "tipo": 2
    });
}

function validarLogin(pUsuario, pClave) {
    //Funcion que comprueba si el usuario y la clave existe, devuelve 1 o 2 segun el tipo si el login es correcto
    // 0 si el usuario no existe y -1 si la contraseña no es correcta
    var resultado = 0;
    for (var i in usuarios) {
        if (pUsuario === usuarios[i].cedula) {
            if (pClave === usuarios[i].clave) {
                switch (usuarios[i].tipo) {
                    case 1:
                        resultado = 1;
                        break;
                    case 2:
                        resultado = 2;
                        break;
                    default:

                }
            } else {
                resultado = -1;
            }
        }
    }
    return resultado;
}
