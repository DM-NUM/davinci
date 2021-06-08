import * as React from 'react'
const styles = require('./register.less')
import { Icon } from 'antd'

interface ISendEmailTipsProps {
  email?: string
  goBack: () => any
  sendEmailOnceMore: () => any
}

export class SendEmailTips extends React.PureComponent<ISendEmailTipsProps, {}> {
  private goEmailNet = () => {
    const { email } = this.props
    let suffixNet = ''
    if (email) {
      suffixNet = email.split('@')[1]
      const net = email.indexOf('creditease') > 0 ? `https://email.${suffixNet}` : `https://mail.${suffixNet}`
      window.open(net)
    }
  }
  public render () {
      const { email } = this.props
      return (
          <div className={styles.content}>
              <h1>Please check email</h1>
              <p>We send an email to  <b>{email}</b>，Please <b><a onClick={this.goEmailNet}>confirm</a></b>by email。</p>
              <p>Not received？ <a href="javascript:;" onClick={this.props.sendEmailOnceMore}>Resend email</a></p>
              <div className={styles.back} onClick={this.props.goBack}>
                <Icon type="left-circle-o" /> Previous step
              </div>
          </div>
      )
  }
}

export default SendEmailTips

