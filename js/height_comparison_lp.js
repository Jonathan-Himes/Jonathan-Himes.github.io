// Not used
function compare_heights() {
    let CHART_HEIGHT = 800;
    let TOP_MARGIN = 5;
    let LEFT_MARGIN = 20;


    height_scale = d3
    .scaleLinear()
    .domain([d3.min(high_points.map(item => item.Elevation)),d3.max(high_points.map(item => item.Elevation))])
    .range([0, CHART_HEIGHT - TOP_MARGIN - TOP_MARGIN]);

    function draw(context,elevation) {
        mountain.moveTo(LEFT_MARGIN*2,CHART_HEIGHT);
        mountain.lineTo(300-LEFT_MARGIN, CHART_HEIGHT - height_scale(elevation));
        mountain.lineTo(600-TOP_MARGIN,CHART_HEIGHT);
        return mountain;
    }
    let mountain = d3.path();

    // Add the Y Axis to the g element in the SVG 
    d3.select('#height_axis')
            .call(d3.axisLeft(height_scale))
            .attr('transform', `translate(${LEFT_MARGIN*2}, ${0})`);

    d3.select('#mountains')
        .selectAll('path')
        .data(high_points)
        .join('path')
        .attr("d", d => draw(mountain , d.Elevation))
        .attr('fill', 'white')
        .attr('stroke','black');

    d3.select('#mountains')
        .selectAll('path')
        .on('mouseover', show_mountain_tooltip);

    function show_mountain_tooltip(){

        // Select the hovered over state
        let state_data = this.__data__;

        // change the line width of the circle
        d3.select(this)
            .attr('stroke-width', '3px');

        // Unhide and position the tooltip. change the first line of text and color to match the given circle
        d3.select('#tooltip')
            .classed('hidden', false)
            .style('left', event.pageX +5 + 'px')
            .style('top', event.pageY+ 5 + 'px')
            .style('border-color', 'black')
            .select('#p_state')
            .text(state_data.State);

        // Change the 2nd line of text to match the hovered circle
        d3.select('#tooltip')
            .select('#p_peak')
            .text(state_data.Peak);

        // Change the third line of text to match the hovered circle
        d3.select('#tooltip')
            .select('#p_elevation')
            .text(state_data.Elevation + ' feet');




        // When not on circle put the tool tip and circle back to the way before
        d3.select('#barchart_per_year_op')
            .select('#elevations')
            .selectAll('rect')
            .on('mouseout', function(d){

                // Change the line weight of circle back
                d3.select(this).attr('stroke-width', '1px');

                // Hide the tooltip
                d3.select('#tooltip').classed('hidden',true);

            });
    }

    



}