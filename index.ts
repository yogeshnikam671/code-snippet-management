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
    .option("-SC", "--search-copy", "search code snippet and copy to clipboard")
    .option("-SE", "--search-edit", "search code snippet and edit")
    .option("-SD", "--search-delete", "search code snippet and delete")
    .option("-SV", "--search-view", "search code snippet and display")
    .parse();

  const options = program.opts();
  
  if (options.add) addSnippet(options.add);
  if (options.search === true) searchSnippets();
  if (options.SC === true) searchSnippets('copy');
  if (options.SE === true) searchSnippets('edit');
  if (options.SD === true) searchSnippets('delete');
  if (options.SV === true) searchSnippets('view');
};


const main = () => {
  setupStoragePath();
  setupExitKeyEvents();
  parseFlags();
}

main();

