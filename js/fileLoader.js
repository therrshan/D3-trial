document.getElementById('import').onclick = function () {
    var files = document.getElementById('selectFiles').files
    console.log(files)
    if (files.length <= 0) {
        return false;
    }
    document.getElementById("result").removeAttribute("hidden")
    document.getElementById("labelF").removeAttribute("hidden")
    document.getElementById("barF").removeAttribute("hidden")
    document.getElementById("filterValue").removeAttribute("hidden")
    document.getElementById("filterSubmit").removeAttribute("hidden")

    var fr = new FileReader();

    fr.onload = function (e) {
        var result = JSON.parse(e.target.result)
        var formatted = JSON.stringify(result, null, 2)
        document.getElementById('result').value = formatted

        
        let updateF = document.querySelector('#updateFilter')
        updateF.addEventListener("click", function(){
            drawBarGraph(result)
        })

        let filter = document.querySelector('#filterSubmit')
        filter.addEventListener("click", function () {

            Primarykeys = getPrimaryKeys(result, keyArr = [])
            SecondaryKeys = getSecondaryKeys(result, keyArr = [], primKey = "", Primarykeys)
            drawBarGraph(result)
            
        })
    }



    fr.readAsText(files.item(0));

};

function getPrimaryKeys(obj, keyArr = []) {
    for (keys in obj[0]) {
        if (typeof obj[0][keys] != "object") {
            keyArr.push(keys);
        }

    }

    return keyArr;
}

function getSecondaryKeys(obj, keyArr = [], primKey, primkeyArr) {
    for (keys in obj[0]) {
        if (typeof obj[0][keys] == "object") {
            getSecondaryKeys(obj[0][keys], keyArr, keys, primkeyArr)
        }
        else {
            if (!primkeyArr.includes(keys)) {
                keyArr.push(primKey + "." + keys)
            }

        }
    }

    return keyArr;
}

function dataFilter(obj, filter) {

    Primarykeys = getPrimaryKeys(obj, keyArr = [])
    SecondaryKeys = getSecondaryKeys(obj, keyArr = [], primKey = "", Primarykeys)

    keys = Primarykeys.concat(SecondaryKeys)

    filteredData = {}

    let x = 0

    let select = document.getElementById("barF")
    var value = select.options[select.selectedIndex].value

    let nameF = document.getElementById("nameF").value
    let idf = document.getElementById("idF").value

    if (value == idF ){
        filter = parseInt(filter)
    }

    while (x < obj.length) {
        for (y in Primarykeys) {
            if (obj[x][Primarykeys[y]] == filter) {
                filteredData = obj[x]
            }
        }
        x++;
    }
    return filteredData;

}