interface Author {
  name: string;
  isHighlighted?: boolean;
  isCorresponding?: boolean;
  isCoAuthor?: boolean;
}

export type BibTeXInlineNode =
  | { type: 'text'; text: string }
  | {
    type: 'em' | 'strong' | 'smallCaps' | 'sup' | 'sub';
    children: BibTeXInlineNode[];
  };

export interface Publication {
  id: string;
  title: string;
  titleNodes?: BibTeXInlineNode[];
  authors: Author[];
  abstract?: string;
  journal?: string;
  conference?: string;
  year: number;
  month?: string;
  doi?: string;
  code?: string;
  tags: string[];
  type: PublicationType;
  bibtex?: string;
  selected?: boolean;
  displayOrder?: number;
  description?: string;
}

export type PublicationType =
  | 'journal'
  | 'conference'
  | 'workshop'
  | 'book-chapter'
  | 'book'
  | 'thesis'
  | 'preprint'
  | 'patent'
  | 'technical-report';
