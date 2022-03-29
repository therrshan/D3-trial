function verticalGraph(obj, numVar, catVar) {

    console.log(obj)

    const svg = d3.select('#svgV');
    const svgContainer = d3.select('#container');

    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(obj.map((s) => s[catVar]))
        .padding(0.4)


    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);

    const makeYLines = () => d3.axisLeft()
        .scale(numVar)

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));


    chart.append('g')
        .call(d3.axisLeft(yScale));

    const barGroups = chart.selectAll()
        .data(obj)
        .enter()
        .append('g')

    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g[catVar]))
        .attr('y', (g) => yScale(g[numVar]))
        .attr('height', (g) => height - yScale(g[numVar]))
        .attr('width', xScale.bandwidth())


}


function horizontalGraph(obj, numVar, catVar) {


    const width = 800;
    const height = 400;
    const margin = { top: 50, bottom: 50, left: 90, right: 50 };

    const svg = d3.select('#svgH');
    const svgContainer = d3.select('#container');

    const chart = svg.append('g')
        .attr("width", width + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var y = d3.scaleBand()
        .range([0, height])
        .domain(obj.map((s) => s[catVar]))
        .padding(.1);

    chart.append("g")
        .attr('class', 'grid')
        .call(d3.axisLeft(y))


    var x = d3.scaleLinear()
        .domain([0, d3.max(obj, (s) => s[numVar]) + 20])
        .range([0, width]);

    chart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    const barGroups = chart.selectAll()
        .data(obj)
        .enter()
        .append('g')

    barGroups
        .append("rect")
        .attr('class', 'bar')
        .attr("x", x(0))
        .attr("y", (d) => y(d[catVar]))
        .attr("width", (d) => x(d[numVar]))
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")
}