import { Users, Building, Code, Briefcase } from 'lucide-react'

interface ImagePlaceholderProps {
  type: 'team' | 'office' | 'product' | 'client'
  title: string
  description: string
  className?: string
}

export default function ImagePlaceholder({ type, title, description, className = '' }: ImagePlaceholderProps) {
  const icons = {
    team: Users,
    office: Building,
    product: Code,
    client: Briefcase
  }

  const gradients = {
    team: 'from-blue-500 to-purple-600',
    office: 'from-emerald-500 to-teal-600',
    product: 'from-orange-500 to-red-600',
    client: 'from-indigo-500 to-purple-600'
  }

  const Icon = icons[type]

  return (
    <div className={`bg-gradient-to-br ${gradients[type]} rounded-xl p-8 text-center text-white ${className}`}>
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  )
}
