const sum = (a: number, b: number) => a + b;

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(true).toBe(true);
    expect(sum(2, 3)).toBe(5);
  });
});
