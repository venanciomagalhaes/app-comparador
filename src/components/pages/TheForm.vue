<script>
import { searchInstitutions } from '@/http/Institutions/searchInstitutions.js'
import { searchForAgreement } from '@/http/Agreement/searchForAgreement.js'
import { searchForNumberOfInstallments } from '@/http/Installments/searchForNumberOfInstallments.js'
import SubmitButton from '@/components/forms/buttons/submit.vue'
import { simulatesLoan } from '@/http/simulation/simulatesLoan.js'
import { money } from '@/components/forms/mask/money.js'
import { formatToMoney } from '@/helpers/format/formatToMoney.js'
import AlertWarning from '@/components/alerts/AlertWarning.vue'

export default {
  name: 'TheForm',
  components: { AlertWarning, SubmitButton },
  data(){
    return {
      propostas: [],
      showModal: false,
      valor_emprestimo: '',
      maskedValue: '',
      parcelas: '',
      instituicoes: '',
      convenios: '',
      optionsInstitutions: [],
      optionsInstallments: [],
      optionsAgreements: [],
      error_valor_emprestimo: '',
    }
  },
  methods: {
    formatToMoney,
    maskMoney(event) {
      [this.valor_emprestimo, this.maskedValue ] = money(event)
    },
    validate(){
      if(!this.valor_emprestimo || this.valor_emprestimo < 1){
        this.error_valor_emprestimo = "Por favor, preencha o valor desejado";
        return false;
      }
      this.error_valor_emprestimo = false;
      return true;
    },
    getFormData(){
      let formData = {
        'valor_emprestimo': this.valor_emprestimo,
        'parcelas': this.parcelas,
        'instituicoes': this.instituicoes,
        'convenios': this.convenios,
      };
      this.clearRequest(formData)
      return formData
    },
    clearRequest(formData){
      for (let key in formData) {
        if ((typeof formData[key] === "object" && Array.isArray(formData[key]))) {
          formData[key] = formData[key].filter((element) => element.length);
        }
      }
    },
    async handleSubmit(){
      if(!this.validate()){
        return;
      }
      this.propostas = await simulatesLoan(this.getFormData());
      this.showModal = true;
    },
    closeModal(){
      this.showModal = false
    },
    calculate(proposta){
      return parseInt(proposta.parcelas) * parseFloat(proposta.valor_parcela);
    }
  },
  async created() {
    this.optionsInstitutions = await searchInstitutions()
    this.optionsAgreements = await searchForAgreement()
    this.optionsInstallments = searchForNumberOfInstallments()
  },
}
</script>

<template>
<div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="mb-4">Formulário de Empréstimo</h2>
        <form @submit.prevent="handleSubmit">

            <div class="mb-3">
              <label for="valor_emprestimo" class="form-label">Digite o valor desejado:</label>
              <input
                     v-model="maskedValue"
                     type="text"
                     class="form-control"
                     id="valor_emprestimo"
                     name="valor_emprestimo"
                     @input="maskMoney"
                     placeholder="R$ 0,00">
              <span v-if="error_valor_emprestimo" class="error">{{error_valor_emprestimo}}</span>
            </div>

            <div class="mb-3">
              <label for="parcelas" class="form-label">Quantidade de parcelas</label>
              <select
                v-model="parcelas"
                ref="parcelas"
                name="parcelas" :class="['form-select']"
                id="parcelas"
              >
                <option value="">Selecione a quantidade de parcelas</option>
                <option :value="option.chave" v-for="option in optionsInstallments" :key="option.id">
                  {{option.valor}}
                </option>
              </select>
            </div>


          <div class="mb-3">
            <label for="instituicoes" class="form-label">Selecione as instituições desejadas</label>
            <select
              v-model="instituicoes"
              ref="instituicoes"
              :multiple="true"
              name="instituicoes" :class="['form-select','selectOver']"
              id="instituicoes"
            >
              <option value="">Não desejo consultar por instituição</option>
              <option :value="option.chave" v-for="option in optionsInstitutions" :key="option.id">
                {{option.valor}}
              </option>
            </select>
          </div>


          <div class="mb-3">
            <label for="convenios" class="form-label">Selecione os convênios</label>
            <select
              v-model="convenios"
              ref="convenios"
              :multiple="true"
              name="convenios" :class="['form-select','selectOver']"
              id="convenios"
            >
              <option value="">Não desejo consultar por convênios</option>
              <option :value="option.chave" v-for="option in optionsAgreements" :key="option.id">
                {{option.valor}}
              </option>
            </select>
          </div>

          <submit-button :text-button="'Consultar propostas'"/>
        </form>
      </div>
    </div>
  </div>

  <div id="myModal" :class="['modal', {'d-block': showModal}]" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal()">&times;</span>
      <h2>Resultados da busca</h2>
      <div v-if="propostas" class="propostas-container">
        <div v-for="(proposta, name) in propostas" :key="name" class="proposta">
          <div class="proposta-header">Instituição: {{ name }}</div>
          <div class="mb-3">Valor solicitado: R$ {{ formatToMoney(valor_emprestimo) }}</div>
          <div class="proposta-details" v-for="(detalhes, index) in proposta" :key="detalhes.taxa">
            <div class="text-center fw-bolder text-uppercase">Proposta {{index + 1}}</div>
            <div class="detalhes-item ">
              <span class="quantidade-valor">
              Quantidade de parcelas x Valor : {{ formatToMoney(calculate(detalhes)) }}
              </span>
              <br>
              Parcelas = {{detalhes.parcelas}}
              <br>
              Valor da parcela = {{formatToMoney(detalhes.valor_parcela)}}
              <br>
             </div>
            <div class="detalhes-item">Taxa de juros ao mês: {{ detalhes.taxa }} %</div>
          </div>
        </div>
      </div>
      <AlertWarning v-else-if="propostas.length === 0" :text-alert="'Nenhuma proposta encontrada'"/>
      <button class="btn-fechar" @click="closeModal()">Fechar</button>
    </div>
  </div>


</template>

<style scoped>
.form-label {
  font-style: italic;
  font-weight: bolder;
}

.selectOver{
  overflow: auto;
  border: none;
}

.selectOver option{
  text-align: center;
}

option{
  background: revert;
  border: 1px solid;
  margin-bottom: 10px;
  cursor: pointer;
}

.error{
  color: red;
  font-size: 12px;
}


.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 600px;
  border-radius: 10px;
}

.propostas-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.proposta {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}

.proposta-header {
  font-weight: bold;
}

.detalhes-item {
  margin-top: 5px;
}

.btn-fechar {
  background-color: #ddd;
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-fechar:hover {
  background-color: #bbb;
}

.proposta-details{
  border: 1px solid;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
}

.quantidade-valor{
  background: #d5feae;
  width: 100%;
  display: block;
  padding: 18px;
}

</style>

