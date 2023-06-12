import { autocompletion } from '@codemirror/autocomplete';
import { sql, PostgreSQL, keywordCompletionSource } from '@codemirror/lang-sql'
import ReactCodeMirror, { oneDark } from '@uiw/react-codemirror';

function myCompletions(context: any) {
  let word = context.matchBefore(/\w*/)
  if (word.from == word.to && !context.explicit)
    return null
  return {
    from: word.from,
    options: [
      { label: "system", type: "keyword" },
    ]
  }
}

const extensions = [sql({
  dialect: PostgreSQL,
  tables: [{
    label: "test", type: "keyword", apply(view, completion, from, to) {

    },
  }],
  schemas: [{ label: "test", type: "keyword" }],
})]


function App() {
  function onChange(value: any, viewUpdate: any) {
    console.log(value);
  }

  return (
    <div>
      <ReactCodeMirror
        height="300px"
        width='500px'
        theme={oneDark}
        extensions={[autocompletion({ override: [myCompletions, keywordCompletionSource(PostgreSQL,true)] })]}
        onChange={onChange}
        basicSetup={{ lineNumbers: true }}
      />
    </div>
  )
}

export default App
