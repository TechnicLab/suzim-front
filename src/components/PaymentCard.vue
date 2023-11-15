<template>
<b-card class="text-left" no-body header="Payment method information">
    <b-card-body>
      <b-card-text>ID: {{ this.payment_info.id }}</b-card-text>
      <b-card-text>Name: {{ this.payment_info.name }}</b-card-text>
      <b-card-text>Created at: {{ this.payment_info.createdAt }}</b-card-text>
      <b-card-text>Modified at: {{ this.payment_info.modifiedAt }}</b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "PaymentCard",
  props:{
    payment_info:[]
  }
}
</script>

<style scoped>

</style>