import { program } from "commander";
import * as fs from 'fs';
import * as os from 'os';
import termkit from 'terminal-kit';
import { addSnippet } from "./src/add-snippet";
import { listSnippets } from "./src/list-snippets";

const term = termkit.terminal;

const setupStoragePath = () => {
  const path = `${os.homedir()}/.code-snippets`;
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (e) {
    console.log("Error occurred while setting up the storage path: ", e);
  }
}

const parseFlags = () => {
  program
    .option("-A, --add <snippet_name_with_extension (example.js)>", "add a new code snippet")
    .option("-L, --list", "list all code snippets")
    .parse();

  const options = program.opts();

  if (options.add) addSnippet(options.add);
  if(options.list) listSnippets(term);
};


const main = () => {
  setupStoragePath();
  parseFlags();
}

main();

