import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import echarts from '@/lib/echarts';
import { debounce } from '@/utils';

class PieChart extends Component {
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.object,
  };
  static defaultProps = {
    width: '100%',
    height: '300px',
    styles: {},
    className: '',
  };
  state = {
    chart: null,
  };

  componentDidMount() {
    debounce(this.initChart.bind(this), 300)();
    window.addEventListener('resize', () => this.resize());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
      this.resize();
    }
    if (nextProps.chartData !== this.props.chartData) {
      debounce(this.initChart.bind(this), 300)();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  resize() {
    const chart = this.state.chart;
    if (chart) {
      debounce(chart.resize.bind(this), 300)();
    }
  }

  dispose() {
    if (!this.state.chart) {
      return;
    }
    window.removeEventListener('resize', () => this.resize());
    this.setState({ chart: null });
  }

  setOptions() {
    const animationDuration = 3000;
    this.state.chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['KEYTOR', 'KEYMOB', 'KEYFOOD', 'KEYRIM'],
      },
      color: [
        '#ee6666',
        '#91cc75',
        '#fac858',
        '#136034',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
      ],
      calculable: true,
      series: [
        {
          name: 'DAILY REPORT',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 320, name: 'KEYTOR' },
            { value: 240, name: 'KEYMOB' },
            { value: 149, name: 'KEYFOOD' },
            { value: 100, name: 'KEYRIM' },
          ],
          animationEasing: 'cubicInOut',
          animationDuration,
        },
      ],
    });
  }

  initChart() {
    if (!this.el) return;
    this.setState({ chart: echarts.init(this.el, 'macarons') }, () => {
      this.setOptions(this.props.chartData);
    });
  }

  render() {
    const { className, height, width, styles } = this.props;
    return (
      <div
        className={className}
        ref={(el) => (this.el = el)}
        style={{
          ...styles,
          height,
          width,
        }}
      />
    );
  }
}

export default connect((state) => state.app)(PieChart);
