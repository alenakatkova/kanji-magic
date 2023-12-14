import { kanjiByPronunciationAndRadicals } from "./data/kanjiByPronunciationAndRadicals.ts";
import "./App.css";
import { calculatePosition } from "./utils/calculatePosition.ts";
import { SVG, MAIN_CIRCLE } from "./utils/constants.ts";
import { Positions } from "./utils/types.ts";
// import MultipleRadicalsSchemeV1 from "./components/MultipleRadicalsSchemeV1.tsx";
import MultipleRadicalsSchemeV2 from "./components/MultipleRadicalsSchemeV2.tsx";

function App() {
  return (
    <>
      {kanjiByPronunciationAndRadicals.map((pronunciation) => (
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
              <MultipleRadicalsSchemeV2
                kanjiByPronunciationAndRadicals={pronunciation}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
