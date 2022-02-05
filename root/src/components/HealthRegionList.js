import * as d3 from "d3";
import { useEffect, useState } from "react";
import { setMapProjection } from "../helpers/setMapProjection";
import HealthRegion from "./HealthRegion";
import "./HealthRegionList.css";

export default function HealthRegionList(props) {
  // store loaded map data in a state
  const [mapData, setMapData] = useState({
    data: {},
    loading: true,
  });
  // step 1: fetch geojson data of map
  // only fetch map data once
  useEffect(() => {
    d3.json("https://xihai01.github.io/friendly-journey/map_data.geojson")
      .then((data) => {
        setMapData((prevState) => {
          return { ...prevState, data: data, loading: false };
        });
        console.log(data);
      })
      .catch((err) => {
        console.log("error occured", err);
      });

    /// tooltip
    d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr("style", "position: absolute; opacity: 0");
    ///
  }, []);

  // render map only when map data is fully loaded
  if (!mapData.loading) {
    // step 2: render the regions
    // compute a path function based on correct projections that we will use later
    const path = d3.geoPath().projection(setMapProjection(mapData.data));
    // for each geoJSON coordinate, compute and pass in the equivalent svg path
    const healthRegions = mapData.data.features.map((data) => {
      const region_name = data.properties["NAME_ENG"];
      return (
        <HealthRegion
          key={data.properties.FID}
          path={path(data)}
          tooltipData={region_name}
        />
      );
    });
    console.log(mapData.data.features);

    return (
      <>
        <h1>Ontario's 34 Public Health Regions</h1>
        <svg className="map-canvas">
          <g>{healthRegions}</g>
        </svg>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
