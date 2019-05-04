<template>
  <div>
    <Row style="margin-bottom: 5px">
      搜索订单号：
      <Input v-model="searchOrderId" placeholder="请输入订单号" style="width: 150px;"/>&nbsp;
      <Button type="primary">查询</Button>
    </Row>
    <Row style="margin-bottom: 5px">
      搜索配送员：
      <Input v-model="searchStaff" placeholder="请输入配送员编号" style="width: 150px;"/>&nbsp;
      <Button type="primary">查询</Button>
      <Button type="primary" @click="addShow = true" style="float: right">增加订单</Button>
    </Row>
    <!--<Modal v-model="editShow"-->
           <!--title="修改订单"-->
           <!--@on-ok="handleEditOrder">-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>客户：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<Select v-model="edit.custom" style="width:150px">-->
            <!--<Option v-for="item in customList" :value="item.custom" :key="item.id">{{ item.custom }}</Option>-->
          <!--</Select>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>派送时间：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<DatePicker :value="edit.deliveryTime" @on-change="handleChangeEditDeliveryTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>预计到达时间：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<DatePicker :value="edit.arriveTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>配送车辆：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<Select v-model="edit.car" style="width:150px">-->
            <!--<Option v-for="item in carList" :value="edit.car" :key="item.id">{{ item.car }}</Option>-->
          <!--</Select>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>配送员：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<Select v-model="edit.staff" style="width:150px">-->
            <!--<Option v-for="item in staffList" :value="item.name" :key="item.id">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>配送状态：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<Select v-model="edit.status" style="width:150px">-->
            <!--<Option v-for="item in statusList" :value="edit.status" :key="item.id">{{ item.status }}</Option>-->
          <!--</Select>-->
        <!--</Col>-->
      <!--</Row>-->
    <!--</Modal>-->
    <!--<Modal v-model="addShow"-->
           <!--title="增加订单"-->
           <!--@on-ok="handleAddOrder">-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>客户：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<Select v-model="add.custom" style="width:150px">-->
            <!--<Option v-for="item in customList" :value="item.custom" :key="item.id">{{ item.custom }}</Option>-->
          <!--</Select>-->
        <!--</Col>-->
      <!--</Row>-->

      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>派送时间：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
        <!--</Col>-->
      <!--</Row>-->

      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>预计到达时间：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
        <!--</Col>-->
      <!--</Row>-->

      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>配送车辆：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<Select v-model="add.car" style="width:150px">-->
            <!--<Option v-for="item in carList" :value="item.car" :key="item.id">{{ item.car }}</Option>-->
          <!--</Select>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>配送员：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<Select v-model="add.staff" style="width:100px">-->
            <!--<Option v-for="item in staffList" :value="item.name" :key="item.id">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row style="margin-bottom: 5px">-->
        <!--<Col span="5">-->
          <!--<span>配送状态：</span>-->
        <!--</Col>-->
        <!--<Col span="19">-->
          <!--<Select v-model="add.status" style="width:150px">-->
            <!--<Option v-for="item in statusList" :value="item.status" :key="item.id">{{ item.status }}</Option>-->
          <!--</Select>-->
        <!--</Col>-->
      <!--</Row>-->
    <!--</Modal>-->

    <Divider>订单信息</Divider>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import expandRow from '../components/table/table-expand.vue'
import { cloneObj } from '@/libs/tools.js'
export default {
  name: 'order',
  components: { expandRow },
  data () {
    return {
      searchOrderId: null,
      searchStaff: null,
      editShow: false,
      edit: {
        id: null,
        show: false,
        custom: '',
        deliveryTime: '',
        arriveTime: '',
        status: '',
        staff: '',
        car: ''
      },
      addShow: false,
      add: {
        id: null,
        show: false,
        custom: '点击选择',
        deliveryTime: '',
        arriveTime: '',
        status: '',
        staff: '',
        car: ''
      },
      columns1: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row.goods
              }
            })
          }
        },
        {
          title: '订单号',
          key: 'id'
        },
        {
          title: '客户',
          key: 'custom'
        },
        {
          title: '派送时间',
          key: 'deliveryTime'
        },
        {
          title: '预计到达时间',
          key: 'arriveTime'
        },
        {
          title: '订单状态',
          key: 'status'
        },
        {
          title: '配送车辆',
          key: 'car'
        },
        {
          title: '配送员',
          key: 'staff'
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
                    this.handleDeleteOrder()
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
                    let orderInfo = params.row
                    // this.changeEditOrderStatus(params.row)
                    this.$router.push({
                      name: 'order_detail',
                      params: {
                        orderInfo: JSON.parse(JSON.stringify(orderInfo)),
                        type: 'change'
                      }
                    })
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [
        {
          id: '0001',
          custom: '东北林业大学',
          deliveryTime: '2019-01-01',
          arriveTime: '2019-01-02',
          status: '配送中',
          car: '黑B12345',
          staff: '白素贞',
          goods: [
            {
              name: '碗',
              num: '1000'
            },
            {
              name: '杯子',
              num: '1200'
            },
            {
              name: '勺',
              num: '1500'
            }
          ]
        },
        {
          id: '0002',
          custom: '东北农业大学',
          deliveryTime: '2019-04-04',
          arriveTime: '2019-04-04',
          status: '待配送',
          car: '黑B12445',
          staff: '小青',
          goods: [
            {
              name: '盘子',
              num: '1000'
            },
            {
              name: '筷子',
              num: '800'
            }
          ]
        },
        {
          id: '0003',
          custom: '东北林业大学',
          deliveryTime: '2019-01-01',
          arriveTime: '2019-01-02',
          status: '配送中',
          car: '黑B12355',
          staff: '法海',
          goods: [
            {
              name: '碗',
              num: '1000'
            },
            {
              name: '筷子',
              num: '800'
            }
          ]
        },
        {
          id: '0004',
          custom: '哈尔滨工程',
          deliveryTime: '2019-01-08',
          arriveTime: '2019-01-10',
          status: '待配送',
          car: '黑B42345',
          staff: '许仙',
          goods: [
            {
              name: '盘子',
              num: '1000'
            },
            {
              name: '筷子',
              num: '800'
            }
          ]
        }
      ],
      customList: [
        {
          id: '1',
          custom: '东北林业大学'
        },
        {
          id: '2',
          custom: '东北农业大学'
        },
        {
          id: '3',
          custom: '哈尔滨工业大学'
        },
        {
          id: '4',
          custom: '黑龙江大学'
        }
      ],
      carList: [
        {
          id: 1,
          car: '黑B12345'
        },
        {
          id: 2,
          car: '黑B12445'
        },
        {
          id: 3,
          car: '黑B12355'
        },
        {
          id: 4,
          car: '黑B42345'
        }
      ],
      staffList: [
        {
          id: 1,
          name: '白素贞'
        },
        {
          id: 2,
          name: '小青'
        },
        {
          id: 3,
          name: '法海'
        },
        {
          id: 4,
          name: '许仙'
        }
      ],
      statusList: [
        {
          id: 1,
          status: '派送中'
        },
        {
          id: 2,
          status: '待派送'
        }
      ]
    }
  },
  methods: {
    handleChangeEditDeliveryTime (data) {
      console.log(data)
      this.edit.deliveryTime = data
    },
    changeEditOrderStatus (data) {
      console.log(data)
      this.edit = cloneObj(data)
      this.editShow = true
    },
    handleEditOrder () {
      this.$Message.success('更改成功')
    },
    handleDeleteOrder () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除?',
        onOk: () => {
          this.$Message.success('删除成功')
        }
      })
    },
    handleAddOrder () {
      this.$Message.success('添加成功')
    }
  }
}
</script>

<style scoped>

</style>
