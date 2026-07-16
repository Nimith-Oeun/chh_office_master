'use client'

// import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface StatCardProps {
  label: string
  value: string
  change: string
  icon: React.ReactNode
  backgroundColor: string
  iconBgColor: string
}

export function StatCard({
  label,
  value,
  change,
  icon,
  backgroundColor,
  iconBgColor,
}: StatCardProps) {
  const chartData = [
    { value: 30 },
    { value: 45 },
    { value: 35 },
    { value: 50 },
    { value: 40 },
  ]

  return (
    <div className="rounded-lg bg-white p-5 shadow-sm border border-border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-2">{change}</p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-lg`}>{icon}</div>
      </div>
      {/* <ResponsiveContainer width="100%" height={40}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={backgroundColor}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  )
}
