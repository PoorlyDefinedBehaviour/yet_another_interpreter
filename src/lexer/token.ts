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
  minus = "minus",
  bang = "bang",
  star = "star",
  slash = "slash",
  lessThan = "<",
  greaterThan = ">",
  true = "true",
  false = "false",
  if = "if",
  else = "else",
  return = "return",
  equal = "==",
  notEqual = "!=",
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
  | { type: TokenType.fn }
  | { type: TokenType.let }
  | { type: TokenType.plus }
  | { type: TokenType.minus }
  | { type: TokenType.slash }
  | { type: TokenType.star }
  | { type: TokenType.lessThan }
  | { type: TokenType.greaterThan }
  | { type: TokenType.bang }
  | { type: TokenType.true }
  | { type: TokenType.false }
  | { type: TokenType.if }
  | { type: TokenType.else }
  | { type: TokenType.return }
  | { type: TokenType.equal }
  | { type: TokenType.notEqual }

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

export const fn = (): Token => ({
  type: TokenType.fn,
})

export const letDeclaration = (): Token => ({
  type: TokenType.let,
})

export const plus = (): Token => ({ type: TokenType.plus })

export const minus = (): Token => ({ type: TokenType.minus })

export const slash = (): Token => ({ type: TokenType.slash })

export const star = (): Token => ({ type: TokenType.star })

export const lessThan = (): Token => ({ type: TokenType.lessThan })

export const greaterThan = (): Token => ({ type: TokenType.greaterThan })

export const bang = (): Token => ({ type: TokenType.bang })

export const bool = (value: TokenType.true | TokenType.false): Token => ({
  type: value,
})

export const ifExpression = (): Token => ({
  type: TokenType.if,
})

export const elseExpression = (): Token => ({
  type: TokenType.else,
})

export const returnStatement = (): Token => ({
  type: TokenType.return,
})

export const equal = (): Token => ({
  type: TokenType.equal,
})

export const notEqual = (): Token => ({
  type: TokenType.notEqual,
})

export const lookupIdentifier = (ident: string): Token => {
  if (ident === TokenType.fn) {
    return fn()
  }
  if (ident === TokenType.let) {
    return letDeclaration()
  }
  if (ident === TokenType.true || ident === TokenType.false) {
    return bool(ident)
  }
  if (ident === TokenType.if) {
    return ifExpression()
  }
  if (ident === TokenType.else) {
    return elseExpression()
  }
  if (ident === TokenType.return) {
    return returnStatement()
  }

  return identifier(ident)
}
