<template>
  <b-container class="mt-3">
    <b-row align-h="center">
      <b-col cols="6">
        <ProductCard
            :product_info="product_info"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import axios from "axios";

export default {
  name: "ProductView",
  components: {ProductCard},
  data() {
    return {
      product_info: []
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      axios
          .get('/products/' + this.$route.params.productId)
          .then(response => {
            this.product_info = response.data
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