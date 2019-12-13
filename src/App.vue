<template>
  <div id="app">
    <Pledgecamp/>
  </div>
</template>

<script>
import Pledgecamp from './components/PledgecampCodeChallenge/IndexPage'
import './fake-db'
export default {
  name: 'app',
  components: {
    Pledgecamp
  }
}
</script>

<style>
</style>
