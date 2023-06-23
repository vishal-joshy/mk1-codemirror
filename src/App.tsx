import { autocompletion, snippetCompletion } from "@codemirror/autocomplete";
import {
  sql,
  PostgreSQL,
  keywordCompletionSource,
  schemaCompletionSource,
} from "@codemirror/lang-sql";
import ReactCodeMirror, { oneDark } from "@uiw/react-codemirror";

function myCompletions(context: any) {
  const word = context.matchBefore(/\w*/);
  if (word.from == word.to && !context.explicit) return null;
  return {
    from: word.from,
    options: [{ label: "Hello", type: "keyword" }],
  };
}

function App() {
  function onChange(value: any, viewUpdate: any) {
    console.log(value);
  }

  return (
    <div>
      <ReactCodeMirror
        height="300px"
        width="500px"
        extensions={[
          sql({ dialect: PostgreSQL }),
          autocompletion({
            override: [snippetcompp,
              myCompletions,
              schemaCompletionSource({
                dialect: PostgreSQL,
                schema: { custom: [] },
                schemas: [{ label: "goodbye", type: "function" }],
              }),
              keywordCompletionSource(PostgreSQL),
            ],
          }),
        ]}
        onChange={onChange}
        basicSetup={{ lineNumbers: true }}
      />
    </div>
  );
}

export default App;

function snippetcompp(context: any) {
  const matchBefore = context.matchBefore(/\w*/);

  if (!matchBefore) {
    return null;
  }

  return {
    from: matchBefore.from,
    options: [
      snippetCompletion("func(${req},${res})", {
        label: "func",
      }),
      snippetCompletion("<bar>${}</bar>", {
        label: "<bar></bar> empty (works)",
      }),
      // enable this to see the error
      // snippetCompletion('<baz>${1}</baz>', {
      //   label: '<baz></baz> numbered (error)',
      // }),
      snippetCompletion("<bar>${1:d}</bar>", {
        label: "<bar></bar> named (works)",
      }),
      snippetCompletion("<bar>#{}</bar>", {
        label: "<bar></bar> hash empty (works)",
      }),
      // snippetCompletion('<bar>#{1}</bar>', {
      //   label: '<bar></bar> hash numbered (error)',
      // }),
      snippetCompletion("<bar>#{1:foo}|#{2:baar}</bar>", {
        label: "<bar></bar> hash named (works)",
      }),
    ],
  };
}
