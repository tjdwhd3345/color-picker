export const hexToRgb1 = (hex: string) => {
  const c = hex.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출
  return { r, g, b };
};

export const hexToRgb2 = (hex: string) => {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return res
    ? {
        r: parseInt(res[1], 16),
        g: parseInt(res[2], 16),
        b: parseInt(res[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

export const getTintColor = ({ r, g, b, alpha }: { r:number, g:number, b:number, alpha:number }) => {
  const rt = r + (alpha * 0.01 * (255 - r));
  const gt = g + (alpha * 0.01 * (255 - g));
  const bt = b + (alpha * 0.01 * (255 - b));
  return { rt, gt, bt };
}

export const rgbToHex = ({ rt, gt, bt }: { rt: number, gt: number, bt: number }) => {
  return "#" + parseInt(String((1 << 24) + (rt << 16) + (gt << 8) + bt), 10).toString(16).slice(1);
}