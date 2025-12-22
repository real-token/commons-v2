declare module "comment-parser" {
  export interface Tag {
    tag: string;
    name: string;
    type: string;
    description: string;
    optional: boolean;
    default?: string;
  }

  export interface SourceLine {
    number: number;
    source: string;
    tokens: {
      start: string;
      delimiter: string;
      postDelimiter: string;
      tag: string;
      postTag: string;
      name: string;
      postName: string;
      type: string;
      postType: string;
      description: string;
      end: string;
    };
  }

  export interface Block {
    description: string;
    tags: Tag[];
    source: SourceLine[];
    problems: Array<{ code: string; message: string; line: number }>;
  }

  export interface Options {
    spacing?: "compact" | "preserve";
    fence?: string;
  }

  export function parse(source: string, options?: Options): Block[];
}
