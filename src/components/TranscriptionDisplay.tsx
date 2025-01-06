'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, AlertCircle } from 'lucide-react'

interface TranscriptionDisplayProps {
  transcription: string | null
}

export default function TranscriptionDisplay({ transcription }: TranscriptionDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePlayTTS = async () => {
    if (transcription) {
      try {
        setIsPlaying(true)
        const response = await fetch('/api/synthesize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: transcription }),
        })

        if (response.ok) {
          const audioBlob = await response.blob()
          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)
          audio.onended = () => setIsPlaying(false)
          audio.play()
        } else {
          setError('TTS synthesis failed. Please try again.')
          setIsPlaying(false)
        }
      } catch (error) {
        console.error('Error during TTS synthesis:', error)
        setError('An error occurred during TTS synthesis. Please try again.')
        setIsPlaying(false)
      }
    }
  }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Transcription</h2>
      {transcription ? (
        <div className="space-y-4">
          <p className="text-gray-300 whitespace-pre-wrap">{transcription}</p>
          <Button onClick={handlePlayTTS} disabled={isPlaying} className="flex items-center bg-blue-600 hover:bg-blue-700">
            <Play className="mr-2 h-4 w-4" />
            {isPlaying ? 'Playing...' : 'Play TTS'}
          </Button>
        </div>
      ) : (
        <p className="text-gray-400">No transcription available. Record or upload an audio file to get started.</p>
      )}
      {error && (
        <div className="flex items-center text-red-400 mt-4">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

