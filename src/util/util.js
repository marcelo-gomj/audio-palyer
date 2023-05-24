import * as R from "ramda";

const addZeroPad = number => (number + "").padStart(2, "0");

export const calcDuration = R.pipe(
   R.juxt([R.divide(R.__, 60), R.modulo(R.__, 60)]),
   R.map(R.pipe(Math.trunc, addZeroPad)),
   R.join(":")
);