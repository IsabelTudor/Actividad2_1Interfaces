const URL_SERVER ="http://3.234.32.136:3000/";
document.addEventListener("DOMContentLoaded",inicioSesion);

function inicioSesion(){
    fetch(URL_SERVER+"users/")
    .then(response=>{
        if(response.ok){
            return response.json();
        }else throw new Error(response.status);
    },
    error=>{
        console.log(error);;
        throw new Error("Error en la red");
    })
    .then(data=>{
        console.log(data);
        comprobarSesion(data)
    })
    .catch(error => {
        if (error instanceof TypeError) {
            alert("Error de conexión con el servidor. Revisa la conexión.");
        } else {
            alert("Error en el servidor: " + error.message);
        }
    });
    
}

function comprobarSesion(users) {
    const emailIntroducido = document.getElementById('Email').value;
    const passwordIntroducido = document.getElementById('Password').value;

    const user = users.find(user => user.Email === emailIntroducido);

    if (user && user.Password === passwordIntroducido) {
        const userData = {
            email: user.Email,
            password: user.Password
        };
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        document.getElementById('spanError').innerHTML += "No se ha encontrado ningún usuario. Cree su usuario ahora.";
    }
}


