export function extendLine(
  startX: number,
  startY: number,
  intersectionX: number,
  intersectionY: number,
  lineLength: number,
) {
  // Calculate the direction vector
  const dx = intersectionX - startX;
  const dy = intersectionY - startY;

  // Calculate the magnitude of the vector
  const magnitude = Math.sqrt(dx * dx + dy * dy);

  // Normalize the vector
  const ndx = dx / magnitude;
  const ndy = dy / magnitude;

  // Calculate the end point
  const ex = intersectionX + ndx * lineLength;
  const ey = intersectionY + ndy * lineLength;

  return { ex, ey };
}
