import { SVG, MAIN_CIRCLE, colors } from "../utils/constants.ts";
import { KanjiByPronunciationAndRadicals, Positions } from "../utils/types.ts";
import { calculatePosition } from "../utils/calculatePosition.ts";
import RadicalSVGElement from "./RadicalSVGElement.tsx";
import { useEffect, useState } from "react";

interface Props {
  kanjiByPronunciationAndRadicals: KanjiByPronunciationAndRadicals;
}

function MultipleRadicalsSchemeV1({ kanjiByPronunciationAndRadicals }: Props) {
  const [colorScheme, setColorScheme] = useState({
    background: "black",
    text: "black",
  });
  function getCircleColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  useEffect(() => {
    setColorScheme(getCircleColor);
  }, []);

  return (
    <svg
      viewBox={`0 0 ${SVG.WIDTH} ${SVG.HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={MAIN_CIRCLE.CX}
        cy={MAIN_CIRCLE.CY}
        r={MAIN_CIRCLE.RADIUS}
        fill={colorScheme.background}
      />
      <circle
        cx={MAIN_CIRCLE.CX}
        cy={MAIN_CIRCLE.CY}
        r={MAIN_CIRCLE.RADIUS - 5}
        fill={"white"}
      />
      <circle
        cx={MAIN_CIRCLE.CX}
        cy={MAIN_CIRCLE.CY}
        r={MAIN_CIRCLE.RADIUS - 10}
        fill={colorScheme.background}
      />

      {kanjiByPronunciationAndRadicals.radicals.map((radical, index) => (
        <RadicalSVGElement
          key={radical.base}
          radical={radical}
          startLinePosition={{
            x: calculatePosition(
              Positions.X,
              kanjiByPronunciationAndRadicals.radicals.length,
              index,
              MAIN_CIRCLE.RADIUS,
              MAIN_CIRCLE.CX,
            ),
            y: calculatePosition(
              Positions.Y,
              kanjiByPronunciationAndRadicals.radicals.length,
              index,
              MAIN_CIRCLE.RADIUS,
              MAIN_CIRCLE.CY,
            ),
          }}
          mainCircleCenterPosition={{ x: MAIN_CIRCLE.CX, y: MAIN_CIRCLE.CY }}
          colorScheme={colorScheme}
        />
      ))}
      <text
        x={MAIN_CIRCLE.CX}
        y={MAIN_CIRCLE.CY + MAIN_CIRCLE.TEXT_SIZE / 2 - 5}
        textAnchor="middle"
        fill={getCircleColor().text}
        fontSize={MAIN_CIRCLE.TEXT_SIZE}
        style={{ fontWeight: 600 }}
      >
        {kanjiByPronunciationAndRadicals.pronunciation}
      </text>
    </svg>
  );
}

export default MultipleRadicalsSchemeV1;
