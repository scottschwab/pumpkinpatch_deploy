<template>
  <div>
    <tr>
      <td>
        <vue-numeric-input v-model="countout" :min="0" :step="1" @input="computetotal"></vue-numeric-input>
      </td>
      <td>
        <span class="filler">{{ prefix }}</span>
      </td>
      <td>
        <span class="countid, labelcount">{{ label }}</span>
      </td>
      <td>
        <span class="rowtotal, dollar">&nbsp;$ {{ total.toFixed(2) }}</span>
      </td>
    </tr>
  </div>
</template>

<script>
import { EventBus } from "../main.js";

export default {
  name: "row",
  props: {
    countof: { type: String, default: "0" },
    cost: { type: String, default: "0" },
    label: { type: String, default: "n/a" },
    prefix: { type: String, default: " " }
  },
  methods: {
    computetotal: function() {
      this.total = parseFloat(this.$props.cost) * parseInt(this.countout);
      this.$emit("rowchanged", {
        label: this.$props.label,
        countof: this.countout,
        total: this.total
      });
    },
    resetvalue: function() {
      this.countout = 0;
    }
  },
  mounted() {
    var self = this;
    EventBus.$on("rowreset", function() {
      self.resetvalue();
      self.computetotal();
    });
  },
  data() {
    let countout = 0;
    let total = 0;

    return {
      labelout: this.$props.label,
      countout: countout,
      total: total
    };
  }
};
</script>

<style>
</style>