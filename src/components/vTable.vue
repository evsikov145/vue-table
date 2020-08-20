<template>
  <section class="main">

    <div class="search">
      <input
          v-model="input"
          class="search__input"
          type="text"
          placeholder="Поиск пользователя"
      >
      <button
          @click="sortByValue"
          class="search__btn"
      >Найти</button>
    </div>

  <table class="table">
    <tr>
      <th
          @click="sortByFullName"
      ><div>fullname</div></th>
      <th
          @click="sortByUname"
      ><div>uname</div></th>
      <th
          @click="sortByCompany"
      ><div>company</div></th>
      <th
          @click="sortByEmail"
      ><div>email</div></th>

    </tr>

    <vTableRow
      v-for="user in paginatedUsers"
      :key="user.id"
      :user="user"
      @click="openPopup(user.id)"
    />

  </table>

    <vPagination
        :users="usersCopy"
        :pageNumber="pageNumber"
        @changePage="changePage"
        @nextPage="nextPage"
        @backPage="backPage"
        @updatePageNumber="updatePageNumber"
    />

    <vPopup
        v-if="isVisiblePopup"
        :user_data="popupUser"
        @closePopup="closePopup"
        @keyup.esc="closePopup"
    />

  </section>
</template>

<script>

import vPagination from "@/components/vPagination";
import vPopup from '@/components/vPopup'
import vTableRow from "@/components/vTableRow";
export default {
  name: 'vTable',
  components: {
    vTableRow,
    vPopup,
    vPagination
  },
  props: {
    users: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      usersPerPage: 10,
      pageNumber: 1,
      input: '',
      usersCopy: [],
      popupUser: {},
      isVisiblePopup: false
    }
  },
  methods: {
    updatePageNumber(){
      this.pageNumber = 1
    },
    nextPage(){
      const numberPage = Math.ceil(this.usersCopy.length / 10);
      if(this.pageNumber === numberPage){
        this.pageNumber = 1
      }else {
        this.pageNumber+=1
      }
    },
    backPage(){
      const numberPage = Math.ceil(this.usersCopy.length / 10);
      if(this.pageNumber === 1){
        this.pageNumber = numberPage
      }else {
        this.pageNumber-=1
      }
    },
    changePage(index){
        this.pageNumber = index;
    },
    closePopup(){
      this.isVisiblePopup = false;
    },
    openPopup(id){
      this.popupUser = this.users.find(item => item.id === id);
      this.isVisiblePopup = true;
    },

    sortByValue(){
      this.usersCopy = this.users.filter(item => {
        const result = Object.values(item).filter(val => {
          if(typeof val === 'string'){
            if(val.includes(this.input)){
              return true;
            }
          }
        })
        if(result.length > 0){
          return true;
        }
      });
    },
    sortByFullName(e){
      const target = e.target;
      this.checkingSortDirection(target) ? this.usersCopy.sort((a,b) => a.fullname.localeCompare(b.fullname)) : this.usersCopy.sort((a,b) => b.fullname.localeCompare(a.fullname))
      this.addActiveClass(target);
      this.updatePageNumber();
    },
    sortByUname(e){
      const target = e.target;
      this.checkingSortDirection(target) ? this.usersCopy.sort((a,b) => a.uname.localeCompare(b.uname)) : this.usersCopy.sort((a,b) => b.uname.localeCompare(a.uname))
      this.addActiveClass(target);
      this.updatePageNumber();
    },
    sortByCompany(e){
      const target = e.target;
      this.checkingSortDirection(target) ? this.usersCopy.sort((a,b) => a.company.localeCompare(b.company)) : this.usersCopy.sort((a,b) => b.company.localeCompare(a.company))
      this.addActiveClass(target);
      this.updatePageNumber();
    },
    sortByEmail(e){
      const target = e.target;
      this.checkingSortDirection(target) ? this.usersCopy.sort((a,b) => a.email.localeCompare(b.email)) : this.usersCopy.sort((a,b) => b.email.localeCompare(a.email))
      this.addActiveClass(target);
      this.updatePageNumber();
    },
    checkingSortDirection(target){
      if(target.tagName === 'TH'){
        target = target.querySelector('div');
      }
      if(target.classList.contains('active')){
        return false;
      }else{
        return true;
      }
    },
    addActiveClass(target){
      if(target.tagName === 'TH'){
        target = target.querySelector('div');
      }

      if(target.classList.contains('active')){
        target.classList.remove('active');
        target.classList.add('active-rotate');
      }else {
        const allTh = target.parentElement.parentElement.childNodes;
        allTh.forEach(item => {
          item.childNodes[0].classList.remove('active');
          item.childNodes[0].classList.remove('active-rotate')
        });
        target.classList.add('active');
      }


    }
  },
  computed: {
    paginatedUsers(){
      let from = (this.pageNumber - 1) * this.usersPerPage;
      let to = from + this.usersPerPage;
      return this.usersCopy.slice(from, to);
    }
  },
  mounted() {
    this.usersCopy = this.users;
  }
}
</script>


<style lang="scss">
  .table {
    margin: 40px auto;
    padding: 0 20px;
      th {

        cursor: pointer;
        width: 200px;
        text-align: left;
        font-size: 16px;
        color: black;
        margin-right: 10px;
        div {
          padding: 0 20px 20px 0;
          display: inline-block;
          position: relative;
          &::after{
            transition: .5s;
            content: "";
            opacity: 0;
            position: absolute;
            right: 0;
            background-image: url("../assets/img/arrow.svg");
            background-repeat: no-repeat;
            background-position: top right;
            background-size: 15px 20px;
            width: 15px;
            height: 20px;
          }
          &:hover {
            &::after{
              transition: .5s;
              opacity: 1;
            }
          }
        }
      }
    }
  .active {
    &::after{
      transition: .5s;
      opacity: 1!important;
    }
  }
  .active-rotate {
    &::after{
      transition: .5s;
      opacity: 1!important;
      transform: rotate(180deg);
    }
  }
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  .page {
    padding: 10px;
    border: 1px solid #26ae68;
    margin: 0 5px 10px;
    cursor: pointer;
    &--selected {
      background: #26ae68;
      color: white;
    }
    &:hover {
      background: #26ae68;
      color: white;
    }
  }
  .search {
    margin: 40px auto;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &__input {
      outline: none;
      border-radius: 25px;
      border: 1px solid darkgrey;
      width: 100%;
      padding: 10px 20px;
      margin-right: 20px;
      max-width: 300px;
    }
    &__btn {
      cursor: pointer;
      outline: none;
      border-radius: 25px;
      padding: 10px 20px;
      background: #26ae68;
      color: white;
    }
  }
  .arrow {
    margin: 0 20px;
    cursor: pointer;
    width: 30px;
    height: 40px;
  }
</style>
