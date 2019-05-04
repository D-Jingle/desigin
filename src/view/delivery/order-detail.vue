<template>
    <div>
      <Modal
        v-model="add.show"
        title="添加产品"
        @on-cancel="handleCancel"
        @on-ok="handleAdd">
        <Select v-model="add.name" style="width:200px">
          <Option v-for="(item, index) in goodsList" :value="item.name" :key="index">{{ item.name }}</Option>
        </Select>
      </Modal>
      <Card>
        <p slot="title">更改信息</p>
        <Row>
          <Col span="12">
            <Form :label-width="100">
              <FormItem label="订单号">
                {{orderInfo.id}}
              </FormItem>
              <FormItem label="客户">
                <Select v-model="orderInfo.custom" style="width:150px" @on-change="handleChangeCustom">
                  <Option v-for="item in customList" :value="item.custom" :key="item.id">{{ item.custom }}</Option>
                </Select>
              </FormItem>
              <FormItem label="配送车辆">
                <Select v-model="orderInfo.car" style="width:150px" @on-change="handleChangeCar">
                  <Option v-for="item in carList" :value="item.car" :key="item.id">{{ item.car }}</Option>
                </Select>
              </FormItem>
              <FormItem label="配送员">
                <Select v-model="orderInfo.staff" style="width:150px" @on-change="handleChangeStaff">
                  <Option v-for="item in staffList" :value="item.staff" :key="item.id">{{ item.staff }}</Option>
                </Select>
              </FormItem>
              <FormItem label="配送时间">
                <Row>
                  <Col span="11">
                    <DatePicker :value="orderInfo.deliveryTime" @on-change="handleChangeDeliveryTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="预计到达时间">
                <Row>
                  <Col span="11">
                    <DatePicker :value="orderInfo.arriveTime" @on-change="handleChangeArriveTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="状态">
                <RadioGroup v-model="orderInfo.status">
                  <Radio label="配送中">配送中</Radio>
                  <Radio label="待配送">待配送</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </Col>
          <Col span="11" offset="1">
            <Form :label-width="100" label-position="left">
              <Row v-for="(item, index) in orderInfo.goods" :key="index" style="margin-bottom: 5px;height: 2rem">
                <FormItem :label="item.name">
                  <Col span="8" style="margin-right: 10px">
                    <Input number clearable v-model="item.num"></Input>
                  </Col>
                  <Button size="small" type="error" shape="circle" icon="md-close" @click="handleRemove(index)"></Button>
                </FormItem>
              </Row>
              <Row>
                <Col span="6" offset="6">
                  <Button type="dashed" long @click="changeAddShow" icon="md-add"></Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Button style="vertical-align: center" type="primary" @click="handleSubmit">确认更改</Button>
        </Row>
      </Card>
    </div>
</template>

<script>
export default {
  name: 'order-change',
  data () {
    return {
      add: {
        show: false,
        name: '',
        num: ''
      },
      orderInfo: null,
      type: '',
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
          staff: '白素贞'
        },
        {
          id: 2,
          staff: '小青'
        },
        {
          id: 3,
          staff: '法海'
        },
        {
          id: 4,
          staff: '许仙'
        }
      ],
      statusList: [
        {
          id: 1,
          status: '配送中'
        },
        {
          id: 2,
          status: '待配送'
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
      goodsList: [
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
        },
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
  },
  created () {
    if (!this.$route.params.orderInfo) {
      this.$router.go(-1)
    }
    this.orderInfo = this.$route.params.orderInfo
    this.type = this.$route.params.type
  },
  methods: {
    handleChangeCustom (custom) {
    },
    changeOrderStatus (status) {
    },
    handleChangeDeliveryTime (time) {
      this.orderInfo.deliveryTime = time
      console.log(this.orderInfo.deliveryTime)
    },
    handleChangeArriveTime (time) {
      this.orderInfo.arriveTime = time
      console.log(this.orderInfo.arriveTime)
    },
    handleEditOrder () {
      this.$Message.success('更改成功')
    },
    handleChangeCar (car) {
    },
    handleChangeStaff (staff) {
    },
    changeAddShow () {
      this.add.show = true
    },
    handleCancel () {
      this.add.name = ''
    },
    handleAdd () {
      if (this.add.name === '') {
        this.$Message.error('请选择产品！')
      } else {
        this.orderInfo.goods.push({
          name: this.add.name,
          num: 0
        })
        this.add.name = ''
      }
    },
    handleRemove (index) {
      this.orderInfo.goods.splice(index, 1)
    },
    handleSubmit () {
    }
  }
}
</script>

<style scoped>

</style>
