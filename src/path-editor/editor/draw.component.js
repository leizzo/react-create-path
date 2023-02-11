import { useMemo } from "react";

function generatePath(points, closePath) {
  let d = "";
  points.forEach((point, i) => {
    if (i === 0) {
      // first point
      d += "M ";
    } else if (point.q) {
      // quadratic
      d += `Q ${point.q.x} ${point.q.y} `;
    } else if (point.c) {
      // cubic
      d += `C ${point.c[0].x} ${point.c[0].y} ${point.c[1].x} ${point.c[1].y} `;
    } else if (point.a) {
      // arc
      d += `A ${point.a.rx} ${point.a.ry} ${point.a.rot} ${point.a.laf} ${point.a.sf} `;
    } else {
      d += "L ";
    }

    d += `${point.x} ${point.y} `;
  });

  if (closePath) d += "Z";

  return d;
}

export function Draw({ points, closePath, circles }) {
  const path = generatePath(points, closePath);

  return useMemo(
    () => (
      <>
        <path className="ad-Path" d={path} />
        <g className="ad-Points">{circles()}</g>
      </>
    ),
    [path, circles]
  );
}

export default Draw;
