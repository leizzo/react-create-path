export default function Point(props) {
  return (
    <circle
      className="ad-Point"
      onMouseDown={(e) => props.setDraggedPoint(props.index)}
      cx={props.x}
      cy={props.y}
      r={8}
    />
  );
}
