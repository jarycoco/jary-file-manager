<template >
  <b-table :fields="fields" :items="items" class="text-sm" fixed>
        <template slot="type" slot-scope="data">
<v-icon >{{data.value}} </v-icon>
    </template>

    <template slot="name" slot-scope="data">
      <a :href="`#/?path=`+$route.query.path+'\\'+data.value" v-if="data.item.dir" >
        {{data.value}} 
      </a>
      <span :href="`#/?path=`+$route.query.path+'\\'+data.value" v-else >
        {{data.value}} 
      </span>
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
          class:"w15",
          label: "생성일자"
        }
      ]
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
      this.update();
    }
  },
  methods: {
    async update() {
      let url;
      if (!this.$route.query.path) this.$route.query.path = "";
      url = "http://jary.kro.kr:3000/info?path=" + this.$route.query.path;

      let info = await this.$http.get(url);
      this.items = info.data;
      for (var item of this.items) {
        if (item.dir) item.type = "fas fa-folder-open";
        else item.type = "fas fa-file";
        item.birthTime = new Date(item.birthTime).toLocaleString();
      }

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

      console.log(this.items);

      console.log(info.data);
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
.w40{
  width:40%;
}
</style>


<!-- table-basic-1.vue -->