const isPrimeNumber = (n) => {
  for (var i = 2; i < n; i++) {
    console.log(i, "sebelum if");
    if (n % i === 0) return false;
  }
  return n > 1;
};

console.log(isPrimeNumber(33));
