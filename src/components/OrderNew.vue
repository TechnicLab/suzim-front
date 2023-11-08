<template>
  <b-form>
    <b-form-group label-cols="2" label="Number:">
      <b-form-input v-model="form.number"/>
    </b-form-group>
    <b-form-group label-cols="2" label="Address:">
      <b-form-input v-model="form.address"/>
    </b-form-group>
    <b-form-group label-cols="2" label="Payment method:">
      <b-form-select :options="payment_methods_computed" v-model="form.paymentMethodId"/>
    </b-form-group>
    <b-form-group label-cols="2" label="Customer:">
      <b-form-select :options="customers_computed" v-model="form.customerId"/>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: "OrderNew",
  data() {
    return {
      form: {
        number: this.original_data?.number || '',
        address: this.original_data?.address || '',
        paymentMethodId: this.original_data?.paymentMethodId || '',
        customerId: this.original_data?.customerId || ''
      }
    }
  },
  props: {
    original_data: Object,
    payment_methods: [],
    customers: []
  },
  computed: {
    payment_methods_computed() {
      return this.payment_methods.map(item => {
        return {'value': item.id, 'text':item.name}
      })
    },
    customers_computed() {
      return this.customers.map(item => {
        return {'value': item.id, 'text':item.surname + ' ' +  item.name}
      })
    },
  }
}
</script>

<style scoped>

</style>