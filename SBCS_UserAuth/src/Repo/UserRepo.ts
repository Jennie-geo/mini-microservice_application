import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

let users: User[];

const filePath = resolve(`${__dirname}../../../usersDb.json`);

function getUserDb() {
  if (!users) {
    users = getUsersFromJSONFile();
  }
  return users;
}
function getUsersFromJSONFile() {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, '[]', 'utf8');
  }
  return JSON.parse(readFileSync(filePath, 'utf8').toString());
}

function updateUserDb() {
  writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function addUser(userDetails: User) {
  getUserDb().push(userDetails);
  updateUserDb();
  return userDetails;
}
function getUser(fieldName: keyof User, match: string): User | null {
  const db = getUserDb();
  const user = db.find((user) => user[fieldName] === match);
  if (!user) {
    return null;
  }

  return user;
}

function checkForFieldDuplicate(fieldName: keyof User, match: string): boolean {
  return getUserDb().some((user) => user[fieldName] === match);
}

export const userRepo = { getUser, addUser, checkForFieldDuplicate };
