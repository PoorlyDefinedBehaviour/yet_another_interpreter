import readlineSync from "readline-sync"
import { Lexer, TokenType } from "../lexer"

const evaluate = (sourceCode: string): void => {
  const lexer = new Lexer(sourceCode)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const token = lexer.nextToken()

    // eslint-disable-next-line no-console
    console.log(token)

    if (token.type === TokenType.eof) {
      return
    }
  }
}

export const loop = (): never => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    evaluate(readlineSync.question("$> "))
  }
}
