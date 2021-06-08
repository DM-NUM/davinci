import * as React from 'react'
import { Col, Row, Input, Button, Form } from 'antd'
const FormItem = Form.Item
const styles = require('../Profile/profile.less')



interface IResetPasswordProps {
  form: any
  type: string
  submit: () => any
}


export class ResetPasswordForm extends React.PureComponent<IResetPasswordProps> {
  public componentDidMount () {
    this.props.form.validateFields()
  }
  private checkPasswordConfirm = (rule, value, callback) => {
    if (value && value !== this.props.form.getFieldValue('password')) {
      callback('Passwords entered twice are inconsistent')
    } else {
      callback()
    }
  }

  private forceCheckConfirm = (rule, value, callback) => {
    const { form } = this.props
    if (form.getFieldValue('confirmPassword')) {
      form.validateFields(['confirmPassword'], { force: true })
    }
    callback()
  }
  private hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field])
  }
  public render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const commonFormItemStyle = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    const oldPassError = isFieldTouched('oldPassword') && getFieldError('oldPassword')
    const newPassError = isFieldTouched('password') && getFieldError('password')
    const confirmPasswordError = isFieldTouched('confirmPassword') && getFieldError('confirmPassword')
    const isSubmit = this.hasErrors(getFieldsError())
    return (
      <Form className={styles.formView}>
        <Row>
          <Col>
            <FormItem
              {...commonFormItemStyle}
              className={styles.hide}
            >
              {getFieldDecorator('id', {})(
                <Input />
              )}
            </FormItem>

            <FormItem
              label="Old password"
              {...commonFormItemStyle}
              validateStatus={oldPassError ? 'error' : 'success'}
              help={oldPassError || ''}
            >
              {getFieldDecorator('oldPassword', {
                rules: [{
                  required: true,
                  message: 'Old password can not be empty'
                }]
              })(
                <Input type="password" placeholder="Your Password" />
              )}
            </FormItem>
          </Col>
          <Col>
            <FormItem
              label="New password"
              {...commonFormItemStyle}
              validateStatus={newPassError ? 'error' : 'success'}
              help={newPassError || ''}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: 'New password can not be empty'
                }, {
                  min: 6,
                  max: 20,
                  message: "Password's length is 6-20"
                }, {
                  validator: this.forceCheckConfirm
                }]
              })(
                <Input type="password" placeholder="New Password" />
              )}
            </FormItem>
          </Col>
          <Col>
            <FormItem
              label="Confirm new password"
              {...commonFormItemStyle}
              validateStatus={confirmPasswordError ? 'error' : 'success'}
              help={confirmPasswordError || ''}
            >
              {getFieldDecorator('confirmPassword', {
                rules: [{
                  required: true,
                  message: 'Please confirm new password'
                }, {
                  validator: this.checkPasswordConfirm
                }]
              })(
                <Input type="password" placeholder="Confirm Password" />
              )}
            </FormItem>
          </Col>
          <Col offset={4}>
            <Button size="large" type="primary" disabled={isSubmit} onClick={this.props.submit}>Confirm change</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(ResetPasswordForm)











