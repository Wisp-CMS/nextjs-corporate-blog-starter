"use client";

import React from "react";
import slugify from "slugify";
import { parse } from "node-html-parser";


interface HeaderConfig {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface ProcessedContent {
  modifiedHtml: string;
  tableOfContents: TableOfContentsItem[];
}

export const processTableOfContents = (
  rawHtml: string,
  headerConfig: HeaderConfig
): ProcessedContent => {
  // Using node-html-parser to parse the HTML
  const root = parse(rawHtml);
  const headers = root.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const tableOfContents: TableOfContentsItem[] = [];
  const usedIds = new Set<string>();

  headers.forEach((header) => {
    const level = parseInt(header.tagName.charAt(1));
    if (headerConfig[`h${level}` as keyof HeaderConfig]) {
      const text = header.rawText || ""; // Changed to rawText for node-html-parser
      const id = slugify(text, { lower: true, strict: true });

      // Ensure unique IDs
      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);

      header.setAttribute("id", uniqueId); // Changed to setAttribute for node-html-parser
      tableOfContents.push({
        id: uniqueId,
        text,
        level,
      });
    }
  });

  return {
    modifiedHtml: root.toString(), // Changed to toString() for node-html-parser
    tableOfContents,
  };
};

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="my-2 font-medium"
            style={{ marginLeft: `${(item.level - 1) * 20}px` }}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
