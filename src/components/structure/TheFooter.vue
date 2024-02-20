<script>
  import { getCurrentYear } from '@/helpers/date/getCurrentYear.js'
  export default {
     name: "TheFooter",
    data(){
      return {
        currentYear: getCurrentYear()
      }
    }

  }
</script>

<template>
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top footer">
      <div class="d-flex align-items-center date">
        <span class="mb-3 mb-md-0 text-muted">© {{ currentYear }} Comparador</span>
      </div>
    </footer>
</template>

<style scoped>
.footer{
  bottom: 0;
  left: 0;
  right: 0;
}

.date{
  margin: 0 auto;
}

</style>