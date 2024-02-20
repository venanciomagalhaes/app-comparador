<script>
export default {
  name: 'AlertWarning',
  props:{
    textAlert: String
  }
}
</script>

<template>
  <div class="alert alert-info mt-2">
    {{textAlert}}
  </div>
</template>

<style scoped>

</style>