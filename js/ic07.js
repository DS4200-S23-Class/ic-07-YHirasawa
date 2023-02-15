// console.log("linked!!");

// constants to form create a frame
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 20, right: 20, top: 20, buttom: 20};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.buttom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.right - MARGINS.left;

// dataset
const dataset = [55000, 48000, 27000, 66000, 90000];

// create a frame 
const FRAME = d3.select("#vis1").append("svg").attr("class", "frame")
											  .attr("height", FRAME_HEIGHT)
											  .attr("width", FRAME_WIDTH);

// find max value in dataset
const MAX_X = d3.max(dataset, (d) => { return d; }); 
console.log("Max x: " +MAX_X);

// scale the dataset values using MAX_X
const X_SCALE = d3.scaleLinear()
                  .domain([0, (MAX_X + 10000)])
                  .range([0, VIS_WIDTH]); 

// plot a graph using scaled dataset
FRAME.selectAll("points")  
    .data(dataset)  
    .enter()       
    .append("circle")  
      .attr("cx", MARGINS.left) 
      .attr("cy", (d) => { return (X_SCALE(d) + MARGINS.top); }) 
      .attr("r", 10)
      .attr("class", "point"); 

//// adding axis which could not be done in time ////
// We can also use X_SCALE to add an axis to the vis  
FRAME3.append("g") // g is a "placeholder" svg
      .attr("transform", "translate(" + MARGINS.left + 
            "," + (VIS_HEIGHT + MARGINS.top) + ")") //moves axis 
                                                    // within margins 
      .call(d3.axisBottom(X_SCALE).ticks(4)) // function for generating axis  
        .attr("font-size", '20px'); // set font size