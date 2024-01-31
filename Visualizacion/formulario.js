const URL_SERVER ="http://3.234.32.136:3000/";

document.addEventListener("DOMContentLoaded",()=>{
    cambiaUser(),
    cargarFlores(),
    document.getElementById("buscador").addEventListener("input",buscar);
    document.getElementById("user").addEventListener("click", cerrarSesion)
   
});
    
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        const tipo = this.innerText;
        console.log(tipo);
        fetch(`${URL_SERVER}plants/?tipo=${tipo}`)
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            document.getElementById("content").innerText=``;
            pintarFlores(data);
        })
        .catch(error => {
            console.error("Error fetching plants:", error);
            alert("No se ha podido traer las plantas");
        });
      
    });
});
function cerrarSesion(e){
    localStorage.removeItem("users")
}

function cambiaUser(e){
    const nombreUsuarioLS=JSON.parse(localStorage.getItem("users"));
    const user=document.getElementById("user");
     user.value=nombreUsuarioLS.nombre
}
function filtrar(e){
    const tipo=document.getElementById('Vines').innerText
    console.log(tipo);
}

function buscar(e){
    e.preventDefault();
    const input=document.getElementById("buscador");
    console.log(input.value);
    if (input.value === "") {
        cargarFlores();
        return;
    }
    fetch(`${URL_SERVER}plants/?nombre=${input.value}`)
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            document.getElementById("content").innerText=``;
            pintarFlores(data);
        })
        .catch(error => {
            console.error("Error fetching plants:", error);
            alert("No se ha podido traer las plantas");
        });
}

function cargarFlores(e) {
    fetch(`${URL_SERVER}plants/`)
        .then(response => {
            console.log(response); 
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            console.log(data);
            pintarFlores(data);
        })
        .catch(error => {
            console.error("Error fetching plants:", error);
            alert("No se ha podido traer las plantas");
        });
}


function pintarFlores(flores){
    flores.map(flor => {
        const divContenido=document.getElementById("content");
        const divFlor=document.createElement("div");
        divFlor.classList.add("flores")
        const divImagen=document.createElement("div");
        divImagen.classList.add("image")
        const imagen= document.createElement("img");
        imagen.src=flor.imagen
        imagen.classList.add("imagen")
        const divTexto=document.createElement("div");
        divTexto.classList.add("text")
        const pNombre=document.createElement("p");
        pNombre.classList.add("name")
        pNombre.innerText=flor.nombre
        const pPrecio=document.createElement("p");
        pPrecio.classList.add("price")
        pPrecio.innerText=flor.precio
        const form=document.createElement("form");
        const input=document.createElement("input");
        input.type='submit'
        input.value=`PURCHASE`;
        input.classList.add("PURCHASE")
        const divBasura=document.createElement("div");
        divBasura.classList.add("basura")
        const imagenBasura=document.createElement("img")
        imagenBasura.src="https://s3.amazonaws.com/bucketactividad3.1/Basura.png"
        

        divBasura.append(imagenBasura);
        form.append(input)
        divTexto.append(pNombre,pPrecio)
        divImagen.append(imagen)
        divFlor.append(divImagen,divTexto,form,divBasura)
        divContenido.append(divFlor)
        
    });

    


}

