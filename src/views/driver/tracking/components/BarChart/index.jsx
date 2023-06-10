import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import echarts from '@/lib/echarts';
import { debounce } from '@/utils';

class BarChart extends Component {
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
        trigger: 'axis',
        axisPointer: {
          type: 'shadow', //'line' | 'shadow'
        },
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
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'KEYTOR',
          type: 'bar',
          stack: 'orders',
          barWidth: '60%',
          data: [0, 0, 0, 0, 1, 0, 0, 79, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: 'KEYMOB',
          type: 'bar',
          stack: 'orders',
          barWidth: '60%',
          data: [0, 0, 0, 0, 1, 0, 0, 80, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: 'KEYFOOD',
          type: 'bar',
          stack: 'orders',
          barWidth: '60%',
          data: [0, 0, 0, 0, 1, 0, 0, 30, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: 'KEYRIM',
          type: 'bar',
          stack: 'orders',
          barWidth: '60%',
          data: [0, 0, 0, 0, 1, 0, 0, 3, 5, 2, 3, 3, 3, 2],
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

export default connect((state) => state.app)(BarChart);
