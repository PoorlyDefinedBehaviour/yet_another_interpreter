import { Lexer } from "../lexer"

describe("Parser test suite", () => {
  test("let statements", () => {
    const input = `
      let x = 5;
      let y = 10;
      let foobar = 837;
    `

    const lexer = new Lexer(input)
  })
})
