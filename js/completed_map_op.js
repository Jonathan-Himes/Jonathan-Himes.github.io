// This function draws the completed map in the output page
function draw_completed_map() {

    // Set up the map projection
    const projection = d3.geoAlbersUsa().scale(1500).translate([650, 450])
    
    // Set the projection to the path  
    let path = d3.geoPath()
        .projection(projection);

    // Add in features to paths
    high_points = high_points.sort((a, b) => a.State.localeCompare(b.State))
    for (let i = 0; i<high_points.length; i++){

            console.log(mapData.features[i]);
            mapData.features[i].properties.visited = high_points[i].Visited;
            mapData.features[i].properties.Elevation = high_points[i].Elevation;
            mapData.features[i].properties.Peak = high_points[i].Peak;
            mapData.features[i].properties.Date = high_points[i].Date;

    };

 
    
    // Add each state to the map
    d3.select("#completed_map_op").select('#states').selectAll("path")
        .data(mapData.features)
        .join("path")
        .attr("d", path)
        .attr("id", d => d.properties.name.replace(' ',''))        
        .attr('class','state')
        .attr('stroke', 'black')
        .attr('fill', d => d.properties.visited == 0 ? '#a4a4a4' : '#177e89');

    
    // Add each highpoint to the map
    d3.select("#completed_map_op").select('#highpoints')
        .selectAll('circle')
        .data(high_points)
        .join('circle')
        .attr("cx", d => projection([d.X, d.Y])[0])
        .attr("cy", d => projection([d.X, d.Y])[1])
        .attr("r", '5')
        .style("fill", "black");
        
        
    // When the states are clicked
    d3.select("#completed_map_op")
        .select('#states')
        .selectAll("path")
        .on('click',completed_states);


}