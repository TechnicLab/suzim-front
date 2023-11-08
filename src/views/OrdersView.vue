<template>
  <b-container fluid class="vh-100 pl-0">
    <b-row class="h-100">
      <b-col cols="3">
        <Sidebar
            @on-click="filterOrders"/>
      </b-col>
      <b-col>
        <b-row class="m-2 pl-0">
          <b-button v-b-toggle.collapse-1 variant="secondary" class="ml-0 my-2 mr-2">Filters</b-button>
          <b-button class="m-md-2">Report</b-button>
          <b-button class="m-md-2">Video tutorial</b-button>
        </b-row>
        <div>
          <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <b-form-checkbox>Filter 1</b-form-checkbox>
              <b-form-checkbox>Filter 2</b-form-checkbox>
              <b-form-checkbox>Filter 3</b-form-checkbox>
              <b-form-checkbox>Filter 4</b-form-checkbox>
              <b-form-checkbox>Filter 5</b-form-checkbox>
            </b-card>
          </b-collapse>
        </div>

        <OrdersBar
            @on-click='this.$bvModal.show("new-order")'/>

        <OrdersTable
            :table_data="table_data"
            :fields="fields"
            @edit="openEdit"
            @del="deleteOrder"/>

        <b-modal id="new-order" title="New order">
          <b-container fluid>
            <OrderNew
                ref="new-order"
                :payment_methods="payment_methods"
                :customers="customers"/>
          </b-container>
          <template #modal-footer>
            <b-button variant="danger" @click="$bvModal.hide('new-order')">Discard</b-button>
            <b-button variant="outline-primary" @click="createOrder()">Save</b-button>
          </template>
        </b-modal>

        <b-modal id="edit-order" title="Edit order">
          <b-container fluid>
            <OrderNew
                :original_data="edited_order"
                :payment_methods="payment_methods"
                :customers="customers"/>
          </b-container>
          <template #modal-footer>
            <b-button variant="danger" @click="$bvModal.hide('edit-order')">Discard</b-button>
            <b-button variant="outline-primary" @click="changeOrder()">Save</b-button>
          </template>
        </b-modal>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import OrdersTable from "@/components/OrdersTable.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import OrdersBar from "../components/OrdersBar.vue";
import axios from "axios";
import OrderNew from "../components/OrderNew.vue";

export default {
  name: "OrdersView",
  components: {OrderNew, OrdersBar, Sidebar, OrdersTable},
  data() {
    return {
      orders: [],
      fields: [
        {key: 'id', label: 'ID'},
        {key: 'status', label: 'Status'},
        {key: 'createdAt', label: 'Created at'},
        {key: 'modifiedAt', label: 'Modified at'},
        {key: 'edit', label: 'Edit', class: 'text-center'},
        {key: 'delete', label: 'Delete', class: 'text-center'}],
      payment_methods: [],
      customers: [],
      edited_order: {},
      status_filter: ''
    }
  },
  mounted() {
    this.getOrders()
    this.getPaymentMethods()
    this.getCustomers()
  },
  computed:{
    table_data(){
      if(this.status_filter === ''){
        return this.orders
      } else {
        return this.orders.filter(item=>{return item.status === this.status_filter})
      }
    }
  },
  methods: {
    getOrders() {
      axios
          .get('/orders/')
          .then(response => {
            this.orders = response.data.items
          })
          .catch(error => {
            console.log(error)
          })
    },
    createOrder() {
      const data = this.$refs['new-order'].form
      axios
          .post('/orders/', data)
          .then(response => {
            this.addOrder(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    addOrder(id) {
      axios
          .get('/orders/' + id + '/')
          .then(response => {
            this.orders.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      this.$bvModal.hide('new-order')
    },
    getPaymentMethods() {
      axios
          .get('/payment-methods/')
          .then(response => {
            this.payment_methods = response.data.items
          })
          .catch(error => {
            console.log(error)
          })
    },
    getCustomers() {
      axios
          .get('/customers/')
          .then(response => {
            this.customers = response.data.items
          })
          .catch(error => {
            console.log(error)
          })
    },
    openEdit(data) {
      this.edited_order = data
      this.$bvModal.show('edit-order')
    },
    changeOrder() {
    // TODO:не сходится get и put, у меня просто нет этих данных
    },
    deleteOrder(data) {
      axios
          .delete('/orders/' + data.id + '/')
          .then(response => {
            this.orders = this.orders.filter(item => item.id !== data.id)
          })
          .catch(error => {
            console.log(error)
          })
    },
    filterOrders(filter){
      this.status_filter = filter
    }
  }
}
</script>

<style scoped>

</style>