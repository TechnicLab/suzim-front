<template>
  <b-container class="mt-3">
    <b-row align-h="center">
      <b-col cols="6">
        <div v-if="this.$route.params.orderId">
        <OrderCard
        :original_data="order_data"/>
        </div>

        <b-card v-else>
          <b-card-body>
            <b-form @submit.prevent="this.$router.push(this.form.id + '/'); getOrder()">
              <b-form-group label-cols="2" label="Order id:">
                <b-form-input v-model="form.id"/>
              </b-form-group>
              <b-row>
                <b-col cols="9"></b-col>
                <b-col cols="3">
                  <button class="btn btn-info ml-2" type="submit">Find</button>
                </b-col>
              </b-row>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import OrderCard from "../components/OrderCard.vue";

export default {
  name: "OrderView",
  components: {OrderCard},
  data() {
    return {
      order_data: [],
      form: {
        id: this.form?.id || ''
      }
    }
  },
  mounted() {
    if (this.$route.params.orderId) {
      this.getOrder()
    }
  },

  methods: {
    getOrder() {
      axios
          .get('/orders/' + this.$route.params.orderId)
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