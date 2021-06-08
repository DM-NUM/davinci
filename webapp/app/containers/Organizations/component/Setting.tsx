import React from 'react'
const styles = require('../Organization.less')
import { Button, Input, Form, Row, Col, Radio, Modal } from 'antd'
const FormItem = Form.Item
const RadioButton = Radio.Button
import UploadAvatar from 'components/UploadAvatar'
import { IOrganization } from '../Organization'
const utilStyles = require('assets/less/util.less')

interface ISettingProps {
  form: any
  currentOrganization: IOrganization
  editOrganization: (oranization: IOrganization) => () => any
  deleteOrganization: (id: number) => any
}

export class Setting extends React.PureComponent <ISettingProps> {

  public componentWillMount () {
    this.initData()
  }

  private initData = () => {
    const { currentOrganization } = this.props
    const {
      id,
      name,
      description,
      allowCreateProject,
      allowDeleteOrTransferProject,
      allowChangeVisibility,
      memberPermission
    } = currentOrganization
    this.forceUpdate(() => {
      this.props.form.setFieldsValue({
        id,
        name,
        description,
        allowCreateProject,
        allowDeleteOrTransferProject,
        allowChangeVisibility,
        memberPermission
      })
    })
  }

  private confirmDelete = () => {
    const { form, deleteOrganization } = this.props
    const { id, name } = form.getFieldsValue()
    Modal.confirm({
      title: `Sure delete organization of “${name}”？`,
      onOk: () => {
        deleteOrganization(id)
      }
    })
  }

  public render () {
    const { getFieldDecorator } = this.props.form

    const commonFormItemStyle = {
      labelCol: { span: 2 },
      wrapperCol: { span: 18 }
    }

    const { name, avatar, id, description, allowCreateProject, memberPermission } = this.props.currentOrganization

    const currentValues = this.props.form.getFieldsValue()
    let isDisabled = true
    if (currentValues.name !== name
      || currentValues.description !== description
      || currentValues.allowCreateProject !== allowCreateProject
      || currentValues.memberPermission !== memberPermission
    ) {
        isDisabled = false
    }

    return (
      <div className={styles.listWrapper}>
        <div className={styles.container}>
          <UploadAvatar type="organization" path={avatar} xhrParams={{id}} />
          <hr/>
          <div className={styles.form}>
            <Form>
              <Row>
                <Col>
                  <FormItem className={utilStyles.hide}>
                    {getFieldDecorator('id', {})(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    {...commonFormItemStyle}
                    label="Name"
                  >
                    {getFieldDecorator('name', {
                      initialValue: '',
                      rules: [{ required: true }, {
                       // validator: this.checkNameUnique
                      }]
                    })(
                      <Input placeholder="Name"/>
                    )}
                  </FormItem>
                </Col>
                <Col>
                  <FormItem
                    {...commonFormItemStyle}
                    label="Description"
                  >
                    {getFieldDecorator('description', {
                    })(
                      <Input placeholder="description" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row className={styles.permissionZone}>
                <Col>
                  <FormItem
                    label="Organization members create projects"
                  >
                    {getFieldDecorator('allowCreateProject', {
                      initialValue: true
                    })(
                      <Radio.Group size="small">
                        <RadioButton value={false}>Forbid</RadioButton>
                        <RadioButton value={true}>Permit</RadioButton>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
                {/*<Col>*/}
                  {/*<FormItem*/}
                    {/*label="删除和移交项目"*/}
                 {/*//   {...commonFormItemStyle}*/}
                  {/*>*/}
                    {/*{getFieldDecorator('allowDeleteOrTransferProject', {*/}
                      {/*initialValue: true*/}
                    {/*})(*/}
                      {/*<Radio.Group size="small">*/}
                        {/*<RadioButton value={false}>禁止</RadioButton>*/}
                        {/*<RadioButton value={true}>允许</RadioButton>*/}
                      {/*</Radio.Group>*/}
                    {/*)}*/}
                  {/*</FormItem>*/}
                {/*</Col>*/}
                {/*<Col>*/}
                  {/*<FormItem*/}
                 {/*//   {...commonFormItemStyle}*/}
                    {/*label="修改项目是否可见"*/}
                  {/*>*/}
                    {/*{getFieldDecorator('allowChangeVisibility', {*/}
                      {/*initialValue: true*/}
                    {/*})(*/}
                      {/*<Radio.Group size="small">*/}
                        {/*<RadioButton value={false}>禁止</RadioButton>*/}
                        {/*<RadioButton value={true}>允许</RadioButton>*/}
                      {/*</Radio.Group>*/}
                    {/*)}*/}
                  {/*</FormItem>*/}
                {/*</Col>*/}
                <Col>
                  <FormItem
                 //   {...commonFormItemStyle}
                    label="Organization members' permission to the project"
                  >
                    {getFieldDecorator('memberPermission', {
                      initialValue: 1
                    })(
                      <Radio.Group size="small">
                        <RadioButton value={0}>No visible</RadioButton>
                        <RadioButton value={1}>Visible only</RadioButton>
                        {/* <RadioButton value={2}>修改</RadioButton>
                        <RadioButton value={3}>删除</RadioButton> */}
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
                <Col>
                  <Button
                    onClick={this.props.editOrganization(this.props.form.getFieldsValue())}
                    disabled={isDisabled}
                  >
                    Save Change
                  </Button>
                </Col>
              </Row>
              <Row className={styles.dangerZone}>
                <div className={styles.title}>
                   Delete organization
                </div>
                <div className={styles.titleDesc}>
                  <p className={styles.desc}>Cannot recover after deletion, please confirm this operation</p>
                  <p className={styles.button}>
                    <Button type="danger" onClick={this.confirmDelete}>Delete{name}</Button>
                  </p>
                </div>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(Setting)



