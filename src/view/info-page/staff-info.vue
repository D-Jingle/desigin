<template>
    <div>
      <Row style="margin-bottom: 5px">
        搜索：
        <Input v-model="searchStaffId" placeholder="请输入员工号" style="width: 150px;"/>&nbsp;
        <Button type="primary">查询</Button>
        <Button type="primary" @click="addShow = true" style="float: right">增加员工</Button>
      </Row>
      <Modal v-model="editShow"
             title="编辑员工信息"
             @on-ok="handleEditStaff">
        姓名：<Input v-model="editStaffName" clearable style="width: 200px" />
        <br/>
        性别：<Input v-model="editStaffSex" clearable style="width: 200px" />
        <br/>
        职位：<Input v-model="editStaffPosition" clearable style="width: 200px" />
        <br/>
        备注：<Input v-model="editStaffRemark" clearable style="width: 200px" />
      </Modal>

      <Modal v-model="addShow"
             title="添加员工信息"
             @on-ok="handleAddStaff">
        姓名：<Input v-model="addStaffName" clearable style="width: 200px" />
        <br>
        性别：<Input v-model="addStaffSex" clearable style="width: 200px" />
        <br/>
        职位：<Input v-model="addStaffPosition" clearable style="width: 200px" />
        <br/>
        备注：<Input v-model="addStaffRemark" clearable style="width: 200px" />
      </Modal>
      <Divider>员工信息</Divider>
      <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
export default {
  name: 'staff-info',
  data () {
    return {
      searchStaffId: '',
      editStaffName: '',
      editStaffSex: '',
      editStaffPosition: '',
      editStaffRemark: '',
      addStaffName: '',
      addStaffSex: '',
      addStaffPosition: '',
      addStaffRemark: '',
      addShow: false,
      editShow: false,
      columns1: [
        {
          title: '工号',
          key: 'staffId'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '职位',
          key: 'position'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('span', [
              h('a', {
                domProps: {
                  innerText: '删除'
                },
                on: {
                  click: () => {
                    this.handleDeleteStaff()
                  }
                }
              }),
              h('a', {
                style: {
                  marginLeft: '5px'
                },
                domProps: {
                  innerText: '编辑'
                },
                on: {
                  click: () => {
                    this.changeEditStaffStatus(params.row.name, params.row.sex, params.row.position, params.row.remark)
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [
        {
          staffId: '0001',
          name: '白素贞',
          sex: '女',
          position: '白蛇',
          remark: '青城山下白素贞'
        },
        {
          staffId: '0001',
          name: '许仙',
          sex: '男',
          position: '凡人',
          remark: '保和堂大夫'
        },
        {
          staffId: '0001',
          name: '小青',
          sex: '女',
          position: '青蛇',
          remark: '白素贞的妹妹'
        },
        {
          staffId: '0001',
          name: '法海',
          sex: '男',
          position: '和尚',
          remark: '一心想收妖'
        }
      ]
    }
  },
  methods: {
    changeEditStaffStatus (name, sex, position, remark) {
      this.editStaffName = name
      this.editStaffSex = sex
      this.editStaffPosition = position
      this.editStaffRemark = remark
      this.editShow = true
    },
    handleEditStaff () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定更改信息？',
        onOk: () => {
          this.$Message.success('更改成功')
        }
      })
    },
    handleDeleteStaff () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该员工信息？',
        onOk: () => {
          this.$Message.success('删除成功')
        }
      })
    },
    handleAddStaff () {
      this.$Message.success('添加成功')
    }
  }
}
</script>

<style scoped>

</style>
