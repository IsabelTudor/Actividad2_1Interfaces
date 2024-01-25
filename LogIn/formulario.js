const URL_SERVER ="http://3.234.32.136:3000/";

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("Email").addEventListener("blur", validarEmail),
    document.getElementById("Password").addEventListener("blur",validarPassword)
    document.getElementById('formulario').addEventListener("submit",comprobar)
})

function validarEmail(e){
    const pattern=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    const email=document.getElementById("Email");
    const mensajeError=document.getElementById("SpanError");
    if(!pattern.test(email.value)){
        mensajeError.innerText=`El valor introducido no tiene el formato de un correo`;
        email.classList.add("invalido");
        return false;
    }else{
        mensajeError.innerText=``;
        email.classList.remove("invalido");
        return true;
    }
}
function validarPassword(e){
    const pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const password=document.getElementById("Password");
    const mensajeError=document.getElementById("SpanError");
    if(!pattern.test(password.value)){
        password.classList.add("invalido");
        mensajeError.innerText=`Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un dígito.`
        return false
    }else{
        password.classList.remove("invalido");
        mensajeError.innerText=``;
        return true;
    }
}
function comprobar(e){
    e.preventDefault()
    if(!validarEmail(e)){
        document.getElementById("SpanError").innerText=`No se ha podido comprobar el email, reviselo`;
        document.getElementById("Email").focus();
    }else if(!validarPassword(e)){
        document.getElementById("SpanError").innerText=`No se ha podido comprobar la contraseña, revisela`;
        document.getElementById("Password").focus();
    }else{
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
   
}


