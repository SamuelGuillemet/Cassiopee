export type Cell = RawCell | MarkdownCell | CodeCell;
/**
 * A string field representing the identifier of this particular cell.
 */
export type CellId = string;
/**
 * The cell's tags. Tags must be unique, and must not contain commas.
 */
export type MetadataTags = string[];
export type Output = ExecuteResult | DisplayData | Stream | Error;

/**
 * Jupyter Notebook v4.5 JSON schema.
 */
export interface Notebook {
  /**
   * Notebook root-level metadata.
   */
  metadata: {
    /**
     * Kernel information.
     */
    kernelspec?: {
      /**
       * Name of the kernel specification.
       */
      name: string;
      /**
       * Name to display in UI.
       */
      display_name: string;
      [k: string]: unknown;
    };
    /**
     * Kernel information.
     */
    language_info?: {
      /**
       * The programming language which this kernel runs.
       */
      name: string;
      /**
       * The codemirror mode to use for code in this language.
       */
      codemirror_mode?:
      | string
      | {
        [k: string]: unknown;
      };
      /**
       * The file extension for files in this language.
       */
      file_extension?: string;
      /**
       * The mimetype corresponding to files in this language.
       */
      mimetype?: string;
      /**
       * The pygments lexer to use for code in this language.
       */
      pygments_lexer?: string;
      [k: string]: unknown;
    };
    /**
     * Original notebook format (major number) before converting the notebook between versions. This should never be written to a file.
     */
    orig_nbformat?: number;
    /**
     * The title of the notebook document
     */
    title?: string;
    /**
     * The author(s) of the notebook document
     */
    authors?: unknown[];
    [k: string]: unknown;
  };
  /**
   * Notebook format (minor number). Incremented for backward compatible changes to the notebook format.
   */
  nbformat_minor: number;
  /**
   * Notebook format (major number). Incremented between backwards incompatible changes to the notebook format.
   */
  nbformat: number;
  /**
   * Array of cells of the current notebook.
   */
  cells: Cell[];
}
/**
 * Notebook raw nbconvert cell.
 */
export interface RawCell {
  id: CellId;
  /**
   * String identifying the type of cell.
   */
  cell_type: "raw";
  /**
   * Cell-level metadata.
   */
  metadata: {
    /**
     * Raw cell metadata format for nbconvert.
     */
    format?: string;
    /**
     * Official Jupyter Metadata for Raw Cells
     */
    jupyter?: {
      [k: string]: unknown;
    };
    /**
     * The cell's name. If present, must be a non-empty string. Cell names are expected to be unique across all the cells in a given notebook. This criterion cannot be checked by the json schema and must be established by an additional check.
     */
    name?: string;
    tags?: MetadataTags;
    [k: string]: unknown;
  };
  attachments?: Attachments;
  /**
   * Contents of the cell, represented as an array of lines.
   */
  source: string | string[];
}
/**
 * Media attachments (e.g. inline images), stored as mimebundle keyed by filename.
 */
export interface Attachments {
  [k: string]: Mimebundle;
}
/**
 * The attachment's data stored as a mimebundle.
 *
 * This interface was referenced by `Attachments`'s JSON-Schema definition
 * via the `patternProperty` ".*".
 */
export interface Mimebundle {
  /**
   * mimetype output (e.g. text/plain), represented as either an array of strings or a string.
   */
  [k: string]: string | string[];
}
/**
 * Notebook markdown cell.
 */
export interface MarkdownCell {
  id: CellId;
  /**
   * String identifying the type of cell.
   */
  cell_type: "markdown";
  /**
   * Cell-level metadata.
   */
  metadata: {
    /**
     * The cell's name. If present, must be a non-empty string. Cell names are expected to be unique across all the cells in a given notebook. This criterion cannot be checked by the json schema and must be established by an additional check.
     */
    name?: string;
    tags?: MetadataTags;
    /**
     * Official Jupyter Metadata for Markdown Cells
     */
    jupyter?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  attachments?: Attachments;
  /**
   * Contents of the cell, represented as an array of lines.
   */
  source: string | string[];
}
/**
 * Notebook code cell.
 */
export interface CodeCell {
  id: CellId;
  /**
   * String identifying the type of cell.
   */
  cell_type: "code";
  /**
   * Cell-level metadata.
   */
  metadata: {
    /**
     * Official Jupyter Metadata for Code Cells
     */
    jupyter?: {
      [k: string]: unknown;
    };
    /**
     * Execution time for the code in the cell. This tracks time at which messages are received from iopub or shell channels
     */
    execution?: {
      /**
       * header.date (in ISO 8601 format) of iopub channel's execute_input message. It indicates the time at which the kernel broadcasts an execute_input message to connected frontends
       */
      "iopub.execute_input"?: string;
      /**
       * header.date (in ISO 8601 format) of iopub channel's kernel status message when the status is 'busy'
       */
      "iopub.status.busy"?: string;
      /**
       * header.date (in ISO 8601 format) of the shell channel's execute_reply message. It indicates the time at which the execute_reply message was created
       */
      "shell.execute_reply"?: string;
      /**
       * header.date (in ISO 8601 format) of iopub channel's kernel status message when the status is 'idle'. It indicates the time at which kernel finished processing the associated request
       */
      "iopub.status.idle"?: string;
      [k: string]: unknown;
    };
    /**
     * Whether the cell's output is collapsed/expanded.
     */
    collapsed?: boolean;
    /**
     * Whether the cell's output is scrolled, unscrolled, or autoscrolled.
     */
    scrolled?: true | false | "auto";
    /**
     * The cell's name. If present, must be a non-empty string. Cell names are expected to be unique across all the cells in a given notebook. This criterion cannot be checked by the json schema and must be established by an additional check.
     */
    name?: string;
    tags?: MetadataTags;
    [k: string]: unknown;
  };
  /**
   * Contents of the cell, represented as an array of lines.
   */
  source: string | string[];
  /**
   * Execution, display, or stream outputs.
   */
  outputs: Output[];
  /**
   * The code cell's prompt number. Will be null if the cell has not been run.
   */
  execution_count: number | null;
}
/**
 * Result of executing a code cell.
 */
export interface ExecuteResult {
  /**
   * Type of cell output.
   */
  output_type: "execute_result";
  /**
   * A result's prompt number.
   */
  execution_count: number | null;
  data: Mimebundle1;
  metadata: OutputMetadata;
}
/**
 * A mime-type keyed dictionary of data
 */
export interface Mimebundle1 {
  /**
   * mimetype output (e.g. text/plain), represented as either an array of strings or a string.
   */
  [k: string]: string | string[];
}
/**
 * Cell output metadata.
 */
export interface OutputMetadata {
  [k: string]: unknown;
}
/**
 * Data displayed as a result of code cell execution.
 */
export interface DisplayData {
  /**
   * Type of cell output.
   */
  output_type: "display_data";
  data: Mimebundle1;
  metadata: OutputMetadata;
}
/**
 * Stream output from a code cell.
 */
export interface Stream {
  /**
   * Type of cell output.
   */
  output_type: "stream";
  /**
   * The name of the stream (stdout, stderr).
   */
  name: string;
  /**
   * The stream's text output, represented as an array of strings.
   */
  text: string | string[];
}
/**
 * Output of an error that occurred during code cell execution.
 */
export interface Error {
  /**
   * Type of cell output.
   */
  output_type: "error";
  /**
   * The name of the error.
   */
  ename: string;
  /**
   * The value, or message, of the error.
   */
  evalue: string;
  /**
   * The error's traceback, represented as an array of strings.
   */
  traceback: string[];
}
