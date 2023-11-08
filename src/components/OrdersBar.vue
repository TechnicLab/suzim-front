<template>
  <div class="m-2 ">
    <b-navbar style="border-radius: 5px" toggleable="lg" type="dark" variant="secondary">
      <b-navbar-nav class="w-100">
        <b-nav-item @click='$emit("on-click")'>Add</b-nav-item>
        <b-nav-item-dropdown text="Change" right>
          <b-dropdown-item href="#">New</b-dropdown-item>
          <b-dropdown-item href="#">In progress</b-dropdown-item>
          <b-dropdown-item href="#">Delivered</b-dropdown-item>
          <b-dropdown-item href="#">Revoked</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item>Excel export</b-nav-item>
        <b-nav-item>Upload from store</b-nav-item>
      </b-navbar-nav>
    </b-navbar>


  </div>
</template>

<script>
export default {
  name: "OrdersBar"
}
</script>

<style scoped>

</style>