export default function HealthRegion(props) {
  const { path } = props;

  //each path defines the shape of a region in the map
  return <path d={props.pathData} />;
}
