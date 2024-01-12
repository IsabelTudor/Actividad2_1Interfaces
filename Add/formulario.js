const URL_SERVER ="http://3.234.32.136:3000/";

document.getElementById('insert').addEventListener("submit", insertar);

function insertar(e){
    const nameIntroducido=document.getElementById("nombre").value;
    const descripIntroducida=document.getElementById("description").value;
    const tipoIntroducido=document.getElementById("Type").value;
    const precioIntroducido=document.getElementById("Price").value;
    const plant={
        "nombre":nameIntroducido,
        "descripcion":descripIntroducida,
        "tipo":tipoIntroducido,
        "precio":precioIntroducido,
        "imagen":"dfgdgdgd"
    }
    const options={
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(plant)
    }
    fetch(`${URL_SERVER}plants/?nombre=${nameIntroducido}`)
    .then(response=>{
        if(response.ok){
            return response.json();
        }else throw new Error (response.status)
    }, error=>{
        console.log(error);
        throw new Error("Error en la red")
    })
    .then(data=>{
        if(data.length==0){
            console.log(data);
        }
    })
    .catch(error=>{
        console.log(error);
        
    })

 }   
    function enviar(e){
        e.preventDefault();
        fetch(`${URL_SERVER}plants/`, options)
        .then((response)=>{
            if(response.ok){
                return response.json();
            }else throw new Error (response.status)
        },error=>{
            console.log(error);
            throw new Error ("Error en la red")
        })
        .then(data=>{
            console.log(data);
        })
        .catch(error=>{
            console.log(error);
        }) 
    }

//aqui esta el error , solucionalo