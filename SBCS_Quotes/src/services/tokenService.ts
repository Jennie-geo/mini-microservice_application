import { Token, tokenRepo } from '../Repo';

function createToken(tokenDto: Token) {
  return tokenRepo.addToken(tokenDto);
}

function findById(userId: string) {
  return tokenRepo.getToken('token', userId);
}
export const TokenService = {
  createToken,
  findById,
};
