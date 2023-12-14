import { ColorScheme, Coordinates, Kanji } from "../utils/types.ts";
import { useEffect, useState } from "react";
import { KANJI, RADICAL } from "../utils/constants.ts";
import { extendLine } from "../utils/extendLine.ts";

interface Props {
  kanji: Kanji;
  startLinePosition: Coordinates;
  mainCircleCenterPosition: Coordinates;
  colorScheme: ColorScheme;
}
function KanjiSVGElement({
  kanji,
  colorScheme,
  startLinePosition,
  mainCircleCenterPosition,
}: Props) {
  const [endLineY, setEndLineY] = useState(0);
  const [endLineX, setEndLineX] = useState(0);

  useEffect(() => {
    const { ex, ey } = extendLine(
      mainCircleCenterPosition.x,
      mainCircleCenterPosition.y,
      startLinePosition.x,
      startLinePosition.y,
      KANJI.ARROW_LENGTH,
    );

    setEndLineX(ex);
    setEndLineY(ey);
  }, [startLinePosition, mainCircleCenterPosition]);
  return (
    <g>
      <line
        x1={startLinePosition.x}
        y1={startLinePosition.y}
        x2={endLineX}
        y2={endLineY}
        stroke={colorScheme.background}
        strokeWidth={KANJI.LINE_WIDTH}
      />
      <circle
        cx={endLineX}
        cy={endLineY}
        r={KANJI.CIRCLE_RADIUS}
        fill={colorScheme.background}
      />
      <text
        x={endLineX}
        y={endLineY + RADICAL.FONT_SIZE / 2 - 10}
        textAnchor="middle"
        fill={colorScheme.text}
        fontSize={KANJI.FONT_SIZE}
      >
        {kanji.kanji}
      </text>
    </g>
  );
}

export default KanjiSVGElement;
