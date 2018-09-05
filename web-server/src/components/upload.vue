<template>
<div>
  <!-- Styled -->
<dragdrop></dragdrop>
  <snack :text="'업로드 성공'" :snackbar="snackbar"></snack>
  <!-- <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..."></b-form-file>
  <div class="mt-3">Selected file: {{file && file.name}}</div>

  <v-btn @click="upload">업로드</v-btn> -->
</div>
</template>

<script>
import snack from "./snack";
import fileTable from './table';
import dragdrop from "./dragdrop";
export default {
  data() {
    return {
      file: null,
      file2: null,
      snackbar:false,
    };
  },
  components:{
      snack,dragdrop
  },
  methods: {
    async upload() {
      let url;
      if (!this.$route.query.path) this.$route.query.path = "";
      url = "http://localhost:3000/upload";
      let formData = new FormData();
      formData.append('path', this.$route.query.path);
      formData.append('userfile', this.file);
      console.log(formData.getAll('path'))
      let info = await this.$http.post(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      ).then( response => { this.snackbar=true;this.bus.$emit('update') } ) // SUCCESS
    //   console.log(this.file);
    }
  },
  mounted(){
     this.bus.$on(
      "upload",
      async function(file) {
        let url;
        if (!this.$route.query.path) this.$route.query.path = "";
        url = "http://localhost:3000/upload";
        let formData = new FormData();
        formData.append('path', this.$route.query.path);
        formData.append('userfile', file);
        console.log(formData.getAll('path'))
        let info = await this.$http.post(
          url,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        ).then( response => { this.snackbar=true;this.bus.$emit('update') } ) // SUCCESS
      }.bind(this)
    );
  }
};
</script>