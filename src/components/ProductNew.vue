<template>
<b-form>
    <b-form-group label-cols="3" label="Name:">
      <b-form-input v-model="form.name"/>
    </b-form-group>
    <b-form-group label-cols="3" label="Price:">
      <b-form-input type="number" v-model="form.price"/>
    </b-form-group>
    <b-form-group label-cols="3" label="Description:">
      <b-form-textarea v-model="form.description"/>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: "ProductNew",
  data() {
    return {
      form: {
        name: this.original_data?.name || '',
        price: this.original_data?.price || '',
        description: this.original_data?.description || '',
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