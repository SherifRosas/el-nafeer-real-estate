'use client'

export default function MockPage({ title }: { title: string }) {
    return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-8 animate-in zoom-in duration-1000">
            <div className="relative">
                <div className="w-32 h-32 bg-cyan-500/10 rounded-full flex items-center justify-center text-6xl animate-pulse">
                    ⚡
                </div>
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
            </div>
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">{title}</h2>
                <p className="text-gray-500 font-bold text-lg max-w-sm">
                    System module initializing. Quantum connection established. Awaiting Master signal...
                </p>
            </div>
            <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-1/3 animate-[shimmer_2s_infinite]" />
            </div>
            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
        </div>
    )
}
