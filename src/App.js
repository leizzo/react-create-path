import Path from "./path-editor";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Path Editor</h1>
      <Path.Grid
        width={350}
        height={350}
        size={80}
        snap={true}
        tiles={({ tiles }) => {
          return (
            <>
              {tiles.map((tile) => (
                <Path.Grid.Tile key={tile.index} {...tile} />
              ))}
            </>
          );
        }}
      >
        {({ mousePosition, mouseStoppingPosition }) => {
          return (
            <Path.Editor
              mousePosition={mousePosition}
              mouseStoppingPosition={mouseStoppingPosition}
            >
              {({ points, activePoint, setDraggedPoint, setDraggedCubic }) => (
                <Path.Editor.Draw
                  points={points}
                  circles={() => (
                    <Path.Editor.Draw.Circles
                      points={points}
                      activePoint={activePoint}
                      setDraggedPoint={setDraggedPoint}
                      setDraggedCubic={setDraggedCubic}
                    />
                  )}
                />
              )}
            </Path.Editor>
          );
        }}
      </Path.Grid>
    </div>
  );
}
