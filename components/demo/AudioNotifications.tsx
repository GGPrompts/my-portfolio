'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Volume2, Settings, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'

const audioFeatures = [
  {
    icon: Volume2,
    title: 'Status Events',
    color: 'from-primary to-emerald-500',
    items: [
      { label: 'Ready', description: '"Claude Worker ready"' },
      { label: 'Tool Use', description: '"Edit index.ts", "Read config"' },
      { label: 'Session Start', description: '"Projects started"' },
      { label: 'Subagents', description: '"3 agents running"' },
    ],
  },
  {
    icon: Settings,
    title: 'Per-Profile Settings',
    color: 'from-purple-500 to-pink-500',
    items: [
      { label: 'Audio Mode', description: 'Default / Enabled / Disabled' },
      { label: 'Custom voice', description: 'per profile' },
      { label: 'Speech rate', description: 'override' },
      { label: 'Master mute', description: 'button in header' },
    ],
  },
  {
    icon: Mic,
    title: 'Voice Options',
    color: 'from-cyan-500 to-blue-500',
    items: [
      { label: '20+ neural voices', description: '(edge-tts)' },
      { label: 'Random voice', description: 'per terminal' },
      { label: 'Adjustable speech rate', description: '' },
      { label: 'Volume control', description: '' },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AudioNotifications() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          <Volume2 className="inline-block w-8 h-8 mr-3 mb-1" />
          Audio Notifications
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Neural TTS announces Claude status through Chrome
        </p>
      </div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {audioFeatures.map((feature) => (
          <motion.div key={feature.title} variants={itemVariants}>
            <Card className="glass border-primary/20 h-full group hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br',
                      'group-hover:scale-110 transition-transform duration-300',
                      feature.color
                    )}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-primary">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.items.map((item, index) => (
                    <li key={index} className="text-sm">
                      <span className="text-foreground font-medium">{item.label}</span>
                      {item.description && (
                        <span className="text-muted-foreground"> — {item.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
