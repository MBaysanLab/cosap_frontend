import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Speedometer({title ="", percent = 0 , size =250}) {
    const ref = useRef(null);


    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = size, height = 4 * size /5;
        const margin = 5;
        const radius = Math.min(width, 2 * height) / 2 - margin;

        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${width/2})`);

        const backgroundArc = d3.arc()
            .innerRadius(0.65 * radius)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2)
            .cornerRadius(1)
            .padAngle(0.01);

        g.append('path')
            .attr('d', backgroundArc())
            .attr('fill', '#d9d9d9');

        const valueArc = d3.arc()
            .innerRadius(0.65 * radius)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2)
            .endAngle((-Math.PI / 2) + Math.PI * (percent / 100))
            .cornerRadius(1)
            .padAngle(0.01);

        g.append('path')
            .attr('d', valueArc())
            .attr('fill', '#0000ff');

        // Needle base
        g.append('circle')
            .attr('r', 7)
            .attr('fill', '#ff0000')
            .attr('stroke', '#000000') // black outline
            .attr('stroke-width', 2); // thicker outline

        // Draw the needle
        g.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -0.65 * radius)
            .attr('stroke', '#ff0000')
            .attr('stroke-linecap', 'round') // round end cap
            .attr('stroke-width', 3)
            .attr('transform', `rotate(${(percent / 100) * 180 - 90})`);

        // Display the percent value at the bottom
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '2em')
            .style('font-size', '12px')
            .text(`${percent}%`);
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '3em')
            .style('font-size', '16px')
            .style('font-weight', 'bold')
            .style('text-transform', 'uppercase')
            .text(`${title}`);

    }, [percent, size]);

    return (
        <svg ref={ref} width={size} height={size}></svg>
    );
}

export default Speedometer;