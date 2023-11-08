<template>
  <b-card class="m-2 pt-0" title="Byers orders">
    <b-table :items="this.data" :fields="this.fields">
      <template #cell(id)="row">
        <b-link class="text-reset" :to="{name: 'single-order', params:{'orderId':row.item.id}}">{{
            row.item.id
          }}
        </b-link>
      </template>

      <template #cell(edit)="row">
        <b-button @click="$emit('edit', row.item)" class="btn-info">Edit</b-button>
      </template>

      <template #cell(delete)="row">
        <b-button @click="$emit('del', row.item)" class="btn-danger">Delete</b-button>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import moment from "moment";

export default {
  name: "OrdersTable",
  computed: {
    data() {
      return this.table_data.map(item => {
        return {
          id: item.id,
          status: item.status,
          createdAt: moment(item.createdAt).format('DD.MM.YYYY HH:mm:ss'),
          modifiedAt: moment(item.modifiedAt).format('DD.MM.YYYY HH:mm:ss')
        }
      })
    }
  },
  props: {
    table_data: [],
    fields: []
  }
}
</script>

<style scoped>

</style>