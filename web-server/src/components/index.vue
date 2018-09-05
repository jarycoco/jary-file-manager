<template>
<!-- <div>{{msg}}</div> -->


  <v-container grid-list-md >
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md8 xl8>
        <upload></upload>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md8 xl8>
        <mybreadcrumbs></mybreadcrumbs>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md8 xl8>
<fileTable></fileTable>
      </v-flex>
    </v-layout>
  </v-container>


</template>

<script>
import fileTable from "./table";
import upload from "./upload";
import mybreadcrumbs from "./breadcrumbs";
export default {
  name: 'HelloWorld',
  components:{fileTable,upload,mybreadcrumbs},
  data () {
    return {
      msg: '유하'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
