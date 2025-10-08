const populateFilters = (data) => {
    // Get the filter container element
    const filterContainer = document.getElementById('filterContainer');

    // Clear any existing filters
    filterContainer.innerHTML = '';

    // Extract unique filter values from the data
    const uniqueFilters = [...new Set(data.map(item => item.category))]; // Assuming 'category' is a key in your data

    // Create a dropdown filter
    const select = document.createElement('select');
    select.id = 'filterDropdown';
    select.className = 'filter-dropdown';

    // Add a default "All" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All';
    select.appendChild(defaultOption);

    // Add options for each unique filter value
    uniqueFilters.forEach(filterValue => {
        const option = document.createElement('option');
        option.value = filterValue;
        option.textContent = filterValue;
        select.appendChild(option);
    });

    // Append the dropdown to the filter container
    filterContainer.appendChild(select);

    // Add an event listener to handle filter changes
    select.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        console.log(`Selected filter: ${selectedValue}`);
        // Add logic to filter data based on the selected value
    });
};







