'use client'

interface ApplicationProgressProps {
  currentStep: 'apply' | 'coupon' | 'complete'
  className?: string
}

const steps = [
  { id: 'apply', label: 'ACQUISITION', labelAr: 'التقديم', icon: '📝' },
  { id: 'coupon', label: 'TOKEN_GEN', labelAr: 'الكوبون', icon: '🎫' },
]

export default function ApplicationProgress({ currentStep, className = '' }: ApplicationProgressProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className={`relative px-8 py-10 transition-all duration-700 ${className}`}>
      {/* HUD Frame Background */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="flex items-center justify-between relative">
        {/* Progress Stream Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-[1px] bg-cyan-500 -translate-y-1/2 shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-1000"
          style={{
            width: currentStepIndex >= 0
              ? `${(currentStepIndex / (steps.length - 1)) * 100}%`
              : '0%'
          }}
        />

        {/* Sync Nodes */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              {/* Node Circle */}
              <div
                className={`
                  w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center
                  ${isCompleted
                    ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                    : isCurrent
                      ? 'bg-black border-cyan-500 scale-125 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'bg-black border-white/10'
                  }
                `}
              >
                {isCurrent && <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />}
              </div>

              {/* Technical Metadata */}
              <div className="absolute top-10 flex flex-col items-center max-w-[80px]">
                <p className={`text-[7px] md:text-[8px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase transition-colors duration-500 text-center ${isCurrent ? 'text-white' : isCompleted ? 'text-cyan-400' : 'text-gray-600'
                  }`}>
                  {step.label}
                </p>
                <p className={`text-[6px] md:text-[7px] font-black opacity-40 transition-colors text-center ${isCurrent ? 'text-cyan-500' : 'text-gray-700'
                  }`}>
                  {step.labelAr}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

