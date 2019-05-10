<template>
  <div>
    <Card>
      <p slot="title">统计</p>
      <Row>
        <Col span="2"><strong>应交付款：</strong></Col>
        <Col span="5">{{data.total}}</Col>
      </Row>
      <Row>
        <Col span="2"><strong>已付款：</strong></Col>
        <Col span="5">{{data.current}}</Col>
      </Row>
      <Row>
        <Col span="2"><strong>未付款：</strong></Col>
        <Col span="5">{{data.need}}</Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getStats } from '@/api/finance'
export default {
  name: 'statistics',
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.getStats()
  },
  methods: {
    getStats () {
      this.$Message.loading({
        content: '加载中..',
        duration: 0
      })
      getStats().then(res => {
        if (res.data.code === 0) {
          this.data = { ...res.data.data }
          this.$Message.destroy()
        }
      }).catch(err => {
        console.log(err)
        this.$Message.destroy()
        this.$Message.error('请求失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
