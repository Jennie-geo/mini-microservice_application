import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export interface Token {
  token: string;
}

let tokens: Token[];

const filePath = resolve(`${__dirname}../../../tokensDb.json`);
function getTokenDb() {
  if (!tokens) {
    tokens = getTokenFromJSONFile();
  }
  return tokens;
}

function getTokenFromJSONFile() {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, '[]', 'utf8');
  }
  return JSON.parse(readFileSync(filePath, 'utf8').toString());
}

function updateTokenDb() {
  writeFileSync(filePath, JSON.stringify(tokens, null, 2));
}
function addToken(token: Token) {
  getTokenDb().push(token);
  updateTokenDb();
  return token;
}

function getToken(tokenName: keyof Token, match: string) {
  const db = getTokenDb();
  console.log('get db', db);
  const token = db.find((token) => token[tokenName] == match);
  console.log('DB.FIND.METHOD', token);
  if (!token) {
    return null;
  }
  return token;
}

export const tokenRepo = { getToken, addToken };
