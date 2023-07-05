import React, { Component } from 'react';

class HalfCircleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: props.percentage,
      title: props.title,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.percentage !== prevProps.percentage) {
      this.setState({ percentage: this.props.percentage });
    }
  }

  render() {
    const { percentage, title } = this.state;

    const radius = 70;
    const circumference = Math.PI * radius; // Half circle
    const offset = ((100 - percentage) / 100) * circumference;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <div>
        <svg height="80" width="200">
          <circle
            stroke="grey"
            fill="transparent"
            r={radius}
            cx="100"
            cy="80"
            strokeWidth="5"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference}
          />
          <circle
            stroke="red"
            fill="transparent"
            strokeWidth="10"
            r={radius}
            cx="90"
            cy="70"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset: offset + circumference / 2 }}
            transform="rotate(-90,100,70)" // rotate the circle so it fills from left to right
          />
          <text x="100" y="70" textAnchor="middle" dy=".3em" fontSize="20">
            {`${percentage}%`}
          </text>
        </svg>
       
      </div>
       <text style={{  'text-transform': 'uppercase' }} x="100" y="100" textAnchor="middle" dy=".3em" fontSize="20">
          {`${title}`}
        </text>
      </div>

      
    );
  }
}

export default HalfCircleSlider;
