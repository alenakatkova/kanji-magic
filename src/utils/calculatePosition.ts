import { Positions } from "./types.ts";

function getAngleInRadians(amountOfElements: number, index: number) {
  const angle = (360 / amountOfElements) * index;
  return (angle * Math.PI) / 180 + 2;
}

export function calculatePosition(
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
