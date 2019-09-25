<template>
  <div class="tab">
    <md-content class="md-scrollbar">
      <md-list>
        <md-list-item v-for="item in this.$store.state.other" :key="item[0]">
          <row
            :label="item[0]"
            :cost="item[1]"
            :countof="item[2]"
            :itemTag="item[3]"
            v-on:rowchanged="onRowChange"
            :tabidx="item[4]"
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
  name: "Other",
  components: { row },
  methods: {
    onRowChange(values) {
      console.log("on row change");
      this.$store.state.invoice.set(values.itemTag, {
        class: "other",
        count: values.countof,
        total: values.total
      });
      EventBus.$emit("totalchanged");
    }
  }
};
</script>
