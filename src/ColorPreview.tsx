import React, { useCallback, useEffect, useRef } from 'react';
import { State } from './ColorContainer';

interface Props {
  state: State;
}

const ColorPreview = ({ state }: Props) => {
  const { color } = state;
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

  useEffect(() => {
    if (spanRef && spanRef.current) {
      spanRef.current.style.backgroundColor = color;
      spanRef.current.style.color = getTextColorByBackgroundColor(color);
    }
  }, [color, getTextColorByBackgroundColor]);

  return (
    <div className="color-preview">
      color preview
      <span ref={spanRef} className="color-code">
        {color.toUpperCase()}
      </span>
    </div>
  );
};

export default ColorPreview;
