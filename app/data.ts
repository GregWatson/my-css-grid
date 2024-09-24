import { CssGridElInfo } from "@/components/cssgrid/cssgrid-types";

export const gridContents: any[] = [
  {
    ID: "bird",
    elType: "image",
    cols: 2,
    rows: 2,
    comment:
      "Some comment about the image. This is some bird whose name I currently forget. Perhaps a curlew.",
  },
  {
    ID: "coyote",
    elType: "image",
    cols: 1,
    rows: 1,
    comment: "A coyote idling away a warm summer afternoon on a hill slope.",
  },
  {
    ID: "hawk",
    elType: "image",
    cols: 1,
    rows: 2,
    comment: "Some comment about the image.",
  },
  {
    ID: "sealion",
    elType: "image",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
  { ID: "view", elType: "image", cols: 1, rows: 1, comment: "" },
  {
    ID: "yellow_flower",
    elType: "image",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
  {
    ID: "bug",
    elType: "image",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
  {
    ID: "elk",
    elType: "image",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
  {
    ID: "heron",
    elType: "image",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
  {
    ID: "swift",
    elType: "image",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
  {
    ID: "woodpecker",
    elType: "image",
    cols: 1,
    rows: 1,
    comment: "Some comment about the image.",
  },
];

export function getImageFileName(imageName: string) {
  return "images/" + imageName + ".jpg";
}
