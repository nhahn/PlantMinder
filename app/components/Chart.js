import React from 'react';
import {uniqueId} from 'underscore';

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.id = uniqueId('chart_');
  }

  componentDidMount() {
    let labels = (this.props.labels.length < 1)? ['', ''] : this.props.labels;
    let data = (this.props.labels.length < 1)? [[0,0]] : this.props.data;
    
    this.chart = new Chartist.Line("#" + this.id, {
      labels: labels,
      series: data
    }, {
      //showArea: true,
      chartPadding: {
        right: 40
      }
    });

    // Let's put a sequence number aside so we can use it in the event callbacks
    var seq = 0,
      delays = 40,
      durations = 500;

    // Once the chart is fully created we reset the sequence
    this.chart.on('created', function() {
      seq = 0;
    });

    // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
    this.chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 2000 * data.index,
            dur: 2000,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      }
    });
    
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.labels == this.props.labels && nextProps.data == this.props.data) return;
    let labels = (nextProps.labels.length < 1)? ['', ''] : nextProps.labels;
    let data = (nextProps.labels.length < 1)? [[0,0]] : nextProps.data;
    
    this.chart.update({
      labels: labels,
      series: data
    });
  }

  componentWillUnmount() {
    this.chart.detach();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-2 col-sm-1">
            <img src={this.props.img}/>
          </div>
          <div className="col-xs-5 col-sm-5">
            <h4>{this.props.name}</h4>
          </div>
          <div className="col-xs-5 col-sm-5">
            {this.props.children}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className={this.props.className + " " + this.props.aspectRatio} id={this.id}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Plant;