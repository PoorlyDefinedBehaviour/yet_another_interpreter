import { Lexer } from "./lexer"
import {
  assign,
  bang,
  bool,
  comma,
  elseExpression,
  eof,
  equal,
  fn,
  greaterThan,
  identifier,
  ifExpression,
  leftBrace,
  leftParen,
  lessThan,
  letDeclaration,
  minus,
  notEqual,
  number,
  plus,
  returnStatement,
  rightBrace,
  rightParen,
  semicolon,
  slash,
  star,
  TokenType,
} from "./token"

describe("Lexer test suite", () => {
  test("can tokenize simple tokens", () => {
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

  test("can tokenize source code", () => {
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
      fn(),
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

  test("if expressions", () => {
    const input = `
      if(5 < 10){
        true;
      } else {
        false;
      }
    `

    const lexer = new Lexer(input)

    const expectedTokens = [
      ifExpression(),
      leftParen(),
      number("5"),
      lessThan(),
      number("10"),
      rightParen(),
      leftBrace(),
      bool(TokenType.true),
      semicolon(),
      rightBrace(),
      elseExpression(),
      leftBrace(),
      bool(TokenType.false),
      semicolon(),
      rightBrace(),
      eof(),
    ]

    for (const token of expectedTokens) {
      expect(lexer.nextToken()).toEqual(token)
    }
  })

  test("return", () => {
    const input = `
    if(5 < 10){
      return true;
    } else {
      return false;
    }

    return 32;
  `

    const lexer = new Lexer(input)

    const expectedTokens = [
      ifExpression(),
      leftParen(),
      number("5"),
      lessThan(),
      number("10"),
      rightParen(),
      leftBrace(),
      returnStatement(),
      bool(TokenType.true),
      semicolon(),
      rightBrace(),
      elseExpression(),
      leftBrace(),
      returnStatement(),
      bool(TokenType.false),
      semicolon(),
      rightBrace(),
      returnStatement(),
      number("32"),
      semicolon(),
      eof(),
    ]

    for (const token of expectedTokens) {
      expect(lexer.nextToken()).toEqual(token)
    }
  })

  test("tokens that are more than one character", () => {
    const input = `
      10 == 10;
      10 != 9;
    `

    const lexer = new Lexer(input)

    const expectedTokens = [
      number("10"),
      equal(),
      number("10"),
      semicolon(),
      number("10"),
      notEqual(),
      number("9"),
      semicolon(),
      eof(),
    ]

    for (const token of expectedTokens) {
      expect(lexer.nextToken()).toEqual(token)
    }
  })
})
