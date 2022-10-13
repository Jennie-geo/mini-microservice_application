import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let tokens: string[];

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
function addToken(token: string) {
  getTokenDb().push(token);
  updateTokenDb();
  return token;
}

function getToken(match: string) {
  const db = getTokenDb();
  const token = db.filter((token) => token === match.split(' ')[1]);
  if (token.length < 1) {
    throw Error("you can't access this endpoint, your token doesn't match.");
  }
  return token;
}

export const tokenRepo = { getToken, addToken };
