import * as d3 from "d3";
import { useEffect, useState } from "react";
import { setMapProjection } from "../helpers/setMapProjection";

export default function HealthRegionList(props) {
  // keep track of data loading state
  const [loading, setLoading] = useState(true);
  // step 1: fetch geojson data of map
  let mapData = [];
  // only fetch map data once
  useEffect(() => {
    d3.json("https://xihai01.github.io/friendly-journey/map_data.geojson")
      .then((data) => {
        mapData = data;
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log("error occured", err);
      });
  }, []);

  // render map only when map data is fully loaded
  if (!loading) {
    // step 2: render the regions
    // compute a path function based on correct projections that we will use later
    const path = d3.geoPath().projection(setMapProjection(mapData));
    //
    return <h1>Loaded</h1>;
  } else {
    return <h1>Loading...</h1>;
  }
}
