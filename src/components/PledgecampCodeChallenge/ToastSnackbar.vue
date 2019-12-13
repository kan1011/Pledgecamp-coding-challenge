<template>
  <md-snackbar
    :md-position="position"
    :md-duration="Infinity"
    :md-active="active"
  >
    <md-badge
      class="badge-top-left"
      md-position="top"
      :md-content="notifications.length"
    />
    <span>{{ notifications[notifications.length - 1] }}</span>
    <div>
      <md-button class="md-primary" @click="$emit('read-notification')"
        >OK</md-button
      >
    </div>
  </md-snackbar>
</template>

<script>
export default {
  name: "ToastSnackbar",
  props: {
    notifications: Array
  },
  data: function() {
    return {
      position: "left"
    };
  },
  computed: {
    active: function() {
      if (this.notifications.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.badge-top-left {
  left: -10px;
  top: -10px;
}
</style>
