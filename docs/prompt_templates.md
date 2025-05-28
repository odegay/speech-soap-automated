# Prompt Template Format

Prompt templates are stored in `src/backend/prompts/templates` and are named using
`<SECTION>_<version>.txt`.

Templates use Python `string.Template` syntax. Placeholders correspond to the
field IDs defined in the section configuration.

Example `SUBJECTIVE_v1.txt`:

```
Subjective Note for ${patientname}
Setting/context: ${setting}
...
```

New sections or versions can be added by creating a new template file without any
code changes.
