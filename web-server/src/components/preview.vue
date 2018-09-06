<template>
<div class="preview">
    <img :src="file" alt="" class="image">


    <video width="320" height="240" controls v-if="/mp4|m4a|mp3|MP4|AVI|avi|wmv|WMV/.test(item.extension)">
        <source :src="file" type="video/mp4">
    </video>

</div>
</template>


<script>
export default {
  data() {
    return {
      item: null,
      file:null
    };
  },
  mounted() {
    this.bus.$on(
      "preview",
      function(path, item) {
        let file = `${this.$store.state.server_ip}`;
        if (path != "") {
          file += path;
        }
        file += "/" + item.name;
        file = file.replace(/\\/g, "/");
        console.log(file);
        this.item = item;
        this.file = file;
      }.bind(this)
    );
  }
};
</script>

<style>
.preview {
  position: fixed;
  top: 30%;
  right: 20px;
  background-color: white;

}
.image{
      max-width: 300px;
}
</style>

