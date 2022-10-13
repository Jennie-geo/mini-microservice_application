import { Token, tokenRepo } from '../Repo';

function createToken(tokenDto: Token) {
  return tokenRepo.addToken(tokenDto);
}

export const TokenService = {
  createToken,
};
