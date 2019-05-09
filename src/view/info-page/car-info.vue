<template>
  <div>
    <Row style="margin-bottom: 5px">
      搜索：
      <Input v-model="searchCarId" number placeholder="输入 0 查询全部" style="width: 150px;"/>&nbsp;
      <Button type="primary" @click="searchCarById">查询</Button>
      <Button type="primary" @click="addShow = true" style="float: right">增加车辆</Button>
    </Row>
    <Modal v-model="changeShow"
           title="编辑车辆信息"
           @on-ok="changeCar">
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车辆名称:</span>
        </Col>
        <Col span="10">
          <Input v-model="change.name" clearable style="width: 200px" />
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车辆状态:</span>
        </Col>
        <Col span="10">
          <Select v-model="change.status" style="width:200px">
            <Option v-for="item in carStatusList" :value="item.id" :key="item.id">{{ item.status }}</Option>
          </Select>
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车牌号：</span>
        </Col>
        <Col span="10">
          <Input v-model="change.number" clearable style="width: 200px" />
        </Col>
      </Row>
    </Modal>

    <Modal v-model="addShow"
           title="添加车辆信息"
           @on-ok="addCar">
      <Row>
        <Col span="4">
          <span>车辆名称:</span>
        </Col>
        <Col span="10">
          <Input v-model="add.name" clearable style="width: 200px" />
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车牌号:</span>
        </Col>
        <Col span="10">
          <Input v-model="add.number" clearable style="width: 200px" />
        </Col>
      </Row>
    </Modal>
    <Divider>车辆信息</Divider>
    <Table :loading="tableLoading" :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import { getCarApi, addCarApi, deleteCarApi, changeCarApi } from '@/api/car'
export default {
  name: 'car-info',
  data () {
    return {
      tableLoading: false,
      add: {
        name: '',
        number: ''
      },
      change: {
        systemId: '',
        name: '',
        number: '',
        status: '点击选择'
      },
      searchCarId: null,
      addShow: false,
      changeShow: false,
      columns1: [
        {
          title: '车辆编号',
          key: 'systemId'
        },
        {
          title: '车辆名称',
          key: 'name'
        },
        {
          title: '车辆状态',
          key: 'status',
          render: (h, params) => {
            let status = '无状态'
            if (params.row.status === 0) {
              status = '可使用'
            } else if (params.row.status === 1) {
              status = '配送中'
            }
            return h('span', {
              domProps: {
                innerText: status
              }
            })
          }
        },
        {
          title: '车牌号',
          key: 'number'
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
                    this.handleDeleteCar(params.row.systemId)
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
                    this.changeEditCarStatus(params.row.systemId, params.row.name, params.row.number, params.row.status)
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [],
      carStatusList: [
        {
          id: 0,
          status: '可使用'
        },
        {
          id: 1,
          status: '配送中'
        }
      ]
    }
  },
  created () {
    this.getCar()
  },
  methods: {
    deleteCar (systemId) {
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      deleteCarApi(systemId).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('删除成功')
          this.getCar()
        }
      })
    },
    changeCar () {
      if (!this.change.name || !this.change.number) {
        this.$Message.error('请完善信息')
        return
      }
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      changeCarApi(this.change).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('修改成功')
          this.getCar()
        }
      }).catch(err => {
        this.$Message.destroy()
        this.$Message.error('请求失败')
        console.log(err)
      })
    },
    getCar () {
      this.tableLoading = true
      getCarApi(0).then(res => {
        if (res.data.code === 0) {
          this.data1 = res.data.data
          this.tableLoading = false
        }
      }).catch(err => {
        this.$Message.error('请求失败')
        this.tableLoading = false
        console.log(err)
      })
    },
    searchCarById () {
      console.log(typeof Number(this.searchCarId))
      if (this.searchCarId === null) {
        this.$Message.error('请输入要查询的编号！')
        return
      }
      if (typeof this.searchCarId !== 'number') {
        this.$Message.error('请输入数字')
        this.searchCarId = null
        return
      }
      this.tableLoading = true
      getCarApi(this.searchCarId).then(res => {
        if (res.data.code === 0) {
          this.data1 = res.data.data
          this.tableLoading = false
        }
      }).catch(err => {
        this.$Message.error('请求失败')
        this.tableLoading = false
        console.log(err)
      })
    },
    changeEditCarStatus (systemId, name, number, status) {
      this.change = { systemId, name, number, status }
      this.changeShow = true
    },
    handleDeleteCar (systemId) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该车辆信息？',
        onOk: () => {
          this.deleteCar(systemId)
        }
      })
    },
    addCar () {
      if (!this.add.name || !this.add.number) {
        this.$Message.error('请完善信息')
        return
      }
      this.$Message.loading({
        content: '加载中...',
        duration: 0
      })
      addCarApi(this.add).then(res => {
        if (res.data.code === 0) {
          this.$Message.destroy()
          this.$Message.success('添加成功')
          this.getCar()
        }
      }).catch(err => {
        this.$Message.destroy()
        this.$Message.error('请求失败')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
