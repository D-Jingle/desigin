<template>
  <div>
    <Card>
      <p slot="title">本公司信息</p>
      <Button slot="extra" type="primary" size="small">编辑信息</Button>
      <Row>
        <Col span="3">
          <strong>公司名称：</strong>
        </Col>
        <Col span="10">
          浙江温州江南皮革厂
        </Col>
      </Row>
      <Row>
        <Col span="3">
          <strong>公司地址：</strong>
        </Col>
        <Col span="10">
          浙江省温州市江南区xx路xx号
        </Col>
      </Row>
      <Row>
        <Col span="3">
          <strong>...</strong>
        </Col>
        <Col span="10">
          ...
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="less">
</style>
