<template>
  <b-card class="text-left" no-body header="Customer information">
    <b-card-body>
      <b-card-text>ID: {{ this.customer_info.id }}</b-card-text>
      <b-card-text>Surname: {{ this.customer_info.surname }}</b-card-text>
      <b-card-text>Name: {{ this.customer_info.name }}</b-card-text>
      <b-card-text>Patronymic: {{ this.customer_info.patronymic }}</b-card-text>
      <b-card-text>Phone number: {{ this.customer_info.phoneNumber }}</b-card-text>
      <b-card-text>Email: {{ this.customer_info.email }}</b-card-text>
      <b-card-text>Created at: {{ this.customer_info.createdAt }}</b-card-text>
      <b-card-text>Modified at: {{ this.customer_info.modifiedAt }}</b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "CustomerCard",
  props:{
    customer_info:[]
  }
}
</script>

<style scoped>

</style>