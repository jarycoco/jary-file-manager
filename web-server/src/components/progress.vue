<template>
  <v-layout row justify-center text-center>
    <v-dialog v-model="dialog" persistent max-width="400">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card>
        <v-card-title class="headline">Uploading...</v-card-title>
        <v-card-text>
 <v-progress-circular
      :rotate="180"
      :size="100"
      :width="15"
      :value="value"
      color="teal"
    >
      {{value}}%
    </v-progress-circular>

<div v-if="file">{{file.name}} </div>
    <!-- {{file.name}} -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
  export default {
    props:["value","dialog","file"],
    data () {
      return {

      }
    },
  }
</script>