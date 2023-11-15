<template>
  <b-container class="mt-3">
    <Controlbar
        @on-click='this.$bvModal.show("new-payment")'/>
    <b-card class="m-2 pt-0" title="Payment methods">
      <b-table :items="payments" :fields="fields">
        <template #cell(id)="row">
          <b-link class="text-reset" :to="{name: 'payment', params:{paymentId: row.item.id}}">
            {{ row.item.id }}
          </b-link>
        </template>
        <template #cell(edit)="row">
          <b-button variant="info" @click="openEdit(row)">Edit</b-button>
        </template>
        <template #cell(delete)="row">
          <b-button variant="danger" @click="deletePayment(row.item)">Delete</b-button>
        </template>
      </b-table>
    </b-card>

    <b-modal id="new-payment" title="New payment method">
      <b-container fluid>
        <PaymentNew
            ref="new-payment"/>
      </b-container>
      <template #modal-footer>
        <b-button variant="danger" @click="$bvModal.hide('new-payment')">Discard</b-button>
        <b-button variant="outline-info" @click="createPayment()">Save</b-button>
      </template>
    </b-modal>

    <b-modal id="edit-payment" title="Edit payment method">
      <b-container fluid>
        <PaymentNew
            ref="edit-payment"
            :original_data="edited_payment.item"/>
      </b-container>
      <template #modal-footer>
        <b-button variant="danger" @click="$bvModal.hide('edit-payment')">Discard</b-button>
        <b-button variant="outline-info" @click="changePayment()">Save</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import PaymentNew from "../components/PaymentNew.vue";
import Controlbar from "../components/layout/Controlbar.vue";
import axios from "axios";

export default {
  name: "PaymentsView",
  components: {Controlbar, PaymentNew},
  data() {
    return {
      payments: [],
      fields: [
        {key: 'id', sortable: true},
        {key: 'name', sortable: true},
        {key: 'createdAt', sortable: true},
        {key: 'modifiedAt', sortable: true},
        {key: 'edit'},
        {key: 'delete'}
      ],
      edited_payment: {
        index : BigInt,
        item: []
      }
    }
  },
  mounted() {
    this.getPayments()
  },
  methods: {
    getPayments() {
      axios
          .get('/payment-methods/')
          .then(response => {
            this.payments = response.data.items
          })
          .catch(error => {
            console.log(error)
          })
    },
    createPayment() {
      const data = this.$refs['new-payment'].form
      axios
          .post('/payment-methods/', data)
          .then(response => {
            this.addPayment(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    addPayment(id) {
      axios
          .get('/payment-methods/' + id + '/')
          .then(response => {
            this.payments.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      this.$bvModal.hide('new-payment')
    },
    openEdit(data) {
      this.edited_payment.item = data.item
      this.edited_payment.index = data.index
      this.$bvModal.show('edit-payment')
    },
    changePayment(){
      const data = this.$refs['edit-payment'].form
      axios
          .put('/payment-methods/' + this.edited_payment.item.id + '/', data)
          .then(response=>{
            this.payments[this.edited_payment.index] = response.data
            this.$bvModal.hide('edit-payment')
          })
          .catch(error=>{
            console.log(error)
          })
    },
    deletePayment(data) {
      axios
          .delete('/payment-methods/' + data.id + '/')
          .then(response => {
            this.payments = this.payments.filter(item => item.id !== data.id)
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