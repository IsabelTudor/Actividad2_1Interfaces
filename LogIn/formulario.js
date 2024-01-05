const URL_SERVER ="http://3.234.32.136:3000/";
document.addEventListener("DOMContentLoaded",inicioSesion,{once:true});

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
        comprobarSesion(data.Email,data.Password)
    })
    .catch(error=>{
        alert("Error de conexion con el servidor, revisa la conexión:"+error);
    })
}


function comprobarSesion(Email, Password){
    const emailIntroducido=document.getElementById('Email').value;
    const passwordIntroducido=document.getElementById('Password').value;

    if(emailIntroducido===Email && passwordIntroducido===Password){
        const user={
            email:emailIntroducido,
            password:passwordIntroducido
        }
        localStorage.setItem('user',JSON.stringify(user));
        window.location.href="../Visualizacion/index.html";
    }else{
        document.getElementById('spanError').innerHTML+="No se ha encontrado ningun usuario, cree su usuario ahora"
    }
}
