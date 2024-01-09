const URL_SERVER ="http://3.234.32.136:3000/";
document.getElementById("formulario").addEventListener("submit",signup);

function signup(e){

    const nombreIntroducido=document.getElementById('nombre').value;
    const apellidosIntroducido=document.getElementById('apellidos').value;
    const telefonoIntroducido=document.getElementById('telefono').value;
    const emailIntroducido=document.getElementById('email').value;
    const passwordIntroducido=document.getElementById('password').value;

    const user={
        "nombre":nombreIntroducido,
        "apellidos":apellidosIntroducido,
        "telefono":telefonoIntroducido,
        "email":emailIntroducido,
        "password":passwordIntroducido
    }
    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };
    fetch(`${URL_SERVER}users/`,options)
    .then((response)=>{

        if(response.ok){
            return response.json();
        }else throw new Error(response.status);
    }, error=>{
        console.log(error);
        throw new Error ("Error en la red");
    })
    .then(data=>{
        console.log(data);
    })
    .catch((error)=>{
        document.querySelector("main").innerHTML="Error al añadir el usuario"
    })
}