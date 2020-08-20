<template>
  <div class="pagination">
    <div
        @click="backPage"
        class="arrow"
    ><img src="@/assets/img/back.svg" alt=""></div>
    <div
        class="page"
        v-for="page in pages"
        :key="page"
        :class="{'page--selected' : page === pageNumber }"
        @click="changePage"
    >
      {{page}}
    </div>
    <div
        @click="nextPage"
        class="arrow"
    ><img src="@/assets/img/next.svg" alt=""></div>
  </div>
</template>

<script>
export default {
  name: "vPagination",
  data(){
    return {

    }
  },
  props: {
    users: {
      type: Array,
      default(){
        return []
      }
    },
    pageNumber: {
      type: Number,
      default(){
        return 1
      }
    }
  },
  methods: {
    nextPage(){
      this.$emit('nextPage')
    },
    backPage(){
      this.$emit('backPage')
    },
    changePage(event){
      this.$emit('changePage', +event.target.innerText)
    },
  },
  computed: {
    pages(){
      const maxNumberPage = Math.ceil(this.users.length / 10);

       if(this.pageNumber === maxNumberPage || this.pageNumber === 1){
        return [1, maxNumberPage];
      }else if(this.pageNumber > maxNumberPage){
         this.$emit('updatePageNumber');
         return [1, maxNumberPage];
       }else {
        return [1, this.pageNumber, maxNumberPage];
      }

    },
  }
}
</script>

<style scoped>

</style>