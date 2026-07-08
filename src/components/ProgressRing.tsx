import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ProgressRingProps {
  contributed: number;
  total: number;
  isLight?: boolean;
}

export function ProgressRing({ contributed, total, isLight }: ProgressRingProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 36;
    const height = 36;
    const radius = Math.min(width, height) / 2;
    const strokeWidth = 3;
    const innerRadius = radius - strokeWidth - 1;
    const outerRadius = radius - 1;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Background track arc
    const backgroundArc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    g.append('path')
      .attr('d', backgroundArc as any)
      .attr('fill', isLight ? '#E4E4E7' : '#1F1F23') // zinc-200 or custom dark gray
      .attr('stroke', isLight ? '#E4E4E7' : '#1F1F23')
      .attr('stroke-width', 0.5);

    // Calculate ratio
    const ratio = total > 0 ? contributed / total : 0;
    const endAngle = ratio * 2 * Math.PI;

    // Foreground progress arc
    const progressArc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
      .cornerRadius(1);

    // Dynamic color based on completion ratio
    const strokeColor = ratio === 1 
      ? '#10B981' // emerald-500 (fully completed)
      : '#F97316'; // orange-500 (active progress)

    // Animate foreground path
    const path = g.append('path')
      .datum({ endAngle: 0 }) // Start animation from 0 angle
      .attr('fill', strokeColor);

    path.transition()
      .duration(750)
      .ease(d3.easeQuadOut)
      .attrTween('d', function(d: any) {
        const interpolate = d3.interpolate(d.endAngle, endAngle);
        return function(t: number) {
          d.endAngle = interpolate(t);
          return progressArc(d as any) || '';
        };
      });

    // Central fraction text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('class', 'font-mono text-[8px] font-bold')
      .attr('fill', isLight ? '#27272A' : '#E4E4E7')
      .text(`${contributed}/${total}`);

  }, [contributed, total, isLight]);

  return (
    <div className="flex items-center justify-center shrink-0" title={`${contributed} of ${total} members contributed this round`}>
      <svg ref={svgRef} width={36} height={36} className="overflow-visible" />
    </div>
  );
}
