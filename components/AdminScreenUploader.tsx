"use client"

import { useActionState, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { addScreenAction } from "@/app/actions/screen-actions"

const initialState: any = {
  message: "",
  error: "",
  success: false
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full py-3 px-4 rounded-md font-bold text-white transition-colors mt-4 ${
        pending ? "bg-slate-600 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
      }`}
    >
      {pending ? "Uploading..." : "Add Screen"}
    </button>
  )
}

export default function AdminScreenUploader() {
  const [state, formAction] = useActionState(addScreenAction, initialState)
  
  // Controlled inputs for AI population
  const [nameVal, setNameVal] = useState("")
  const [descVal, setDescVal] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAutoFill = async () => {
    const fileInput = fileInputRef.current
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please choose an image file first!")
      return
    }

    const file = fileInput.files[0]
    setIsGenerating(true)

    try {
      // 1. Resize image using Canvas to save bandwidth & tokens
      const resizedBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
          const img = new Image()
          img.src = event.target?.result as string
          img.onload = () => {
            const canvas = document.createElement("canvas")
            const MAX_WIDTH = 800
            const scaleSize = MAX_WIDTH / img.width
            canvas.width = MAX_WIDTH
            canvas.height = img.height * scaleSize
            const ctx = canvas.getContext("2d")
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
            resolve(canvas.toDataURL("image/jpeg", 0.7))
          }
          img.onerror = (error) => reject(error)
        }
        reader.onerror = (error) => reject(error)
      })

      // 2. Send to our new API route
      const res = await fetch("/api/ai-describe-screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: resizedBase64 })
      })

      if (!res.ok) {
        throw new Error("Failed to generate description")
      }

      const data = await res.json()
      
      // 3. Populate fields
      if (data.name) setNameVal(data.name)
      if (data.description) setDescVal(data.description)
      
    } catch (error) {
      console.error(error)
      alert("AI Generation failed. Please try again or write it manually.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div dir="ltr" className="max-w-lg mx-auto my-8 p-8 bg-slate-800 border border-slate-700 rounded-xl shadow-lg text-slate-100 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-white text-left">Upload New Screen</h2>
      
      {state?.error && (
        <p className="font-bold p-3 mb-4 bg-red-900/30 text-red-400 border border-red-900/50 rounded-md text-left">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="font-bold p-3 mb-4 bg-green-900/30 text-green-400 border border-green-900/50 rounded-md text-left">
          {state.message}
        </p>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        
        <label className="flex flex-col gap-1.5 text-left">
          <strong className="text-sm text-slate-300">Screen Name</strong>
          <input 
            type="text" 
            name="name" 
            required 
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
          />
        </label>
        
        <label className="flex flex-col gap-1.5 text-left">
          <strong className="text-sm text-slate-300">Description</strong>
          <textarea 
            name="description" 
            rows={4} 
            value={descVal}
            onChange={(e) => setDescVal(e.target.value)}
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-y" 
          />
        </label>

        <label className="flex flex-col gap-1.5 text-left">
          <strong className="text-sm text-slate-300">Base Price (EGP)</strong>
          <input 
            type="number" 
            step="0.01" 
            name="basePrice" 
            required 
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
          />
        </label>

        <label className="flex flex-col gap-1.5 text-left">
          <strong className="text-sm text-slate-300">Discount Price (EGP)</strong>
          <input 
            type="number" 
            step="0.01" 
            name="discountPrice" 
            required 
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
          />
        </label>

        <label className="flex flex-col gap-1.5 text-left">
          <div className="flex justify-between items-center">
            <strong className="text-sm text-slate-300">📸 Image File (Camera)</strong>
            <button 
              type="button" 
              onClick={handleAutoFill}
              disabled={isGenerating}
              className="text-xs bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/50 py-1 px-3 rounded-full font-bold transition-all flex items-center gap-2"
            >
              {isGenerating ? "Processing..." : "✨ Auto-Fill Name & Desc"}
            </button>
          </div>
          <input 
            type="file" 
            name="image" 
            ref={fileInputRef}
            accept="image/*" 
            capture="environment"
            required 
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600 cursor-pointer" 
          />
        </label>

        <SubmitButton />
      </form>
    </div>
  )
}
