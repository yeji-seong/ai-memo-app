'use client'

import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

interface MarkdownViewerProps {
  content: string
  className?: string
  emptyMessage?: string
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-1 mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-5 mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-3 text-sm leading-7 text-gray-700 dark:text-gray-300">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 underline underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-1 pl-6 text-sm text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-1 pl-6 text-sm text-gray-700 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 py-2 pl-4 text-sm text-gray-600 dark:border-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => (
    <code
      className={`rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-100 ${className ?? ''}`}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100 dark:bg-gray-950 dark:ring-1 dark:ring-gray-800">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full border-collapse text-sm text-gray-700 dark:text-gray-300">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-300 px-3 py-2 align-top dark:border-gray-700">
      {children}
    </td>
  ),
  hr: () => <hr className="my-6 border-gray-200 dark:border-gray-800" />,
}

export default function MarkdownViewer({
  content,
  className = '',
  emptyMessage = '표시할 내용이 없습니다.',
}: MarkdownViewerProps) {
  if (!content.trim()) {
    return (
      <div className={`text-sm text-gray-400 dark:text-gray-500 ${className}`}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
