<template>
  <b-container fluid class="mt-3 vh-100">
    <b-row class="justify-content-center"><h2>Order tracking page</h2></b-row>
    <b-row class="mx-5">
      <b-col cols="4 v-100">
        <b-row>
          <h4>Status: {{order_data.status}}</h4>
        </b-row>
        <b-row>
          <OrderCard
              :original_data="order_data"/>
        </b-row>
      </b-col>
      <b-col>
        <b-row class="mb-3">
          <b-col cols="12" class="px-0">
            <b-progress variant="info" show-progress :value="percent"/>
          </b-col>
        </b-row>
        <b-row>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115681.29592731265!2d-77.47713270775661!3d25.0326996781907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x892f7c99b981dbc9%3A0x2aef01d3485e50d2!2sNassau%2C%20Bahamy!5e0!3m2!1spl!2spl!4v1624445118063!5m2!1spl!2spl"
              class="w-100" height="400" allowfullscreen="" loading="lazy"></iframe>
        </b-row>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import OrderCard from "../components/OrderCard.vue";
import axios from "axios";

export default {
  name: "TrackingView",
  components: {OrderCard},
  data() {
    return {
      order_data: Object,
      statuses: ['AwaitingPayment', 'Created', 'InAssembly', 'TransferredToDelivery', 'OnTheWay', 'AtTheCourier', 'AwaitingReceipt', 'Delivered', 'Received', 'Canceled']
    }
  },
  mounted() {
    this.getOrder()
  },
  computed: {
    percent() {
      var value = 0
      while (this.order_data.status !== this.statuses[value]) {
        value += 1
      }
      return value/this.statuses.length * 100
    }
  },
  methods: {
    getOrder() {
      axios
          .get('/orders/' + this.$route.params.orderId + '/')
          .then(response => {
            this.order_data = response.data
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