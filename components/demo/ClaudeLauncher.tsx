'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Rocket, Copy, Check, Terminal, Folder, Bot, Mic, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LauncherState {
  workingDir: string
  agent: string
  model: string
  voice: string
  skipPermissions: boolean
  continueSession: boolean
}

const agents = [
  { value: 'none', label: 'None' },
  { value: '--agent explore', label: 'Explore' },
  { value: '--agent plan', label: 'Plan' },
  { value: '--agent code-reviewer', label: 'Code Reviewer' },
  { value: '--agent general-purpose', label: 'General Purpose' },
]

const models = [
  { value: 'none', label: 'Default (Sonnet)' },
  { value: '--model opus', label: 'Opus' },
  { value: '--model haiku', label: 'Haiku' },
]

const voices = [
  { value: 'none', label: 'None' },
  { value: '--voice jenny', label: 'Jenny' },
  { value: '--voice guy', label: 'Guy' },
  { value: '--voice en-GB-SoniaNeural', label: 'Sonia (UK)' },
  { value: '--voice en-AU-WilliamNeural', label: 'William (AU)' },
]

export default function ClaudeLauncher() {
  const [state, setState] = useState<LauncherState>({
    workingDir: '~/projects',
    agent: 'none',
    model: 'none',
    voice: 'none',
    skipPermissions: true,
    continueSession: false,
  })
  const [copied, setCopied] = useState(false)
  const [spawnResult, setSpawnResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isSpawning, setIsSpawning] = useState(false)

  // Build the claude command from current state
  const buildCommand = useCallback(() => {
    const parts = ['claude']
    if (state.agent && state.agent !== 'none') parts.push(state.agent)
    if (state.model && state.model !== 'none') parts.push(state.model)
    if (state.voice && state.voice !== 'none') parts.push(state.voice)
    if (state.skipPermissions) parts.push('--dangerously-skip-permissions')
    if (state.continueSession) parts.push('--continue')
    return parts.join(' ')
  }, [state])

  // Build a descriptive tab name
  const buildName = useCallback(() => {
    const parts = ['Claude']
    if (state.agent && state.agent !== 'none') {
      const agentName = state.agent.replace('--agent ', '')
      parts.push(agentName.charAt(0).toUpperCase() + agentName.slice(1).replace('-', ' '))
    }
    if (state.model && state.model !== 'none') {
      const modelName = state.model.replace('--model ', '')
      parts.push(modelName.charAt(0).toUpperCase() + modelName.slice(1))
    }
    if (state.voice && state.voice !== 'none') {
      const voiceName = state.voice.replace('--voice ', '').split('-')[0]
      parts.push(voiceName.charAt(0).toUpperCase() + voiceName.slice(1))
    }
    return parts.join(' + ')
  }, [state])

  // Build curl command
  const buildCurl = useCallback(() => {
    const name = buildName()
    const command = buildCommand()
    const workingDir = state.workingDir || '~/projects'

    return `curl -X POST http://localhost:8129/api/spawn \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "${name}",
    "workingDir": "${workingDir}",
    "command": "${command}"
  }'`
  }, [state.workingDir, buildName, buildCommand])

  // Copy curl to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildCurl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Spawn terminal via API
  const handleSpawn = async () => {
    setIsSpawning(true)
    setSpawnResult(null)

    try {
      const response = await fetch('http://localhost:8129/api/spawn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: buildName(),
          workingDir: state.workingDir || '~/projects',
          command: buildCommand(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSpawnResult({
          success: true,
          message: `Terminal spawned! ID: ${data.terminal?.id || 'N/A'}`,
        })
      } else {
        setSpawnResult({
          success: false,
          message: data.error || 'Unknown error',
        })
      }
    } catch (err) {
      setSpawnResult({
        success: false,
        message: `Connection failed. Is the backend running on localhost:8129?`,
      })
    } finally {
      setIsSpawning(false)
    }
  }

  const command = buildCommand()
  const tabName = buildName()
  const curlCommand = buildCurl()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-16"
    >
      <Card className="glass border-primary/20 overflow-hidden">
        <CardHeader className="border-b border-primary/10 bg-primary/5">
          <CardTitle className="flex items-center gap-3 text-primary">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            Interactive Claude Code Launcher
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Build Claude Code commands dynamically. Requires TabzChrome backend running on localhost:8129.
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Working Directory */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Folder className="w-4 h-4 text-primary" />
                Working Directory
              </Label>
              <Input
                value={state.workingDir}
                onChange={(e) => setState((s) => ({ ...s, workingDir: e.target.value }))}
                placeholder="~/projects/myapp"
                className="bg-black/50 border-border/50 focus:border-primary text-foreground"
              />
            </div>

            {/* Agent */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Bot className="w-4 h-4 text-primary" />
                Agent
              </Label>
              <Select
                value={state.agent}
                onValueChange={(value) => setState((s) => ({ ...s, agent: value }))}
              >
                <SelectTrigger className="bg-black/50 border-border/50 focus:border-primary text-foreground">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.value} value={agent.value}>
                      {agent.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Cpu className="w-4 h-4 text-primary" />
                Model
              </Label>
              <Select
                value={state.model}
                onValueChange={(value) => setState((s) => ({ ...s, model: value }))}
              >
                <SelectTrigger className="bg-black/50 border-border/50 focus:border-primary text-foreground">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Voice */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Mic className="w-4 h-4 text-primary" />
                Voice
              </Label>
              <Select
                value={state.voice}
                onValueChange={(value) => setState((s) => ({ ...s, voice: value }))}
              >
                <SelectTrigger className="bg-black/50 border-border/50 focus:border-primary text-foreground">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.value} value={voice.value}>
                      {voice.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skipPermissions"
                checked={state.skipPermissions}
                onCheckedChange={(checked) =>
                  setState((s) => ({ ...s, skipPermissions: checked as boolean }))
                }
                className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="skipPermissions" className="text-sm text-muted-foreground cursor-pointer">
                Skip Permissions <code className="text-xs text-primary/70">--dangerously-skip-permissions</code>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="continueSession"
                checked={state.continueSession}
                onCheckedChange={(checked) =>
                  setState((s) => ({ ...s, continueSession: checked as boolean }))
                }
                className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="continueSession" className="text-sm text-muted-foreground cursor-pointer">
                Continue Previous <code className="text-xs text-primary/70">--continue</code>
              </Label>
            </div>
          </div>

          {/* Preview Outputs */}
          <div className="space-y-4">
            {/* Generated Command */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Generated Command:</Label>
              <div className="bg-black/50 rounded-lg p-3 font-mono text-sm border border-primary/10">
                <code className="text-primary">{command}</code>
              </div>
            </div>

            {/* Tab Name */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Tab Name:</Label>
              <div className="bg-black/50 rounded-lg p-3 font-mono text-sm border border-primary/10">
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                  <Terminal className="w-3 h-3 mr-1.5" />
                  {tabName}
                </Badge>
              </div>
            </div>

            {/* Curl Command */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">curl Command:</Label>
              <div className="bg-black/50 rounded-lg p-3 font-mono text-xs border border-primary/10 overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{curlCommand}</pre>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleSpawn}
              disabled={isSpawning}
              className="bg-gradient-to-r from-primary to-cyan-500 text-white hover:opacity-90 transition-opacity"
            >
              <Rocket className={cn('w-4 h-4 mr-2', isSpawning && 'animate-pulse')} />
              {isSpawning ? 'Spawning...' : 'Spawn Terminal'}
            </Button>

            <Button
              variant="outline"
              onClick={handleCopy}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy curl
                </>
              )}
            </Button>
          </div>

          {/* Spawn Result */}
          {spawnResult && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'p-3 rounded-lg text-sm',
                spawnResult.success
                  ? 'bg-primary/10 border border-primary/20 text-primary'
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              )}
            >
              {spawnResult.success ? '✓ ' : '✗ '}
              {spawnResult.message}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
