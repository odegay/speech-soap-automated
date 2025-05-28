# Phrase Bank Organization

Phrase bank JSON files live under `src/backend/data/phrasebanks`.
Each file contains an array of strings and is named for the section or text field
it relates to. For example `communication_examples.json` contains sample
phrases used when documenting communication observations.

The backend exposes `/api/phrasebank/<section>` which serves the contents of
these files. Editing or adding a new JSON file immediately updates the API
without code changes.
