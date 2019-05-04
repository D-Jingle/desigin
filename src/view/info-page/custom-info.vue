<template>
  <div>
    <Row style="margin-bottom: 5px">
      搜索：
      <Input v-model="searchCustomId" placeholder="请输入客户号" style="width: 150px;"/>&nbsp;
      <Button type="primary">查询</Button>
      <Button type="primary" @click="addShow = true" style="float: right">增加客户</Button>
    </Row>
    <!--编辑产品信息-->
    <Modal v-model="editShow"
           title="编辑客户信息"
           @on-ok="handleEditCustom">
      名称：<Input v-model="editCustomName" clearable style="width: 200px" />
    </Modal>

    <Modal v-model="addShow"
           title="编辑客户信息"
           @on-ok="handleAddCustom">
      名称：<Input v-model="addCustomName" clearable style="width: 200px" />
    </Modal>

    <Divider>客户信息</Divider>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
export default {
  name: 'custom-info',
  data () {
    return {
      editShow: false,
      addShow: false,
      editCustomId: '',
      addCustomId: '',
      editCustomName: '',
      addCustomName: '',
      searchCustomId: '',
      columns1: [
        {
          title: '客户id',
          key: 'id'
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
                    this.handleDeleteCustom()
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
                    this.changeEditCustomStatus(params.row.id, params.row.name)
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [
        {
          id: 19,
          name: '东北林业大学'
        },
        {
          id: 20,
          name: '东北农业大学'
        },
        {
          id: 21,
          name: '哈尔滨工业大学'
        },
        {
          id: 22,
          name: '哈尔滨理工大学'
        }
      ]
    }
  },
  methods: {
    changeEditCustomStatus (id, name) {
      this.editCustomId = id
      this.editCustomName = name
      this.editShow = true
    },
    handleEditCustom () {
      this.$Message.success('更改成功')
    },
    handleDeleteCustom () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该客户信息？',
        onOk: () => {
          this.$Message.success('删除成功')
        }
      })
    },
    handleAddCustom () {
      this.$Message.success('添加成功')
    }
  }
}
</script>

<style scoped>

</style>
