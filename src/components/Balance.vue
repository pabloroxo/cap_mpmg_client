<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-11">
        <h4>Bem vindo(a), {{ user.name }}!</h4>
      </div>
      <div class="col-md-1 text-right">
        <button @click.prevent="doLogout" class="btn btn-primary">Sair</button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-6">
        <h5>Agência: {{ user.agency }} | Conta: {{ formatAccount(user.account) }}</h5>
        <h1>R$ {{ formatCurrency(user.balance) }}</h1>
        <h6>Saldo atual</h6>
      </div>
      <div class="col-md-3">
        <router-link :to="{ name: 'withdraw' }">
          <button class="btn btn-primary btn-block">Saque</button>
        </router-link>
      </div>
      <div class="col-md-3">
        <router-link :to="{ name: 'deposit' }">
          <button class="btn btn-primary btn-block">Depósito</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'balance',

  mounted () {
    if (this.$route.params.balance) {
      this.user.balance = this.$route.params.balance
    }
  },

  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),

    formatAccount (value) {
      let val = value.toString()
      return val.substring(0, val.length - 1) + '-' + val.substring(val.length - 1, val.length)
    },

    formatCurrency (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    doLogout () {
      this.logout()
      this.$router.replace({
        path: '/'
      })
    }
  }
}
</script>
