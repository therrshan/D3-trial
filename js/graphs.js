function drawGraph(obj, filterValue, SecondaryKeys) {

    tmp = dataFilter(obj, filterValue)
    const secKeys = []

    for(g in SecondaryKeys){
        let z = SecondaryKeys[g].split(".")
        secKeys.push(z[1])
    }

    //console.log(secKeys)

    dataObject = []
    let x = 0

    
    for (keys in tmp){
        if (typeof tmp[keys] == "object"){
            while(x<4){
                dataObject.push(tmp[keys][x])
                x++;
            }
        }
    }

    //console.log(dataObject)

    

    const svg = d3.select('#my_dataviz');

    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(obj.map((s) => s["type"]))
        .padding(0.4)


    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);

    const makeYLines = () => d3.axisLeft()
        .scale(score)

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));


    chart.append('g')
        .call(d3.axisLeft(yScale));

    const barGroups = chart.selectAll()
        .data(dataObject)
        .enter()
        .append('g')

    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g["type"]))
        .attr('y', (g) => yScale(g["score"]))
        .attr('height', (g) => height - yScale(g["score"]))
        .attr('width', xScale.bandwidth())

}