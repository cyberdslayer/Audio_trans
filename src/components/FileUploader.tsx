'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, AlertCircle, Play, Pause} from 'lucide-react'

interface FileUploaderProps {
  onTranscriptionComplete: (text: string) => void
}

export default function FileUploader({ onTranscriptionComplete }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setError(null)
    }
  }

  // const handleUpload = async () => {
  //   if (file) {
  //     const formData = new FormData()
  //     formData.append('audio', file)

  //     try {
  //       const response = await fetch(`${process.env.FASTAPI_URL}/api/transcribe`, {
  //         method: 'POST',
  //         body: formData,
  //       })

  //       if (response.ok) {
  //         const data = await response.json()
  //         console.log('Transcription:', data.text)
  //         onTranscriptionComplete(data.text)
  //       } else {
  //         setError('Transcription failed. Please try again.')
  //       }
  //     } catch (error) {
  //       console.error('Error during transcription:', error)
  //       setError('An error occurred during transcription. Please try again.')
  //     }
  //   }
  // }
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to transcribe the audio file.");
      }

      const data = await response.json();
      onTranscriptionComplete(data.text);
    } catch (error) {
      console.error(error);
      alert("An error occurred while transcribing the audio.");
    }
  };
  

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">WAV or MP3 (MAX. 10MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" accept=".wav,.mp3" onChange={handleFileChange} />
        </label>
      </div>
      {file && (
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <span className="text-sm truncate text-gray-300">{file.name}</span>
            <div className="flex items-center space-x-2">
              <Button onClick={togglePlayPause} variant="outline" size="sm" className="flex items-center bg-gray-600 hover:bg-gray-500">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
              </Button>
              <Button onClick={handleUpload} className="bg-green-600 hover:bg-green-700">Upload and Transcribe</Button>
            </div>
          </div>
          <audio
            ref={audioRef}
            src={URL.createObjectURL(file)}
            onEnded={handleAudioEnded}
            className="w-full"
            controls
          />
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

