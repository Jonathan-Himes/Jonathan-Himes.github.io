// This function draws the map with the arrows on the output page
function gen_arrow_map() {

        let arrow_data = visited_highpoints;

        // Create a list of endpoints for each arrow on the map
        for (let i = 0; i<visited_highpoints.length-1; i++){
            arrow_data[i].next_X = visited_highpoints[i+1].X;
            arrow_data[i].next_Y = visited_highpoints[i+1].Y;
            arrow_data[i].next_State = visited_highpoints[i+1].State;  
        }

        // remove the last item so it doesn't try to add another line
        let last_state = arrow_data.pop();


        // Put the removed item back on so that it is available for the future
        c_arrow_data = arrow_data.concat(last_state)
        visited_highpoints = c_arrow_data;


        // Set up the map projection
        const projection = d3.geoAlbersUsa().scale(1500).translate([600, 400])
    
        // Set the projection to the path  
        let path = d3.geoPath()
            .projection(projection);
        
        // Add each state to the map
        d3.select("#arrow_map_op").select('#states').selectAll("path")
            .data(mapData.features)
            .join("path")
            .attr("d", path)
            .attr("id", d => d.properties.name.replace(' ',''))
            .attr('fill','white')       
            .attr('stroke','black')
            .attr('class','state');

        
        // Add each highpoint to the map
        d3.select("#arrow_map_op").select('#highpoints')
            .selectAll('circle')
            .data(high_points)
            .join('circle')
            .attr("cx", d => projection([d.X, d.Y])[0])
            .attr("cy", d => projection([d.X, d.Y])[1])
            .attr("r", '5')
            .attr('id', d => d.State.replace(' ','') + '_hp')
            .style("fill", function(d,i){
                if (d.State == arrow_data[0].State){return 'blue'}
                else if (d.State === last_state.State){return 'red'}
                else {return 'black'}
            });



        // Add each highpoint to the map
        d3.select("#arrow_map_op").select('#arrows')
            .selectAll('line')
            .data(arrow_data)
            .join('line')
            .attr("x1", d => projection([d.X, d.Y])[0])
            .attr("y1", d => projection([d.X, d.Y])[1])
            .attr("x2", d => projection([d.next_X, d.next_Y])[0])
            .attr("y2", d => projection([d.next_X, d.next_Y])[1])
            .attr("marker-end","url(#arrow)")
            .attr('id', d => d.State.replace(' ','') + '_' + d.next_State.replace(' ',''))
            .attr('stroke','red')
            .attr('stroke-width', '4px');



        
            // When an arrow is hovered over call the highlight_arrows function        
            d3.select("#arrow_map_op").select('#arrows')
                .selectAll('line')
                .on('mouseover', highlight_arrows);

            // When a state is hovered over, call the state_arrows function
            d3.select("#arrow_map_op").select('#states')
                .selectAll('path')
                .on('mouseover', state_arrows);

  

} // end of gen_arrow_map()