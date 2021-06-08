import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import moment from 'moment'
import 'bootstrap-datepicker'

import { Icon } from 'antd'

import styles from './MultiDatePicker.less'

export class MultiDatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value || ''
    }
  }

  componentWillMount () {
    $.fn.datepicker.dates['zh'] = {
      days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      daysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'today',
      clear: 'clear',
      format: this.props.format.toLowerCase(),
      titleFormat: 'yyyy MM', /* Leverages same syntax as 'format' */
      weekStart: 0
    }
  }

  componentDidMount () {
    $(this.refs.input)
      .datepicker({
        multidate: true,
        clearBtn: true,
        language: 'zh'
      })
      .on('changeDate', (e) => {
        const val = e.dates.map(d => moment(d).format(this.props.format)).join(',')
        this.props.onChange(val)
        this.setState({
          value: val
        })
      })
  }

  render () {
    return (
      <span className={styles.datepicker}>
        <input
          type="text"
          placeholder={this.props.placeholder || 'Pelease select a time（multiple）'}
          className="ant-input"
          value={this.state.value}
          ref="input"
          readOnly
        />
        <Icon type="calendar" />
      </span>
    )
  }
}

MultiDatePicker.propTypes = {
  value: PropTypes.string,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

MultiDatePicker.defaultProps = {
  format: 'YYYY-MM-DD'
}

export default MultiDatePicker
