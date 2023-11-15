<template>
  <b-container class="mt-3">
    <b-row align-h="center">
      <b-col cols="6">
        <CustomerCard
            :customer_info="customer_info"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import CustomerCard from "../components/CustomerCard.vue";

export default {
  name: "CustomerView",
  components: {CustomerCard},
  data() {
    return {
      customer_info: []
    }
  },
  mounted() {
    this.getCustomer()
  },
  methods: {
    getCustomer() {
      axios
          .get('/customers/' + this.$route.params.customerId)
          .then(response => {
            this.customer_info = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>

</style>