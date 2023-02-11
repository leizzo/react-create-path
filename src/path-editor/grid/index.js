import { useMemo, useRef, useState } from "react";
import Tile from "./tile.component";

export function Grid({ width, height, size, tiles, snap, children }) {
  const _tiles = useMemo(
    () =>
      new Array(Math.round(height / size)).fill().map((e, i) => ({
        width,
        height,
        size,
        index: i
      })),
    [width, height, size]
  );
  const svgArea = useRef();
  const [mousePosition, setMousePosition] = useState(null);
  const [mouseStoppingPosition, setMouseStop] = useState(null);

  const onMouseMove = (e) => {
    const rect = svgArea.current.getBoundingClientRect();
    let x = Math.round(e.pageX - rect.left);
    let y = Math.round(e.pageY - rect.top);

    if (snap) {
      x = size * Math.round(x / size);
      y = size * Math.round(y / size);
    }
    setMousePosition({ x, y });
  };

  const onMouseUp = (e) => {
    if (e) {
      setMouseStop(e);
    }
  };

  return (
    <svg
      ref={svgArea}
      width={width}
      height={height}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <g className="ad-Grid">
        {tiles({
          width: width,
          height: height,
          size: size,
          tiles: _tiles
        })}
      </g>
      {children({
        mousePosition: mousePosition,
        mouseStoppingPosition: mouseStoppingPosition
      })}
    </svg>
  );
}

Grid.Tile = Tile;

export default Grid;
