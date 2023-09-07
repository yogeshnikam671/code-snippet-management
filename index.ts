import { program } from "commander";
import * as fs from 'fs';
import * as os from 'os';
import termkit from 'terminal-kit';
import { addSnippet } from "./src/main/add-snippet";
import { searchSnippets } from "./src/main/search-snippets";

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

const setupExitKeyEvents = () => {
  term.on('key', function(name: string) {
    if (name === 'CTRL_C') process.exit();
  });
}

const parseFlags = () => {
  program
    .option("-A, --add <snippet_name_with_extension (example.js)>", "add a new code snippet")
    .option("-S, --search", "search code snippet/s")
    .parse();

  const options = program.opts();

  if (options.add) addSnippet(options.add);
  if(options.search) searchSnippets(term);
};


const main = () => {
  setupStoragePath();
  setupExitKeyEvents();
  parseFlags();
}

main();

