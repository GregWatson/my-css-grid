"use client";

import { cssGridMaxTranslateX } from "@/tailwind.config";
import { handleOnDragEnd, handleOnDrop } from "./cssgrid-lib.ts";
import {
  CssGridElInfo,
  CssGridStatus,
  CssGridModalInfo,
} from "./cssgrid-types.ts";
import { cssGridModalHeightPx } from "./cssgrid-modal.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { MoveIcon } from "@radix-ui/react-icons";
import { GiResize } from "react-icons/gi";
import { Button } from "@/components/ui/button";

export function CssGridElement({
  element,
  status,
  setStatus,
  dragSrcElemID,
  setdragSrcElemID,
  setdragDstElemID,
  rightClicked,
  setRightClicked,
  windowWidth,
  windowHeight,
  cssGridModalWidthPx,
}: {
  element: CssGridElInfo;
  status: CssGridStatus;
  setStatus: any;
  dragSrcElemID: any;
  setdragSrcElemID: any;
  setdragDstElemID: any;
  rightClicked: CssGridModalInfo;
  setRightClicked: any;
  windowWidth: number;
  windowHeight: number;
  cssGridModalWidthPx: number;
}) {
  let cl = "p-0 min-w-52";
  // "rounded-lg border-2 border-slate-400 hover:border-4 hover:border-slate-800 min-w-52";
  cl =
    cl +
    " col-span-" +
    element.cols.toString() +
    " row-span-" +
    element.rows.toString() +
    " relative";

  let elementCL = "bg-cover absolute top-0 ";
  if (status === "isDragging") elementCL += "blur-sm";

  return (
    <Card
      id={element.ID}
      key={element.ID}
      className={cl}
      draggable={element.mode == "edit" ? "true" : "false"}
      onClick={(e) => {
        // User right clicks.
        e.preventDefault(); // prevent the default behaviour when right clicked.
        if (e.detail === 1) {
          console.log("Single click on Card %s", element.ID);
          if (status === "modalActive" || status === "isDragging") {
            setStatus("noneSelected");
          }
        } else if (e.detail === 2) {
          // double click
          console.log("Double click on Card %s", element.ID);

          setStatus("toggleEdit");
          setRightClicked({
            ...rightClicked,
            elemID: element.ID,
            elemCols: element.cols,
            elemRows: element.rows,
          });
        }
      }}
      onDragStart={(e) => {
        // e.preventDefault();
        e.stopPropagation();
        console.log("Drag Start %s", element.ID);
        setdragSrcElemID(element.ID);
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault(); // required to allow drop
        console.log("Drag Over %s", element.ID);
      }}
      onDrop={(e) => {
        e.stopPropagation();
        console.log("Drop %s", element.ID);
        handleOnDrop(element.ID, setdragDstElemID, dragSrcElemID, setStatus);
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        console.log("Drag End %s", element.ID);
        handleOnDragEnd(status, setStatus, dragSrcElemID, setdragSrcElemID);
      }}
    >
      {element.mode == "edit" && (
        <CardHeader className="z-10 p-0 space-y-0 gap-x-2 absolute top-0  bg-slate-200 flex-row items-baseline">
          <Button
            className="bg-slate-50 mt-1 ml-2 mb-1"
            // variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Resize element %s", element.ID);
              setStatus("modalActive");
            }}
          >
            <GiResize className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
          </Button>
          <Button
            className="bg-slate-50 mr-2 mb-1"
            // variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Move element %s", element.ID);
              setdragSrcElemID(element.ID);
              setStatus("isDragging");
            }}
          >
            <MoveIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
          </Button>
        </CardHeader>
      )}
      <CardContent className="p-0">
        {element.elType == "image" && (
          <img
            className={elementCL}
            src={element.url}
            alt={element.comment}
            draggable={element.mode == "edit" ? "true" : "false"}
          />
        )}
        {element.elType == "text" && (
          <p draggable={element.mode == "edit" ? "true" : "false"}>
            {element.comment}{" "}
          </p>
        )}

        {element.elType == "image" && element.comment !== "" && (
          <CardFooter className="p-1 absolute bottom-0 opacity-70 bg-slate-200 min-w-full">
            {element.comment}
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
}
