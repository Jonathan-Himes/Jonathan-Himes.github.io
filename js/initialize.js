// This function creates the tabs at the top of the page and allows interaction
function create_tabs(){

    // Create the path in the shape of a mountain for Tab 3
    path3 = d3.path();

    path3.moveTo(630.5, 614.5);
    path3.lineTo(696.46, 436.57 );
    path3.lineTo(733.74, 356.22);
    path3.lineTo(811.17, 247.17);
    path3.lineTo(842.71, 252.91);
    path3.lineTo(868.52, 327.52);
    path3.lineTo(963.16, 356.22);
    path3.lineTo(1009.04, 224.21);
    path3.lineTo(1112.28, 63.5);
    path3.lineTo(1129.49, 77.85);
    path3.lineTo(1241.33, 281.6);
    path3.lineTo(1284.34, 227.08 );
    path3.lineTo(1361.77, 172.55);
    path3.lineTo(1390.45, 186.9 );
    path3.lineTo(1422, 264.39);
    path3.lineTo(1419.13, 281.6);
    path3.lineTo(1513.76, 482.49);
    path3.lineTo(1519.5, 605.89);
    path3.closePath();

    
    
    // Draw in tab 3
    d3.select('#tab3')
        .append('path')
        .attr('transform', `translate(250,50),scale(0.25)`) 
        .attr('class', 'op_tab_color')
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
        .attr('d', path3);



    // Create the path in the shape of a mountain for Tab 2
    path2 = d3.path();

    path2.moveTo(703.5, 2219.5);
    path2.lineTo(829.773, 1775.17);
    path2.lineTo(855.602,1778.03);
    path2.lineTo(907.259, 1823.9);
    path2.lineTo(935.957, 1958.63);
    path2.lineTo(973.265, 1993.03);
    path2.lineTo(996.224, 1995.9);
    path2.lineTo(1056.49, 1907.03);
    path2.lineTo(1090.93, 1918.5);
    path2.lineTo(1102.41, 1938.57);
    path2.lineTo(1197.11, 1806.7);
    path2.lineTo(1245.9, 1846.83);
    path2.lineTo(1240.16, 1889.83);
    path2.lineTo(1306.17, 2030.3);
    path2.lineTo(1380.78, 1789.5);
    path2.lineTo(1441.05, 1746.5);
    path2.lineTo(1538.62, 1912.77);
    path2.lineTo(1578.8, 2013.1);
    path2.lineTo(1607.5, 2179.37);
    path2.closePath();

                      
    // Draw in tab 
    d3.select('#tab2')
        .append('path')
        .attr('transform', `translate(25,-345),scale(0.25)`)
        .attr('class', 'ip_tab_color')
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
        .attr('d', path2);


    
    // Create the path in the shape of a mountain for Tab 1
    path1 = d3.path();

    
    path1.moveTo(796.5, 1562.5);
    path1.lineTo(928.532, 1221.22);
    path1.lineTo(942.883, 1209.75);
    path1.lineTo(962.975, 1218.35);
    path1.lineTo(1063.43, 1358.88);
    path1.lineTo(1106.49, 1361.74);
    path1.lineTo(1267.22, 1106.5);
    path1.lineTo(1295.92, 1109.37);
    path1.lineTo(1436.57, 1333.07);
    path1.lineTo(1465.27, 1338.8);
    path1.lineTo(1482.49, 1304.39);
    path1.lineTo(1557.12, 1272.84);
    path1.lineTo(1640.35, 1436.31);
    path1.lineTo(1689.15, 1490.8);
    path1.lineTo(1703.5, 1556.76);
    path1.lineTo(796.5, 1562.5);
    path1.closePath();

  
    
    // Draw in Tab 1
    d3.select('#tab1')
        .append('path')
        .attr('transform', `translate(-200,-185),scale(0.25)`)
        .attr('class', 'lp_tab_color')
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
        .attr('d', path1);


    // Add in functionality so that when tab is clicked the correct page is displayed
    d3.select('#tabsvg')
        .selectAll('g').on('click',on_tab_click)

   

    // Add label for Tab 3
    d3.select('#tab3')
        .append('text')
        .text('OUTPUT PAGE')
        .attr('transform', `translate(470,185)`)
        .style('fill','white')
        .style('font-weight', 'bold');

    // Add label for Tab 2    
    d3.select('#tab2')
        .append('text')
        .text('INPUT PAGE')
        .attr('transform', `translate(275,185)`)
        .style('fill','white')
        .style('font-weight', 'bold');

    // Add label for Tab 1
    d3.select('#tab1')
        .append('text')
        .text('OVERVIEW')
        .attr('transform', `translate(65,185)`)
        .style('fill','white')
        .style('font-weight', 'bold');

    // Calculate where the middle of the screen of the user
    let middle_screen = d3.select('#tabsvg').style('width').replace('px','')/2;

    // Add in the title
    d3.select('#Title')
        .append('text')
        .text('United States Highpoint Visualization')
        .attr('text-anchor', middle_screen < 1200 ?  'left' :  'middle') // If widescreen it centers titled. If not, it makes sure it doesnt overlap tabs
        .attr('x',  middle_screen < 1200 ?  800 :  middle_screen) // If widescreen it centers titled. If not, it makes sure it doesnt overlap tabs
        .attr('y', 180)
        .attr('font-size', '45px');


} // End of create_tabs()





// This function reads in the user's csv file
function read_in_user_data() {
    d3.select('#input_upload').on('change', handleFileSelect, false);
    }
  
function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
    }

// This function takes the read in csv text and puts it into a format that is usable for plotting    
function handleFileLoad(event) {
    let input_text = event.target.result;
    let line_splits = input_text.split(/\r?\n/); //Splits the data by line break

    // This block creates a string of the data in a format that can be parsed into a json
    let text = '['
    for (let i = 0; i<51; i++){
       text = text + `,{"state" : "${line_splits[i].split(/\r?,/)[0]}", "peak": "${line_splits[i].split(/\r?,/)[1]}", "date" : "${line_splits[i].split(/\r?,/)[2]}" }`;
    }
    text = text.replace(',{"state" : "State", "peak": "High Point", "date" : "Date" },','');
    text = text + ']';

    // Parse the user input text into a json for ease of use
    let user_input = JSON.parse(text);

    // Parse the date
    for (i of user_input){
        i.date = new Date(i.date);
    }

    // Sort both high_point data and the just read in user data
    high_points = high_points.sort((a, b) => a.State.localeCompare(b.State));
    user_input = user_input.sort((a, b) => a.state.localeCompare(b.state));

    // Add in the dates from the user input data into the highpoint data
    for (let i = 0; i<high_points.length; i++){
        high_points[i].Date = user_input[i].date;
        high_points[i].Year = parseInt(String(user_input[i].date).split(' ')[3]);
        high_points[i].Visited = high_points[i].Date == 'Invalid Date' ? 0:1;
    }

    // Filter out only visited highpoints and store 
    visited_highpoints = high_points.filter(d => d.Date != 'Invalid Date');

    if (visited_highpoints.length == 0) {
        alert('It seems your template has no visited highpoints!\nPlease read through the directions and ensure you have placed dates of the highpoints you visited in the 3rd column and save the template.\nPlease ensure you are selecting the correct template to upload.')
    }

    // Calculate cumulative ascent
    visited_highpoints = visited_highpoints.sort((a, b) => a.Date - b.Date);
    visited_highpoints[0].Cum_Elevation = visited_highpoints[0].Elevation

    for (let i = 1; i<visited_highpoints.length; i++){
        visited_highpoints[i].Cum_Elevation = visited_highpoints[i-1].Cum_Elevation + visited_highpoints[i].Elevation;
    }

    console.log(visited_highpoints);


    // Call function to make the output graphs
    draw_completed_map();
    make_timeseries();
    state_pie_chart_op();
    elevation_pie_chart_op();
    gen_bar_chart();
    gen_arrow_map();
    generate_statistics();

    d3.select('#landing_page')
    .classed('hidden',true);

    d3.select('#input_page')
    .classed('hidden',true);

    d3.select('#output_page')
    .classed('hidden',false);

    d3.select('#tabsvg')
        .select('#tab3')
        .remove();

    d3.select('#tabsvg')
        .append('g')
        .attr('id','tab3')
        .append('path')
        .attr('transform', `translate(250,50),scale(0.25)`) 
        .attr('class', 'op_tab_color')
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
        .attr('d', path3);

    d3.select('#tab3')
        .append('text')
        .text('OUTPUT PAGE')
        .attr('transform', `translate(470,185)`)
        .style('fill','white')
        .style('font-weight', 'bold');
    
    d3.select('#links')
        .attr('class', 'op_color')

} // end of fileFileLoad() 


function on_tab_click() {

        //If Tab 1 is clicked hide unused pages and unhide the overview page
        if (this.id === 'tab1'){
            d3.select('#landing_page')
                .classed('hidden',false);

            d3.select('#input_page')
                .classed('hidden',true);

            d3.select('#output_page')
                .classed('hidden',true);

            
            d3.select('#tabsvg')
                .select('#tab1')
                .remove();

            d3.select('#tabsvg')
                .append('g')
                .attr('id','tab1')
                .append('path')
                .attr('transform', `translate(-200,-185),scale(0.25)`)
                .attr('class', 'lp_tab_color')
                .attr('stroke-width', 1)
                .attr('stroke', 'black')
                .attr('d', path1);

            d3.select('#tab1')
                .append('text')
                .text('OVERVIEW')
                .attr('transform', `translate(65,185)`)
                .style('fill','white')
                .style('font-weight', 'bold');

            d3.select('#links')
                .attr('class', 'lp_color')


            

        }

        //If Tab 2 is clicked hide unused pages and unhide the input page
        else if (this.id === 'tab2'){
            d3.select('#landing_page')
            .classed('hidden',true);

            d3.select('#input_page')
            .classed('hidden',false);

            d3.select('#output_page')
            .classed('hidden',true);

            d3.select('#tabsvg')
                .select('#tab2')
                .remove();
            
            d3.select('#tabsvg')
                .append('g')
                .attr('id','tab2')
                .append('path')
                .attr('transform', `translate(25,-345),scale(0.25)`)
                .attr('class', 'ip_tab_color')
                .attr('stroke-width', 1)
                .attr('stroke', 'black')
                .attr('d', path2);

            d3.select('#tab2')
                .append('text')
                .text('INPUT PAGE')
                .attr('transform', `translate(275,185)`)
                .style('fill','white')
                .style('font-weight', 'bold');
            d3.select('#links')
                .attr('class', 'ip_color')

        }

        //If Tab 3 is clicked hide unused pages and unhide the output page
        else if (this.id === 'tab3'){
            d3.select('#landing_page')
                .classed('hidden',true);

            d3.select('#input_page')
                .classed('hidden',true);

            d3.select('#output_page')
                .classed('hidden',false);

            d3.select('#tabsvg')
                .select('#tab3')
                .remove();

            d3.select('#tabsvg')
                .append('g')
                .attr('id','tab3')
                .append('path')
                .attr('transform', `translate(250,50),scale(0.25)`) 
                .attr('class', 'op_tab_color')
                .attr('stroke-width', 1)
                .attr('stroke', 'black')
                .attr('d', path3);

            d3.select('#tab3')
                .append('text')
                .text('OUTPUT PAGE')
                .attr('transform', `translate(470,185)`)
                .style('fill','white')
                .style('font-weight', 'bold');

            d3.select('#links')
                .attr('class', 'op_color')
        }

    // Add in functionality so that when tab is clicked the correct page is displayed
    d3.select('#tabsvg')
    .selectAll('g').on('click',on_tab_click)

    console.log(high_points);
    

}
