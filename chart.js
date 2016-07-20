function createChart(data) {
	d3.select("#wrapper").html('');

    var margin = {top: 20, left: 70, right: 20, bottom: 150},
        h = 480,
        w = 500,
        height = h - margin.top - margin.bottom,
        width = w - margin.left - margin.right;

    var xScale = d3.scale.linear()
        .domain([0, data.length-1])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain(d3.extent(data, function(d) { return d.temperature; }))
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function(d, i) { return data[i].year; })
        .orient("bottom")
        .ticks(data.length);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var line = d3.svg.line()
        .x(function(d, i) { return xScale(i); })
        .y(function(d) { return yScale(d.temperature); });

    var svg = d3.select("#wrapper")
        .append("svg")
            .attr('width', w)
            .attr('height', h)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr('width', width)
            .attr('height', height);

    // var dots = svg.selectAll("circle")
    //  .data(data)
    //  .enter()
    //  .append("circle")
    //      .attr('r', 5)
    //      .attr('cx', function(d, i) { return xScale(i); })
    //      .attr('cy', function(d) { return yScale(d.temperature); });

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    svg.append("g")
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (h - margin.bottom) + ')')
        .call(xAxis);

    svg.append("g")
        .attr('class', 'y axis')
        .attr('transform', 'translate(0,' + margin.top + ')')
        .call(yAxis);
}
