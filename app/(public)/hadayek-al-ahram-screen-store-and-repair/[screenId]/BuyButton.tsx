'use client'

export default function BuyButton({ inStock }: { inStock: boolean }) {
  if (!inStock) {
    return (
      <div className="w-full bg-slate-100 text-slate-500 font-bold text-lg py-5 px-8 rounded-2xl text-center border border-slate-200 shadow-sm">
        Out of Stock
      </div>
    )
  }

  const openPanel = () => {
    document.getElementById('checkout-panel')?.classList.remove('hidden')
  }

  return (
    <button
      onClick={openPanel}
      className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-[0.98]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      Buy Now - Pay via InstaPay
    </button>
  )
}
