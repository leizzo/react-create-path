import Point from "./point.component";
import Cubic from "./cubic.component";

export default function Circles({
  points,
  activePoint,
  setDraggedPoint,
  setDraggedCubic
}) {
  return points.map((p, i, a) => {
    let anchors = [];
    if (p.q) {
      // anchors.push(
      //   <Quadratic
      //     index={i}
      //     p1x={a[i - 1].x}
      //     p1y={a[i - 1].y}
      //     p2x={p.x}
      //     p2y={p.y}
      //     x={p.q.x}
      //     y={p.q.y}
      //     setDraggedQuadratic={setDraggedQuadratic}
      //   />
      // );
    } else if (p.c) {
      anchors.push(
        <Cubic
          key={i + p.c[0].x}
          index={i}
          p1x={a[i - 1].x}
          p1y={a[i - 1].y}
          p2x={p.x}
          p2y={p.y}
          x1={p.c[0].x}
          y1={p.c[0].y}
          x2={p.c[1].x}
          y2={p.c[1].y}
          setDraggedCubic={setDraggedCubic}
        />
      );
    }

    return (
      <g
        key={i + p.x}
        className={
          "ad-PointGroup" +
          (i === 0 ? "  ad-PointGroup--first" : "") +
          (activePoint === i ? "  is-active" : "")
        }
      >
        <Point
          key={i + p.x}
          index={i}
          x={p.x}
          y={p.y}
          setDraggedPoint={setDraggedPoint}
        />
        {anchors}
      </g>
    );
  });
}
