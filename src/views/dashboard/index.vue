<template>
  <div>
    <Card></Card>
    <Sale></Sale>
  </div>
</template>

<script>
  import Card from './Card';
  import Sale from './Sale';
  export default {
    name: 'Home',
    components: {
      Card,
      Sale,
    }
  }
</script>

<style scoped>
</style>
