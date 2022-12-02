// This function creates the table on the landing page
function lp_table() {
    
    // Set the maximum width of the bar chart in the table
    let bar_width = 100;    

    // Ensure that there are no blank lines
    if (table_data[0].Abreviation != undefined) {
        // Create a dataset with just the table information
        table_data = table_data.map(item => ({
            state: item.State,
            peak: item.Peak,
            elevation: item.Elevation,
            elevation_bar: item.Elevation
        }));
    }

    // Create a scale for elevation bar data
    let elevScale = d3.scaleLinear()
        .domain([d3.min(table_data.map(d => d.elevation)) - 100, d3.max(table_data.map(d => d.elevation))])
        .range([0, bar_width]);
    
     // Add Rows
    let rowSelection = d3.select('#predictionTableBody')
        .selectAll('tr')
        .data(table_data)
        .join('tr')
        .attr('id',d => d.state.replace(' ','_') + '_tr');

    // Add Cells
    rowSelection.selectAll("td")
        .data(d => Object.entries(d))
        .join('td');
    
    // Add the state to table
    rowSelection.each(function(d){
        d3.select(this)
        .select('td')
        .text(d.state); 
    });
    
    // Add the peak to table
    rowSelection.each(function(d){
        d3.select(this)
        .select('td:nth-child(2)')
        .text(d.peak);
    });    
    
    // Add the elevation to table
    rowSelection.each(function(d){
        d3.select(this)
        .select('td:nth-child(3)')
        .text(d.elevation);
    }); 
    
    // Add in frequency rectangle
    rowSelection.each(function (d, i) {

        //Select the data to bind
        let dataBinding = d3.select(this)
            .select('td:nth-child(4)').data();
    
        d3.select(this)
            .select('td:nth-child(4)')
            .selectAll('svg')
            .data(dataBinding)
            .join('svg')
            .attr('width', bar_width)
            .attr('height', 16)
            .selectAll('rect')
            .data(dataBinding)
            .join('rect')
            //.attr('transform', `translate(5, 0)`)
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', d => elevScale(d.elevation))
            .attr('height',16)
            .attr('class', 'bar_color');

    });

    // d3.selectAll("tr")
    // .on('mouseover', highlight_states);

    d3.selectAll("tr")
        .on('click', update_landing_page_info);

    d3.selectAll('tr')
        .attr('class', 'table_unselected');
    
    
} // end of lp_table()






// This function allows you to sort the table based on a click of the header
function sort_data(){

        d3.selectAll('th')
            .on("click", function(){

                let n;
                let header = this.innerText.trim();
            
                if (header == "State") {n = 0;}
                else if (header =='Peak') {n = 1;}
                else if (header == 'Elevation') {n = 2;}
                else {n = 3;};
            
                // Change the class of all the headers to sortable and don't display the sort icon in any header
                d3.selectAll('th').attr('class','sortable').selectAll('i').attr('class','no display');
                headerData.map(d => d.sorted = false);
            
                // Change the class of the clicked on item to sorting so that it will style correctly
                d3.select(this).attr('class','sorting sortable');
            
  

                        // if the data is ascending sort it as ascending. Change the icon to sort up
                        if (headerData[n].ascending === true){
                            if (header === 'State') {table_data = table_data.sort((a, b) => a.state.localeCompare(b.state));}
                            else if (header === 'Peak') {table_data = table_data.sort((a, b) => a.peak.localeCompare(b.peak));}
                            else if (header === 'Elevation') {table_data = table_data.sort((a, b) => a.elevation - b.elevation);}
                            else {table_data = table_data.sort((a, b) => a.elevation - b.elevation);}
          
                            d3.select(this).select('i').attr('class','fa fa-sort-up white-color');
                            headerData[n].ascending = false;
                            headerData[n].sorted = true;
                        }
                        
                        else{
                            if (header === 'State') {table_data = table_data.sort((a, b) => b.state.localeCompare(a.state));}
                            else if (header.slice(0, 9) =='Peak') {table_data = table_data.sort((a, b) => b.peak.localeCompare(a.peak));}
                            else if (header.slice(0, 11) == 'Elevation') {table_data = table_data.sort((a, b) => b.elevation - a.elevation);}
                            else {table_data = table_data.sort((a, b) => b.elevation - a.elevation);}
                  
                            d3.select(this).select('i').attr('class','fa fa-sort-down white-color');
                            headerData[n].ascending = true;
                            headerData[n].sorted = true;
                        }    
            


            lp_table();
          
        });


    
    
}// end of sort_data()    
