// This function draws the cumulative time series plot in the output page
function make_timeseries(){
    let MARGIN = 20;
    let CHART_WIDTH = 800
    let CHART_HEIGHT = 400

        // Create an xScale for the chart
        xScale = d3
            .scaleTime()
            .domain(d3.extent(visited_highpoints.map(item => new Date(item.Date))))
            .range([MARGIN+ MARGIN + MARGIN, CHART_WIDTH-MARGIN])
            .nice();
      
        // Create an yScale for the chart
        yScale = d3
            .scaleLinear()
            .domain([0,d3.max(visited_highpoints.map(item => item.Cum_Elevation))])
            .range([CHART_HEIGHT - MARGIN - MARGIN, MARGIN]);

        // Add the X Axis to the g element in the SVG
        d3.select('#e_x-axis')
            .attr('transform', `translate(0,${CHART_HEIGHT - MARGIN*2})`)
            .call(d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat("%Y"))); 
    
        // Add the Y Axis to the g element in the SVG 
        d3.select('#e_y-axis')
            .call(d3.axisLeft(yScale))
            .attr('transform', `translate(${MARGIN+MARGIN+MARGIN}, ${0})`);

        let line_data =[];


        // Creates line points for upward and downward slopes of mountains
        for (let i = 0; i<visited_highpoints.length; i++){
            if (i == 0){
                line_data.push({Date: visited_highpoints[i].Date, Cum_Elevation:0, odd:false, mountain_top: visited_highpoints[i].Cum_Elevation, abreviation: visited_highpoints[i].Abreviation});
                line_data.push({Date: visited_highpoints[i].Date, Cum_Elevation: visited_highpoints[i].Cum_Elevation, odd: true, mountain_bottom:0,abreviation: visited_highpoints[i].Abreviation});
            }
            else {

                line_data.push({Date: visited_highpoints[i].Date , Cum_Elevation: visited_highpoints[i-1].Cum_Elevation, odd: false, mountain_top: visited_highpoints[i].Cum_Elevation,abreviation: visited_highpoints[i].Abreviation});
                line_data.push({Date: visited_highpoints[i].Date , Cum_Elevation: visited_highpoints[i].Cum_Elevation, odd: true, mountain_bottom: visited_highpoints[i-1].Cum_Elevation,abreviation: visited_highpoints[i].Abreviation});
            }

        }

 
        let m_width = 10;

        // Generate the line using D3 that will define the path element
        let lineGenerator = d3
            .line()
            .x((line_data) => xScale(line_data.Date))
            .y((line_data) => yScale(line_data.Cum_Elevation));

        // Append the mountains onto the plot
        d3.select('#elevation_timeseries_op').select('#elevations')
            .selectAll('line')
            .data(line_data)
            .join('line')
            .attr('x1', d => d.odd == true ? xScale(d.Date) + m_width : xScale(d.Date) - m_width)
            .attr('y1', d => d.odd == true ? yScale(d.mountain_bottom) : yScale(d.Cum_Elevation)  )
            .attr('x2', d => xScale(d.Date))
            .attr('y2', d =>d.odd == true ?  yScale(d.Cum_Elevation): yScale(d.mountain_top))
            .attr('stroke-width', '2px')
            .attr('stroke', 'black')
            .attr('id', d => d.abreviation);
        
        d3.select('#elevation_timeseries_op').select('#lines')
            .selectAll('path')
            .remove();

        // Append the solid elevation line onto the plot    
        d3.select('#elevation_timeseries_op').select('#lines')
            .append('path')
            .datum(line_data)
            .attr('d', lineGenerator)
            .attr('stroke','black')
            .attr('fill', 'none');

        // Add in the labels    
        d3.select('#elevation_timeseries_op').select('#labels')
            .selectAll('text')
            .data(visited_highpoints)
            .join('text')
            .text(d => d.Peak +', ' + d.Abreviation)
            .attr('id', d => d.Abreviation)
            .attr('text-anchor', d => xScale(d.Date)-m_width > 200 ? 'end' : 'start')
            .attr('x', d => xScale(d.Date)-m_width > 200 ? xScale(d.Date)-m_width : xScale(d.Date)+m_width)
            .attr('y', d => yScale(d.Cum_Elevation - d.Elevation/2)+ 5);

        // make sure the labels don't overlap
        let labs = d3.select('#labels').selectAll('text')


        let label_positions = []
        for (var i = 0; i < visited_highpoints.length; i++) {
            label_positions.push({'right':'','left':'','top':'','bottom':'','state': ''});
         }


        for (let i = 0; i<visited_highpoints.length; i++) {

            if (labs._groups[0][i].attributes[0].nodeValue == 'end'){
                label_positions[i].left = parseFloat(labs._groups[0][i].attributes.x.value) - parseFloat(labs._groups[0][i].childNodes[0].length)*8
                label_positions[i].right = parseFloat(labs._groups[0][i].attributes.x.value)
            }
            else {
                label_positions[i].right = parseFloat(labs._groups[0][i].attributes.x.value) + parseFloat(labs._groups[0][i].childNodes[0].length)*8
                label_positions[i].left = parseFloat(labs._groups[0][i].attributes.x.value)
            }
            label_positions[i].top = parseFloat(labs._groups[0][i].attributes.y.value) + 17.5
            label_positions[i].bottom = parseFloat(labs._groups[0][i].attributes.y.value)
            label_positions[i].state = labs._groups[0][i].__data__.Abreviation

        }


        

        for (let i = 0; i < label_positions.length; i++) {
            for (let j = i + 1; j < label_positions.length; j++) {
                if (
                    label_positions[i].right < label_positions[j].left ||
                    label_positions[i].left > label_positions[j].right ||
                    label_positions[i].bottom > label_positions[j].top ||
                    label_positions[i].top < label_positions[j].bottom
                ) {}
                else {
                     problems.push(label_positions[i].state)
                     problems.push(label_positions[j].state)
                     d3.select('#labels')
                        .select('#' + label_positions[i].state)
                        .attr('class', 'overlapper')
                        .attr('visibility', 'hidden');
                    d3.select('#labels')
                        .select('#' + label_positions[j].state)
                        .attr('class', 'overlapper')
                        .attr('visibility', 'hidden');
                    }
          }
        }
        problems = new Set(problems)


        d3.select('#elevations').selectAll('line')
            .on('mouseover', unhide_category)

        function unhide_category() {
            problems = Array.from(new Set(problems));


            if (problems.includes(this.id)){
                d3.select('#labels')
                    .select('#' + this.id)
                    .attr('visibility', 'visible')  
            }


            d3.select(this)
                .on('mouseleave', function() {
                    if (problems.includes(this.id)){
                        d3.select('#labels')
                            .select('#' + this.id)
                            .attr('visibility', 'hidden') 
                    }
                })
        }






}
