import { useRef, useState } from 'react';

export const useWhiteboard = (onDraw) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastPos = useRef({ x: 0, y: 0 });

    const getMousePos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const drawLine = (ctx, start, end, color, width = 2) => {
        ctx.beginPath();
        ctx.strokeStyle = color || '#000000';
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();
    };

    const drawText = (ctx, text, x, y, color) => {
        ctx.font = '18px Arial';
        ctx.fillStyle = color || '#000000';
        ctx.fillText(text, x, y);
    };

    const startDrawing = (e) => {
        const pos = getMousePos(e);
        lastPos.current = pos;
        setIsDrawing(true);
    };

    const stopDrawing = () => setIsDrawing(false);

    const draw = (e) => {
        if (!isDrawing || !canvasRef.current) return;
        const pos = getMousePos(e);
        const ctx = canvasRef.current.getContext('2d');
        // We pass a temporary width here, but the component will handle the broadcasted width
        onDraw({ prevX: lastPos.current.x, prevY: lastPos.current.y, x: pos.x, y: pos.y });
        lastPos.current = pos;
    };

    return { canvasRef, startDrawing, stopDrawing, draw, getMousePos, drawLine, drawText };
};
