import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";

const COLORS = [
  "#E44236",
  "#3C40C6",
  "#74B9FF",
  "#2ecc72",
  "#A3CB37",
  "#F4C724",
  "#FFF222",
  "#E74292",
  "#FFF",
  "#000",
];

export const usePaint = (refresh: () => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(2);

  const handleSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSize(+e.target.value),
    [setSize],
  );

  const clear = useCallback(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const tmp = context.fillStyle;
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 600, 600);
    context.fillStyle = tmp;
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    context.lineCap = "round";
    clear();
  }, [clear]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = size;
  }, [color, size]);

  const startDrawing = (e: {nativeEvent: MouseEvent}) => {
    const {offsetX, offsetY} = e.nativeEvent;
    setIsDrawing(true);
    const context = canvasRef.current!.getContext("2d")!;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (e: {nativeEvent: MouseEvent}) => {
    if (!isDrawing) return;
    const {offsetX, offsetY} = e.nativeEvent;
    const context = canvasRef.current!.getContext("2d")!;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const sendImageToBackend = async () => {
    const canvas = canvasRef.current!;
    const imageDataUrl = canvas.toDataURL("image/png");

    try {
      await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({image: imageDataUrl}),
      });
      clear();
      refresh();
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return {
    color,
    setColor,
    sendImageToBackend,
    stopDrawing,
    startDrawing,
    draw,
    handleSizeChange,
    canvasRef,
    clear,
    size,
    COLORS,
  };
};
