import * as d3 from "d3";
import { useEffect } from "react";

export default function HealthRegionList(props) {
  // step 1: fetch geojson data of map
  let mapData = [];
  d3.json("../data/map_data.json")
    .then((data) => {
      mapData = data;
      console.log(data);
    })
    .catch((err) => {
      console.log("error occured", err);
    });
  return <svg className="map-canvas">{JSON.stringify(mapData)}</svg>;
}
