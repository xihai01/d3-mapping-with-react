import * as d3 from "d3";

// show tooltip when hovering over a region
export const handleMouseOver = function (tooltipData) {
  d3.select("#tooltip")
    .style("opacity", 1)
    .style("background-color", "burlywood")
    .text(tooltipData);
};

// hide tooltip as mouse leaves region
export const handleMouseOut = function () {
  d3.select("#tooltip").style("opacity", 0);
};

// get mouse location so tooltip tracks cursor
export const handleMouseMove = function (event) {
  d3.select("#tooltip")
    .style("left", event.pageX + 10 + "px")
    .style("top", event.pageY + 10 + "px");
};
