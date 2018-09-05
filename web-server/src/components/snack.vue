<template>
  <v-card>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
props:['text','snackbar'],
  data() {
    return {
      y: "top",
      x: null,
      mode: "",
      timeout: 3000,
    //   text: "Hello, I'm a snackbar"
    };
  }
};
</script>