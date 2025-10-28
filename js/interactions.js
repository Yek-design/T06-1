// interactions.js

const populateFilters = (data) => {

    // ============================
    // Step 7.3: Create buttons
    // ============================

    d3.select("#filters_screen")          // Select the div container
        .selectAll(".filter")             // Select all buttons (none exist yet)
        .data(filters_screen)             // Bind filter data (from shared-constants.js)
        .join("button")                   // Create one <button> per filter
            .attr("class", d => `filter ${d.isActive ? "active" : ""}`) // Add .active class if true
            .text(d => d.label)            // Button text (All, LED, etc.)
            
            // Add event listener
            .on("click", (e, d) => {

                // Only run update if this button is not already active
                if (!d.isActive) {

                    // Update filter state (only one active at a time)
                    filters_screen.forEach(filter => {
                        filter.isActive = d.id === filter.id ? true : false;
                    });

                    // Update active button styles in UI
                    d3.selectAll("#filters_screen .filter")
                        .classed("active", filter => filter.id === d.id ? true : false);

                    // Update the histogram display
                    updateHistogram(d.id, data);
                }
            });

    // ============================
    // Step 7.4: Update histogram
    // ============================

    const updateHistogram = (filterId, data) => {
        
        // Filter data depending on which button is active
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);

        // Generate new bins from filtered data
        const updateBins = binGenerator(updatedData);

        // Transition the bars smoothly
        d3.selectAll("#histogram rect")
            .data(updateBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };
};







