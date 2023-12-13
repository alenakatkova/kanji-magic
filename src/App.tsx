import { pronunciations } from "./data/pronunciations.ts";
import "./App.css";

const SVG = {
  WIDTH: 600,
  HEIGHT: 600,
  MAIN_CIRCLE_R: 200,
};

const MAIN_CIRCLE = {
  RADIUS: 200,
  CX: SVG.WIDTH / 2,
  CY: SVG.HEIGHT / 2,
  STROKE_WIDTH: 10,
  STROKE_COLOR: "red",
  FILL: "transparent",
};

const SUB_CIRCLE = {
  RADIUS: MAIN_CIRCLE.RADIUS / 2.5,
  STROKE_WIDTH: 10,
  STROKE_COLOR: "red",
  FILL: "transparent",
};

function getAngleInRadians(amountOfElements: number, index: number) {
  const angle = (360 / amountOfElements) * index;
  return (angle * Math.PI) / 180;
}
function getXPositionOnMainCircle(
  amountOfElements: number,
  index: number,
  radius: number,
) {
  const radians = getAngleInRadians(amountOfElements, index);
  return MAIN_CIRCLE.CX + radius * Math.cos(radians);
}

function getXPositionOnSubCircle(
  amountOfElements: number,
  index: number,
  radius: number,
  subCircleCX: number,
) {
  console.log(amountOfElements, index, radius, subCircleCX);
  const radians = getAngleInRadians(amountOfElements, index);
  console.log(radians);
  return subCircleCX + radius * Math.cos(radians);
}

function getYPositionOnSubCircle(
  amountOfElements: number,
  index: number,
  radius: number,
  subCircleCY: number,
) {
  let offset;
  if (index === 0 || index === amountOfElements / 2) {
    offset = 0;
  } else if (index < amountOfElements / 2) {
    offset = subCircleCY;
  } else {
    offset = -subCircleCY;
  }
  const radians = getAngleInRadians(amountOfElements, index);
  console.log(radians);
  return subCircleCY + radius * Math.sin(radians);
}

function getYPositionOnMainCircle(
  amountOfElements: number,
  index: number,
  radius: number,
) {
  const radians = getAngleInRadians(amountOfElements, index);
  return MAIN_CIRCLE.CY + radius * Math.sin(radians);
}
function App() {
  return (
    <>
      {pronunciations.map((pronunciation) => (
        <div
          key={pronunciation.pronunciation}
          style={{ boxSizing: "border-box", width: SVG.WIDTH }}
        >
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
              {pronunciation.pronunciation}
            </text>
            {pronunciation.radicals.map((radical, index) => (
              <g key={radical.base}>
                <text
                  x={getXPositionOnMainCircle(
                    pronunciation.radicals.length,
                    index,
                    MAIN_CIRCLE.RADIUS,
                  )}
                  y={getYPositionOnMainCircle(
                    pronunciation.radicals.length,
                    index,
                    MAIN_CIRCLE.RADIUS,
                  )}
                  textAnchor="middle"
                >
                  {radical.base}
                </text>
                <circle
                  cx={getXPositionOnMainCircle(
                    pronunciation.radicals.length,
                    index,
                    MAIN_CIRCLE.RADIUS,
                  )}
                  cy={getYPositionOnMainCircle(
                    pronunciation.radicals.length,
                    index,
                    MAIN_CIRCLE.RADIUS,
                  )}
                  r={SUB_CIRCLE.RADIUS}
                  stroke={SUB_CIRCLE.STROKE_COLOR}
                  fill={SUB_CIRCLE.FILL}
                  strokeWidth={SUB_CIRCLE.STROKE_WIDTH}
                />
                {radical.includedIn.map((word, i) => (
                  <g key={word}>
                    <text
                      x={getXPositionOnSubCircle(
                        radical.includedIn.length,
                        i,
                        SUB_CIRCLE.RADIUS,
                        getXPositionOnMainCircle(
                          pronunciation.radicals.length,
                          index,
                          MAIN_CIRCLE.RADIUS,
                        ),
                      )}
                      y={getYPositionOnSubCircle(
                        radical.includedIn.length,
                        i,
                        SUB_CIRCLE.RADIUS,
                        getYPositionOnMainCircle(
                          pronunciation.radicals.length,
                          index,
                          MAIN_CIRCLE.RADIUS,
                        ),
                      )}
                      textAnchor="middle"
                    >
                      {word}
                    </text>
                  </g>
                ))}
              </g>
            ))}
          </svg>
        </div>
      ))}
    </>
  );
}

export default App;
