// Read in the data
d3.json("../data/samples.json").then((data)=> {
    console.log(data);
});

// Create a function for the info box
function buildInfo(id) {
    // Read in the data
    d3.json("../data/samples.json").then((data)=> {
        
        // Get the metadata for the info box
        var metadata = data.metadata;
        console.log(metadata)

        // Filter the metadata by subject ID
        var subject_info = metadata.filter(meta => meta.id.toString() == id)[0];

        // Select info box
        var info = d3.select("#sample-metadata");
        
        // Empty the info box before new selection
        info.html("");

        // Get the data and add to info box
        Object.entries(subject_info).forEach((key) => {   
                info.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    });
}

// Create a function to build the plots

function buildPlot(id) {
    // Read in the data
    d3.json("../data/samples.json").then((data) => {
        console.log(data)

        // Filter the sample data by subject ID
        var samples = data.samples.filter(s => s.id.toString() == id)[0];
            // console.log(samples);
        
        // Get the top 10 OTUs data
        var samples_top = samples.sample_values.slice(0, 10).reverse();
    
        // Get the top 10 OTU IDs 
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        var OTU_ids = OTU_top.map(o => "OTU" + o)
        
        // Get the top 10 OUT labels for the bar chart
        var labels = samples.otu_labels.slice(0, 10);


        ////// BAR CHART ////////

        // Create the trace for the bar chart
        var trace = {
            x: samples_top,
            y: OTU_ids,
            type:"bar",
            text: labels,
            orientation: "h",
        };

        var data_bar = [trace];
        
        // Create the bar chart
        Plotly.newPlot("bar", data_bar);


        ////// BUBBLE CHART ////////

        // Create the trace for the bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        var data_bubble = [trace1];
  
        // Create the bubble chart
        Plotly.newPlot("bubble", data_bubble) 

    });
}

// Create the function for the dropdown
function optionChanged(id) {
    buildInfo(id);
    buildPlot(id);
}

// Initialise the page with a default plot
function init() {
    // Select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // Read in the data
    d3.json("../data/samples.json").then((data)=> {
        // console.log(data)

        // Get the ID for the dropdown
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Display the data and the plots
        buildInfo(data.names[0]);
        buildPlot(data.names[0]);

    });
}

init();
