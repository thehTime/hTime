export function divide(dividend: number, divisor: number): number {
  return dividend / divisor;
}

export function divideAndRound(dividend: number, divisor: number): number {
  return Math.round(divide(dividend, divisor));
}

export function divideAndFloor(dividend: number, divisor: number): number {
  const quotient = divide(dividend, divisor);
  return quotient < 0 ? Math.ceil(quotient) : Math.floor(quotient);
}

export function divideAndCeil(dividend: number, divisor: number): number {
  const quotient = divide(dividend, divisor);
  return quotient < 0 ? Math.floor(quotient) : Math.ceil(quotient);
}

export function divideRemainder(dividend: number, divisor: number): number {
  return dividend % divisor;
}
