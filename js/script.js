// Initialize global paramters to be used in multiple functions
let mapData; 
let high_points; 
let table_data; 
let input_data; 
let visited_highpoints; 
let path1;
let path2;
let path3;
let total_elevation;
let feet_climbed;
let year_elevations;
let bar_xScale;
let bar_yScale;
let problems = [];
let c_arrow_data;
let mean_line_data;


let headerData = [{sorted: false, ascending: false},  
                  {sorted: false, ascending: false},
                  {sorted: false, ascending: false},
                  {sorted: false, ascending: false}];


async function loadData () {
  
  high_points = await d3.csv('data/high_points.csv'); // Load in the csv containing data on each high point
  mapData = await d3.json('data/us-states.json'); // Load in the json containing the state boundaries
  return {high_points, mapData};
}


loadData().then((loadedData) => {
    

    
    console.log(high_points);
    
    for (i in high_points){
        
        high_points[i].X = parseFloat(high_points[i].X ); //parse the data
        high_points[i].Y = parseFloat(high_points[i].Y );
        high_points[i].Elevation = parseFloat(high_points[i].Elevation );
    }

    
    table_data = high_points; // Initializes the table_data to have all the high point information

    // Call the functions
    read_in_user_data();
    create_tabs();
    lp_map();
    lp_table();
    sort_data();
    // compare_heights();

    



    
})


