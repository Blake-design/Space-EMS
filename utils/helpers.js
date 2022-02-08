module.exports = {
  limit: (array, max) => {
    // limit the amount returned by #each
    for (var i; i < max; i++) {
      return array[i];
    }
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};
