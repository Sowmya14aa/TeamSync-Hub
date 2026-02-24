package com.whiteboard.controller;

import com.whiteboard.dto.DrawData;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WhiteboardController {

    @MessageMapping("/draw/{sessionId}")
    @SendTo("/topic/canvas/{sessionId}")
    public DrawData handleDrawing(@DestinationVariable String sessionId, DrawData data) {
        // Broadcasts the incoming coordinate data to everyone in the same session
        return data;
    }
}
