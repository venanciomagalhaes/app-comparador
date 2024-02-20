<script>
export default {
  name: 'submit-button',
  props:{
    textButton: String
  }
}
</script>

<template>
  <button type="submit" class="btn btn-primary w-100">{{textButton}}</button>
</template>

<style scoped>

</style>