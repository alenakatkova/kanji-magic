import { pronunciations } from "./data/pronunciations.ts";
import "./App.css";

const SVG = {
  WIDTH: 600,
  HEIGHT: 600,
  MAIN_CIRCLE_R: 200,
};

const MAIN_CIRCLE = {
  RADIUS: 180,
  CX: SVG.WIDTH / 2,
  CY: SVG.HEIGHT / 2,
  STROKE_WIDTH: 10,
  STROKE_COLOR: "lightgray",
  FILL: "transparent",
};

const SUB_CIRCLE = {
  RADIUS: MAIN_CIRCLE.RADIUS / 2,
  STROKE_WIDTH: 10,
  STROKE_COLOR: "lightgray",
  FILL: "transparent",
};

function getAngleInRadians(amountOfElements: number, index: number) {
  const angle = (360 / amountOfElements) * index;
  return (angle * Math.PI) / 180;
}

enum Positions {
  X,
  Y,
}

function calculatePosition(
  position: Positions,
  amountOfElements: number,
  index: number,
  radius: number,
  circleCenter: number,
) {
  const radians = getAngleInRadians(amountOfElements, index);
  return position === Positions.X
    ? circleCenter + radius * Math.cos(radians)
    : circleCenter + radius * Math.sin(radians);
}

function App() {
  return (
    <>
      {pronunciations.map((pronunciation) => (
        <div
          key={pronunciation.pronunciation}
          style={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            borderTop: "10px solid lightgray",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
          }}
        >
          <div>
            <h2>Pronunciation: {pronunciation.pronunciation}</h2>
            <ol>
              {pronunciation.radicals.map((radical) => (
                <li>
                  {radical.base}
                  <ul>
                    {radical.includedIn.map((kanji) => (
                      <li>{kanji.kanji}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <div style={{ width: "40%" }}>
            {pronunciation.radicals.length === 1 ? (
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
                <text
                  x={MAIN_CIRCLE.CX}
                  y={MAIN_CIRCLE.CY + 20}
                  textAnchor="middle"
                >
                  {pronunciation.radicals[0].base}
                </text>
                <text
                  x={MAIN_CIRCLE.CX}
                  y={MAIN_CIRCLE.CY - 20}
                  textAnchor="middle"
                >
                  ({pronunciation.pronunciation})
                </text>

                {pronunciation.radicals[0].includedIn.map((radical, index) => (
                  <g key={radical.kanji}>
                    <text
                      x={calculatePosition(
                        Positions.X,
                        pronunciation.radicals[0].includedIn.length,
                        index,
                        MAIN_CIRCLE.RADIUS,
                        MAIN_CIRCLE.CX,
                      )}
                      y={calculatePosition(
                        Positions.Y,
                        pronunciation.radicals[0].includedIn.length,
                        index,
                        MAIN_CIRCLE.RADIUS,
                        MAIN_CIRCLE.CY,
                      )}
                      textAnchor="middle"
                    >
                      {radical.kanji}
                    </text>
                  </g>
                ))}
              </svg>
            ) : (
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
                      x={calculatePosition(
                        Positions.X,
                        pronunciation.radicals.length,
                        index,
                        MAIN_CIRCLE.RADIUS,
                        MAIN_CIRCLE.CX,
                      )}
                      y={calculatePosition(
                        Positions.Y,
                        pronunciation.radicals.length,
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
                        pronunciation.radicals.length,
                        index,
                        MAIN_CIRCLE.RADIUS,
                        MAIN_CIRCLE.CX,
                      )}
                      cy={calculatePosition(
                        Positions.Y,
                        pronunciation.radicals.length,
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
                              pronunciation.radicals.length,
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
                              pronunciation.radicals.length,
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
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
