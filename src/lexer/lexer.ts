import {
  assign,
  comma,
  eof,
  greaterThan,
  illegal,
  leftBrace,
  leftParen,
  lessThan,
  lookupIdentifier,
  minus,
  number,
  plus,
  rightBrace,
  rightParen,
  semicolon,
  slash,
  star,
  bang,
  Token,
  equal,
  notEqual,
} from "./token"

export class Lexer {
  private position = 0

  private nextPosition = 0

  private currentCharacter: string

  constructor(private readonly sourceCode: string) {
    this.readCharacter()
  }

  private readCharacter = () => {
    this.currentCharacter =
      this.nextPosition >= this.sourceCode.length
        ? ""
        : this.sourceCode[this.nextPosition]

    this.position = this.nextPosition

    this.nextPosition += 1
  }

  private isAlpha = (character: string) =>
    (character >= "a" && character <= "z") ||
    (character >= "A" && character <= "Z") ||
    character === "_" ||
    character === "?" ||
    character === "!"

  private readIdentifier = () => {
    const identifierStartsAt = this.position

    while (this.isAlpha(this.currentCharacter)) {
      this.readCharacter()
    }

    return this.sourceCode.slice(identifierStartsAt, this.position)
  }

  private skipWhitespace = () => {
    const whitespaceCharacters = [" ", "\t", "\n", "\r"]

    while (whitespaceCharacters.includes(this.currentCharacter)) {
      this.readCharacter()
    }
  }

  private isNumber = (character: string) => character >= "0" && character <= "9"

  private readNumber = () => {
    const numberStartsAt = this.position

    while (this.isNumber(this.currentCharacter)) {
      this.readCharacter()
    }

    return this.sourceCode.slice(numberStartsAt, this.position)
  }

  private peekCharacter = (offset = 0) => {
    if (this.nextPosition >= this.sourceCode.length) {
      return ""
    }

    return this.sourceCode[this.nextPosition + offset]
  }

  public nextToken = (): Token => {
    let token: Token

    this.skipWhitespace()

    if (this.currentCharacter === "=") {
      if (this.peekCharacter() === "=") {
        this.readCharacter()
        token = equal()
      } else {
        token = assign()
      }
    } else if (this.currentCharacter === ";") {
      token = semicolon()
    } else if (this.currentCharacter === "(") {
      token = leftParen()
    } else if (this.currentCharacter === ")") {
      token = rightParen()
    } else if (this.currentCharacter === ",") {
      token = comma()
    } else if (this.currentCharacter === "+") {
      token = plus()
    } else if (this.currentCharacter === "{") {
      token = leftBrace()
    } else if (this.currentCharacter === "}") {
      token = rightBrace()
    } else if (this.currentCharacter === "-") {
      token = minus()
    } else if (this.currentCharacter === "*") {
      token = star()
    } else if (this.currentCharacter === "/") {
      token = slash()
    } else if (this.currentCharacter === "<") {
      token = lessThan()
    } else if (this.currentCharacter === ">") {
      token = greaterThan()
    } else if (this.currentCharacter === "!") {
      if (this.peekCharacter() === "=") {
        this.readCharacter()
        token = notEqual()
      } else {
        token = bang()
      }
    } else if (this.currentCharacter === "") {
      token = eof()
    } else {
      if (this.isAlpha(this.currentCharacter)) {
        return lookupIdentifier(this.readIdentifier())
      }
      if (this.isNumber(this.currentCharacter)) {
        return number(this.readNumber())
      }

      return illegal(this.currentCharacter)
    }

    this.readCharacter()

    return token
  }
}
