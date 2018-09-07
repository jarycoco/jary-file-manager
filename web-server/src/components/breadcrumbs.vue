<template>
  <b-breadcrumb :items="items"/>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  async mounted() {
    this.update();
  },
  watch: {
    // 같은 route 이지만 params 가 달라질 경우 실행된다.
    $route(to, from) {
        console.log("이야이아오")
        console.log(this.$route.query)
      this.update();
    }
  },
  methods:{
      update(){
          let path = this.$route.query.path
          console.log(path)
          let items = [{
                  text:'Home',
                  href:'/#/'
              }]
          console.log(path)
          if(path){
          let arr = path.split('/')
          console.log(arr)
          let stack = ''
          for (const item of arr) {
              if(item=="") continue;
              stack += '/' + item
              let obj = {
                  text:item,
                  href:'#/?path='+stack
              }
              items.push(obj)
          }
          }
          this.items = items
      }
  }
}
</script>
