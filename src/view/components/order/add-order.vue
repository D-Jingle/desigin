<template>
  <div>
    <Modal
      v-model="addShow2"
      title="添加订单"
      scrollable
      @on-ok="handleOkModal"
      @on-cancel="handleCancelModal"
      width="80%">
      <Modal
        v-model="addShow"
        title="添加产品"
        @on-cancel="handleCancel"
        @on-ok="handleAddItem">
        <Form :label-width="100">
          <FormItem label="请选择产品：">
            <Select v-model="addThingsSystemId" @on-change="changeThingsSystemId" style="width:200px">
              <Option v-for="item in thingsList" :value="item.systemId" :key="item.systemId">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem v-if="addThingsChange" label="请选择数量：">
            <Slider v-model="addThingsCount" :max="addThingsMax" show-input></Slider>
          </FormItem>
        </Form>
      </Modal>
      <Row>
            <Col span="12">
              <Form :label-width="100">
                <FormItem label="客户">
                  <Select v-model="add.clientId" style="width:150px">
                    <Option v-for="item in clientList" :value="item.systemId" :key="item.systemId">{{ item.name }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="配送时间">
                  <Row>
                    <Col span="11">
                      <DatePicker v-model="add.start" @on-change="changeStartTime"  type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem label="预计到达时间">
                  <Row>
                    <Col span="11">
                      <DatePicker v-model="add.end" @on-change="changeEndTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem label="订单金额">
                  <Row>
                    <Col span="11">
                      <Input number v-model="add.money" style="width: 200px;" clearable />
                    </Col>
                  </Row>
                </FormItem>
              </Form>
            </Col>
            <Col span="11" offset="1">
              <Form :label-width="100" label-position="left">
                <Row v-for="(item, index) in add.things" :key="index" style="margin-bottom: 5px;height: 2rem">
                  <FormItem :label="item.name">
                    <Col span="8" style="margin-right: 10px">
                      {{item.count}}
                    </Col>
                    <Button size="small" type="text" shape="circle" icon="md-close" style="color: red;" @click="handleRemove(item.systemId)"></Button>
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
    </Modal>
  </div>
</template>

<script>
import { getProductApi } from '@/api/product'
// import { addDeliveryApi } from '@/api/delivery'
export default {
  name: 'add-order',
  props: {
    carList: {
      type: Array,
      default: () => {
        return { message: [] }
      }
    },
    clientList: {
      type: Array,
      default: () => {
        return { message: [] }
      }
    },
    employeeList: {
      type: Array,
      default: () => {
        return { message: [] }
      }
    }
  },
  data () {
    return {
      addShow2: true,
      addShow: false,
      add: {
        clientId: null,
        start: '',
        end: '',
        money: '',
        things: []
      },
      thingsLoading: false,
      addThingsChange: false,
      addThingsMax: 0,
      addThingsSystemId: null,
      addThingsCount: 0,
      thingsList: null
    }
  },
  created () {
    console.log(this.props)
    this.getProduct()
  },
  methods: {
    getProduct () {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      this.thingsLoading = true
      getProductApi(0).then(res => {
        if (res.data.code === 0) {
          this.thingsList = res.data.data
          this.$Message.destroy()
          this.thingsLoading = false
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    },
    changeAddShow () {
      if (!this.thingsLoading) {
        this.addShow = true
      }
    },
    handleAddItem () {
      if (this.addThingsCount === 0) {
        this.$Message.warning('请输入商品数量')
        this.addThingsChange = false
        return
      }
      for (let i = 0; i < this.thingsList.length; i++) {
        if (this.thingsList[i].systemId === this.addThingsSystemId) {
          this.add.things.push({
            systemId: this.thingsList[i].systemId,
            name: this.thingsList[i].name,
            count: this.addThingsCount
          })
          this.addThingsMax = 0
          this.addThingsSystemId = null
          this.addThingsCount = 0
          this.addThingsChange = false
          return
        }
      }
    },
    changeStartTime (value) {
      this.add.start = value
    },
    changeEndTime (value) {
      this.add.end = value
    },
    handleSubmit () {
      console.log(this.add)
      this.addDelivery()
    },
    changeThingsSystemId (systemId) {
      this.addThingsChange = true
      this.addThingsMax = 0
      this.addThingsCount = 0
      for (let i = 0; i < this.thingsList.length; i++) {
        if (this.thingsList[i].systemId === systemId) {
          this.addThingsMax = Number(this.thingsList[i].count)
        }
      }
    },
    handleCancel () {
      this.addThingsMax = 0
      this.addThingsCount = 0
      this.addThingsSystemId = null
      this.addThingsChange = false
    },
    handleRemove (systemId) {
      for (let i = 0; i < this.add.things.length; i++) {
        console.log(this.add.things[i].systemId, systemId)
        if (this.add.things[i].systemId === systemId) {
          this.add.things.splice(i, 1)
        }
      }
    },
    handleOkModal () {
      this.$emit('handleChildOk', this.add)
    },
    handleCancelModal () {
      this.$emit('handleChildCancel')
    }
  }
}
</script>

<style scoped>

</style>
