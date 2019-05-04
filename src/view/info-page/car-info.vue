<template>
  <div>
    <Row style="margin-bottom: 5px">
      搜索：
      <Input v-model="searchCarId" placeholder="请输入客户号" style="width: 150px;"/>&nbsp;
      <Button type="primary">查询</Button>
      <Button type="primary" @click="addShow = true" style="float: right">增加车辆</Button>
    </Row>
    <Modal v-model="editShow"
           title="编辑车辆信息"
           @on-ok="handleEditCar">
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车辆名称:</span>
        </Col>
        <Col span="10">
          <Input v-model="editCarName" clearable style="width: 200px" />
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车辆状态:</span>
        </Col>
        <Col span="10">
          <Select v-model="editCarStatus" style="width:200px">
            <Option v-for="item in carStatusList" :value="item.status" :key="item.id">{{ item.status }}</Option>
          </Select>
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车牌号：</span>
        </Col>
        <Col span="10">
          <Input v-model="editCarId" clearable style="width: 200px" />
        </Col>
      </Row>
    </Modal>

    <Modal v-model="addShow"
           title="添加车辆信息"
           @on-ok="handleAddCar">
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车辆名称:</span>
        </Col>
        <Col span="10">
          <Input v-model="addCarName" clearable style="width: 200px" />
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车辆状态:</span>
        </Col>
        <Col span="10">
          <Select v-model="addCarStatus" style="width:200px">
            <Option v-for="item in carStatusList" :value="item.status" :key="item.id">{{ item.status }}</Option>
          </Select>
        </Col>
      </Row>
      <Row style="margin-bottom: 5px">
        <Col span="4">
          <span>车牌号：</span>
        </Col>
        <Col span="10">
          <Input v-model="addCarId" clearable style="width: 200px" />
        </Col>
      </Row>
    </Modal>

    <Divider>车辆信息</Divider>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
export default {
  name: 'car-info',
  data () {
    return {
      searchCarId: '',
      editStatus: '点击选择',
      editCarId: '',
      addCarId: '',
      addStatus: '点击选择',
      editCarName: '',
      editCarStatus: '',
      addCarName: '',
      addCarStatus: '',
      addShow: false,
      editShow: false,
      columns1: [
        {
          title: '车辆名称',
          key: 'name'
        },
        {
          title: '车辆状态',
          key: 'status'
        },
        {
          title: '车牌号',
          key: 'carId'
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
                    this.handleDeleteCar()
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
                    this.changeEditCarStatus(params.row.name, params.row.status)
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [
        {
          name: '布加迪',
          status: '可使用',
          carId: '黑A12345'
        },
        {
          name: '兰博基尼',
          status: '配送中',
          carId: '黑A12325'
        },
        {
          name: '法拉利',
          status: '配送中',
          carId: '黑A42345'
        },
        {
          name: '劳斯莱斯',
          status: '可使用',
          carId: '黑A12348'
        }
      ],
      carStatusList: [
        {
          id: 0,
          status: '可适用'
        },
        {
          id: 1,
          status: '配送中'
        }
      ]
    }
  },
  methods: {
    handleChangeEditStatus (name) {
      this.editStatus = name
    },
    handleChangeAddStatus (name) {
      this.addStatus = name
    },
    changeEditCarStatus (name, status) {
      this.editCarName = name
      this.editCarStatus = status
      this.editShow = true
    },
    handleEditCar () {
      this.$Message.success('更改成功')
    },
    handleDeleteCar () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该车辆信息？',
        onOk: () => {
          this.$Message.success('删除成功')
        }
      })
    },
    handleAddCar () {
      this.$Message.success('添加成功')
    }
  }
}
</script>

<style scoped>

</style>
