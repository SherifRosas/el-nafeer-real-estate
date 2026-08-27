"use client"

import { useState } from "react"
import { deleteScreenAction, updateScreenAction } from "@/app/actions/screen-actions"

type Screen = {
  id: string
  name: string
  description: string | null
  basePrice: number
  discountPrice: number
  imageUrl: string
  inStock: boolean
}

export default function AdminScreenList({ screens }: { screens: Screen[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this screen? This cannot be undone.")) return
    
    setIsDeleting(id)
    const res = await deleteScreenAction(id)
    setIsDeleting(null)
    
    if (res?.error) {
      alert(res.error)
    }
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    const res = await updateScreenAction(id, formData)
    setIsSubmitting(false)
    
    if (res?.error) {
      alert(res.error)
    } else {
      setEditingId(null)
    }
  }

  if (screens.length === 0) {
    return (
      <div className="text-center p-8 text-slate-400 bg-slate-800/50 rounded-xl border border-slate-700/50">
        No screens uploaded yet.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Uploaded Screens</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {screens.map(screen => (
          <div key={screen.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg flex flex-col">
            
            {editingId === screen.id ? (
              <form onSubmit={(e) => handleUpdate(e, screen.id)} className="p-6 flex flex-col gap-4 flex-grow">
                <input 
                  name="name" 
                  defaultValue={screen.name} 
                  required 
                  placeholder="Screen Name"
                  className="p-2 bg-slate-900 border border-slate-600 rounded text-white" 
                />
                <textarea 
                  name="description" 
                  defaultValue={screen.description || ""} 
                  rows={2}
                  placeholder="Description"
                  className="p-2 bg-slate-900 border border-slate-600 rounded text-white resize-y" 
                />
                <div className="flex gap-4">
                  <input 
                    name="basePrice" 
                    type="number" 
                    step="0.01" 
                    defaultValue={screen.basePrice} 
                    required 
                    placeholder="Base Price"
                    className="p-2 w-full bg-slate-900 border border-slate-600 rounded text-white" 
                  />
                  <input 
                    name="discountPrice" 
                    type="number" 
                    step="0.01" 
                    defaultValue={screen.discountPrice} 
                    required 
                    placeholder="Discount Price"
                    className="p-2 w-full bg-slate-900 border border-slate-600 rounded text-white" 
                  />
                </div>
                
                <label className="flex items-center gap-2 text-slate-300">
                  <input 
                    type="checkbox" 
                    name="inStock" 
                    value="true" 
                    defaultChecked={screen.inStock} 
                    className="w-5 h-5 rounded border-slate-600 text-sky-500 bg-slate-900"
                  />
                  In Stock (Visible to customers)
                </label>
                
                <div className="flex gap-3 mt-auto pt-4">
                  <button 
                    type="button" 
                    onClick={() => setEditingId(null)}
                    className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-medium transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="h-48 w-full bg-slate-900 relative overflow-hidden group">
                  <img 
                    src={screen.imageUrl} 
                    alt={screen.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  {!screen.inStock && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                      OUT OF STOCK
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-bold text-white mb-2">{screen.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black text-red-400">EGP {screen.discountPrice}</span>
                    <span className="text-sm text-slate-500 line-through">EGP {screen.basePrice}</span>
                  </div>
                  
                  <div className="flex gap-3 mt-auto pt-4 border-t border-slate-700">
                    <button 
                      onClick={() => setEditingId(screen.id)}
                      className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(screen.id)}
                      disabled={isDeleting === screen.id}
                      className="flex-1 py-2 bg-red-900/50 hover:bg-red-800 text-red-300 rounded font-medium transition-colors border border-red-900/50 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isDeleting === screen.id ? (
                        "Deleting..."
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
