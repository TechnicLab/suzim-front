<template>
  <div class="px-3 py-2 bg-light h-100">
    <b-nav vertical class="text-left" pills>
      <b-navbar-brand>
        All statuses
      </b-navbar-brand>
      <div v-for="ind in nav_list.length">
        <b-nav-item link-classes="text-reset" @click="$emit('on-click', nav_list[ind-1])">
          {{ this.nav_list[ind - 1] }}
        </b-nav-item>
      </div>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      nav_list: ['AwaitingPayment', 'Created', 'InAssembly', 'TransferredToDelivery', 'OnTheWay', 'AtTheCourier', 'AwaitingReceipt', 'Delivered', 'Received', 'Canceled'] //TODO: хотелось бы OPTIONS
    }
  }
}
</script>

<style scoped>

</style>