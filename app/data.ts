import { CssGridElInfo } from "@/components/cssgrid/cssgrid-types";

export const gridContents: CssGridElInfo[] = [
  {
    ID: "bird",
    cols: 2,
    rows: 2,
    comment:
      "Some comment about the image. This is some bird whose name I currently forget. Perhaps a curlew.",
  },
  {
    ID: "coyote",
    cols: 1,
    rows: 1,
    comment: "A coyote idling away a warm summer afternoon on a hill slope.",
  },
  { ID: "hawk", cols: 1, rows: 2, comment: "Some comment about the image." },
  { ID: "sealion", cols: 1, rows: 1, comment: "Some comment about the image." },
  { ID: "view", cols: 1, rows: 1, comment: "" },
  {
    ID: "yellow_flower",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
  { ID: "bug", cols: 1, rows: 1, comment: "Some comment about the image." },
  { ID: "elk", cols: 1, rows: 1, comment: "Some comment about the image." },
  { ID: "heron", cols: 1, rows: 1, comment: "Some comment about the image." },
  { ID: "swift", cols: 1, rows: 1, comment: "Some comment about the image." },
  {
    ID: "woodpecker",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
];

export function getImageFileName(imageName: string) {
  return "images/" + imageName + ".jpg";
}
