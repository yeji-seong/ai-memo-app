export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4 dark:text-gray-100">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 dark:text-gray-300">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 mb-8 dark:text-gray-400">
          요청하신 페이지가 존재하지 않습니다.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  )
}
