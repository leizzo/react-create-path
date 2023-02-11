import { useCallback, useEffect, useState } from "react";
import Circles from "./circles.component";
import Draw from "./draw.component";

function Editor({ mousePosition, mouseStoppingPosition, children }) {
  const [editor, setEditorState] = useState({
    points: [
      { x: 40, y: 300 },
      {
        x: 150,
        y: 260,
        c: [
          { x: 300, y: 50 },
          { x: 100, y: 0 }
        ]
      }
    ],
    closePath: false,
    activePoint: 0,
    draggedPoint: false,
    draggedCubic: false
  });

  const setDraggedPoint = (index) => {
    setEditorState({
      ...editor,
      activePoint: index,
      draggedPoint: true
    });
  };

  const setDraggedCubic = (index, anchor) => {
    setEditorState({
      ...editor,
      activePoint: index,
      draggedCubic: anchor
    });
  };

  const setPointCoords = useCallback(
    (coords) => {
      const points = editor.points;
      const active = editor.activePoint;

      points[active].x = coords.x;
      points[active].y = coords.y;

      setEditorState({ ...editor, points });
    },
    [editor]
  );

  const setCubicCoords = useCallback(
    (coords, anchor) => {
      const points = editor.points;
      const active = editor.activePoint;

      points[active].c[anchor].x = coords.x;
      points[active].c[anchor].y = coords.y;

      setEditorState({ ...editor, points });
    },
    [editor]
  );

  useEffect(() => {
    if (editor.draggedPoint) {
      setPointCoords(mousePosition);
    } else if (editor.draggedCubic !== false) {
      setCubicCoords(mousePosition, editor.draggedCubic);
    }
  }, [mousePosition]);

  useEffect(() => {
    if (mouseStoppingPosition) {
      setEditorState({
        ...editor,
        draggedPoint: false,
        draggedCubic: false
      });
    }
  }, [mouseStoppingPosition]);

  return (
    <>
      {children({
        ...editor,
        setDraggedPoint: setDraggedPoint,
        setDraggedCubic: setDraggedCubic
      })}
    </>
  );
}

Editor.Draw = Draw;
Editor.Draw.Circles = Circles;

export default Editor;
