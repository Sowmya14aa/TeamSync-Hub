package com.whiteboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DrawData {
    private double x;
    private double y;
    private double prevX;
    private double prevY;
    private String color;
    private int size;
    private String type;
}
