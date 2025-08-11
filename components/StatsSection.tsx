interface StatsItem {
  number: string
  label: string
  icon: string
}

const stats: StatsItem[] = [
  {
    number: "50+",
    label: "Development Tools",
    icon: "🛠️"
  },
  {
    number: "8",
    label: "Tech Categories",
    icon: "📚"
  },
  {
    number: "Weekly",
    label: "New Content",
    icon: "⚡"
  },
  {
    number: "100%",
    label: "Practical Guides",
    icon: "🎯"
  }
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your Development Journey Starts Here
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive guides and insights to level up your development skills
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-300 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
