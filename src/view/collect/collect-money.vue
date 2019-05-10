<template>
  <div>
    <Modal v-model="registerShow"
           title="订单登记"
           @on-ok="handleEditOrder">
      <Row style="margin-bottom: 5px">
        <Col span="5">
          <span>订单号：</span>
        </Col>
        <Col span="19">
          {{order.systemId}}
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="5">
          <span>应交付款：</span>
        </Col>
        <Col span="19">
          <Input v-model="order.total" size="small" clearable placeholder="应交付款" />
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="5">
          <span>已付款：</span>
        </Col>
        <Col span="19">
          <Input v-model="order.current" size="small" clearable placeholder="已付款" />
        </Col>
      </Row>
    </Modal>

    <Row style="margin-bottom: 5px">
      搜索订单号：
      <Input v-model="searchOrderId" placeholder="输入0查询全部" style="width: 150px;"/>&nbsp;
      <Button type="primary" @click="getFinanceById">查询</Button>
    </Row>

    <Divider>收款登记</Divider>
    <Table :loading="tableLoading" :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import { getFinanceApi, changeFinanceApi } from '@/api/finance'
import { cloneObj } from '@/libs/tools.js'
export default {
  name: 'collect-money',
  data () {
    return {
      tableLoading: false,
      order: {
        systemId: 0,
        total: '',
        current: ''
      },
      registerShow: false,
      searchOrderId: '',
      columns1: [
        {
          title: '订单号',
          key: 'systemId'
        },
        {
          title: '应交付款',
          key: 'total'
        },
        {
          title: '已付款',
          key: 'current'
        },
        {
          title: '未付款',
          render: (h, params) => {
            return h('span', {
              domProps: {
                innerText: params.row.total - params.row.current
              }
            })
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('span', [
              h('a', {
                domProps: {
                  innerText: '登记'
                },
                on: {
                  click: () => {
                    this.handleRegisterOrder(params.row)
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
    this.getFinance()
  },
  methods: {
    getFinance () {
      this.tableLoading = true
      getFinanceApi(0).then(res => {
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
    getFinanceById () {
      this.tableLoading = true
      getFinanceApi(this.searchOrderId).then(res => {
        if (res.data.code === 0) {
          this.data1 = res.data.data
          this.tableLoading = false
        }
      }).catch(err => {
        console.log(err)
        this.tableLoading = false
      })
    },
    handleRegisterOrder (data) {
      this.order = cloneObj(data)
      this.registerShow = true
    },
    handleEditOrder () {
      if (this.order.current > this.order.total) {
        this.$Message.error('数据输入有误')
      } else {
        this.$Message.loading({
          content: '加载中...',
          duration: 0
        })
        changeFinanceApi(this.order).then(res => {
          if (res.data.code === 0) {
            this.$Message.destroy()
            this.$Message.success('修改成功')
            this.getFinance()
          }
        }).catch(err => {
          this.$Message.destroy()
          this.$Message.error('请求失败')
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
