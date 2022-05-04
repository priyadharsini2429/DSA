// 0 1 1 2 3 5 8 13 21.....
// f(n) => f(n-1) + f(n-2)

(function withoutMemoization() {
  const GetFibonacci = (n) => {
    if (n <= 1) {
      return n;
    }

    return GetFibonacci(n - 1) + GetFibonacci(n - 2);
  };

  const output = GetFibonacci(6);
  console.log("Without memoization ", output);
})();

(function withMemoization() {
  const GetFibonacci = (n, res = [0, 1, 1]) => {
    if (res[n]) {
      return res[n];
    }

    res[n] = GetFibonacci(n - 1, res) + GetFibonacci(n - 2, res);
    return res[n];
  };

  const output = GetFibonacci(7);
  console.log("With memoization ", output);
})();
