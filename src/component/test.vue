<template>

</template>

<script>
import {ref} from 'vue';
import '@/assets/css/test.scss';
export default {
  name: 'test',
  setup() {
    import('@/assets/js/test').then(res => {//异步加载
      console.log('res', res)
    })
  }
}
</script>

<style lang="scss" scope>

</style>
