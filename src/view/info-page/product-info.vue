<template>
    <div>
      <Row style="margin-bottom: 5px">
        搜索：
        <Input v-model="searchProductId" number placeholder="输入 0 搜索全部" style="width: 150px;"/>&nbsp;
        <Button type="primary" @click="searchProductById">查询</Button>
        <Button type="primary" @click="addShow = true" style="float: right">增加产品</Button>
      </Row>
      <!--编辑产品信息-->
      <Modal v-model="changeShow"
             title="编辑产品信息"
             @on-ok="handleChangeProduct">
        名称：<Input v-model="change.name" clearable style="width: 200px" />
        <br/>
        数量：<Input v-model="change.count" clearable style="width: 200px" />
      </Modal>

      <Modal v-model="addShow"
             title="增加产品信息"
             @on-ok="handleAddProduct">
        名称：<Input v-model="add.name" clearable style="width: 200px" />
        <br/>
        数量：<Input v-model="add.count" clearable style="width: 200px" />
      </Modal>
      <Divider>产品信息</Divider>
      <Table :columns="columns1" :data="productData"></Table>
    </div>
</template>

<script>
import { getProductApi, deleteProductApi, changeProjectApi, addProductApi } from '@/api/product.js'
export default {
  name: 'product-info',
  data () {
    return {
      change: {
        systemId: null,
        name: '',
        count: 0
      },
      add: {
        name: '',
        count: null
      },
      searchProductId: '',
      addShow: false,
      changeShow: false,
      columns1: [
        {
          title: '编号',
          key: 'systemId'
        },
        {
          title: '产品名称',
          key: 'name'
        },
        {
          title: '产品数量',
          key: 'count'
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
                    this.handleDeleteProduct(params.row.systemId)
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
                    this.changeChangeProductStatus(params.row.id, params.row.name, params.row.count)
                  }
                }
              })
            ])
          }
        }
      ],
      productData: [
        {
          systemId: 0,
          name: '碗',
          count: 18
        },
        {
          systemId: 1,
          name: '筷子',
          count: 18
        },
        {
          systemId: 2,
          name: '叉子',
          count: 18
        },
        {
          systemId: 3,
          name: '杯子',
          count: 18
        }
      ]
    }
  },
  created () {
    this.getProduct()
  },
  methods: {
    // 获取产品信息
    getProduct () {
      getProductApi(0).then(res => {
        let response = res.data
        if (response.code === 0) {
          this.productData = response.data
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
      })
    },
    searchProductById () {
      if (!this.searchProductId) {
        this.$Message.error('请输入要查询的编号！')
        return
      }
      getProductApi(this.searchProductId).then(res => {
        let response = res.data
        if (response.code === 0) this.productData = response.data
        this.searchProductId = ''
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
      })
    },
    // 删除产品信息
    deleteProduct (systemId) {
      deleteProductApi(systemId).then(res => {
        let response = res.data
        if (response.code === 0) {
          this.$Message.success('删除成功')
          this.getProduct()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
      })
    },
    // 更改产品信息
    changeProject () {
      console.log(this.change)
      changeProjectApi(this.change).then(res => {
        let response = res.data
        if (response.code === 0) {
          this.$Message.success('更改成功')
          this.getProduct()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
      })
    },
    // 增加产品信息
    addProduct () {
      addProductApi(this.add).then(res => {
        let response = res.data
        if (response.code === 0) {
          this.$Message.success('添加成功')
          this.getProduct()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
      })
    },
    changeChangeProductStatus (systemId, name, count) {
      this.change.systemId = systemId
      this.change.name = name
      this.change.count = count
      this.changeShow = true
    },
    handleChangeProduct () {
      this.changeProject()
    },
    handleDeleteProduct (systemId) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该产品信息？',
        onOk: () => {
          this.deleteProduct(systemId)
        }
      })
    },
    handleAddProduct () {
      this.addProduct()
    }
  }
}
</script>

<style scoped>

</style>
