const URL_SERVER ="http://3.234.32.136:3000/";

document.addEventListener("DOMContentLoaded",()=>{
    cambiaUser()
    document.getElementById('insert').addEventListener("submit", insertar);
    document.getElementById("user").addEventListener("click", cerrarSesion)
})
function cambiaUser(e){
    const nombreUsuarioLS=JSON.parse(localStorage.getItem("users"));
    const user=document.getElementById("username");
     user.value=nombreUsuarioLS.nombre
}
function cerrarSesion(e){
    localStorage.removeItem("users")
}

function insertar(e) {
    e.preventDefault();

    const nameIntroducido = document.getElementById("nombre").value;

    fetch(`${URL_SERVER}plants/?nombre=${nameIntroducido}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            if (data.length === 0) {
                const descripIntroducida = document.getElementById("description").value;
                const tipoIntroducido = document.getElementById("Type").value;
                const precioIntroducido = document.getElementById("Price").value;
                const imagenIntroducida=document.getElementById("imagenURL").value

                const plant = {
                    "nombre": nameIntroducido,
                    "descripcion": descripIntroducida,
                    "tipo": tipoIntroducido,
                    "precio": precioIntroducido,
                    "imagen": imagenIntroducida
                };

                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(plant)
                };

                enviar(options);
                limpiar();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function enviar(options) {
    fetch(`${URL_SERVER}plants/`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
}
function limpiar(e){
    document.getElementById("nombre").value=``;
    document.getElementById("description").value=``;
    document.getElementById("Type").value=``;
    document.getElementById("Price").value=``;
    document.getElementById("imagenURL").value=``;

}