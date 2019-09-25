<template>
  <div class="tab">
    <md-content class="md-scrollbar">
      <md-list>
        <md-list-item v-for="item in this.$store.state.pumpkins" :key="item[0]">
          <row
            :label="item[0]"
            :cost="item[1]"
            :countof="item[2]"
            :itemTag="item[3]"
            v-on:rowchanged="onRowChange"
          />
        </md-list-item>
      </md-list>
    </md-content>
  </div>
</template>

<script>
// @ is an alias to /src
import row from "./Row.vue";
import { EventBus } from "../main.js";
export default {
  name: "Pumpkins",
  components: {
    row
  },
  methods: {
    onRowChange(values) {
      console.log("on row change");
      console.log(values);
      this.$store.state.invoice.set(values.itemTag, {
        class: "pumpkin",
        count: values.countof,
        total: values.total
      });
      EventBus.$emit("totalchanged");
    }
  }
};
</script>
