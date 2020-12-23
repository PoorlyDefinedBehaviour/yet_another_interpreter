import { Lexer } from "./lexer"
import {
  assign,
  bang,
  comma,
  eof,
  fn,
  greaterThan,
  identifier,
  leftBrace,
  leftParen,
  lessThan,
  letDeclaration,
  minus,
  number,
  plus,
  rightBrace,
  rightParen,
  semicolon,
  slash,
  star,
} from "./token"

describe("Lexer test suite", () => {
  test("can parse simple tokens", () => {
    const lexer = new Lexer("=+(){},;")

    const expectedTokens = [
      assign(),
      plus(),
      leftParen(),
      rightParen(),
      leftBrace(),
      rightBrace(),
      comma(),
      semicolon(),
    ]

    for (const token of expectedTokens) {
      expect(lexer.nextToken()).toEqual(token)
    }
  })

  test("can parse well formed source code", () => {
    const input = `
      let five = 5;
      let ten = 10;
      let add = fn(x, y) {
        x + y;
      }
      let result = add(five, ten);
      !-/*5;
      5 < 10 > 5;
    `
    const lexer = new Lexer(input)

    const expectedTokens = [
      letDeclaration(),
      identifier("five"),
      assign(),
      number("5"),
      semicolon(),
      letDeclaration(),
      identifier("ten"),
      assign(),
      number("10"),
      semicolon(),
      letDeclaration(),
      identifier("add"),
      assign(),
      fn("fn"),
      leftParen(),
      identifier("x"),
      comma(),
      identifier("y"),
      rightParen(),
      leftBrace(),
      identifier("x"),
      plus(),
      identifier("y"),
      semicolon(),
      rightBrace(),
      letDeclaration(),
      identifier("result"),
      assign(),
      identifier("add"),
      leftParen(),
      identifier("five"),
      comma(),
      identifier("ten"),
      rightParen(),
      semicolon(),
      bang(),
      minus(),
      slash(),
      star(),
      number("5"),
      semicolon(),
      number("5"),
      lessThan(),
      number("10"),
      greaterThan(),
      number("5"),
      semicolon(),
      eof(),
    ]

    for (const token of expectedTokens) {
      expect(lexer.nextToken()).toEqual(token)
    }
  })
})
