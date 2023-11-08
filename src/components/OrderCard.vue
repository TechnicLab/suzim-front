<template>
  <b-card class="text-left" no-body header="Order detail">
    <b-card-body>
      <b-card-text>ID: {{ this.original_data.id }}</b-card-text>
      <b-card-text>Status: {{ this.original_data.status }}</b-card-text>
      <b-card-text>Created at: {{ created_at }}</b-card-text>
      <b-card-text>Modified at: {{ modified_at }}</b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
import moment from "moment/moment";

export default {
  name: "OrderCard",
  props: {
    original_data: Object
  },
  computed: {
    created_at() {
      return moment(this.original_data.createdAt).format('DD.MM.YYYY HH:mm:ss')
    },
    modified_at() {
      return moment(this.original_data.modifiedAt).format('DD.MM.YYYY HH:mm:ss')
    }
  },
}
</script>

<style scoped>

</style>