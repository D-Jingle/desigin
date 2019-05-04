<template>
  <div>
    <Col span="4" class="expand-row" v-for="(item,index) in row" :key="index">
      <span class="expand-key">{{ item.name }} : </span>
      <span class="expand-value">{{ item.num }}</span>
    </Col>
  </div>
</template>

<script>
export default {
  name: 'table-expand',
  props: {
    row: Array
  }
}
</script>

<style scoped>
.expand-row{
  margin-bottom: 16px;
}
</style>
