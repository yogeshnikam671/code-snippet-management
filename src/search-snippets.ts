import { Terminal } from 'terminal-kit';
import * as fs from 'fs';
import * as os from 'os';
import { copySnippet, deleteSnippet, displaySnippet, editSnippet } from './actions/actions';

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
    "3. Copy snippet",
    "4. Delete snippet"
  ];

  term.singleColumnMenu(actions, (error, response) => {
    if (error) {
      term.red("Error occurred while listing the snippets: " + error);
      process.exit();
    }
    switch(response.selectedIndex) {
      case 0:
        displaySnippet(term, snippetName);
        break;
      case 1:
        editSnippet(term, snippetName);
        break;
      case 2:
        copySnippet(term, snippetName);
        break;
      case 3:
        deleteSnippet(term, snippetName);
        break;
    }
    process.exit();
  });
};

