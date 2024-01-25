const URL_SERVER ="http://3.234.32.136:3000/";

document.addEventListener("DOMContentLoaded",()=>{
  
    document.getElementById('formulario').addEventListener("submit",comprobar)
})


function comprobar(e){
    e.preventDefault()

        const emailBuscado=document.getElementById('Email').value;
        const passwordIntroducido=document.getElementById('Password').value;
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
            if(data.length==0){
                document.getElementById('SpanError').innerHTML=`No se ha encontrado ningun usuario con ese email.`
            }else if (data.length==1){
                document.getElementById('SpanError').innerHTML=``;
                if(data[0].password!==passwordIntroducido){
                    document.getElementById('SpanError').innerHTML=`Contraseña incorrecta`;
                    document.getElementById('formulario').removeEventListener("submit",comprobar)
                }else{
                    localStorage.setItem("users", JSON.stringify(data[0]))
                    document.getElementById('Email').value=``;
                    document.getElementById('Password').value=``;
                }
            }
        })
        .catch(error=>{
            console.log(error);
            document.getElementById('SpanError').innerHTML=`Error de conexion con el servidor.`
        })
    }
   



