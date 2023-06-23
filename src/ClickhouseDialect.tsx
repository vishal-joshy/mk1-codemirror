import { SQLDialect } from "@codemirror/lang-sql";

export const ClickHouse = SQLDialect.define({
    keywords:
      "default  proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock pivot readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx unpivot updlock with",
    types:
      "bigint smallint smallmoney tinyint money real text nvarchar ntext varbinary image hierarchyid uniqueidentifier sql_variant xml",
    builtin:
      "binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id",
    operatorChars: "*+-%<>!=^&|/",
    specialVar: "@",
  });