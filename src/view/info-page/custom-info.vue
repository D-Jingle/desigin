<template>
  <div>
    <Row style="margin-bottom: 5px">
      搜索：
      <Input v-model="searchCustomId" number placeholder="输入0查询全部" style="width: 150px;"/>&nbsp;
      <Button type="primary" @click="searchClientById">查询</Button>
      <Button type="primary" @click="addShow = true" style="float: right">增加客户</Button>
    </Row>
    <!--编辑产品信息-->
    <Modal v-model="editShow"
           title="编辑客户信息"
           @on-ok="changeClient">
      名称：<Input v-model="change.name" clearable style="width: 200px" />
    </Modal>

    <Modal v-model="addShow"
           title="添加客户信息"
           @on-ok="addClient">
      名称：<Input v-model="add.name" clearable style="width: 200px" />
    </Modal>

    <Divider>客户信息</Divider>
    <Table :loading="tableLoading" :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import { getClientApi, addClientApi, deleteClientApi, changeClientApi } from '@/api/custom'
export default {
  name: 'custom-info',
  data () {
    return {
      tableLoading: false,
      change: {
        systemId: '',
        name: ''
      },
      add: {
        name: ''
      },
      editShow: false,
      addShow: false,
      searchCustomId: null,
      columns1: [
        {
          title: '编号',
          key: 'systemId'
        },
        {
          title: '客户名称',
          key: 'name'
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
                    this.handleDeleteCustom(params.row.systemId)
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
                    this.changeEditCustomStatus(params.row.systemId, params.row.name)
                  }
                }
              })
            ])
          }
        }
      ],
      data1: []
    }
  },
  created () {
    this.getClient()
  },
  methods: {
    getClient () {
      this.tableLoading = true
      getClientApi(0).then(res => {
        if (res.data.code === 0) {
          this.data1 = res.data.data
          this.tableLoading = false
        }
      }).catch(err => {
        console.log(err)
        this.tableLoading = false
        this.$Message.error('请求失败')
      })
    },
    searchClientById () {
      if (this.searchCustomId === null) {
        this.$Message.error('请输入要查询的编号！')
        return
      }
      if (typeof this.searchCustomId !== 'number') {
        this.$Message.error('请输入数字')
        this.searchCustomId = null
        return
      }
      this.tableLoading = true
      getClientApi(this.searchCustomId).then(res => {
        if (res.data.code === 0) {
          this.data1 = res.data.data
          this.tableLoading = false
        }
      }).catch(err => {
        console.log(err)
        this.tableLoading = false
        this.$Message.error('请求失败')
      })
    },
    addClient () {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      addClientApi(this.add).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('添加成功')
          this.getClient()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    changeClient () {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      changeClientApi(this.change).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('修改成功')
          this.getClient()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    deleteClient (systemId) {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      deleteClientApi(systemId).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('删除成功')
          this.getClient()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    changeEditCustomStatus (systemId, name) {
      this.change = { systemId, name }
      this.editShow = true
    },
    handleDeleteCustom (systemId) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该客户信息？',
        onOk: () => {
          this.deleteClient(systemId)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
