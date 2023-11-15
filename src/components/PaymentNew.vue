<template>
  <b-form>
    <b-form-group label-cols="3" label="Name:">
      <b-form-input v-model="form.name"/>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: "PaymentNew",
  data() {
    return {
      form: {
        name: this.original_data?.name || '',
      }
    }
  },
  props: {
    original_data: Object
  }
}
</script>

<style scoped>

</style>