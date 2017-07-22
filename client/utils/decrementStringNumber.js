function decrementStringNumber(number) {
  const n = number.toString(); // make sure n is a string
  const allButLast = n.substr(0, n.length - 1);
  const lastNumber = n.substr(n.length - 1);

  if (lastNumber === "0") {
    return `${decrementStringNumber(allButLast)}9`;
  }
  return allButLast + (parseInt(lastNumber, 10) - 1).toString();
}

export default decrementStringNumber;
