// This function generates the visitor Statistics table in the output page
function generate_statistics(){


    // Calculate the statistics
    let number_of_years = d3.max(visited_highpoints.map(d => d.Year)) - d3.min(visited_highpoints.map(d => d.Year));
    let state_per_year = visited_highpoints.length/number_of_years.toFixed(2)
    let remaining_years = (50 - number_of_years)/state_per_year
    let state_finish_year = parseInt(d3.max(visited_highpoints.map(d => d.Year)) + remaining_years)

    // Set the text
    d3.select('#stats_g_op').select('#by_state_average')
        .text(state_per_year.toFixed(2))

    d3.select('#stats_g_op').select('#by_state_expected_completion_year')
        .text(state_finish_year)

    let highest_elevation_visited = visited_highpoints.filter(d => d.Elevation == d3.max(visited_highpoints.map(d => d.Elevation)))
    console.log(highest_elevation_visited)

    d3.select('#stats_g_op').select('#he_state')
        .text(highest_elevation_visited[0].State)

    d3.select('#stats_g_op').select('#he_peak')
        .text(highest_elevation_visited[0].Peak)
    
    d3.select('#stats_g_op').select('#he_elevation')
        .text(highest_elevation_visited[0].Elevation + 'ft')




}


