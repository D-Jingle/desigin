<template>
    <div>
      <Row style="margin-bottom: 5px">
        搜索：
        <Input v-model="searchEmployeeId" number placeholder="输入0查询全部" style="width: 150px;"/>&nbsp;
        <Button type="primary" @click="searchEmployeeById">查询</Button>
        <Button type="primary" @click="addShow = true" style="float: right">增加员工</Button>
      </Row>
      <Modal v-model="editShow"
             title="编辑员工信息"
             @on-ok="handleEditStaff">
        姓名：<Input v-model="change.name" clearable style="width: 200px" />
        <br/>
        性别：<Input v-model="change.sex" clearable style="width: 200px" />
        <br/>
        职位：<Input v-model="change.position" clearable style="width: 200px" />
        <br/>
        备注：<Input v-model="change.comment" clearable style="width: 200px" />
      </Modal>

      <Modal v-model="addShow"
             title="添加员工信息"
             @on-ok="addEmployee">
        姓名：
        <Input v-model="add.name" clearable style="width: 200px" />
        <br>
        性别：
        <Select v-model="add.sex" style="width:200px">
          <Option v-for="item in sexList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <br/>
        职位：
        <Input v-model="add.position" clearable style="width: 200px" />
        <br/>
        备注：
        <Input v-model="add.comment" clearable style="width: 200px" />
      </Modal>
      <Divider>员工信息</Divider>
      <Table :loading="tableLoading" :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
import { getEmployeeApi, addEmployeeApi, deleteEmployeeApi, changeEmployeeApi } from '@/api/staff'
export default {
  name: 'staff-info',
  data () {
    return {
      tableLoading: false,
      change: {
        id: Number,
        name: '',
        sex: '',
        position: '',
        comment: ''
      },
      add: {
        name: '',
        sex: '',
        position: '',
        comment: ''
      },
      searchEmployeeId: null,
      addShow: false,
      editShow: false,
      columns1: [
        {
          title: '工号',
          key: 'systemId'
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
          key: 'comment'
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
                    this.handleDeleteStaff(params.row.systemId)
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
                    this.changeEditStaffStatus(params.row.name, params.row.sex, params.row.position, params.row.comment)
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [],
      sexList: ['男', '女']
    }
  },
  created () {
    this.getEmployee()
  },
  methods: {
    getEmployee () {
      this.tableLoading = true
      getEmployeeApi(0).then(res => {
        if (res.data.code === 0) {
          this.tableLoading = false
          this.data1 = res.data.data
        }
      }).catch(err => {
        this.tableLoading = false
        this.$Message.error('请求失败')
        console.log(err)
      })
    },
    searchEmployeeById () {
      if (this.searchEmployeeId === null) {
        this.$Message.error('请输入要查询的编号！')
        return
      }
      if (typeof this.searchEmployeeId !== 'number') {
        this.$Message.error('请输入数字')
        this.searchEmployeeId = null
        return
      }
      this.tableLoading = true
      getEmployeeApi(this.searchEmployeeId).then(res => {
        if (res.data.code === 0) {
          this.data1 = res.data.data
          this.tableLoading = false
        }
      }).catch(err => {
        this.$Message.error('请求失败')
        this.tableLoading = false
        console.log(err)
      })
    },
    addEmployee () {
      if (!this.add.name || !this.add.name || !this.add.sex || !this.add.position) {
        this.$Message.error('请完善信息')
        return
      }
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      addEmployeeApi(this.add).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('添加成功')
          this.add = {
            name: '',
            sex: '',
            position: '',
            comment: ''
          }
          this.getEmployee()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
      })
    },
    deleteEmployee (id) {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      deleteEmployeeApi(id).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('删除成功')
          this.getEmployee()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    changeEmployee () {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      changeEmployeeApi(this.change).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('修改成功')
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    changeEditStaffStatus (name, sex, position, comment) {
      this.change = { name, sex, position, comment }
      this.editShow = true
    },
    handleEditStaff () {
      this.changeEmployee()
    },
    handleDeleteStaff (id) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该员工信息？',
        onOk: () => {
          this.deleteEmployee(id)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
