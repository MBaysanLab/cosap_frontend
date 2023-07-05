import React, { Component } from 'react';

class Depth extends Component {
  render() {
    const { min, max, value } = this.props;
    const sliderWidth = 200; // Slider width, you can adjust this as needed
    const triangleSize = 10; // Triangle size, adjust as needed
    const padding = 100; // Padding size, adjust as needed

    // Calculate the position of the triangle based on the current value
    const trianglePos = ((value - min) / (max - min)) * sliderWidth;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} > 

      
      <svg width={sliderWidth} height="200">
      <text x={sliderWidth/2} y="34" textAnchor="middle" fontSize="12">
        reads
      </text>
      <text x={sliderWidth/2} y="60" textAnchor="middle" fontSize="24" style={{ fontWeight: 'bold' }} >
        {value}
      </text>
      <text x={sliderWidth/2} y="80" textAnchor="middle" fontSize="20">
        DEPTH
      </text>
        <line
          x1="0"
          y1="120"
          x2={sliderWidth}
          y2="120"
          stroke="black"
          strokeWidth="4"
        />
        <polygon
          points={`${trianglePos},${padding + triangleSize} ${trianglePos - triangleSize},${padding} ${trianglePos + triangleSize},${padding}`}
          fill="blue"
        />

        <text x="0" y="140" fontSize="12">
          {min}
        </text>
        <text x={sliderWidth - 25} y="140" fontSize="12">
          {max}
        </text>
      </svg>
      </div>

    );
  }
}

export default Depth;