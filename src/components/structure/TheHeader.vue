<script>
export default {
  name: 'TheHeader'
}
</script>

<template>
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 p-4 header w-100">
      <a href="/public" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span class="fs-4 title">Comparador</span>
      </a>
    </header>
</template>

<style scoped>
  .header{
    background: #2c3e50;
  }

  .title{
    color: white;
    font-weight: bold;
  }

</style>