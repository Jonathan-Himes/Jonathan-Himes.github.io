function state_pie_chart_op() {



    let width = 300;
    let height = 300;
    let svg_x = 200;
    let svg_y = 150;
    let radius = Math.min(width, height) / 2 - 10;



    // Create pie Layout Generator
    let pie = d3.pie();

    // Set each slice to 2%
    pie.value(function (d) {
        return 2;
    });

    
    
    //console.log(sort_data);
    let pieData = pie(high_points.sort((a, b) => b.Visited - a.Visited));

    // Create Arc Generator
    let arc = d3.arc();

    // Set outer and inner Radius
    arc.outerRadius(radius);
    arc.innerRadius(100);


    // Create a group element:
    let groups = d3.select('#state_piechart_op')
        .selectAll(".pc_1_slices_g")
        .data(pieData)
        .join("g")
        .attr('class','pc_1_slices_g');

    // Append the Slice
    groups.append("path")
        .attr("transform", "translate(" + svg_x + "," + svg_y+ ")")
        .attr("d", arc)
        .style("fill", d => d.data.Date == 'Invalid Date' ? '#a4a4a4' : '#177e89')
        .attr('stroke', 'black')
        .attr('id', d => d.data.State.replace(' ',''))
        .attr('class', 'pc_1_slices');

    let state_text = visited_highpoints.length+' of 50'
    
    d3.select('#state_piechart_op')
        .select('#pc_1_1')
        .attr("transform", "translate(" + svg_x+ "," + (svg_y- 20) + ")")
        .selectAll('text')
        .data([1])
        .join('text')
        .text(state_text)
        .attr('text-anchor','middle')
        .attr('font-size', '40px');

    d3.select('#state_piechart_op')
        .select('#pc_1_2')
        .attr("transform", "translate(" + svg_x+ "," + (svg_y + 10) + ")")
        .selectAll('text')
        .data([1])
        .join('text')
        .text('Highpoints Visited')
        .attr('text-anchor','middle')
        .attr('font-size', '20px'); 
        
    d3.select('#state_piechart_op')
        .select('#pc_1_3')
        .attr("transform", "translate(" + svg_x+ "," + (svg_y + 60) + ")")
        .selectAll('text')
        .data([1])
        .join('text')
        .text(visited_highpoints.length/50*100 + '%')
        .attr('text-anchor','middle')
        .attr('font-size', '40px');


    d3.selectAll('.pc_1_slices')
        .on('click', completed_states);


}



function elevation_pie_chart_op() {

    let width = 300;
    let height = 300;
    let svg_x = 200;
    let svg_y = 150;
    let radius = Math.min(width, height) / 2 - 10;



    // Create pie Layout Generator
    let pie = d3.pie();

    // Set each slice to 2%
    pie.value(function (d) {
        return d.Elevation;
    }).sort(null);

    let sorted_data = high_points.sort((a, b) => b.Visited - a.Visited);
    console.log(sorted_data);
    
    //console.log(sort_data);
    let pieData = pie(high_points.sort((a, b) => b.Visited - a.Visited));

    // Create Arc Generator
    let arc = d3.arc();

    // Set outer and inner Radius
    arc.outerRadius(radius);
    arc.innerRadius(100);


    // Create a group element:
    let groups = d3.select('#elevation_piechart_op')
        .selectAll(".pc_2_slices_g")
        .data(pieData)
        .join("g")
        .attr('class', 'pc_2_slices_g');

    // Append the Slice
    groups.append("path")
        .attr("transform", "translate(" + svg_x + "," + svg_y+ ")")
        .attr("d", arc)
        .style("fill", d => d.data.Date == 'Invalid Date' ? '#a4a4a4' : '#177e89')
        .attr('stroke', 'black')
        .attr('id', d => d.data.State.replace(' ',''))
        .attr('class', 'pc_2_slices');

    feet_climbed = visited_highpoints[visited_highpoints.length-1].Cum_Elevation;
    total_elevation = d3.sum(high_points, d => d.Elevation);
    let feet_climbed_perc = Math.round((feet_climbed/total_elevation)*100);


    let elevation_text = feet_climbed +'/' + total_elevation;

    d3.select('#elevation_piechart_op')
    .select('#pc_2_1')
    .attr("transform", "translate(" + svg_x + "," + (svg_y - 40) + ")")
    .selectAll('text')
    .data([1])
    .join('text')
    .text(feet_climbed.toLocaleString())
    .attr('text-anchor','middle')
    .attr('font-size', '40px');

    d3.select('#elevation_piechart_op')
    .select('#pc_2_2')
    .attr("transform", "translate(" + svg_x + "," + (svg_y - 0) + ")")
    .selectAll('text')
    .data([1])
    .join('text')
    .text('of ' + total_elevation.toLocaleString())
    .attr('text-anchor','middle')
    .attr('font-size', '40px');

d3.select('#elevation_piechart_op')
    .select('#pc_2_3')
    .attr("transform", "translate(" + svg_x + "," + (svg_y +20) + ")")
    .selectAll('text')
    .data([1])
    .join('text')
    .text('Feet of')
    .attr('text-anchor','middle')
    .attr('font-size', '20px');  
    
d3.select('#elevation_piechart_op')
    .select('#pc_2_4')
    .attr("transform", "translate(" + svg_x+ "," + (svg_y + 40) + ")")
    .selectAll('text')
    .data([1])
    .join('text')
    .text('Elevation Climbed')
    .attr('text-anchor','middle')
    .attr('font-size', '20px');  

    d3.select('#elevation_piechart_op')
    .select('#pc_2_5')
    .attr("transform", "translate(" + svg_x + "," + (svg_y + 80) + ")")
    .selectAll('text')
    .data([1])
    .join('text')
    .text('~'+feet_climbed_perc+'%')
    .attr('text-anchor','middle')
    .attr('font-size', '40px');   

    
    d3.selectAll('.pc_2_slices')
        .on('click', completed_states); 

}

