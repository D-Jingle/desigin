<template>
    <div>
      <Modal
        v-model="add.show"
        title="添加产品"
        @on-cancel="handleCancel"
        @on-ok="handleAdd">
        <Form :label-width="100">
          <FormItem label="请选择产品：">
            <Select v-model="add.systemId" style="width:200px"  @on-change="changeThingsSystemId">
              <Option v-for="(item, index) in productList" :value="item.systemId" :key="index">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem v-if="add.change" label="请选择数量：">
            <Slider v-model="add.count" :max="add.max" show-input></Slider>
          </FormItem>
        </Form>
      </Modal>
      <Card>
        <p slot="title">更改信息</p>
        <Row>
          <Col span="12">
            <Form :label-width="100">
              <FormItem label="订单号">
                {{orderInfo.systemId}}
              </FormItem>
              <FormItem label="客户">
                <Select v-model="orderInfo.clientId" style="width:150px">
                  <Option v-for="item in clientList" :value="item.systemId" :key="item.systemId">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="配送车辆">
                <Select v-model="orderInfo.carId" style="width:150px">
                  <Option v-for="item in carList" :value="item.systemId" :key="item.systemId">{{ item.number }}</Option>
                </Select>
              </FormItem>
              <FormItem label="配送员">
                <Select v-model="orderInfo.eId" style="width:150px">
                  <Option v-for="item in employeeList" :value="item.systemId" :key="item.systemId">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="配送时间">
                <Row>
                  <Col span="11">
                    <DatePicker :value="orderInfo.start" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="预计到达时间">
                <Row>
                  <Col span="11">
                    <DatePicker :value="orderInfo.end" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="状态">
                <RadioGroup v-model="orderInfo.status">
                  <Radio label=1>配送中</Radio>
                  <Radio label=0>待配送</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </Col>
          <Col span="11" offset="1">
            <Form :label-width="100" label-position="left">
              <Row v-for="(item, index) in orderInfo.things" :key="index" style="margin-bottom: 5px;height: 2rem">
                <FormItem :label="item.name">
                  <Col span="8" style="margin-right: 10px">
                    <Input number clearable v-model="item.count"></Input>
                  </Col>
                  <Button size="small" type="text" shape="circle" icon="md-close" style="color: red;" @click="handleRemove(index)"></Button>
                </FormItem>
              </Row>
              <Row>
                <Col span="4">
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
import { getProductApi } from '../../api/product'
import { changeDeliveryApi } from '@/api/delivery'

export default {
  name: 'order-change',
  data () {
    return {
      add: {
        systemId: 0,
        show: false,
        name: '',
        count: 0,
        max: 0,
        change: false
      },
      type: '',
      productList: []
    }
  },
  created () {
    this.getProduct()
  },
  methods: {
    getProduct () {
      getProductApi(0).then(res => {
        if (res.data.code === 0) {
          this.productList = res.data.data
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('请求失败')
      })
    },
    changeAddShow () {
      this.add.change = false
      this.add = {
        systemId: 0,
        show: true,
        name: '',
        count: 0,
        max: 0,
        change: false
      }
    },
    handleCancel () {
      this.add.name = ''
      this.add.change = false
    },
    handleAdd () {
      if (this.add.systemId === 0) {
        this.$Message.error('请选择产品！')
      } else {
        this.orderInfo.things.push({
          systemId: this.add.systemId,
          name: this.add.name,
          count: this.add.count
        })
      }
      this.add.change = false
    },
    handleRemove (index) {
      this.orderInfo.things.splice(index, 1)
    },
    handleSubmit () {
      changeDeliveryApi(this.orderInfo).then(res => {
        if (res.data.code === 0) {
          this.$Message.success('修改成功')
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('操作失败')
      })
    },
    changeThingsSystemId () {
      this.add.change = true
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].systemId === this.add.systemId) {
          this.add.max = Number(this.productList[i].count)
          this.add.name = this.productList[i].name
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
