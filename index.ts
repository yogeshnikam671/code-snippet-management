import { program } from "commander";
import * as fs from 'fs';
import { addSnippet } from "./src/main/add-snippet";
import { searchSnippets } from "./src/main/search-snippets";
import { snippetPath, term } from "./src/main/utils/utils";

const setupStoragePath = () => {
  try {
    if (!fs.existsSync(snippetPath)) {
      fs.mkdirSync(snippetPath);
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
  if (options.search) searchSnippets();
};


const main = () => {
  setupStoragePath();
  setupExitKeyEvents();
  parseFlags();
}

main();

