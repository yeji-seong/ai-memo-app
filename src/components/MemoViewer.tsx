'use client'

import { useEffect, useCallback, useState } from 'react'
import { Memo, MEMO_CATEGORIES } from '@/types/memo'
import MarkdownViewer from './MarkdownViewer'

interface MemoViewerProps {
  memo: Memo | null
  isOpen: boolean
  onClose: () => void
  onEdit: (memo: Memo) => void
  onDelete: (id: string) => Promise<void> | void
}

export default function MemoViewer({
  memo,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: MemoViewerProps) {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [summaryError, setSummaryError] = useState<string | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    if (!isOpen) {
      setSummary(null)
      setSummaryError(null)
      setIsLoadingSummary(false)
    }
  }, [isOpen])

  if (!isOpen || !memo) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      personal:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
      work: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
      study:
        'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
      idea: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    }
    return colors[category] ?? colors.other
  }

  const handleDeleteClick = async () => {
    if (window.confirm('정말로 이 메모를 삭제하시겠습니까?')) {
      try {
        await onDelete(memo.id)
        onClose()
      } catch (error) {
        console.error('Failed to delete memo:', error)
        alert('메모 삭제에 실패했습니다.')
      }
    }
  }

  const handleEditClick = () => {
    onEdit(memo)
    onClose()
  }

  const handleSummarize = async () => {
    if (!memo) return

    setIsLoadingSummary(true)
    setSummaryError(null)

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: memo.title,
          content: memo.content,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '요약 생성에 실패했습니다.')
      }

      setSummary(data.summary)
    } catch (error) {
      setSummaryError(
        error instanceof Error
          ? error.message
          : '요약 생성 중 오류가 발생했습니다.'
      )
    } finally {
      setIsLoadingSummary(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="memo-viewer-title"
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity dark:bg-black/70"
        onClick={onClose}
      />

      {/* 모달 패널 */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col dark:bg-gray-900 dark:border dark:border-gray-800">
        {/* 헤더 */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(memo.category)}`}
              >
                {MEMO_CATEGORIES[
                  memo.category as keyof typeof MEMO_CATEGORIES
                ] ?? memo.category}
              </span>
            </div>
            <h2
              id="memo-viewer-title"
              className="text-xl font-bold text-gray-900 leading-snug dark:text-gray-100"
            >
              {memo.title}
            </h2>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors dark:hover:text-gray-200 dark:hover:bg-gray-800"
            aria-label="닫기"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* 요약하기 버튼 */}
          <div className="mb-4">
            <button
              onClick={handleSummarize}
              disabled={isLoadingSummary}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:text-blue-300 dark:bg-blue-950/50 dark:hover:bg-blue-900/60"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {isLoadingSummary ? '요약 생성 중...' : '요약하기'}
            </button>
          </div>

          {/* 요약 결과 */}
          {summary && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-900/50">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                  AI 요약
                </h3>
              </div>
              <p className="text-sm text-blue-800 whitespace-pre-wrap leading-relaxed dark:text-blue-200">
                {summary}
              </p>
            </div>
          )}

          {/* 요약 에러 */}
          {summaryError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:border-red-900/50">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-4 h-4 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-sm font-semibold text-red-900 dark:text-red-200">
                  오류
                </h3>
              </div>
              <p className="text-sm text-red-800 dark:text-red-200">
                {summaryError}
              </p>
            </div>
          )}

          <MarkdownViewer content={memo.content} />

          {/* 태그 */}
          {memo.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-5">
              {memo.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md dark:bg-gray-800 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between dark:border-gray-800">
          {/* 날짜 정보 */}
          <div className="text-xs text-gray-400 space-y-0.5 dark:text-gray-500">
            <p>생성: {formatDate(memo.createdAt)}</p>
            <p>수정: {formatDate(memo.updatedAt)}</p>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={handleDeleteClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors dark:text-red-300 dark:bg-red-950/50 dark:hover:bg-red-900/60"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              삭제
            </button>
            <button
              onClick={handleEditClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              편집
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
