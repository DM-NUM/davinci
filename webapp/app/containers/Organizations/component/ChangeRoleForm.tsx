import React from 'react'
import { Form, Input, Radio, Button } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const styles = require('../Organization.less')
const utilStyles = require('assets/less/util.less')


interface IChangeRoleProps {
  form: any
  category: string
  organizationOrTeam: { name?: string }
  submitLoading: boolean
  changeHandler: () => any
}
export class ChangeRoleForm extends React.PureComponent<IChangeRoleProps, {}> {
  private tips = (type: string) => {
    switch (type) {
      case 'orgMember':
        return 'Choose a new role'
      case 'teamMember':
        return ''
    }
  }

  private selectOptions = (type: string) => {
    switch (type) {
      case 'orgMember':
        return (
          <RadioGroup>
            <div className={styles.radioWrapper}>
              <Radio key={`radio${1}`} value={1} />
              <div className={styles.labelWrapper}>
                <div className={styles.label}>Owner</div>
                <div className={styles.labelDesc}>Managers of the organization, can add and remove organization members and create teams</div>
              </div>
            </div>
            <div className={styles.radioWrapper}>
              <Radio key={`radio${2}`} value={0} />
              <div className={styles.labelWrapper}>
                <div className={styles.label}>Member</div>
                <div className={styles.labelDesc}>Ordinary members of the organization, after entering the team, the team's maintainer assigns project module permissions</div>
              </div>
            </div>
          </RadioGroup>
        )
      case 'teamMember':
        return (
          <RadioGroup>
            <div className={styles.radioWrapper}>
              <Radio key={`radio${1}`} value={1} />
              <div className={styles.labelWrapper}>
                <div className={styles.label}>Maintainer</div>
                <div className={styles.labelDesc}>The manager of the team, which can specify the module permissions of the team in the project</div>
              </div>
            </div>
            <div className={styles.radioWrapper}>
              <Radio key={`radio${2}`} value={0} />
              <div className={styles.labelWrapper}>
                <div className={styles.label}>Member</div>
                <div className={styles.labelDesc}>"Ordinary members of the organization, after entering the team, the team's maintainer assigns project module permissions"</div>
              </div>
            </div>
          </RadioGroup>
        )
      default:
        return ''
    }
  }

  public render () {
    const { category, organizationOrTeam, memberName, modalLoading } = this.props
    const orgOrTeamName = organizationOrTeam ? organizationOrTeam.name : ''
    const { getFieldDecorator } = this.props.form
    const modalButtons = [(
      <Button
        key="submit"
        type="primary"
        loading={modalLoading}
        disabled={modalLoading}
        onClick={this.props.changeHandler}
      >
        Save
      </Button>
    )]
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <div className={styles.title}>
            Change{memberName}in<span className={styles.orgName}>{orgOrTeamName}</span>'s role
          </div>
          <div className={styles.desc}>
            <b>{this.tips(category)}</b>
          </div>
        </div>
        <div className={styles.body}>
          <Form style={{marginTop: '12px'}}>
            <FormItem className={utilStyles.hide}>
              {getFieldDecorator('id', {
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
            >
              {getFieldDecorator('role', {
              })(
                this.selectOptions(category)
              )}
            </FormItem>
          </Form>
        </div>
        <div className={styles.footer}>
          {modalButtons}
        </div>
      </div>
    )
  }
}

export default Form.create()(ChangeRoleForm)
