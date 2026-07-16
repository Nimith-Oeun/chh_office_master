'use client'

export default function OverviewBody() {
  return (
    <main className="min-h-screen bg-background w-full">
      {/* Hero Section */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full bg-cover bg-center overflow-hidden border border-border rounded-lg shadow-sm"
        style={{
          backgroundImage: 'var(--hero-bg-image)',
          backgroundPosition: 'right',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r to-transparent"></div>

        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-2xl">
            {/* Header with emoji */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
              <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">👋</span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground break-words">
                Good Morning, Chhong Cafe!
              </h1>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-5 md:mb-6 max-w-md leading-relaxed">
              Monitor your cafe operations in real-time. Track orders, inventory, and performance metrics all in one place.
            </p>

            {/* Action Buttons - Hidden on mobile */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-colors font-medium text-xs sm:text-sm whitespace-nowrap">
                <span className="text-base sm:text-lg">📊</span>
                View Reports
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 active:bg-secondary/80 transition-colors font-medium text-xs sm:text-sm whitespace-nowrap">
                <span className="text-base sm:text-lg">➕</span>
                New Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
