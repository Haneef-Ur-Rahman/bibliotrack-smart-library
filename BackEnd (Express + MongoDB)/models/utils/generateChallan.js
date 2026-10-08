const generateChallan = (cnic, issueId) => {
  const reverseCNIC = cnic.split("").reverse().join("");
  const suffix = issueId.toString().slice(-4);

  return `${reverseCNIC}-${suffix}`;
};

module.exports = generateChallan;
