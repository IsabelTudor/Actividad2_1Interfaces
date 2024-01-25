const URL_SERVER ="http://3.234.32.136:3000/";

document.addEventListener("DOMContentLoaded",()=>{
    cambiaUser(),
    document.getElementById("")
})

function cambiaUser(e){
    const nombreUsuarioLS=JSON.parse(localStorage.getItem("users"));
    const user=document.getElementById("user");
     user.value=nombreUsuarioLS.nombre
}

