<template>
  <b-container class="mt-3">
    <b-row align-h="center">
      <b-col cols="6">
        <PaymentCard
            :payment_info="payment_info"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PaymentCard from "../components/PaymentCard.vue";
import axios from "axios";

export default {
  name: "PaymentView",
  components: {PaymentCard},
  data() {
    return {
      payment_info: []
    }
  },
  mounted() {
    this.getPayment()
  },
  methods: {
    getPayment() {
      axios
          .get('/payment-methods/' + this.$route.params.paymentId)
          .then(response => {
            this.payment_info = response.data
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