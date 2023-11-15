<template>
  <b-card class="text-left" no-body header="Product information">
    <b-card-body>
      <b-card-text>ID: {{ this.product_info.id }}</b-card-text>
      <b-card-text>Name: {{ this.product_info.name }}</b-card-text>
      <b-card-text>Price: {{ this.product_info.price }}</b-card-text>
      <b-card-text>Description: {{ this.product_info.description }}</b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product_info: []
  }
}
</script>

<style scoped>

</style>