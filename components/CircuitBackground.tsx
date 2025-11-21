'use client';

import React, { useEffect, useRef } from 'react';

interface CircuitBackgroundProps {
  colorScheme?: 'cyan' | 'purple' | 'green' | 'orange';
  opacity?: number;
}

interface Node {
  x: number;
  y: number;
  connections: number[];
  active: boolean;
  pulsePhase: number;
  size: number;
  type: 'processor' | 'junction' | 'terminal';
}

interface DataPacket {
  currentNode: number;
  targetNode: number;
  progress: number;
  speed: number;
  color: { r: number; g: number; b: number };
  size: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
}

interface Trace {
  startNode: number;
  endNode: number;
  path: Array<{ x: number; y: number }>;
  active: boolean;
  glowIntensity: number;
}

interface Spark {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
}

export const CircuitBackground: React.FC<CircuitBackgroundProps> = ({
  colorScheme = 'cyan',
  opacity = 0.6,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Color schemes - terminal themed
    const colorSchemes = {
      cyan: {
        primary: { r: 16, g: 185, b: 129 }, // Terminal green/cyan
        secondary: { r: 6, g: 182, b: 212 }, // Cyan accent
        accent: { r: 255, g: 255, b: 255 },
        glow: 'rgba(16, 185, 129, 0.5)',
      },
      purple: {
        primary: { r: 186, g: 85, b: 211 },
        secondary: { r: 138, g: 43, b: 226 },
        accent: { r: 255, g: 200, b: 255 },
        glow: 'rgba(186, 85, 211, 0.5)',
      },
      green: {
        primary: { r: 0, g: 255, b: 0 },
        secondary: { r: 0, g: 200, b: 100 },
        accent: { r: 200, g: 255, b: 200 },
        glow: 'rgba(0, 255, 0, 0.5)',
      },
      orange: {
        primary: { r: 255, g: 150, b: 0 },
        secondary: { r: 255, g: 100, b: 0 },
        accent: { r: 255, g: 255, b: 200 },
        glow: 'rgba(255, 150, 0, 0.5)',
      },
    };

    const colors = colorSchemes[colorScheme];

    // Create grid of nodes
    const nodes: Node[] = [];
    const gridSize = 50;
    const cols = Math.floor(canvas.width / gridSize) + 2;
    const rows = Math.floor(canvas.height / gridSize) + 2;

    // Generate nodes
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() > 0.7) {
          const types: Array<'processor' | 'junction' | 'terminal'> = [
            'processor',
            'junction',
            'junction',
            'terminal',
          ];
          const type = types[Math.floor(Math.random() * types.length)];

          nodes.push({
            x: col * gridSize + (Math.random() - 0.5) * 20,
            y: row * gridSize + (Math.random() - 0.5) * 20,
            connections: [],
            active: Math.random() > 0.5,
            pulsePhase: Math.random() * Math.PI * 2,
            size: type === 'processor' ? 8 : type === 'junction' ? 4 : 3,
            type,
          });
        }
      }
    }

    // Connect nearby nodes and create traces
    const traces: Trace[] = [];
    nodes.forEach((node, i) => {
      const nearbyNodes = nodes.filter((other, j) => {
        if (i === j) return false;
        const dist = Math.hypot(other.x - node.x, other.y - node.y);
        return dist < gridSize * 2 && dist > gridSize * 0.5;
      });

      const connectionCount = Math.min(
        nearbyNodes.length,
        Math.floor(Math.random() * 3) + 1
      );
      for (let c = 0; c < connectionCount; c++) {
        const targetIndex = nodes.indexOf(nearbyNodes[c]);
        if (!node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);

          const path: Array<{ x: number; y: number }> = [];
          const target = nodes[targetIndex];

          path.push({ x: node.x, y: node.y });

          // Orthogonal routing for circuit board look
          if (Math.random() > 0.5) {
            path.push({ x: target.x, y: node.y });
          } else {
            path.push({ x: node.x, y: target.y });
          }

          path.push({ x: target.x, y: target.y });

          traces.push({
            startNode: i,
            endNode: targetIndex,
            path,
            active: Math.random() > 0.3,
            glowIntensity: Math.random() * 0.5 + 0.5,
          });
        }
      }
    });

    // Data packets
    const packets: DataPacket[] = [];
    const createPacket = () => {
      const startNode = Math.floor(Math.random() * nodes.length);
      const node = nodes[startNode];
      if (node.connections.length > 0) {
        const targetNode =
          node.connections[Math.floor(Math.random() * node.connections.length)];
        packets.push({
          currentNode: startNode,
          targetNode,
          progress: 0,
          speed: Math.random() * 0.02 + 0.01,
          color: Math.random() > 0.7 ? colors.accent : colors.primary,
          size: Math.random() * 2 + 1,
          trail: [],
        });
      }
    };

    // Initialize packets
    for (let i = 0; i < 20; i++) {
      createPacket();
    }

    const sparks: Spark[] = [];

    const drawNode = (node: Node) => {
      const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
      const { r, g, b } = colors.primary;

      if (node.type === 'processor') {
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pulse})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          node.x - node.size,
          node.y - node.size,
          node.size * 2,
          node.size * 2
        );

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pulse * 0.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(
          node.x - node.size / 2,
          node.y - node.size / 2,
          node.size,
          node.size
        );

        ctx.fillStyle = node.active
          ? `rgba(${colors.accent.r}, ${colors.accent.g}, ${colors.accent.b}, ${pulse})`
          : `rgba(${r}, ${g}, ${b}, ${pulse * 0.5})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (node.type === 'junction') {
        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pulse})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-node.size, -node.size, node.size * 2, node.size * 2);
        ctx.restore();

        if (node.active) {
          const glowGradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.size * 2
          );
          glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${pulse * 0.5})`);
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.stroke();

        if (node.active) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pulse * 0.3})`;
          ctx.fill();
        }
      }
    };

    const drawTrace = (trace: Trace) => {
      if (!trace.active) return;

      const { r, g, b } = colors.secondary;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${trace.glowIntensity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.lineCap = 'square';

      ctx.beginPath();
      trace.path.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${trace.glowIntensity * 0.1})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawPacket = (packet: DataPacket) => {
      const startNode = nodes[packet.currentNode];
      const endNode = nodes[packet.targetNode];

      if (!startNode || !endNode) return;

      const trace = traces.find(
        (t) =>
          (t.startNode === packet.currentNode && t.endNode === packet.targetNode) ||
          (t.startNode === packet.targetNode && t.endNode === packet.currentNode)
      );

      let x, y;
      if (trace) {
        const pathIndex = Math.floor(packet.progress * (trace.path.length - 1));
        const nextIndex = Math.min(pathIndex + 1, trace.path.length - 1);
        const localProgress = (packet.progress * (trace.path.length - 1)) % 1;

        x =
          trace.path[pathIndex].x +
          (trace.path[nextIndex].x - trace.path[pathIndex].x) * localProgress;
        y =
          trace.path[pathIndex].y +
          (trace.path[nextIndex].y - trace.path[pathIndex].y) * localProgress;
      } else {
        x = startNode.x + (endNode.x - startNode.x) * packet.progress;
        y = startNode.y + (endNode.y - startNode.y) * packet.progress;
      }

      // Trail
      packet.trail.unshift({ x, y, opacity: 1 });
      if (packet.trail.length > 10) {
        packet.trail.pop();
      }
      packet.trail.forEach((point, i) => {
        point.opacity = 1 - i / packet.trail.length;
      });

      packet.trail.forEach((point, i) => {
        if (i > 0) {
          const { r, g, b } = packet.color;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${point.opacity * 0.5})`;
          ctx.lineWidth = packet.size * (1 - i / packet.trail.length);
          ctx.beginPath();
          ctx.moveTo(packet.trail[i - 1].x, packet.trail[i - 1].y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      });

      // Glowing packet
      const { r, g, b } = packet.color;
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, packet.size * 3);
      glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
      glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.5)`);
      glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, packet.size * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(x, y, packet.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSpark = (spark: Spark) => {
      const alpha = 1 - spark.life / spark.maxLife;
      const { r, g, b } = colors.accent;

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      // Very dark background - more subtle
      ctx.fillStyle = '#020208';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very subtle grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.02)';
      ctx.lineWidth = 0.3;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw everything
      traces.forEach((trace) => drawTrace(trace));

      nodes.forEach((node) => {
        node.pulsePhase += 0.02;
        drawNode(node);
      });

      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i];
        packet.progress += packet.speed;

        drawPacket(packet);

        if (packet.progress >= 1) {
          const targetNode = nodes[packet.targetNode];
          if (targetNode) {
            sparks.push({
              x: targetNode.x,
              y: targetNode.y,
              life: 0,
              maxLife: 20,
              size: 5,
            });

            targetNode.active = true;
            targetNode.pulsePhase = 0;
          }

          packets.splice(i, 1);
          createPacket();
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.life++;
        drawSpark(spark);

        if (spark.life >= spark.maxLife) {
          sparks.splice(i, 1);
        }
      }

      // Scanline effect
      const scanlineY = (Date.now() / 20) % canvas.height;
      const scanlineGradient = ctx.createLinearGradient(
        0,
        scanlineY - 50,
        0,
        scanlineY + 50
      );
      scanlineGradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
      scanlineGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.1)');
      scanlineGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = scanlineGradient;
      ctx.fillRect(0, scanlineY - 50, canvas.width, 100);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [colorScheme]);
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity, display: 'block' }}
      />
    </div>
  );
};
