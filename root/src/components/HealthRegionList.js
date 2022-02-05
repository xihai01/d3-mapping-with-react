import * as d3 from "d3";
import { useEffect, useState } from "react";
import { setMapProjection } from "../helpers/setMapProjection";
import HealthRegion from "./HealthRegion";

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
  }, []);

  // render map only when map data is fully loaded
  if (!mapData.loading) {
    // step 2: render the regions
    // compute a path function based on correct projections that we will use later
    const path = d3.geoPath().projection(setMapProjection(mapData));
    // for each geoJSON coordinate, compute and pass in the equivalent svg path
    const healthRegions = mapData.data.features.map((data) => {
      return <HealthRegion key={data.properties.FID} path={path(data)} />;
    });
    console.log(healthRegions);

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
