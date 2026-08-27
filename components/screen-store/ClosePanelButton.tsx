'use client'

export default function ClosePanelButton() {
  return (
    <button 
      onClick={() => {
        document.getElementById('checkout-panel')?.classList.add('hidden')
        document.getElementById('checkout-overlay')?.classList.add('hidden')
      }}
      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  )
}
