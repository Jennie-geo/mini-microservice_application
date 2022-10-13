import { User, userRepo } from '../Repo';

function createUser(userDto: User) {
  return userRepo.addUser(userDto);
}

function findById(userId: string): User | null {
  return userRepo.getUser('id', userId);
}

function findByEmail(email: string): User | null {
  return userRepo.getUser('email', email);
}

function emailExists(email: string): boolean {
  return userRepo.checkForFieldDuplicate('email', email);
}

function idExists(id: string): boolean {
  return userRepo.checkForFieldDuplicate('id', id);
}

export const userService = {
  createUser,
  findById,
  emailExists,
  idExists,
  findByEmail,
};
