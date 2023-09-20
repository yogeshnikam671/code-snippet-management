import { Terminal } from 'terminal-kit';
import * as fs from 'fs';
import { copySnippet, deleteSnippet, displaySnippet, editSnippet } from './actions/actions';
import { snippetPath, term } from './utils/utils';
import { promptMessages } from './constants/prompt-messages';

export const searchSnippets = () => {
  let files = fs.readdirSync(snippetPath);
  if (!files.length) {
    handleNoSnippetsError();
    return;
  }

  term.white(promptMessages.pressTabToViewFullList);
  term.white(promptMessages.searchForSnippet);
  term.inputField({ autoComplete: files, autoCompleteMenu: true }, (error, input) => {
    if (error) {
      term.red(promptMessages.errorWhileListingSnippets + error);
      return;
    }
    const validFile = files.includes(input || "");
    if (!validFile) {
      term.red(promptMessages.noSuchSnippetExists);
      return;
    }
    if (validFile) {
      displayActionsForSelectedFile(input || "");
    }
  });
};

const handleNoSnippetsError = () => {
  term.red(promptMessages.noSnippetsFound);
  term.green(promptMessages.useAddOption);
  process.exit();
}

const displayActionsForSelectedFile = (snippetName: string) => {
  const actions = [
    "1. View snippet",
    "2. Edit snippet",
    "3. Copy snippet",
    "4. Delete snippet"
  ];

  term.singleColumnMenu(actions, (error, response) => {
    if (error) {
      term.red("Error occurred while listing the snippets: " + error);
      return;
    }
    switch(response.selectedIndex) {
      case 0:
        displaySnippet(snippetName);
        break;
      case 1:
        editSnippet(snippetName);
        break;
      case 2:
        copySnippet(snippetName);
        break;
      case 3:
        deleteSnippet(snippetName);
        break;
    }
    return;
  });
};

