interface SummaryCardsProps {
  stats: {
    totalItems: number;
    totalUsed: number;
    totalRefill: number;
    totalRemaining: number;
  };
}

export default function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Food',
      value: stats.totalItems,
      icon: '📦',
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Beer',
      value: stats.totalUsed,
      icon: '📊',
      color: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Drink',
      value: stats.totalRefill,
      icon: '🔄',
      color: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      title: 'Total Remaining Stock',
      value: stats.totalRemaining,
      icon: '📈',
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <p className={`mt-2 text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`rounded-lg ${card.color} px-3 py-2 text-2xl`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
