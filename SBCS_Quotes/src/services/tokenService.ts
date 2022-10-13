import { tokenRepo } from '../Repo';

function createToken(tokenDto: string) {
  return tokenRepo.addToken(tokenDto);
}

export const TokenService = {
  createToken,
};
