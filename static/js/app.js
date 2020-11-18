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
        var subject_info = metadata.filter(meta => meta.id.toString() === id)[0];

        // Select info box
        var info = d3.select("#sample-metadata");
        
        // Empty the info box before new selection
        info.html("");

        // Get the data and add to info box
        Object.entries(subject_info).forEach((key) => {   
                info.append("panel-body").text(key[0] + ": " + key[1] + "\n");    
        });
    });
}


// Create the function for the dropdown
function optionChanged(id) {
    buildInfo(id);
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
    });
}

init();
