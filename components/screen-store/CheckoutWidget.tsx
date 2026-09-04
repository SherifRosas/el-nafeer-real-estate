'use client'

import { useState } from 'react'
import { customerInfoSchema, deliverySchema } from '@/lib/validations/screen-store'
import { submitScreenOrderAction } from '@/app/actions/screen-actions'
import imageCompression from 'browser-image-compression'

export default function CheckoutWidget({ 
  screenId, 
  screenName, 
  discountPrice 
}: { 
  screenId: string, 
  screenName: string, 
  discountPrice: number 
}) {
  const [step, setStep] = useState(1)
  
  // Form State
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [deliveryType, setDeliveryType] = useState<'PICKUP' | 'SHIPPING'>('PICKUP')
  const [shippingAddress, setShippingAddress] = useState('')
  const [receiptImage, setReceiptImage] = useState<File | null>(null)
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const shippingCost = deliveryType === 'SHIPPING' ? 500 : 0
  const totalPrice = discountPrice + shippingCost

  const handleNextStep1 = () => {
    const result = customerInfoSchema.safeParse({ customerName, customerPhone })
    if (!result.success) {
      const newErrors: Record<string, string> = {}
      result.error.errors.forEach(e => {
        if (e.path[0]) newErrors[e.path[0] as string] = e.message
      })
      setErrors(newErrors)
      return
    }
    setErrors({})
    setStep(2)
  }

  const handleNextStep2 = () => {
    const result = deliverySchema.safeParse({ deliveryType, shippingAddress })
    if (!result.success) {
      const newErrors: Record<string, string> = {}
      result.error.errors.forEach(e => {
        if (e.path[0]) newErrors[e.path[0] as string] = e.message
      })
      setErrors(newErrors)
      return
    }
    setErrors({})
    setStep(3)
  }

  const handleSubmit = async () => {
    if (!receiptImage) {
      setErrors({ receiptImage: "Please upload the payment receipt screenshot." })
      return
    }
    
    setIsSubmitting(true)
    setErrors({})

    let finalImage = receiptImage
    if (receiptImage.size > 1024 * 1024) { // > 1MB
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg'
        }
        finalImage = await imageCompression(receiptImage, options)
      } catch (error) {
        console.error("Image compression error:", error)
      }
    }

    const formData = new FormData()
    formData.append('screenId', screenId)
    formData.append('customerName', customerName)
    formData.append('customerPhone', customerPhone)
    formData.append('deliveryType', deliveryType)
    if (deliveryType === 'SHIPPING') formData.append('shippingAddress', shippingAddress)
    formData.append('receiptImage', finalImage)
    formData.append('totalPrice', totalPrice.toString())

    const res = await submitScreenOrderAction(formData)
    setIsSubmitting(false)

    if (res?.success) {
      setIsSuccess(true)
    } else {
      setErrors({ general: "Something went wrong submitting your order." })
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center h-full animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-green-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Order Received!</h3>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-xs">We have successfully received your order and payment receipt. We will verify it and contact you shortly.</p>
        <button 
          onClick={() => document.getElementById('checkout-panel')?.classList.add('hidden')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 w-full shadow-lg"
        >
          Close Panel
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-10 relative px-4">
        <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-slate-100 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
           <div className="h-full bg-slate-900 transition-all duration-500 ease-out" style={{ width: `${((step - 1) / 2) * 100}%` }} />
        </div>
        {[1, 2, 3].map(s => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold border-[3px] transition-all duration-500 bg-white shadow-sm
            ${step >= s ? 'border-slate-900 text-slate-900 scale-110' : 'border-slate-200 text-slate-400 scale-100'}
            ${step === s ? 'ring-4 ring-slate-100' : ''}
          `}>
            {s}
          </div>
        ))}
      </div>

      <div className="flex-grow">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Your Details</h3>
              <p className="text-slate-500">Who is ordering the <span className="font-semibold text-slate-700">{screenName}</span>?</p>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Ahmed Hassan"
                  className={`w-full px-5 py-4 text-slate-900 bg-slate-50 rounded-2xl border-2 ${errors.customerName ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-slate-100 focus:border-slate-900 focus:bg-white'} transition-all focus:outline-none focus:ring-4 focus:ring-slate-900/10 placeholder-slate-400 font-medium`}
                />
                {errors.customerName && <p className="text-red-500 text-sm mt-2 font-medium flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.customerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className={`w-full px-5 py-4 text-slate-900 bg-slate-50 rounded-2xl border-2 ${errors.customerPhone ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-slate-100 focus:border-slate-900 focus:bg-white'} transition-all focus:outline-none focus:ring-4 focus:ring-slate-900/10 placeholder-slate-400 font-medium tracking-wide`}
                />
                {errors.customerPhone && <p className="text-red-500 text-sm mt-2 font-medium flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.customerPhone}</p>}
              </div>
            </div>

            <button 
              onClick={handleNextStep1}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl transition-all mt-8 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              Continue to Delivery
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Delivery Method</h3>
              <p className="text-slate-500">How do you want to receive your screen?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setDeliveryType('PICKUP')}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${deliveryType === 'PICKUP' ? 'border-slate-900 bg-slate-50 text-slate-900 shadow-md ring-4 ring-slate-900/5' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${deliveryType === 'PICKUP' ? 'text-slate-900' : 'text-slate-300'}`}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
                <span className="font-bold text-lg">Store Pickup</span>
                <span className={`text-sm font-medium ${deliveryType === 'PICKUP' ? 'text-slate-500' : 'text-slate-400'}`}>Free</span>
              </button>

              <button 
                onClick={() => setDeliveryType('SHIPPING')}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${deliveryType === 'SHIPPING' ? 'border-slate-900 bg-slate-50 text-slate-900 shadow-md ring-4 ring-slate-900/5' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${deliveryType === 'SHIPPING' ? 'text-slate-900' : 'text-slate-300'}`}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                <span className="font-bold text-lg">Shipping</span>
                <span className={`text-sm font-medium ${deliveryType === 'SHIPPING' ? 'text-slate-500' : 'text-slate-400'}`}>+500 EGP</span>
              </button>
            </div>

            {deliveryType === 'SHIPPING' && (
               <div className="animate-in slide-in-from-top-4 fade-in duration-300">
                <label className="block text-sm font-bold text-slate-700 mb-2 mt-2">Shipping Address</label>
                <textarea 
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  placeholder="Full address or paste Google Maps location link..."
                  rows={3}
                  className={`w-full px-5 py-4 text-slate-900 bg-slate-50 rounded-2xl border-2 ${errors.shippingAddress ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-slate-100 focus:border-slate-900 focus:bg-white'} transition-all focus:outline-none focus:ring-4 focus:ring-slate-900/10 placeholder-slate-400 font-medium resize-none`}
                />
                {errors.shippingAddress && <p className="text-red-500 text-sm mt-2 font-medium flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.shippingAddress}</p>}
              </div>
            )}

            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 mt-8">
              <div className="flex justify-between text-slate-500 mb-3 font-medium">
                <span className="truncate pr-4">{screenName}</span>
                <span className="shrink-0 text-slate-700">EGP {discountPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 mb-4 pb-4 border-b-2 border-slate-100 font-medium">
                <span>Delivery</span>
                <span className="text-slate-700">{shippingCost === 0 ? 'Free' : `EGP ${shippingCost.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between font-black text-slate-900 text-2xl">
                <span>Total</span>
                <span>EGP {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setStep(1)}
                className="w-1/3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-slate-300 font-bold py-4 px-4 rounded-2xl transition-colors active:scale-95"
              >
                Back
              </button>
              <button 
                onClick={handleNextStep2}
                className="w-2/3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
              >
                Continue to Payment
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Payment</h3>
              <p className="text-slate-500">Complete your order to secure your screen.</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-8 text-center shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
               <p className="text-blue-900 font-medium mb-3">Please transfer exactly:</p>
               <div className="text-5xl font-black text-blue-600 tracking-tight mb-5 drop-shadow-sm">
                 EGP {totalPrice.toLocaleString()}
               </div>
               <p className="text-blue-800 font-bold text-lg">To InstaPay: <a href="https://ipn.eg/S/sherif.rosas/instapay/6pcUoe" target="_blank" rel="noopener noreferrer" className="underline decoration-blue-300 decoration-2 underline-offset-4 hover:text-blue-900 transition-colors">sherif.rosas@instapay</a></p>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-bold text-slate-700 mb-3">Upload Transfer Receipt</label>
              <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer group relative ${errors.receiptImage ? 'border-red-400 bg-red-50/50' : (receiptImage ? 'border-green-400 bg-green-50/50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50 bg-slate-50/50')}`}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => {
                    setReceiptImage(e.target.files?.[0] || null)
                    setErrors({})
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
                  {receiptImage ? (
                    <div className="text-green-700 font-bold flex flex-col items-center gap-3 animate-in zoom-in-95 duration-200">
                       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                       </div>
                       <span className="truncate max-w-[200px] bg-green-100 px-3 py-1 rounded-full text-sm">{receiptImage.name}</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-700 transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                      </div>
                      <span className="text-slate-600 font-bold mt-2">Click to upload screenshot</span>
                      <span className="text-slate-400 text-sm font-medium">PNG, JPG up to 5MB</span>
                    </>
                  )}
                </div>
              </div>
              {errors.receiptImage && <p className="text-red-500 text-sm mt-3 font-medium flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.receiptImage}</p>}
            </div>

            {errors.general && <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.general}</div>}

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                className="w-1/3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-slate-300 font-bold py-4 px-4 rounded-2xl transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-2/3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none disabled:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Order
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
