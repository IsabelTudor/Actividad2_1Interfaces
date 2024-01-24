const URL_SERVER ="http://3.234.32.136:3000/";

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("nombre").addEventListener("blur", validarNombre);
    document.getElementById("apellidos").addEventListener("blur", validarApellido);
    document.getElementById("telefono").addEventListener("blur", validarTelefono);
    document.getElementById("email").addEventListener("blur",validarEmail);
    document.getElementById("password").addEventListener("blur", validarPassword);
    document.getElementById('formulario').addEventListener("submit", signup);
})

function validarNombre(e){
    const nombre=document.getElementById("nombre");
    const mensajeError=document.getElementById("errorNombre");
    if(nombre.value.length<2){
        nombre.classList.add("invalido");
        mensajeError.innerText=`Debe tener más de dos caracteres`
        return false;
    }else{
        nombre.classList.remove("invalido");
        mensajeError.innerText=``;
        nombre.value=nombre.value.charAt(0).toUpperCase()+nombre.value.substring(1,nombre.value.length).toLowerCase();
        return true;
    }
}
function validarApellido(e){
    const apellido=document.getElementById("apellidos");
    const mensajeError=document.getElementById("errorApellido");
    if(apellido.value.length<3){
        apellido.classList.add("invalido");
        mensajeError.innerText="El apellido no es valido debe de tener mas de tres caracteres"
        return false;
    }
    const apellidos=apellido.value.split(" ");
    const apellidosModificado= apellidos.map(element=>{
        return element.charAt(0).toUpperCase()+element.substring(1).toLowerCase();
    })
    document.getElementById("flname").value=apellidosModificado.join(" ");
    apellido.classList.remove("invalido");
    mensajeError.innerText="";
    return true;
}
function validarTelefono(e){
    const pattern=/[0-9]{9}/;
    const telefono=document.getElementById("telefono");
    const mensajeError=document.getElementById("errorTelefono");
    if(!pattern.test(telefono.value)){
        telefono.classList.add("invalido");
        mensajeError.innerText=`El telefono solo puede tener 9 caracteres y solo números`
        return false
    }else{
        telefono.classList.remove("invalido");
        mensajeError.innerText=``;
        return true
    }
}

function validarEmail(e){
    const pattern=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    const email=document.getElementById("email");
    const mensajeError=document.getElementById("errorEmail");
    if(!pattern.test(email.value)){
        email.classList.add("invalido");
        mensajeError.innerText=`El formato del email no es correcto`;
        return false;
    }else{
        email.classList.remove("invalido");
        mensajeError.innerText=``;
        return true
    }
}

function validarPassword(e){
    const pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const password=document.getElementById("password");
    const mensajeError=document.getElementById("errorPassword");
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

function signup(e){
    e.preventDefault();
    if(!validarNombre(e)){
        document.getElementById("errorForm").innerText=`No se ha podido enviar el formulario, revisa el nombre`
        document.getElementById("nombre").focus();
    }
    else if(!validarApellido(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa los apellidos";
        document.getElementById("apellidos").focus();
    }
    else if(!validarTelefono(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa el telefono";
        document.getElementById('telefono').focus();
    }
    else if(!validarEmail(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa el email";
        document.getElementById('email').focus();
    }
    else if(!validarPassword(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa la contraseña";
        document.getElementById('password').focus();
    }
    else{
        document.getElementById("errorForm").innerText = "";
        const nombreIntroducido=document.getElementById('nombre').value;
        const apellidosIntroducido=document.getElementById('apellidos').value;
        const telefonoIntroducido=document.getElementById('telefono').value;
        const emailIntroducido=document.getElementById('email').value;
        const passwordIntroducido=document.getElementById('password').value;
        signup(nombreIntroducido,apellidosIntroducido,telefonoIntroducido,emailIntroducido,passwordIntroducido)
        e.target.submit();
    }
}
function signup(Nombre,Apellidos,Telefono,Email,Password){
    e.target.submit();
    const user={
        "nombre":Nombre,
        "apellidos":Apellidos,
        "telefono":Telefono,
        "email":Email,
        "password":Password
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
        console.log(error)
        document.querySelector("main").innerHTML="Error al añadir el usuario"
    })
}


