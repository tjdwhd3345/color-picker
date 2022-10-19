import React, { useEffect, useCallback, useRef, useState } from 'react'

interface Props {
  color: string;
  alpha?: 100 | 80 | 60 | 40 | 20 | 10 | 5;
}
const ColorPalette = ({ color, alpha = 100 }: Props) => {
  const [alphaColor, setAlphaColor] = useState(color);
  const spanRef = useRef<HTMLSpanElement>(null);

  const hexToRgb1 = (hex: string) => {
    const c = hex.substring(1); // 색상 앞의 # 제거
    const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff; // red 추출
    const g = (rgb >> 8) & 0xff; // green 추출
    const b = (rgb >> 0) & 0xff; // blue 추출
    return { r, g, b };
  };

  const hexToRgb2 = (hex: string) => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return res
      ? {
          r: parseInt(res[1], 16),
          g: parseInt(res[2], 16),
          b: parseInt(res[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };
  const getTextColorByBackgroundColor = useCallback((hexColor: string) => {
    // case #1
    const { r, g, b } = hexToRgb1(hexColor);
    const luma1 = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    // case #2
    const { r: red, g: green, b: blue } = hexToRgb2(hexColor);
    const luma2 = (red * 299 + green * 587 + blue * 114) / 1000;

    /* console.log(r === red && g === green && b === blue, { r, g, b, red, green, blue });
    console.log({ luma1, luma2 }); */
    // 색상 선택
    // return luma < 127.5 ? '#fff' : '#000'; // 글자색이
    return luma2 < 125 ? '#fff' : '#000'; // 글자색이
  }, []);
  const getTintColorsByBackgroundColor = useCallback((primary100: string) => {
    const getTintColor = ({ r, g, b, alpha }: { r:number, g:number, b:number, alpha:number }) => {
      const rt = r + (alpha * 0.01 * (255 - r));
      const gt = g + (alpha * 0.01 * (255 - g));
      const bt = b + (alpha * 0.01 * (255 - b));
      return { rt, gt, bt };
    }
    const rgbToHex = ({ rt, gt, bt }: { rt: number, gt: number, bt: number }) => {
      return "#" + parseInt(String((1 << 24) + (rt << 16) + (gt << 8) + bt), 10).toString(16).slice(1);
    }
    const { r, g, b } = hexToRgb2(primary100);
    const primary80 = rgbToHex(getTintColor({ r, g, b, alpha: 20 }));
    const primary60 = rgbToHex(getTintColor({ r, g, b, alpha: 40 }));
    const primary40 = rgbToHex(getTintColor({ r, g, b, alpha: 60 }));
    const primary20 = rgbToHex(getTintColor({ r, g, b, alpha: 80 }));
    const primary10 = rgbToHex(getTintColor({ r, g, b, alpha: 90 }));
    const primary5 = rgbToHex(getTintColor({ r, g, b, alpha: 95 }));
    return { primary100, primary80, primary60, primary40, primary20, primary10, primary5 };
  }, []);

  useEffect(() => {
    if (spanRef && spanRef.current) {
      /* const { primary100, primary80, primary60, primary40, primary20, primary10, primary5 } = getTintColorsByBackgroundColor(color);
      let bgColor = primary100;
      if (alpha === 80) bgColor = primary80;
      if (alpha === 60) bgColor = primary60;
      if (alpha === 40) bgColor = primary40;
      if (alpha === 20) bgColor = primary20;
      if (alpha === 10) bgColor = primary10;
      if (alpha === 5) bgColor = primary5;
      spanRef.current.style.backgroundColor = bgColor; */
      const tintColors = getTintColorsByBackgroundColor(color);
      spanRef.current.style.backgroundColor = tintColors[`primary${alpha}`];
      spanRef.current.style.color = getTextColorByBackgroundColor(tintColors[`primary${alpha}`]);
      setAlphaColor(() => tintColors[`primary${alpha}`]);
    }
  }, [color, alpha, getTextColorByBackgroundColor, getTintColorsByBackgroundColor]);
  
  return (
    <span ref={spanRef} className="color-code">
      {alphaColor.toUpperCase()}
    </span>
  )
}

export default ColorPalette