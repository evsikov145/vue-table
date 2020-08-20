<template>
  <div
      @click="closePopup"
      class="popup"

  >
    <div class="popup-main">
      <div
          class="popup-exit"
      ></div>
      <div>Полное имя {{user_data.fullname}}</div>
      <div>Штат {{user_data.address.state}}</div>
      <div>Город {{user_data.address.city}}</div>
      <div>Улица {{user_data.address.streetAddress}}</div>
      <div>Индекс {{user_data.address.zip}}</div>
      <input
          class="popup-input"
          @keyup.esc="closePopup"
          type="text"
      >
    </div>
  </div>
</template>

<script>
export default {
name: "vPopup",
  props: {
    user_data: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    closePopup(e){
      const popupBody = document.querySelector('.popup-main');
      if(e.target.classList.contains('popup-exit')){
        this.$emit('closePopup');
      }else if (!popupBody.contains(e.target)) {
        this.$emit('closePopup');
      }
    },
    blurInput(input){
      document.addEventListener('click', (e) => {
        if(e.target !== input){
          input.focus();
        }
      })
    }
  },
  mounted() {
    const input = document.querySelector('.popup-input');
    input.focus();
    this.blurInput(input);
  }
}
</script>

<style lang="scss">
  .popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    &-main {
      position: relative;
      z-index: 100;
      background: white;
      border-radius: 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 60px;
      div {
        text-align: left;
        font-size: 20px;
        font-weight: 300;
        margin: 20px;
      }
    }
    &-exit {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background: url("../assets/img/center.svg") center/20px no-repeat;
      cursor: pointer;
    }
    &-input {
      opacity: 0;
    }
  }
</style>