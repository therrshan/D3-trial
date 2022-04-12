function stackedBar(obj) {
    res = flattenJSON(obj)
    console.log(res)
    data = getStackedData(res, obj)
    var subgroups = ["exam", "quiz", "homework", "homework#2"]

    // var initStackedBarChart = {
    //     draw: function(config) {
    //         me = this,
    //         domEle = config.element,
    //         stackKey = config.key,
    //         data = config.data,
    //         margin = {top: 20, right: 20, bottom: 30, left: 50},
    //         width = 2000 - margin.left - margin.right,
    //         height = 500 - margin.top - margin.bottom,
    //         xScale = d3.scaleBand().range([0, width]).padding(0.1),
    //         yScale = d3.scaleLinear().range([400, 0]),
    //         color = d3.scaleOrdinal(d3.schemeCategory20),
    //         xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")),
    //         yAxis =  d3.axisLeft(yScale),
    //         svg = d3.select("#"+domEle).append("svg")
    //                 .attr("width", width + margin.left + margin.right)
    //                 .attr("height", height + margin.top + margin.bottom)
    //                 .append("g")
    //                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //         var stack = d3.stack()
    //             .keys(stackKey)
    //             .order(d3.stackOrderNone)
    //             .offset(d3.stackOffsetNone);

    //         var layers= stack(data);
    //             xScale.domain(data.map(function(d) { return d.name; }));
    //             yScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();

    //         var layer = svg.selectAll(".layer")
    //             .data(layers)
    //             .enter().append("g")
    //             .attr("class", "layer")
    //             .style("fill", function(d, i) { return color(i); });

    //           layer.selectAll("rect")
    //               .data(function(d) { return d; })
    //             .enter().append("rect")
    //               .attr("x", function(d) { return xScale(d.data.name); })
    //               .attr("y", function(d) { return yScale(d[1]); })
    //               .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
    //               .attr("width", xScale.bandwidth());

    //             svg.append("g")
    //             .attr("class", "axis axis--x")
    //             .attr("transform", "translate(0," + (height+5) + ")")
    //             .call(xAxis);

    //             svg.append("g")
    //             .attr("class", "axis axis--y")
    //             .attr("transform", "translate(0,0)")
    //             .call(yAxis);							
    //     }
    // }

    // initStackedBarChart.draw({
    //     data: data,
    //     key: key,
    //     element: 'my_dataviz'
    // });

    var margin = { top: 10, right: 30, bottom: 20, left: 50 },
        width = 1000 * scaleFactor - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        if(document.getElementById("sbid")){
            document.getElementById("sbid").remove()
        }

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("id","sbid")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    var groups = d3.map(data, function (d) { return (d.id) }).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 400])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#C7EFCF', '#FE5F55', '#EEF5DB', '#EFE5DB'])

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (data)




    // ----------------
    // Create a tooltip
    // ----------------
    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
        var subgroupName = d3.select(this.parentNode).datum().key;
        var subgroupValue = d.data[subgroupName];
        tooltip
            .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        tooltip
            .style("left", (d3.mouse(this)[0] + 90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
    }




    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function (d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data.id); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .attr("stroke", "grey")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


}


const flattenJSON = (obj = {}, res = {}, extraKey = '') => {
    for (key in obj) {
        if (typeof obj[key] !== 'object') {
            res[extraKey + key] = obj[key];
        } else {
            flattenJSON(obj[key], res, `${extraKey}${key}.`);
        };
    };
    return res;
}


function getStackedData(res, obj) {
    let dataObj = []
    let tmpDict = {}

    let x = 0
    let i = 0

    while (x < obj.length) {
        tmpDict["id"] = obj[x]["_id"]
        tmpDict[obj[x]["scores"][0]["type"]] = obj[x]["scores"][0]["score"]
        tmpDict[obj[x]["scores"][1]["type"]] = obj[x]["scores"][1]["score"]
        tmpDict[obj[x]["scores"][2]["type"]] = obj[x]["scores"][2]["score"]
        tmpDict["homework#2"] = obj[x]["scores"][3]["score"]

        dataObj.push(tmpDict)
        tmpDict = {}
        x++
    }

    return dataObj
}