import {
  ColorScheme,
  Coordinates,
  Positions,
  Radical,
} from "../utils/types.ts";
import { useEffect, useState } from "react";
import { RADICAL } from "../utils/constants.ts";
import KanjiSVGElement from "./KanjiSVGElement.tsx";
import { calculatePosition } from "../utils/calculatePosition.ts";
import { extendLine } from "../utils/extendLine.ts";

interface Props {
  radical: Radical;
  startLinePosition: Coordinates;
  mainCircleCenterPosition: Coordinates;
  colorScheme: ColorScheme;
}
function RadicalSVGElement({
  radical,
  colorScheme,
  startLinePosition,
  mainCircleCenterPosition,
}: Props) {
  const [circleCenterY, setCircleCenterY] = useState(0);
  const [circleCenterX, setCircleCenterX] = useState(0);

  useEffect(() => {
    const { ex, ey } = extendLine(
      mainCircleCenterPosition.x,
      mainCircleCenterPosition.y,
      startLinePosition.x,
      startLinePosition.y,
      RADICAL.ARROW_LENGTH,
    );

    setCircleCenterX(ex);
    setCircleCenterY(ey);
  }, [startLinePosition, mainCircleCenterPosition]);
  return (
    <g key={radical.base}>
      <line
        x1={startLinePosition.x}
        y1={startLinePosition.y}
        x2={circleCenterX}
        y2={circleCenterY}
        stroke={colorScheme.background}
        strokeWidth={RADICAL.LINE_WIDTH}
      />
      <circle
        cx={circleCenterX}
        cy={circleCenterY}
        r={RADICAL.CIRCLE_RADIUS}
        fill={colorScheme.background}
      />

      <text
        x={circleCenterX}
        y={circleCenterY - RADICAL.FONT_SIZE}
        textAnchor="middle"
        fill={colorScheme.text}
        fontSize={RADICAL.FONT_SIZE}
      >
        {radical.base}
      </text>
      {radical.keyword && (
        <text
          x={circleCenterX}
          y={circleCenterY + RADICAL.FONT_SIZE * 0.3}
          textAnchor="middle"
          fill={colorScheme.text}
          fontSize={RADICAL.FONT_SIZE}
          fontWeight={600}
        >
          {radical.keyword}
        </text>
      )}
      {radical.keywordPronunciation && (
        <text
          x={circleCenterX}
          y={circleCenterY + RADICAL.FONT_SIZE * 1.2}
          textAnchor="middle"
          fill={colorScheme.text}
          fontSize={RADICAL.FONT_SIZE - 20}
        >
          ({radical.keywordPronunciation})
        </text>
      )}

      {radical.includedIn.map((kanji, i) => (
        <KanjiSVGElement
          key={kanji.kanji}
          kanji={kanji}
          colorScheme={colorScheme}
          startLinePosition={{
            x: calculatePosition(
              Positions.X,
              radical.includedIn.length,
              i,
              RADICAL.CIRCLE_RADIUS,
              circleCenterX,
            ),
            y: calculatePosition(
              Positions.Y,
              radical.includedIn.length,
              i,
              RADICAL.CIRCLE_RADIUS,
              circleCenterY,
            ),
          }}
          mainCircleCenterPosition={{ x: circleCenterX, y: circleCenterY }}
        />
      ))}
    </g>
  );
}

export default RadicalSVGElement;
