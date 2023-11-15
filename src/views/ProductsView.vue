<template>
  <b-container class="mt-3">
    <Controlbar
        @on-click='this.$bvModal.show("new-product")'/>
    <b-card class="m-2 pt-0" title="Products">
      <b-table :items="products" :fields="fields">
        <template #cell(id)="row">
          <b-link class="text-reset" :to="{name: 'product', params:{productId: row.item.id}}">{{
              row.item.id }}
          </b-link>
        </template>
        <template #cell(edit)="row">
          <b-button variant="info" @click="openEdit(row)">Edit</b-button>
        </template>
        <template #cell(delete)="row">
          <b-button variant="danger" @click="deleteProduct(row.item)">Delete</b-button>
        </template>
      </b-table>
    </b-card>

    <b-modal id="new-product" title="New product">
      <b-container fluid>
        <ProductNew
            ref="new-product"/>
      </b-container>
      <template #modal-footer>
        <b-button variant="danger" @click="$bvModal.hide('new-product')">Discard</b-button>
        <b-button variant="outline-info" @click="createProduct()">Save</b-button>
      </template>
    </b-modal>

    <b-modal id="edit-product" title="Edit product">
      <b-container fluid>
        <ProductNew
            ref="edit-product"
            :original_data="edited_product.item"/>
      </b-container>
      <template #modal-footer>
        <b-button variant="danger" @click="$bvModal.hide('edit-product')">Discard</b-button>
        <b-button variant="outline-info" @click="changeProduct()">Save</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import Controlbar from "../components/layout/Controlbar.vue";
import ProductNew from "../components/ProductNew.vue";
import axios from "axios";

export default {
  name: "ProductsView",
  components: {ProductNew, Controlbar},
  data() {
    return {
      products: [],
      fields: [
        {key: 'id', sortable: true},
        {key: 'name', sortable: true},
        {key: 'price', sortable: true},
        {key: 'description', sortable: true},
        {key: 'edit'},
        {key: 'delete'}
      ],
      edited_product: {
        index : BigInt,
        item: []
      }
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      axios
          .get('/products/')
          .then(response => {
            this.products = response.data.items
          })
          .catch(error => {
            console.log(error)
          })
    },
    createProduct() {
      const data = this.$refs['new-product'].form
      axios
          .post('/products/', data)
          .then(response => {
            this.addProduct(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    addProduct(id) {
      axios
          .get('/products/' + id + '/')
          .then(response => {
            this.products.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      this.$bvModal.hide('new-product')
    },
    openEdit(data) {
      this.edited_product.item = data.item
      this.edited_product.index = data.index
      this.$bvModal.show('edit-product')
    },
    changeProduct(){
      const data = this.$refs['edit-product'].form
      axios
          .put('/products/' + this.edited_product.item.id + '/', data)
          .then(response=>{
            this.products[this.edited_product.index] = response.data
            this.$bvModal.hide('edit-product')
          })
          .catch(error=>{
            console.log(error)
          })
    },
    deleteProduct(data) {
      axios
          .delete('/products/' + data.id + '/')
          .then(response => {
            this.products = this.products.filter(item => item.id !== data.id)
          })
          .catch(error => {
            console.log(error)
          })
    },
  }
}
</script>

<style scoped>

</style>