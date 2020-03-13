function buildMetadata(sample) {

  const meta = d3.select("#sample-metadata")
  meta.html("")

  let s = d3.json(`/metadata/${sample}`).then((data) => {
    Object.entries(data).forEach(([key, value]) => { meta.append("p").text(`${key.toLowerCase()}: ${value}`)})
  })

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  const pieChart = d3.select("#pie")
  pieChart.html("")

  let s = d3.json(`/samples/${sample}`).then((data) => {
    console.log(data.otu_ids.length)
  })
  
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log(`option changed: ${newSample} selected`)
  buildCharts(newSample);
  buildMetadata(newSample);
}


// Initialize the dashboard
init();
