import { Token } from "../lexer"

type Node = {
  literal: () => string
}

type Statement = {
  node: Node
  statement: () => void
}

type Expression = {
  node: Node
  expression: () => void
}

export class Parser {
  public parse = (tokens: Token[]) => {}
}
