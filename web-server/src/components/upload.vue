<template>
<div>
  <!-- Styled -->
<dragdrop></dragdrop>
  <snack :text="'업로드 성공'" :snackbar="snackbar"></snack>
  <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..."></b-form-file>
  <div class="mt-3">Selected file: {{file && file.name}}</div>

  <myProgress :value="upload_value" :dialog="dialog" :file="file"></myProgress>
  <v-btn @click="upload">업로드</v-btn>
</div>
</template>

<script>
import snack from "./snack";
import fileTable from './table';
import dragdrop from "./dragdrop";
import myProgress from "./progress";
export default {
  data() {
    return {
      file: null,
      file2: null,
      upload_value:0,
      dialog:false,
      snackbar:false,
    };
  },
  components:{
      snack,dragdrop,myProgress
  },
  methods: {
    async upload() {
      let self = this
      let url;
      if (!this.$route.query.path) this.$route.query.path = "";
      url = `${this.$store.state.server_ip}/upload`;
      let formData = new FormData();
      formData.append('path', this.$route.query.path);
      formData.append('userfile', this.file);
      console.log(formData.getAll('path'))

        var config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              self.upload_value = percentCompleted
              console.log(percentCompleted, progressEvent.loaded, progressEvent.total)
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout:10000000
          };
      this.dialog = true
        let info = await this.$http.post(
          url,
          formData,
          config
        ).then( response => { 
          this.snackbar=true;
          setTimeout(function(){self.snackbar=false;self.dialog = false;self.upload_value=0},5000)
        this.bus.$emit('update')
         } ) // SUCCESS
    //   console.log(this.file);
    }
  },
  mounted(){
     this.bus.$on(
      "upload",
      async function(file) {
        this.file = file
        this.upload()
        // let url;
        // if (!this.$route.query.path) this.$route.query.path = "";
        // url = "http://localhost:3000/upload";
        // let formData = new FormData();
        // formData.append('path', this.$route.query.path);
        // formData.append('userfile', file);
        // console.log(formData.getAll('path'))

        // var config = {
        //     onUploadProgress: function(progressEvent) {
        //       var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        //       console.log(percentCompleted, progressEvent.loaded, progressEvent.total)
        //     },
        //     headers: {
        //       "Content-Type": "multipart/form-data"
        //     },
        //     timeout:10000000
        //   };

        // let info = await this.$http.post(
        //   url,
        //   formData,
        //   config
        // ).then( response => { this.snackbar=true;this.bus.$emit('update') } ) // SUCCESS
      }.bind(this)
    );
  }
};
</script>