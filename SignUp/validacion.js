document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('nombre').addEventListener('blur', validarNombre)

})


function validarNombre(e){
    let inputNombre=document.getElementById('nombre');
    let spanError=document.getElementById('errorNombre');
    if(inputNombre.value.length<3){
        spanError.innerText="El nombre debe tener al menos 3 caracteres.";
        inputNombre.classList.add('invalido');
        return false
    }else{
        inputNombre.value= inputNombre.value.charAt(0).toUpperCase()+ inputNombre.value.substring(1).toLowerCase();
        spanError.innerText="";
        inputNombre.classList.remove('invalido');
        return true
    }

}