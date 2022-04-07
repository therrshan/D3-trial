dataObject = getDataObject()

function drawBarGraph(obj) {

    let filterValue = document.getElementById('filterValue').value
    window.filteredData = dataFilter(obj, filterValue)
    console.log(filteredData)




    PrimKeys = getPrimaryKeys(obj, arr = [])
    SecKeys = getSecondaryKeys(obj, arr = [], prim = '', PrimKeys)

    let key = PrimKeys.concat(SecKeys)

    document.getElementById("labelX").removeAttribute("hidden")
    let catVar = document.getElementById("barX")
    catVar.removeAttribute("hidden")

    document.getElementById("labelY").removeAttribute("hidden")
    let numVar = document.getElementById("barY")
    numVar.removeAttribute("hidden")

    for (x in key) {
        var option = document.createElement("option")
        option.value = key[x]
        option.text = key[x]
        catVar.appendChild(option)
    }

    for (x in key) {
        var option = document.createElement("option")
        option.value = key[x]
        option.text = key[x]
        numVar.appendChild(option)
    }

    let formwidth = document.getElementById("widthForm").removeAttribute("hidden")
    document.getElementById("labelO").removeAttribute("hidden")
    let orient = document.getElementById("orient")
        orient.removeAttribute("hidden")

    let buttonG = document.getElementById("graph")

    buttonG.removeAttribute("hidden")

    buttonG.addEventListener("click", function () {

        
        let orient = document.getElementById("orient")

        if(orient.value == "horizontal"){
            horizontalGraph()
        }
        else if (orient.value == "vertical"){
            verticalGraph()
        }

    })







    console.log(PrimKeys)
    console.log(SecKeys)


}

function verticalGraph() {

    dataObject = getDataObject()
    console.log(dataObject)

    keys = getkeys()
    catKey = keys[0]
    numKey = keys[1]

    let filter = document.querySelector('#filterSubmit')
    let flag = filter.getAttribute("hidden");
    console.log(flag)

    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 500 * scaleFactor - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .range([0, width])
        .domain(dataObject.map(function (d) { return d[catKey]; }))
        .padding(0.2);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    var svg = d3.select("#my_dataviz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    if (flag != "hidden") {
        svg
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
            .attr("id", "gid")


    }
    else {
        document.getElementById("gid").removeChild(document.getElementById("xid"))
    }


    svg.select("g").append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("id", "xid")
        .call(d3.axisBottom(x))

    svg.select("g").append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(y));





    update(dataObject, svg, x, y, height)

    filter.setAttribute("hidden", "hidden")
    let updateF = document.querySelector('#updateFilter').removeAttribute("hidden")



}

function update(data, svg, x, y, height) {


    var u = svg.select("g").selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function (d) { return x(d[catKey]); })
        .attr("y", function (d) { return y(d[numKey]); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d[numKey]); })
        .attr("fill", "#69b3a2")

    svg.exit().remove()


}

function horizontalGraph() {
    dataObject = getDataObject()
    console.log(dataObject)

    keys = getkeys()
    catKey = keys[0]
    numKey = keys[1]

    let filter = document.querySelector('#filterSubmit')
    let flag = filter.getAttribute("hidden");
    console.log(flag)

    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 500 * scaleFactor - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .range([0, height])
        .domain(dataObject.map(function (d) { return d[catKey]; }))
        .padding(0.2);

    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    var svg = d3.select("#my_dataviz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    if (flag != "hidden") {
        svg
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
            .attr("id", "gid")


    }
    else {
        document.getElementById("gid").removeChild(document.getElementById("xid"))
    }


    svg.select("g").append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("id", "xid")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    svg.select("g").append("g")
        .call(d3.axisLeft(y));





    updateH(dataObject, svg, x, y, height)

    filter.setAttribute("hidden", "hidden")
    let updateF = document.querySelector('#updateFilter').removeAttribute("hidden")

}

function updateH(data, svg, x, y, height) {


    var u = svg.select("g").selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", x(0))
        .attr("y", function (d) { return y(d[catKey]); })
        .attr("width", function (d) { return x(d[numKey]); })
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")

    svg.exit().remove()


}
function getcatArray() {

    let catValue = document.getElementById("barX").value

    let x = 0
    let i = 2
    catArr = []
    catData = []

    if (catValue.includes(".")) {
        catArr = catValue.split(".")
    }
    else {
        catArr.push(catValue)
    }


    if (catArr.length > 1) {
        while (x < filteredData[catArr[0]].length) {
            catData.push(filteredData[catArr[0]][x][catArr[1]])
            x++;
        }
    }

    let result = []

    for (x in catData) {
        if (result.includes(catData[x])) {
            result.push(catData[x] + "#" + i)
            i++;
        }
        else {
            result.push(catData[x])
        }
    }

    return result
}

function getnumArray() {

    let numValue = document.getElementById("barY").value

    let i = 0
    numArr = []
    numData = []

    if (numValue.includes(".")) {
        numArr = numValue.split(".")
    }
    else {
        numArr.push(numValue)
    }

    if (numArr.length > 1) {
        while (i < filteredData[numArr[0]].length) {
            numData.push(filteredData[numArr[0]][i][numArr[1]])
            i++;
        }
    }

    return numData
}

function getDataObject() {

    let catValue = document.getElementById("barX").value
    let numValue = document.getElementById("barY").value

    catArr = []
    numArr = []

    if (catValue.includes(".")) {
        catArr = catValue.split(".")
    }
    else {
        catArr.push(catValue)
    }

    if (numValue.includes(".")) {
        numArr = numValue.split(".")
    }
    else {
        numArr.push(numValue)
    }


    catData = getcatArray()
    numData = getnumArray()

    let dataObject = []
    var dataDict = {}
    let i = 1

    for (val in catData) {
        dataDict[catArr[1]] = catData[val]
        dataDict[numArr[1]] = numData[val]
        dataObject.push(dataDict)
        dataDict = {}
    }
    return dataObject

}

function getkeys() {
    let catValue = document.getElementById("barX").value
    let numValue = document.getElementById("barY").value

    catArr = []
    numArr = []

    if (catValue.includes(".")) {
        catArr = catValue.split(".")
    }
    else {
        catArr.push(catValue)
    }

    if (numValue.includes(".")) {
        numArr = numValue.split(".")
    }
    else {
        numArr.push(numValue)
    }

    result = [catArr[1], numArr[1]]

    return result

}

function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    var scaleFactor = 1;
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;

    window.scaleFactor = scaleFactor + value / 10
    return scaleFactor

}

function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    var scaleFactor = 1;
    value = isNaN(value) ? 0 : value;

    value--;
    document.getElementById('number').value = value;

    window.scaleFactor = scaleFactor + value / 10
    return scaleFactor

}