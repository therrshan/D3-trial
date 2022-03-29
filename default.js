function barGraph(obj) {

    console.log(obj)

    let xValue = "name";
    let yValue = "score";

    const svg = d3.select('svg');
    const svgContainer = d3.select('#container');
    
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(obj.map((s) => s[xValue]))
        .padding(0.4)


    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);

    const makeYLines = () => d3.axisLeft()
        .scale(yScale)

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));


    chart.append('g')
        .call(d3.axisLeft(yScale));


    chart.append('g')
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )

    const barGroups = chart.selectAll()
        .data(obj)
        .enter()
        .append('g')

    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g[xValue]))
        .attr('y', (g) => yScale(g[yValue]))
        .attr('height', (g) => height - yScale(g[yValue]))
        .attr('width', xScale.bandwidth())


} 