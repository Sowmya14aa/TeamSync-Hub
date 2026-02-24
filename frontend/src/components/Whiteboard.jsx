import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useWhiteboard } from '../hooks/useWhiteboard';

const Whiteboard = ({ sessionId }) => {
    const stompClient = useRef(null);
    const [color, setColor] = useState('#000000');
    const [tool, setTool] = useState('pen'); 

    const { canvasRef, startDrawing, stopDrawing, draw, drawLine } = useWhiteboard((drawData) => {
        if (stompClient.current?.connected) {
            const isEraser = tool === 'eraser';
            stompClient.current.publish({
                destination: `/app/draw/${sessionId}`,
                body: JSON.stringify({ 
                    ...drawData, 
                    color: isEraser ? '#ffffff' : color, 
                    width: isEraser ? 60 : 2, 
                    type: 'LINE' 
                }),
            });
        }
    });

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws-whiteboard');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                client.subscribe(`/topic/canvas/${sessionId}`, (message) => {
                    const data = JSON.parse(message.body);
                    const ctx = canvasRef.current.getContext('2d');
                    if (data.type === 'CLEAR') {
                        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    } else {
                        drawLine(ctx, { x: data.prevX, y: data.prevY }, { x: data.x, y: data.y }, data.color, data.width || 2);
                    }
                });
            },
        });
        client.activate();
        stompClient.current = client;
        return () => client.deactivate();
    }, [sessionId]);

    const copyInviteLink = () => {
        const link = `${window.location.origin}?session=${sessionId}`;
        navigator.clipboard.writeText(link);
        alert("Invite link copied!");
    };

    // NEW: Save/Export Feature
    const downloadImage = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = `whiteboard-session-${sessionId}.png`;
        link.href = image;
        link.click();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className="canvas-container" style={{ textAlign: 'center' }}>
            <h2 style={{color: '#1e293b', marginBottom: '15px'}}>Session: {sessionId}</h2>
            <div className="toolbar" style={{ marginBottom: '15px' }}>
                <button className="btn" onClick={() => setTool('pen')} style={{backgroundColor: tool === 'pen' ? '#cbd5e1' : '#f8fafc', padding: '8px 15px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer'}}> Pen</button>
                <button className="btn" onClick={() => setTool('eraser')} style={{backgroundColor: tool === 'eraser' ? '#cbd5e1' : '#f8fafc', padding: '8px 15px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer'}}> Erase</button>
                <button className="btn" onClick={copyInviteLink} style={{backgroundColor: '#10b981', color: '#fff', padding: '8px 15px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer'}}> Invite</button>
                <button className="btn" onClick={downloadImage} style={{backgroundColor: '#3b82f6', color: '#fff', padding: '8px 15px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer'}}> Save Image</button>
                <button className="btn" style={{backgroundColor: '#64748b', color: '#fff', padding: '8px 15px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer'}} onClick={() => stompClient.current?.publish({ destination: `/app/draw/${sessionId}`, body: JSON.stringify({ type: 'CLEAR' }) })}>Clear</button>
                <button className="btn" onClick={handleLogout} style={{backgroundColor: '#ef4444', color: '#fff', padding: '8px 15px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer', marginLeft: '20px'}}> Logout</button>
            </div>
            
            <div style={{ position: 'relative', display: 'inline-block', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <canvas 
                    ref={canvasRef} 
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing} 
                    onMouseOut={stopDrawing}
                    width={800} height={500}
                    style={{ cursor: tool === 'eraser' ? 'cell' : 'crosshair', display: 'block', borderRadius: '8px' }}
                />
            </div>
        </div>
    );
};

export default Whiteboard;
