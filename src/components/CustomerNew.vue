<template>
  <b-form>
    <b-form-group label-cols="3" label="Surname:">
      <b-form-input v-model="form.surname"/>
    </b-form-group>
    <b-form-group label-cols="3" label="Name:">
      <b-form-input v-model="form.name"/>
    </b-form-group>
    <b-form-group label-cols="3" label="Patronymic:">
      <b-form-input v-model="form.patronymic"/>
    </b-form-group>
    <b-form-group label-cols="3" label="Phone number:">
      <b-form-input v-model="form.phoneNumber"/>
    </b-form-group>
    <b-form-group label-cols="3" label="Email:">
      <b-form-input type="email" v-model="form.email"/>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: "CustomerNew",
  data() {
    return {
      form: {
        surname: this.original_data?.surname || '',
        name: this.original_data?.name || '',
        patronymic: this.original_data?.patronymic || '',
        phoneNumber: this.original_data?.phoneNumber || '',
        email: this.original_data?.email || ''
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