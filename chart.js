function createChart(data) {
	var margin = {top: 20, left: 70, right: 20, bottom: 150},
		h = 480,
		w = 500,
		height = h - margin.top - margin.bottom,
		width = w - margin.left - mergin.right;

	var xScale = d3.scale.linear
		.domain(d3.range(0, data.length))
        .rangeBands([0, width], .05);

    var yScale = d3.scale.linear
    	.domain([-125, 55])
    	.range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(8);

  	var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(3);

    var svg = d3.select("#wrapper")
    	.append("svg")
    		.attr('width', w)
    		.attr('height', h)
    	.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    		.attr('width', width)
    		.attr('height', height);

    var dots = d3.selectAll("circle")
    	.data(data)
    	.enter()
    	.append("circle")
    		.attr('r', 5)
    		.attr('cx', function(d, i) { return xScale(i); })
    		.attr('cy', function(d) { return yScale(d.temperature); });

    svg.append("g")
    	.attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + (h - margin.bottom) + ')')
        .call(xAxis);

    svg.append("g")
    	.attr('class', 'y axis')
        .call(yAxis);
}
