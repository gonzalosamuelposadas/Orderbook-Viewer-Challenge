import { calculateLevels } from "../calculateLevels";

describe("calculateLevels", () => {
  it("accumulates total correctly", () => {
    const input: [string, string][] = [
      ["100", "1"],
      ["101", "2"],
    ];

    const result = calculateLevels(input);

    expect(result[1].total).toBe(3);
  });
});
