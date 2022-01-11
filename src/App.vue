<template>
  <img src="./assets/img/logo.png" alt="">
  <img src="./assets/img/offline.png" alt="">
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
  <Test></Test>
</template>

<script>
import {ref} from 'vue';
import Test from '@/component/test'
export default {
  name: 'App',
  setup() {

  },
  components: {
    Test
  }
}
</script>

<style lang="scss" scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
