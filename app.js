let form = document.querySelector('#upload');
let file = document.querySelector('#file');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {

    event.preventDefault();
    if (!file.value.length) return;
    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsText(file.files[0]);
}

function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);

    let vert = document.querySelector('#ver').value;
    let hori = document.querySelector('#hor').value;
    let bar = document.querySelector('#bar').value;
    let catVar = document.getElementById('xVar').value;
    let numVar = document.getElementById('yVar').value;
    let hsvg = document.getElementById('svgH')
    let vsvg = document.getElementById('svgV')


    if (bar == vert){
        hsvg.setAttribute("visibility", "hidden")
        vsvg.setAttribute("visibility", "visible")
        verticalGraph(json, numVar, catVar );
        
    }
    if (bar == hori){
        hsvg.setAttribute("visibility", "visible")
        vsvg.setAttribute("visibility", "hidden")
        horizontalGraph(json, numVar, catVar );
    }
}



