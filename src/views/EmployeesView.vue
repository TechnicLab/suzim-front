<template>
  <b-table :items="employees_data"/>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeesView",
  data() {
    return {
      employees_data: []
    }
  },
  mounted() {
    this.getEmployees()
  },
  methods: {
    getEmployees() {
      axios
          .get('employees')
          .then(response => {
            this.employees_data = response.data
          })
          .catch(error=>{
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>

</style>