'use client'

export default function CheckoutOverlay() {
  return (
    <div 
      id="checkout-overlay"
      onClick={() => {
        document.getElementById('checkout-panel')?.classList.add('hidden')
        document.getElementById('checkout-overlay')?.classList.add('hidden')
      }}
      className="hidden fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm cursor-pointer"
      aria-hidden="true"
    />
  )
}
