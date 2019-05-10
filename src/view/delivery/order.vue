<template>
  <div>
    <Row style="margin-bottom: 5px">
      搜索订单号：
      <Input v-model="searchOrderId" number placeholder="请输入订单号" style="width: 150px;"/>&nbsp;
      <Button @click="getDeliveryById" type="primary">查询</Button>
    </Row>
    <Row style="margin-bottom: 5px">
      搜索配送员：
      <Input v-model="searchStaff" number placeholder="请输入配送员编号" style="width: 150px;"/>&nbsp;
      <Button type="primary" @click="getDeliveryByEmployeeId">查询</Button>
      <Button type="primary" style="float: right" @click="handleAddOrder">增加订单</Button>
    </Row>
    <Divider>订单信息</Divider>
    <Table :loading="tableLoading" :columns="columns1" :data="data1"></Table>
    <div v-if="addShow">
      <AddOrder @handleChildCancel="handleChildCancel" @handleChildOk="handleChildOk" :carList="carNumberList" :clientList="clientNameList" :employeeList="employeeList"></AddOrder>
    </div>
    <div v-if="changeShow">
      <ChangeOrder @handleChildCancel="handleChild2Cancel" @handleChildOk="handleChild2Ok" :orderInfo="orderInfo" :carList="carNumberList" :employeeList="employeeList" :clientList="clientNameList"></ChangeOrder>
    </div>
  </div>
</template>

<script>
import expandRow from '../components/table/table-expand.vue'
import AddOrder from '../components/order/add-order'
import ChangeOrder from '../components/order/change-order'
import { changeDeliveryApi, getDeliveryApi, addDeliveryApi, deleteDeliveryApi, getDeliveryByEmployeeIdApi } from '@/api/delivery'
import { getCarApi } from '../../api/car'
import { getClientApi } from '../../api/custom'
import { getEmployeeApi } from '../../api/staff'

export default {
  name: 'order',
  components: { expandRow, AddOrder, ChangeOrder },
  data () {
    return {
      changeShow: false,
      tableLoading: false,
      searchOrderId: null,
      searchStaff: null,
      edit: {
        systemId: null,
        show: false,
        clientName: '',
        start: '',
        end: '',
        status: '',
        employeeName: '',
        car: '',
        things: []
      },
      addShow: false,
      orderInfo: null,
      columns1: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row.things
              }
            })
          }
        },
        {
          title: '订单号',
          key: 'systemId'
        },
        {
          title: '客户',
          key: 'clientId',
          width: '150',
          render: (h, params) => {
            for (let i = 0; i < this.clientNameList.length; i++) {
              if (this.clientNameList[i].systemId === params.row.clientId) {
                return h('span', {
                  domProps: {
                    innerText: this.clientNameList[i].name
                  }
                })
              }
            }
          }
        },
        {
          title: '派送时间',
          key: 'start'
        },
        {
          title: '预计到达时间',
          key: 'end'
        },
        {
          title: '订单状态',
          key: 'status',
          render: (h, params) => {
            let statusText
            params.row.status === 0 ? statusText = '待配送' : statusText = '配送中'
            return h('span', {
              domProps: {
                innerText: statusText
              }
            })
          }
        },
        {
          title: '配送车辆',
          key: 'carNumber',
          render: (h, params) => {
            return h('span', this.carNumberList.map(function (item, index) {
              if (item.systemId === params.row.carId) {
                return h('span', {
                  domProps: {
                    innerText: item.name
                  }
                })
              }
            }))
          }
        },
        {
          title: '配送员',
          key: 'eId',
          render: (h, params) => {
            return h('span', this.employeeList.map(function (item, index) {
              if (item.systemId === params.row.eId) {
                return h('span', {
                  domProps: {
                    innerText: item.name
                  }
                })
              }
            }))
          }
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
                    this.handleDeleteOrder(params.row.systemId)
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
                    this.orderInfo = params.row
                    this.orderInfo.status = this.orderInfo.status.toString()
                    this.changeShow = true
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [],
      clientNameList: [],
      carNumberList: [],
      employeeList: []
    }
  },
  created () {
    this.tableLoading = true
    this.getCar()
  },
  methods: {
    getDelivery () {
      this.tableLoading = true
      getDeliveryApi(0).then(res => {
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
    getDeliveryById () {
      if (this.searchOrderId === null) {
        this.$Message.error('请输入要查询的编号！')
        return
      }
      if (typeof this.searchOrderId !== 'number') {
        this.$Message.error('请输入数字')
        this.searchOrderId = null
        return
      }
      this.tableLoading = true
      getDeliveryApi(this.searchOrderId).then(res => {
        if (res.data.code === 0) {
          this.data1 = res.data.data
          this.tableLoading = false
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
        this.tableLoading = false
      })
    },
    getDeliveryByEmployeeId () {
      if (this.searchStaff === null) {
        this.$Message.error('请输入要查询的编号！')
        return
      }
      if (typeof this.searchStaff !== 'number') {
        this.$Message.error('请输入数字')
        this.searchStaff = null
        return
      }
      this.tableLoading = true
      getDeliveryByEmployeeIdApi(this.searchStaff).then(res => {
        if (res.data.code === 0) {
          this.data1 = res.data.data
          this.tableLoading = false
          this.searchStaff = null
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
        this.tableLoading = false
      })
    },
    deleteDelivery (systemId) {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      deleteDeliveryApi(systemId).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('删除成功')
          this.getDelivery()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    getClientApi () {
      getClientApi(0).then(res => {
        if (res.data.code === 0) {
          this.clientNameList = res.data.data
        }
        this.getEmployee()
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
      })
    },
    getEmployee () {
      getEmployeeApi(0).then(res => {
        if (res.data.code === 0) {
          this.employeeList = res.data.data
        }
        this.getDelivery()
      }).catch(err => {
        this.$Message.error('请求失败')
        console.log(err)
      })
    },
    getCar () {
      getCarApi(0).then(res => {
        if (res.data.code === 0) {
          this.carNumberList = res.data.data
        }
        this.getClientApi()
      }).catch(err => {
        this.$Message.error('请求失败')
        console.log(err)
      })
    },
    addDelivery () {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      addDeliveryApi(this.add).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('添加成功')
          this.getDelivery()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    handleDeleteOrder (systemId) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除?',
        onOk: () => {
          this.deleteDelivery(systemId)
        }
      })
    },
    handleAddOrder () {
      this.addShow = true
    },
    handleChildCancel () {
      this.addShow = false
    },
    handleChildOk (add) {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      addDeliveryApi(add).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('添加成功')
          this.getDelivery()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    handleChild2Cancel () {
      this.changeShow = false
    },
    handleChild2Ok (change) {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      changeDeliveryApi(change).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('修改成功')
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('操作失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
