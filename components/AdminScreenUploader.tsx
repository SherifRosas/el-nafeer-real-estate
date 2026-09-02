"use client"

import { useActionState, useRef, useState, startTransition } from "react"
import { useFormStatus } from "react-dom"
import { addScreenAction } from "@/app/actions/screen-actions"
import imageCompression from "browser-image-compression"

const initialState: any = {
  message: "",
  error: "",
  success: false
}

function SubmitButton({ isCompressing }: { isCompressing: boolean }) {
  const { pending } = useFormStatus()
  const isBusy = pending || isCompressing
  return (
    <button 
      type="submit" 
      disabled={isBusy}
      className={`w-full py-3 px-4 rounded-md font-bold text-white transition-colors mt-4 ${
        isBusy ? "bg-slate-600 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
      }`}
    >
      {isBusy ? "جاري المعالجة..." : "إضافة الشاشة"}
    </button>
  )
}

export default function AdminScreenUploader() {
  const [state, formAction] = useActionState(addScreenAction, initialState)
  
  // Controlled inputs for AI population and calculations
  const [nameVal, setNameVal] = useState("")
  const [descVal, setDescVal] = useState("")
  const [discountPriceVal, setDiscountPriceVal] = useState("")
  const [quantityVal, setQuantityVal] = useState("1")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCompressing, setIsCompressing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Calculations for Finance Box
  const parsedDiscount = parseFloat(discountPriceVal) || 0
  const parsedQuantity = parseInt(quantityVal, 10) || 1
  const webOwnerCommissionPerScreen = 1000
  
  // Total Web Owner Profit = quantity * 1000
  const totalWebOwnerProfit = parsedQuantity * webOwnerCommissionPerScreen
  
  // The Shop Profit per screen = Selling Price - 1000
  const shopNetPerScreen = parsedDiscount > webOwnerCommissionPerScreen ? parsedDiscount - webOwnerCommissionPerScreen : 0
  const totalShopProfit = parsedQuantity * shopNetPerScreen

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isCompressing) return
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const file = formData.get("image") as File

    if (file && file.size > 1024 * 1024) { // If larger than 1MB, compress it
      setIsCompressing(true)
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true
        }
        const compressedFile = await imageCompression(file, options)
        formData.set("image", compressedFile, compressedFile.name)
      } catch (error) {
        console.error("Compression error:", error)
        alert("فشل في ضغط الصورة. سيتم استخدام الصورة الأصلية...")
      } finally {
        setIsCompressing(false)
      }
    }

    startTransition(() => {
      formAction(formData)
    })
  }

  const handleAutoFill = async () => {
    const fileInput = fileInputRef.current
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("الرجاء اختيار صورة الشاشة أولاً!")
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
      alert("فشل التوليد بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى أو الكتابة يدوياً.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div dir="rtl" className="max-w-lg mx-auto my-8 p-8 bg-slate-800 border border-slate-700 rounded-xl shadow-lg text-slate-100 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-white text-right">رفع شاشة جديدة</h2>
      
      {state?.error && (
        <p className="font-bold p-3 mb-4 bg-red-900/30 text-red-400 border border-red-900/50 rounded-md text-right">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="font-bold p-3 mb-4 bg-green-900/30 text-green-400 border border-green-900/50 rounded-md text-right">
          {state.message}
        </p>
      )}
      {isCompressing && (
        <p className="font-bold p-3 mb-4 bg-amber-900/30 text-amber-400 border border-amber-900/50 rounded-md text-right animate-pulse">
          جاري ضغط وتحسين حجم الصورة للرفع...
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <label className="flex flex-col gap-1.5 text-right">
          <strong className="text-sm text-slate-300">اسم الشاشة</strong>
          <input 
            type="text" 
            name="name" 
            required 
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
          />
        </label>
        
        <label className="flex flex-col gap-1.5 text-right">
          <strong className="text-sm text-slate-300">الوصف</strong>
          <textarea 
            name="description" 
            rows={4} 
            value={descVal}
            onChange={(e) => setDescVal(e.target.value)}
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-y" 
          />
        </label>

        <label className="flex flex-col gap-1.5 text-right">
          <strong className="text-sm text-slate-300">السعر الأساسي (ج.م)</strong>
          <input 
            type="number" 
            step="0.01" 
            name="basePrice" 
            required 
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
          />
        </label>

        <div className="flex gap-4 w-full">
          <label className="flex flex-col gap-1.5 text-right flex-1">
            <strong className="text-sm text-slate-300">سعر البيع/التخفيض (ج.م)</strong>
            <input 
              type="number" 
              step="0.01" 
              name="discountPrice" 
              value={discountPriceVal}
              onChange={(e) => setDiscountPriceVal(e.target.value)}
              required 
              className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
            />
          </label>

          <label className="flex flex-col gap-1.5 text-right w-1/3">
            <strong className="text-sm text-slate-300">الكمية بالمخزن</strong>
            <input 
              type="number" 
              name="quantity"
              value={quantityVal}
              onChange={(e) => setQuantityVal(e.target.value)}
              min="1"
              required 
              className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-center font-bold" 
            />
          </label>
        </div>

        {/* Finance Calculator Box */}
        {(parsedDiscount > 0 && parsedQuantity > 0) && (
          <div className="bg-slate-900/50 border border-sky-500/30 p-4 rounded-lg my-2 flex flex-col gap-3">
            <h3 className="font-bold text-sky-400 text-sm border-b border-sky-500/20 pb-2">📊 حاسبة الأرباح (Finance Preview)</h3>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">سعر البيع الإجمالي ({parsedQuantity} شاشة):</span>
              <span className="font-bold text-white">{(parsedDiscount * parsedQuantity).toLocaleString()} ج.م</span>
            </div>
            
            <div className="flex justify-between items-center text-sm bg-green-900/20 p-2 rounded">
              <span className="text-green-400 font-semibold">أرباح مالك الموقع (Web Owner):</span>
              <span className="font-bold text-green-400">{totalWebOwnerProfit.toLocaleString()} ج.م</span>
            </div>

            <div className="flex justify-between items-center text-sm bg-amber-900/20 p-2 rounded">
              <span className="text-amber-400 font-semibold">صافي أرباح المعرض (Shop Net):</span>
              <span className="font-bold text-amber-400">{totalShopProfit.toLocaleString()} ج.م</span>
            </div>
            
            <p className="text-[10px] text-slate-500 text-center mt-1">
              ملاحظة: العمولة الثابتة 1000 ج.م لكل شاشة تباع.
            </p>
          </div>
        )}

        <label className="flex flex-col gap-1.5 text-right">
          <div className="flex justify-between items-center flex-row-reverse">
            <strong className="text-sm text-slate-300">📸 صورة الشاشة (من المعرض)</strong>
            <button 
              type="button" 
              onClick={handleAutoFill}
              disabled={isGenerating}
              className="text-xs bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/50 py-1 px-3 rounded-full font-bold transition-all flex items-center gap-2"
            >
              {isGenerating ? "جاري المعالجة..." : "✨ تعبئة تلقائية بالذكاء الاصطناعي"}
            </button>
          </div>
          <input 
            type="file" 
            name="image" 
            ref={fileInputRef}
            accept="image/*" 
            required 
            className="p-2.5 bg-slate-900 border border-slate-600 rounded-md text-slate-300 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600 cursor-pointer text-left" 
            dir="ltr"
          />
        </label>

        <SubmitButton isCompressing={isCompressing} />
      </form>
    </div>
  )
}
