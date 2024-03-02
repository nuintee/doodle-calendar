export const CALENDAR_COLORS = [
  {
    hex: "#D50000",
    label: "トマト",
  },
  {
    hex: "#E67C73",
    label: "フラミンゴ",
  },
  {
    hex: "#F4511E",
    label: "ミカン",
  },
  {
    hex: "#F6BF26",
    label: "バナナ",
  },
  {
    hex: "#33B679",
    label: "セージ",
  },
  {
    hex: "#0B8043",
    label: "バジル",
  },
  {
    hex: "#039BE5",
    label: "ピーコック",
  },
  {
    hex: "#3F51B5",
    label: "ブルーベリー",
  },
  {
    hex: "#7986CB",
    label: "ラベンダー",
  },
  {
    hex: "#8E24AA",
    label: "ブドウ",
  },
  {
    hex: "#616161",
    label: "グラファイト",
  },
] as const;

export type ColorLabel = (typeof CALENDAR_COLORS)[number]["label"];
export type ColorHex = (typeof CALENDAR_COLORS)[number]["hex"];
