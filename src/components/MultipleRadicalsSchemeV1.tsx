import { SVG, MAIN_CIRCLE, SUB_CIRCLE } from "../utils/constants.ts";
import { KanjiByPronunciationAndRadicals, Positions } from "../utils/types.ts";
import { calculatePosition } from "../utils/calculatePosition.ts";

interface Props {
  kanjiByPronunciationAndRadicals: KanjiByPronunciationAndRadicals;
}

function MultipleRadicalsSchemeV1({ kanjiByPronunciationAndRadicals }: Props) {
  return (
    <svg
      viewBox={`0 0 ${SVG.WIDTH} ${SVG.HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={MAIN_CIRCLE.CX}
        cy={MAIN_CIRCLE.CY}
        r={MAIN_CIRCLE.RADIUS}
        fill={MAIN_CIRCLE.FILL}
        stroke={MAIN_CIRCLE.STROKE_COLOR}
        strokeWidth={MAIN_CIRCLE.STROKE_WIDTH}
      />
      <text x={MAIN_CIRCLE.CX} y={MAIN_CIRCLE.CY} textAnchor="middle">
        {kanjiByPronunciationAndRadicals.pronunciation}
      </text>
      {kanjiByPronunciationAndRadicals.radicals.map((radical, index) => (
        <g key={radical.base}>
          <text
            x={calculatePosition(
              Positions.X,
              kanjiByPronunciationAndRadicals.radicals.length,
              index,
              MAIN_CIRCLE.RADIUS,
              MAIN_CIRCLE.CX,
            )}
            y={calculatePosition(
              Positions.Y,
              kanjiByPronunciationAndRadicals.radicals.length,
              index,
              MAIN_CIRCLE.RADIUS,
              MAIN_CIRCLE.CY,
            )}
            textAnchor="middle"
          >
            {radical.base}
          </text>
          <circle
            cx={calculatePosition(
              Positions.X,
              kanjiByPronunciationAndRadicals.radicals.length,
              index,
              MAIN_CIRCLE.RADIUS,
              MAIN_CIRCLE.CX,
            )}
            cy={calculatePosition(
              Positions.Y,
              kanjiByPronunciationAndRadicals.radicals.length,
              index,
              MAIN_CIRCLE.RADIUS,
              MAIN_CIRCLE.CY,
            )}
            r={SUB_CIRCLE.RADIUS}
            stroke={SUB_CIRCLE.STROKE_COLOR}
            fill={SUB_CIRCLE.FILL}
            strokeWidth={SUB_CIRCLE.STROKE_WIDTH}
          />
          {radical.includedIn.map((word, i) => (
            <g key={word.kanji}>
              <text
                x={calculatePosition(
                  Positions.X,
                  radical.includedIn.length,
                  i,
                  SUB_CIRCLE.RADIUS,
                  calculatePosition(
                    Positions.X,
                    kanjiByPronunciationAndRadicals.radicals.length,
                    index,
                    MAIN_CIRCLE.RADIUS,
                    MAIN_CIRCLE.CX,
                  ),
                )}
                y={calculatePosition(
                  Positions.Y,
                  radical.includedIn.length,
                  i,
                  SUB_CIRCLE.RADIUS,
                  calculatePosition(
                    Positions.Y,
                    kanjiByPronunciationAndRadicals.radicals.length,
                    index,
                    MAIN_CIRCLE.RADIUS,
                    MAIN_CIRCLE.CY,
                  ),
                )}
                textAnchor="middle"
              >
                {word.kanji}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

export default MultipleRadicalsSchemeV1;
