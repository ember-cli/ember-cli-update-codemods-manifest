# ember-cli-update-codemods-manifest

Master list of codemods and their instructions used by [ember-cli-update](https://github.com/ember-cli/ember-cli-update)

Tips for changing this list:

1. Make the desired change to the manifest.json here.
1. Fork [ember-cli-update](https://github.com/ember-cli/ember-cli-update).
1. Do a code search for the URL containing "ember-cli-update-codemods-manifest".
1. Change it to link to your changes from step 1.
  * This will look like "https://raw.githubusercontent.com/ember-cli/ember-cli-update-codemods-manifest/vX/manifest.json" => "https://raw.githubusercontent.com/your-username/ember-cli-update-codemods-manifest/your-branch/manifest.json".
1. Submit the change from step 4 as a pull request to [ember-cli-update](https://github.com/ember-cli/ember-cli-update). The purpose is to run the test suite.
1. Fix any test failures resulting from step 5.
1. If your change from step 1 is a new codemod instead of an update or fix to an existing, try and add a new test case to [test/fixtures/codemod](https://github.com/ember-cli/ember-cli-update/tree/master/test/fixtures/codemod). Otherwise, this step is not necessary.
