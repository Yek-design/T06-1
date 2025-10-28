// histogram.js

const drawHistogram = (data) => {

    // =============================
    // Step 6.1: Set up the chart area
    // =============================
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); // Responsive SVG

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // =============================
    // Step 6.2: Generate bins
    // =============================
    const bins = binGenerator(data); // Generate bins using shared constant
    console.log(bins);

    // =============================
    // Step 6.3: Define scales
    // =============================
    const minEng = bins[0].x0;                       // Lower bound of first bin
    const maxEng = bins[bins.length - 1].x1;         // Upper bound of last bin
    const binsMaxLength = d3.max(bins, d => d.length); // Maximum bin height

    // Define scales
    xScale
        .domain([0, 1800]) // Fix X-axis range manually
        .range([0, innerWidth]);

    yScale
        .domain([0, 1300]) // Fix the y-axis range manually
        .range([innerHeight, 0]);
        
    
    // =============================
    // Step 6.4: Draw histogram bars
    // =============================
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => xScale(d.x1) - xScale(d.x0))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", barColour)
            .attr("stroke", bodyBackgroundColour) // Makes gaps between bars
            .attr("stroke-width", 2);

    // =============================
    // Step 6.5: Add bottom axis
    // =============================
    const bottomAxis = d3.axisBottom(xScale);

    innerChart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(bottomAxis);

    svg.append("text")
        .text("Labelled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    // =============================
    // Step 6.6: Add left axis
    // =============================
    const leftAxis = d3.axisLeft(yScale);

    innerChart.append("g")
        .call(leftAxis);

    svg.append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");
};








