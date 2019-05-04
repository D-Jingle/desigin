<template>
  <div>
    <Card>
      <p slot="title">统计</p>
      <Row>
        <Col span="2"><strong>应交付款：</strong></Col>
        <Col span="5">30000</Col>
      </Row>
      <Row>
        <Col span="2"><strong>已付款：</strong></Col>
        <Col span="5">20000</Col>
      </Row>
      <Row>
        <Col span="2"><strong>未付款：</strong></Col>
        <Col span="5">10000</Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'statistics'
}
</script>

<style scoped>

</style>
