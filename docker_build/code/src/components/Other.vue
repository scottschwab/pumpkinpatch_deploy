<template>
  <div class="tab">
    <md-content class="md-scrollbar">
      <md-list>
        <md-list-item v-for="item in this.$store.state.other" :key="item[0]">
          <row :label="item[0]" :cost="item[1]" :countof="item[2]" v-on:rowchanged="onRowChange" />
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
  name: "Other",
  components: { row },
  methods: {
    onRowChange(values) {
      console.log("on row change");
      let name = "other_" + values["label"];
      values["class"] = "other";
      this.$store.state.invoice.set(name, values);
      EventBus.$emit("totalchanged");
    }
  }
};
</script>
