<template>
  <tr class="table-row">
    <td>{{user.fullname}}</td>
    <td>{{user.uname}}</td>
    <td>{{user.company}}</td>
    <td>{{user.email}}</td>
  </tr>
</template>

<script>
export default {
name: "vTableRow",
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
.table-row {
  cursor: pointer;
  &:nth-last-of-type(1){
    margin-bottom: 40px;
  }
  td {
    text-align: left;
    font-size: 16px;
    color: darkslateblue;
    padding: 10px 0;
  }
}
</style>