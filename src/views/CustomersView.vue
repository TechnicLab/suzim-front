<template>
  <b-container class="mt-3">
    <Controlbar
        @on-click='this.$bvModal.show("new-customer")'/>
    <b-card class="m-2 pt-0" title="Customers">
      <b-table :items="customers" :fields="fields">
        <template #cell(id)="row">
          <b-link class="text-reset" :to="{name: 'customer', params:{customerId: row.item.id}}">{{
              row.item.id }}
          </b-link>
        </template>
        <template #cell(edit)="row">
          <b-button variant="info" @click="openEdit(row)">Edit</b-button>
        </template>
        <template #cell(delete)="row">
          <b-button variant="danger" @click="deleteCustomer(row.item)">Delete</b-button>
        </template>
      </b-table>
    </b-card>

    <b-modal id="new-customer" title="New customer">
      <b-container fluid>
        <CustomerNew
            ref="new-customer"/>
      </b-container>
      <template #modal-footer>
        <b-button variant="danger" @click="$bvModal.hide('new-customer')">Discard</b-button>
        <b-button variant="outline-info" @click="createCustomer()">Save</b-button>
      </template>
    </b-modal>

    <b-modal id="edit-customer" title="Edit customer">
      <b-container fluid>
        <CustomerNew
            ref="edit-customer"
            :original_data="edited_customer.item"/>
      </b-container>
      <template #modal-footer>
        <b-button variant="danger" @click="$bvModal.hide('edit-customer')">Discard</b-button>
        <b-button variant="outline-info" @click="changeCustomer()">Save</b-button>
      </template>
    </b-modal>
  </b-container>

</template>

<script>
import axios from "axios";
import Controlbar from "../components/layout/Controlbar.vue";
import CustomerNew from "../components/CustomerNew.vue";

export default {
  name: "CustomersView",
  components: {CustomerNew, Controlbar},
  data() {
    return {
      customers: [],
      fields: [
        {key: 'id', sortable: true},
        {key: 'surname', sortable: true},
        {key: 'name', sortable: true},
        {key: 'patronymic', sortable: true},
        {key: 'phoneNumber', sortable: true},
        {key: 'email', sortable: true},
        {key: 'createdAt', sortable: true},
        {key: 'modifiedAt', sortable: true},
        {key: 'edit'},
        {key: 'delete'}
      ],
      edited_customer: {
        index : BigInt,
        item: []
      }
    }
  },
  mounted() {
    this.getCustomers()
  },
  methods: {
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
    createCustomer() {
      const data = this.$refs['new-customer'].form
      axios
          .post('/customers/', data)
          .then(response => {
            this.addCustomer(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    addCustomer(id) {
      axios
          .get('/customers/' + id + '/')
          .then(response => {
            this.customers.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      this.$bvModal.hide('new-customer')
    },
    openEdit(data) {
      this.edited_customer.item = data.item
      console.log(this.edited_customer.item.id)
      this.edited_customer.index = data.index
      this.$bvModal.show('edit-customer')
    },
    changeCustomer(){
      const data = this.$refs['edit-customer'].form
      axios
          .put('/customers/' + this.edited_customer.item.id + '/', data)
          .then(response=>{
            this.customers[this.edited_customer.index] = response.data
            this.$bvModal.hide('edit-customer')
          })
          .catch(error=>{
            console.log(error)
          })
    },
    deleteCustomer(data) {
      axios
          .delete('/customers/' + data.id + '/')
          .then(response => {
            this.customers = this.customers.filter(item => item.id !== data.id)
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