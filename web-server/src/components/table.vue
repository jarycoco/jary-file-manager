<template >
  <b-table hover  :fields="fields" :items="items" class="text-sm"  @row-clicked="clicked" @row-hovered="hovered" small>
        <template slot="type" slot-scope="data">
<v-icon >{{data.value}} </v-icon>
    </template>

    <template slot="name" slot-scope="data">
      <a :href="`#/?path=`+$route.query.path+'/'+data.value" v-if="data.item.dir" >
        {{data.value}} 
      </a>
      <a :href="`${$store.state.server_ip}/download?path=`+$route.query.path+'/'+data.value" v-else >
        {{data.value}} 
      </a>
    </template>
  </b-table>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "type",
          class: "text-center w15",
          label:"타입"
        },
        {
          // A column that needs custom formatting,
          // calling formatter 'fullName' in this app
          key: "name",
          class:"w40",
          label:"이름"
          // tdAttr:'style=width:90%'
        },
        {
          // A regular column with custom formatter
          key: "size",
          class:"w15",
          label:"크기"
        },
        {
          // A virtual column with custom formatter
          key: "birthTime",
          class:"w30",
          label: "생성일자"
        }
      ],
      bfr:null
    };
  },
  async mounted() {

    this.bus.$on('update', function (message) {
      this.update();
    }.bind(this));


    this.update();
  },
  watch: {
    // 같은 route 이지만 params 가 달라질 경우 실행된다.
    $route(to, from) {
      if(this.bfr) this.bfr.className = ''
      this.update();
    }
  },
  methods: {
    async update() {
      let url;
      if (!this.$route.query.path) this.$route.query.path = "";
      console.log(this.$store.state.server_ip)
      url = `${this.$store.state.server_ip}/info?path=` + this.$route.query.path;

      let info = await this.$http.get(url);
      this.items = info.data;

      this.items.sort(function(a, b) {
        if (a.size < b.size) {
          return -1;
        }
        if (a.size > b.size) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });

      for (var item of this.items) {
        if (item.dir) item.type = "fas fa-folder-open";
        else item.type = "fas fa-file";
        item.birthTime = new Date(item.birthTime).toLocaleString();
        item.size = this.size(item.size)
      }


      console.log(this.items);

      console.log(info.data);
    },
    clicked(item,index,event){
      if(this.bfr) this.bfr.className = ''
      event.path[1].className = 'select'
      this.bfr = event.path[1]
      this.bus.$emit('preview',this.$route.query.path,item)
    },
    hovered(item,index,event){
      this.bus.$emit('preview',this.$route.query.path,item)
    },
    size(sz){
      const KB = 1000
      const MB = KB * 1000
      const GB = MB * 1000
      if(sz > GB){
        sz = (sz/GB).toFixed(2)+'GB'
      }
      else if(sz > MB){
        sz = (sz/MB).toFixed(2)+'MB'
      }
      else if(sz > KB){
        sz = (sz/KB).toFixed(2)+'KB'
      }
      else{
        sz = sz + 'B'
      }
      return sz
    }
  }
};
</script>

<style>
a {
  color: rgb(5, 108, 177);
}
.w15{
  width:15%;
}
.w30{
  width:30%;
}
.w40{
  width:40%;
}
.select{
  background-color:rgb(221, 221, 221)
}
</style>


<!-- table-basic-1.vue -->