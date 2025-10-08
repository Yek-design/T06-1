const drawHistogram = (data) => {
    // Get the canvas element and its context
    const canvas = document.getElementById('histogramCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define dimensions and styling
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const barWidth = canvasWidth / data.length;
    const maxDataValue = Math.max(...data);
    const scaleFactor = canvasHeight / maxDataValue;

    // Draw the bars
    data.forEach((value, index) => {
        const barHeight = value * scaleFactor;
        const x = index * barWidth;
        const y = canvasHeight - barHeight;

        // Draw a rectangle for each bar
        ctx.fillStyle = 'blue'; // Bar color
        ctx.fillRect(x, y, barWidth - 2, barHeight); // Add spacing between bars
    });

    // Optionally, add labels or axes
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    data.forEach((value, index) => {
        const x = index * barWidth + barWidth / 4;
        const y = canvasHeight - 5;
        ctx.fillText(value, x, y); // Display data value below each bar
    });
};


// Set the dimensions and margins of the chart area
const svg = d3.select("#histogram")	
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`) // Responsive SVG

// Create an inner chart group with margins
const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


// Generate the bins
const bins = binGenerator(data); //save the bins into an array

console.log(bins); // Log the bins to the console for debugging


const minEng = bins[0].x0; // lower bound of the first bin
const maxEng = bins[bins.length - 1].x1; // upper bound of the last bin
const binsMaxLength = d3.max(bins, d => d.length); // Get the maximum length of the bins

// Define scales (from shared constants)
xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice(); // Use the nice() method to round the y-axis values


// Draw the bars of the histogram
innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor) //Set the stroke color gives appearance of gap
        .attr("stroke-width", 2);


// Add axes
const bottomAxis = d3.axisBottom(xScale);

// Add the x-axis to the bottom of the chart relative to the inner chart
innerChart
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(bottomAxis);

// Add the x-axis label
svg
    .append("text")
    .text("Labeled Energy Consumption (kWh/year)")
    .attr("text-anchor", "end")
    .attr("x", width -20)
    .attr("y", height -5)
    .attr("class", "axis-label"); // Set the color of the label in visualisation.css


const leftAxis = d3.axisLeft(yScale);

// Add the y-axis to the bottom of the chart relative to the inner chart
innerChart
    .append("g")
    .call(leftAxis);

svg
    .append("text")
    .text("Frequency")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");








