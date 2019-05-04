<template>
    <div>
      <Row style="margin-bottom: 5px">
        搜索：
        <Input v-model="searchProductId" placeholder="请输入产品号" style="width: 150px;"/>&nbsp;
        <Button type="primary">查询</Button>
        <Button type="primary" @click="addShow = true" style="float: right">增加产品</Button>
      </Row>
      <!--编辑产品信息-->
      <Modal v-model="editShow"
             title="编辑产品信息"
             @on-ok="handleEditProduct">
        名称：<Input v-model="editProductTitle" clearable style="width: 200px" />
        <br/>
        数量：<Input v-model="editProductNum" clearable style="width: 200px" />
      </Modal>

      <Modal v-model="addShow"
             title="增加产品信息"
             @on-ok="handleAddProduct">
        名称：<Input v-model="addProductTitle" clearable style="width: 200px" />
        <br/>
        数量：<Input v-model="addProductNum" clearable style="width: 200px" />
      </Modal>
      <Divider>产品信息</Divider>
      <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
export default {
  name: 'product-info',
  data () {
    return {
      searchProductId: '',
      editProductTitle: '',
      editProductNum: '',
      addProductTitle: '',
      addProductNum: '',
      addShow: false,
      editShow: false,
      columns1: [
        {
          title: '产品名称',
          key: 'title'
        },
        {
          title: '产品数量',
          key: 'num'
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
                    this.handleDeleteProduct()
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
                    this.changeEditProductStatus(params.row.title, params.row.num)
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [
        {
          title: '碗',
          num: 18
        },
        {
          title: '碗',
          num: 18
        },
        {
          title: '碗',
          num: 18
        },
        {
          title: '碗',
          num: 18
        }
      ]
    }
  },
  methods: {
    changeEditProductStatus (title, num) {
      this.editProductTitle = title
      this.editProductNum = num
      this.editShow = true
    },
    handleEditProduct () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定更改信息？',
        onOk: () => {
          this.$Message.success('更改成功')
        }
      })
    },
    handleDeleteProduct () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该产品信息？',
        onOk: () => {
          this.$Message.success('删除成功')
        }
      })
    },
    handleAddProduct () {
      this.$Message.success('添加成功')
    }
  }
}
</script>

<style scoped>

</style>
