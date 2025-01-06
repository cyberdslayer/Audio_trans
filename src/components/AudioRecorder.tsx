'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, Mic, StopCircle } from 'lucide-react'

interface AudioRecorderProps {
  onTranscriptionComplete: (text: string) => void
}

export default function AudioRecorder({ onTranscriptionComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        setDuration(0)
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
      setError(null)
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setError('Unable to access microphone. Please check your permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleTranscribe = async () => {
    if (audioBlob) {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.wav')

      try {
        const response = await fetch('/api/transcribe', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Transcription:', data.text)
          onTranscriptionComplete(data.text)
        } else {
          setError('Transcription failed. Please try again.')
        }
      } catch (error) {
        console.error('Error during transcription:', error)
        setError('An error occurred during transcription. Please try again.')
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {isRecording ? (
          <Button onClick={stopRecording} variant="destructive" className="flex items-center">
            <StopCircle className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        ) : (
          <Button onClick={startRecording} className="flex items-center bg-pink-600 hover:bg-pink-700">
            <Mic className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        )}
        {isRecording && (
          <span className="text-sm text-gray-300">
            Recording: {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </span>
        )}
      </div>
      {audioBlob && (
        <div className="space-y-2">
          <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
          <Button onClick={handleTranscribe} className="bg-green-600 hover:bg-green-700">Transcribe</Button>
        </div>
      )}
      {error && (
        <div className="flex items-center text-red-400">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

