// Load the CSV file with a row conversion function
d3.csv("data/Ex6_TVdata.csv/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // Convert screenSize to a number(need to be string is u
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // Convert energyConsumption to a number
    star: +d.star // Convert to a number
})).then(data => {

    // Log the processed data to the console
    console.log(data);

    // Call the function after data is loaded
    drawHistogram(data);
    populateFilters(data);

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});


