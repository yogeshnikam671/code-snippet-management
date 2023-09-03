import { program } from "commander";
import { addSnippet } from "./add-snippet";
import * as fs from 'fs';
import * as os from 'os';

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
    .parse();

  const options = program.opts();

  if (options.add) addSnippet(options.add);
};


const main = () => {
  setupStoragePath();
  parseFlags();
}

main();

