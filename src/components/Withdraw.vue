<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-12">
        <router-link :to="{name: 'balance'}">
          <button class="btn btn-primary">Retornar</button>
        </router-link>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <h2>Saque</h2>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-4">
        <form>
          <div class="form-group">
            <label for="amount">Valor</label>
            <money v-model="form.amount" v-bind="money" id="amount" class="form-control" />
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input v-model="form.password" type="password" id="password" class="form-control" />
          </div>
          <div v-if="errorWithdraw" class="form-group text-danger">
            <b>{{ this.errorMessage }}</b>
          </div>
          <div v-if="error" class="form-group text-danger">
            <b>Erro em nosso sistema. Tente acessar em outro momento.</b>
          </div>
          <div class="form-group">
            <button @click="doWithdraw" type="button" class="btn btn-primary btn-block mt-3">Concluir saque</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Money } from 'v-money'

export default {
  name: 'withdraw',

  components: {
    Money
  },

  data () {
    return {
      form: {
        amount: '',
        password: ''
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
      errorMessage: '',
      errorWithdraw: false,
      error: false
    }
  },

  methods: {
    ...mapActions({
      withdraw: 'auth/withdraw'
    }),

    doWithdraw () {
      this.errorWithdraw = false
      this.error = false
      this.withdraw(this.form).then(response => {
        this.$router.replace({
          name: 'balance',
          params: { balance: response }
        })
      })
        .catch(error => {
          if (error.response.status === 406) {
            this.errorMessage = error.response.data
            this.errorWithdraw = true
          } else {
            this.error = true
          }
        })
    }
  }
}
</script>
