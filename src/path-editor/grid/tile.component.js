function CreateTile({ width, height, size, index }) {
  return (
    <>
      <line x1={index * size} y1={0} x2={index * size} y2={height} />
      <line x1={0} y1={index * size} x2={width} y2={index * size} />
    </>
  );
}

export function Tile({ width, height, size, index }) {
  return (
    <>
      <CreateTile width={width} height={height} size={size} index={index} />
    </>
  );
}

export default Tile;
