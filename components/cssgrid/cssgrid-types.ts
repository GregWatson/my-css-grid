"use client";

// Misc Types and Functions used by CssGrid 

// Grids are ordered lists of Elements:
export type CssGridElInfo = 
{ ID: string,  // Must be unique within this Grid
  cols: number,
  rows: number,
  comment: string
}

// Info used by pop-up modal to modify size, order, etc.
// Used within CssGrid
export type CssGridModalInfo = {
    elemID: string,
    x: number,
    y: number,
    cols: number,
    rows: number
  };

export type CssGridStatus = 'noneSelected' | 'modalActive' | 'resizeElement' | 'isDragging' | 'moveElement'
