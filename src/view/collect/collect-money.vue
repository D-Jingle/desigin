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
          {{order.orderId}}
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="5">
          <span>客户：</span>
        </Col>
        <Col span="19">
          {{order.custom}}
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="5">
          <span>应交付款：</span>
        </Col>
        <Col span="19">
          <Input v-model="order.callable" size="small" clearable placeholder="应交付款" />
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="5">
          <span>已付款：</span>
        </Col>
        <Col span="19">
          <Input v-model="order.paid" size="small" clearable placeholder="已付款" />
        </Col>
      </Row>
    </Modal>
    <Row style="margin-bottom: 5px">
      搜索订单号：
      <Input v-model="searchOrderId" placeholder="请输入订单号" style="width: 150px;"/>&nbsp;
      <Button type="primary">查询</Button>
    </Row>
    <Divider>收款登记</Divider>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import { cloneObj } from '@/libs/tools.js'
export default {
  name: 'collect-money',
  data () {
    return {
      order: {
        orderId: '',
        custom: '',
        callable: '',
        paid: '',
        unpaid: ''
      },
      registerShow: false,
      searchOrderId: '',
      columns1: [
        {
          title: '订单号',
          key: 'orderId'
        },
        {
          title: '客户',
          key: 'custom'
        },
        {
          title: '应交付款',
          key: 'callable'
        },
        {
          title: '已付款',
          key: 'paid'
        },
        {
          title: '未付款',
          key: 'unpaid'
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
      data1: [
        {
          orderId: '0001',
          custom: '东北林业大学',
          callable: 10000,
          paid: 8000,
          unpaid: 2000
        },
        {
          orderId: '0001',
          custom: '东北林业大学',
          callable: 10000,
          paid: 8000,
          unpaid: 2000
        },
        {
          orderId: '0001',
          custom: '东北林业大学',
          callable: 10000,
          paid: 8000,
          unpaid: 2000
        },
        {
          orderId: '0001',
          custom: '东北林业大学',
          callable: 10000,
          paid: 8000,
          unpaid: 2000
        }
      ]
    }
  },
  methods: {
    handleRegisterOrder (data) {
      this.order = cloneObj(data)
      this.registerShow = true
    },
    handleEditOrder () {
      this.$Message.success('登记成功！')
    }
  }
}
</script>

<style scoped>

</style>
