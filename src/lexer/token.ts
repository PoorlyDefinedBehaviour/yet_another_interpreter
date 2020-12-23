export enum TokenType {
  illegal = "illegal",
  eof = "eof",
  identifier = "identifier",
  number = "number",
  assign = "assign",
  plus = "plus",
  comma = "comma",
  semicolon = "semicolon",
  leftParen = "leftParen",
  rightParen = "rightParen",
  leftBrace = "leftBrace",
  rightBrace = "rightBrace",
  fn = "fn",
  let = "let",
}

export type Token =
  | { type: TokenType.identifier; value: string }
  | { type: TokenType.illegal; value: string }
  | { type: TokenType.eof }
  | { type: TokenType.number; value: string }
  | { type: TokenType.assign }
  | { type: TokenType.number }
  | { type: TokenType.comma }
  | { type: TokenType.semicolon }
  | { type: TokenType.leftParen }
  | { type: TokenType.rightParen }
  | { type: TokenType.leftBrace }
  | { type: TokenType.rightBrace }
  | { type: TokenType.fn; value: string }
  | { type: TokenType.let }
  | { type: TokenType.plus }

export const identifier = (value: string): Token => ({
  type: TokenType.identifier,
  value,
})

export const illegal = (value: string): Token => ({
  type: TokenType.illegal,
  value,
})

export const eof = (): Token => ({ type: TokenType.eof })

export const assign = (): Token => ({
  type: TokenType.assign,
})

export const number = (value: string): Token => ({
  type: TokenType.number,
  value,
})

export const comma = (): Token => ({ type: TokenType.comma })

export const semicolon = (): Token => ({ type: TokenType.semicolon })

export const leftParen = (): Token => ({ type: TokenType.leftParen })

export const rightParen = (): Token => ({ type: TokenType.rightParen })

export const leftBrace = (): Token => ({ type: TokenType.leftBrace })

export const rightBrace = (): Token => ({ type: TokenType.rightBrace })

export const fn = (functionName: string): Token => ({
  type: TokenType.fn,
  value: functionName,
})

export const letDeclaration = (): Token => ({
  type: TokenType.let,
})

export const plus = (): Token => ({ type: TokenType.plus })

export const lookupIdentifier = (ident: string): Token => {
  if (ident === TokenType.fn) {
    return fn(ident)
  }
  if (ident === TokenType.let) {
    return letDeclaration()
  }

  return identifier(ident)
}
