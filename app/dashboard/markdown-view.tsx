"use client";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `
# GFM Hello world
## Autolink literals

- List 1
- List 2

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
`;

const MarkdownView = () => {
  return (
    <div className="prose w-full px-20 py-10">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
};

export default MarkdownView;
