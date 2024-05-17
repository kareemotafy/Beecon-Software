const convertToDb = (reading, reference = 1) => {
  return 20 * Math.log10(reading / reference).toPrecision(2);
};

export { convertToDb };
