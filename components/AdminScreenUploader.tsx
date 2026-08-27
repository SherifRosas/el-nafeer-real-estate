"use client"

import { useActionState } from "react"
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
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
          />
        </label>
        
        <label className="flex flex-col gap-1.5 text-left">
          <strong className="text-sm text-slate-300">Description</strong>
          <textarea 
            name="description" 
            rows={3} 
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
          <strong className="text-sm text-slate-300">Image File</strong>
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            required 
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600" 
          />
        </label>

        <SubmitButton />
      </form>
    </div>
  )
}
