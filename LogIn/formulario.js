const URL_SERVER ="http://3.234.32.136:3000/";


function comprobarEmail(e){
    e.preventDefault()
    const emailBuscado=document.getElementById('Email').value;
    fetch(`${URL_SERVER}users/?email=${emailBuscado}`)
    .then(response=>{
        if(response.ok){
            return response.json();
        }else throw new Error (response.status)
    }, error=>{
        console.log(error);
        throw new Error("Error en la red")
    })
    .then (data=>{
        console.log(data);
    })
    .catch(error=>{
        document.querySelector('main').innerHTML=`Error de conexion con el servidor.`
    })
}
document.getElementById('Email').addEventListener("blur", comprobarEmail);