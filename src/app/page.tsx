'use client'

import { useState } from 'react'
import AudioRecorder from '@/components/AudioRecorder'
import FileUploader from '@/components/FileUploader'
import TranscriptionDisplay from '@/components/TranscriptionDisplay'

export default function Home() {
  const [transcription, setTranscription] = useState<string | null>(null)

  const handleTranscriptionComplete = (text: string) => {
    setTranscription(text)
  }

  return (
    <main className="min-h-screen bg-[#11151d] text-gray-100 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Audio Transcription App</h1>
        <p className="text-lg text-gray-400 mb-8">Record or upload audio to get instant transcriptions</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Record Audio</h2>
            <AudioRecorder onTranscriptionComplete={handleTranscriptionComplete} />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Upload Audio File</h2>
            <FileUploader onTranscriptionComplete={handleTranscriptionComplete} />
          </div>
        </div>
        <TranscriptionDisplay transcription={transcription} />
      </div>
    </main>
  )
}
