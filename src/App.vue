<template>
  <div id="app">
    <button
        class="btn"
        @click="getUsersFromApi"
        v-if="!ISVISIBLETABLE"
    >Показать пользователей</button>
    <vLoader
        v-if="!ISVISIBLETABLE && loader"
    />
    <vTable
      v-if="ISVISIBLETABLE"
      :users="USERS"
    />
  </div>
</template>

<script>
import vLoader from "@/components/vLoader";
import vTable from "@/components/vTable";
import {mapActions, mapGetters} from "vuex"
export default {
  name: 'App',
  components: {
    vTable,
    vLoader
  },
  data(){
    return{
      loader: false
    }
  },
  methods: {
    getUsersFromApi(){
      this.GET_USERS_FROM_API();
      this.loader = true;
    },
    ...mapActions([
      'GET_USERS_FROM_API'
    ])
  },
  computed: {
    ...mapGetters([
        'USERS',
        'ISVISIBLETABLE'
    ])
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  max-width: 1600px;
  margin: 60px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
}
  .btn {
    outline: none;
    cursor: pointer;
    border-radius: 25px;
    border: 2px solid darkslateblue;
    background: cornflowerblue;
    color: azure;
    font-size: 20px;
    text-transform: uppercase;
    padding: 10px 20px;
  }
</style>
