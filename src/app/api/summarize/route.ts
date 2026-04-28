import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json()

    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: '메모 내용이 비어있습니다.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }

    const ai = new GoogleGenAI({ apiKey })

    const prompt = `다음 메모를 한국어로 3줄 이내로 핵심만 요약해주세요.

제목: ${title}

내용:
${content}`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    })

    const summary = response.text

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Gemini API 호출 실패:', error)
    return NextResponse.json(
      { error: '요약 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
