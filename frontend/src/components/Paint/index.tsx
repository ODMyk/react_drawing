import {ColorButton} from "../ColorButton";
import {usePaint} from "../../hooks/usePaint";

export type PaintProps = {
  refresh: () => void;
};

export const Paint = ({refresh}: PaintProps) => {
  const {
    color,
    draw,
    handleSizeChange,
    sendImageToBackend,
    setColor,
    startDrawing,
    stopDrawing,
    canvasRef,
    clear,
    size,
    COLORS,
    title,
    setTitle,
  } = usePaint(refresh);

  return (
    <div className="screen">
      <div className="wrapper">
        <div className="drawing-app">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>
        <div className="toolbar">
          <div className="colors">
            {COLORS.map((col, index) => (
              <ColorButton
                key={index}
                color={col}
                setter={setColor}
                active={col === color}
              />
            ))}
          </div>
          <div>
            <input
              type="range"
              min={1}
              max={32}
              value={size}
              onChange={handleSizeChange}
            />
            <input type="text" value={title} onChange={setTitle} />
          </div>
          <button onClick={clear}>Clear</button>
          <button onClick={sendImageToBackend}>Publish</button>
        </div>
      </div>
    </div>
  );
};
