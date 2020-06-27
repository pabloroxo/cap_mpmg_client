# cap_mpmg_client

Utilizei a versão mais recente do Vue.

Para realizar as requisições, utilizei a porta 8001, e esta pode ser alterada no arquivo **src/config/index.js**, na linha 15, onde atualmente é:

```javascript
target: 'http://localhost:8001',
```

para a porta desejada.

Existem quatro telas:

* Login
* Balance (saldo)
* Withdraw (saque)
* Deposit (depósito)

Em todas as operações de requisições foram tratadas algumas exceções:

* Servidor fora do ar/com erros
* E-mail/senha incorreto(s)
* Senha incorreta no saque/depósito
* Saque/depósito com valor não-numérico
* Saque/depósito com valor negativo
* Saque com valor acima do saldo

Foram utilizadas as seguintes libs:

* **axios**: requisições na API, promises, async/await
* **vuex**: armazenar o token de auth e fornecer store, actions, mutations, states, getters
* **bootstrap**: interface nos templates
* **v-money**: formatação de valor financeiro no input