import { exec } from "child_process"

const run = (argv = "") => {
  return new Promise<string>((resolve, reject) => {
    exec(`tsc && node --es-module-specifier-resolution=node dist/index.js ${argv}`, (error, stdout, stderr) => {
      if(stdout) resolve(stdout);
      if(stderr || error) reject(error);
    });
  });
}

// TODO - get back to how index file can be tested
describe("index", () => {
  
  it('should display help', async () => {
    const res = await run('--help');
    
    // the indentation is deliberate
    const expectedHelp = 
`Usage: index [options]

Options:
  -A, --add <snippet_name_with_extension (example.js)>  add a new code snippet
  -S, --search                                          search code snippet/s
  -h, --help                                            display help for command
`
    expect(res).toEqual(expectedHelp);
  });
  
  // check how this test can be written
  it.skip('should add a new snippet when --add is passed along with the name of the snippet', async () => {
    await run('--add example.js');
  });
});
