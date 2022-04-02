let form = document.querySelector('#upload');
let file = document.querySelector('#file');
let filter = document.querySelector('#filterSubmit');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {

    event.preventDefault();
    if (!file.value.length) return;
    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsText(file.files[0]);
    document.getElementById("result").removeAttribute("hidden")
    document.getElementById("labelF").removeAttribute("hidden")
    document.getElementById("barF").removeAttribute("hidden")
    document.getElementById("filterValue").removeAttribute("hidden")
    document.getElementById("filterSubmit").removeAttribute("hidden")

}

function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);

    console.log(json)
    const flattenJSON = (obj = {}, res = {}, extraKey = '') => {
        for(key in obj){
           if(typeof obj[key] !== 'object'){
              res[extraKey + key] = obj[key];
           }else{
              flattenJSON(obj[key], res, `${extraKey}${key}.`);
           };
        };
        return res;
     };


     res = flattenJSON(json);

     getPrimaryKeys(res);
     getNestedKeys(res);

     document.getElementById("result").value = res;

     console.log(res);

    // let vert = document.querySelector('#ver').value;
    // let hori = document.querySelector('#hor').value;
    // let bar = document.querySelector('#bar').value;
    // let catVar = document.getElementById('xVar').value;
    // let numVar = document.getElementById('yVar').value;
    let hsvg = document.getElementById('svgH')
    let vsvg = document.getElementById('svgV')
    let filterValue = document.getElementById('filterValue').value
    
    filter.addEventListener("click", function(){
        filteredData = filterData(res,filterValue);
    })




    // if (bar == vert){
    //     hsvg.setAttribute("visibility", "hidden")
    //     vsvg.setAttribute("visibility", "visible")
    //     verticalGraph(json, numVar, catVar );
        
    // }
    // if (bar == hori){
    //     hsvg.setAttribute("visibility", "visible")
    //     vsvg.setAttribute("visibility", "hidden")
    //     horizontalGraph(json, numVar, catVar );
    // }
}

function getPrimaryKeys(obj){
    PrimaryKeys = []
    for(key in obj){
        let tmparr = key.split(".");
        if(!PrimaryKeys.includes(tmparr[1])){
            PrimaryKeys.push(tmparr[1]);
        }
    }
    console.log(PrimaryKeys)
}

function getNestedKeys(obj){
    NestedKeys = []
    for(key in obj){
        let tmparr = key.split(".");
        if(tmparr.length > 2){
            if(!NestedKeys.includes(tmparr[3])){
                NestedKeys.push(tmparr[3])
            }    
        }
    }
    console.log(NestedKeys)
}

function filterData(obj, filter){

    let nameFilter = document.querySelector('#name').value;
    let idFilter = document.querySelector('#id').value;
    let barFilter = document.querySelector('#barF').value;

    res = []

    if(barFilter == idFilter){
        for(key in obj){
            let tmparr = key.split(".");
            if(parseInt(obj[key]) == parseInt(filter)){
                tmp = tmparr[0];
            }
            if(tmp = tmparr[0]){
                res.push(obj[key])
            }




            // if(tmparr[0] == parseInt(filter)){
            //     res.push(obj[key]);
            // }
        }
        console.log(res)
        return res;
    }

    else if(barFilter == nameFilter){
        for(key in obj){
            let tmparr = key.split(".")
            if(obj[key] == filter){
                tmp = tmparr[0];
            }
            if(tmp == tmparr[0]){
                res.push(obj[key]);
            }
        }
        console.log(res)
        return res;
    }

}



