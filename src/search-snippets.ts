import { Terminal } from 'terminal-kit';
import * as fs from 'fs';
import * as os from 'os';
import { openVim } from './utils/utils';

const snippetPath = `${os.homedir()}/.code-snippets`;

export const searchSnippets = (term: Terminal) => {
  let files = fs.readdirSync(snippetPath);
  term.clear();
  if (!files.length) {
    handleNoSnippetsError(term);
    process.exit();
  }

  term.white("\nPress TAB without entering anything to view full list\n");
  term.white("\nSearch for a snippet (Use TAB for autocompletion): ");
  term.inputField({ autoComplete: files, autoCompleteMenu: true }, (error, input) => {
    if (error) {
      term.red("Error occurred while listing the snippets: " + error);
      process.exit();
    }
    const validFile = files.includes(input || "");
    if (!validFile) {
      term.red("\n\nNo such snippet exists\n\n");
      process.exit();
    }
    if (validFile) {
      displayActionsForSelectedFile(term, input || "");
    }
  });

};

const handleNoSnippetsError = (term: Terminal) => {
  term.red("No snippets found\n");
  term.green("Use -A/--add option to add a new snippet\n");
  process.exit();
}

const displayActionsForSelectedFile = (term: Terminal, snippetName: string) => {
  const actions = [
    "1. View snippet",
    "2. Edit snippet",
  ];

  term.singleColumnMenu(actions, (error, response) => {
    if (error) {
      term.red("Error occurred while listing the snippets: " + error);
      process.exit();
    }
    if (response.selectedIndex === 0) {
      displaySnippet(term, snippetName);
    }
    if (response.selectedIndex === 1) {
      openVim(`${snippetPath}/${snippetName}`);
      process.exit();
    }
    process.exit();
  });
};

const displaySnippet = (term: Terminal, snippetName: string) => {
  const content = fs.readFileSync(`${snippetPath}/${snippetName}`, 'utf-8');

  term.green(`\n----   ${snippetName}  ----\n\n`);
  term.white(content);
  term.green("\n\n----   End of snippet  ----\n\n");
  process.exit();
}