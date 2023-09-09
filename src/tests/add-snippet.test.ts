import { addSnippet } from "../main/add-snippet";
import { openVim, snippetPath } from "../main/utils/utils";


jest.mock('../main/utils/utils',() => {
  return {
    openVim: jest.fn() 
  }
});

describe('add-snippet tests', () => {
  it('should open vim with the correct file name', async () => {
    addSnippet('example.js');
    const expectedPath = `${snippetPath}/example.js`;
    expect(openVim).toHaveBeenCalledWith(expectedPath);
  });
});
