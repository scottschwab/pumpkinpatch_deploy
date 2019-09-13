<template>
  <div class="tab">
    <md-content>
      <div class="sumtotal">
        <span>Pumpkins: {{ pumpkin_count }} items for $ {{ pumpkin_total.toFixed(2) }}</span>
      </div>
      <div class="sumtotal">
        <span>Gourds: {{ gourd_count }} items for $ {{ gourd_total.toFixed(2) }}</span>
      </div>
      <div class="sumtotal">
        <span>Others: {{ other_count }} items for $ {{ other_total.toFixed(2) }}</span>
      </div>
      <div class="grandtotal">
        <span>Grand total: {{ grand_count }} items for $ {{ grand_total.toFixed(2) }}</span>
      </div>
      <div>
        <md-button class="md-primary" @click="showDialog=true">Pay</md-button>
        <md-button @click="confirmReset=true">Clear</md-button>
      </div>
    </md-content>

    <md-dialog :md-active.sync="showDialog" class="paydialog">
      <div class="paywrap">
        <div class="payinside">
          <md-dialog-title>Payment</md-dialog-title>
          <div>
            <p class="sumtotal">Total amount: $ {{ grand_total.toFixed(2) }}</p>
            <div class="donation">
              <label>Donation&nbsp;$&nbsp;</label>
              <md-input
                v-model="$store.state.donation"
                type="number"
                min="0"
                @input="donation_made"
              ></md-input>
            </div>
            <div class="bakesale">
              <label>Bake Sale&nbsp;$&nbsp;</label>
              <md-input
                v-model="$store.state.bakesale"
                type="number"
                min="0"
                @input="donation_made"
              ></md-input>
            </div>
            <div class="amountdue">
              <span>Amount Due: $ {{ this.$store.state.final_total.toFixed(2) }}</span>
            </div>
            <div>
              <md-radio v-model="$store.state.paymenttype" value="cash">Cash</md-radio>
              <md-radio v-model="$store.state.paymenttype" value="check">Check</md-radio>
              <md-radio v-model="$store.state.paymenttype" value="credit">Credit</md-radio>
            </div>
            <div>
              <md-content>
                <md-field>
                  <label>Name for Credit Card</label>
                  <md-input v-model="name" :disabled="this.$store.state.paymenttype != 'credit'"></md-input>
                </md-field>
                <md-field>
                  <label>Phone for Credit Card</label>
                  <md-input v-model="phone" :disabled="this.$store.state.paymenttype != 'credit'"></md-input>
                </md-field>
              </md-content>
            </div>
            <div class="paybill">
              <md-button class="md-primary" @click="showDialog=false">Pay</md-button>
              <md-button @click="showDialog=false">Back</md-button>
            </div>
          </div>
        </div>
      </div>
    </md-dialog>

    <md-dialog-confirm
      :md-active.sync="confirmReset"
      md-title="Cancel Order"
      md-content="Please confirm you wish to clear the existing order."
      md-confrim-text="Confirm"
      md-cancel-text="Back"
      @md-confirm="resetTable"
      @md-cancel="confirmReset=false"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { EventBus } from "../main.js";

export default {
  name: "Total",
  components: {},
  methods: {
    compute_totals: function(cont) {
      cont.update();
    },
    update: function() {
      console.log("in update");
      this.pumpkin_count = 0;
      this.pumpkin_total = 0;
      this.gourd_count = 0;
      this.gourd_total = 0;
      this.other_count = 0;
      this.other_total = 0;
      this.grand_count = 0;
      this.grand_total = 0;
      let b = new Map(this.$store.state.invoice);
      for (let [key, value] of b.entries()) {
        console.log(key);
        if (value["class"] == "pumpkin") {
          this.pumpkin_count = this.pumpkin_count + parseInt(value["countof"]);
          this.pumpkin_total = this.pumpkin_total + parseFloat(value["total"]);
        } else if (value["class"] == "gourd") {
          this.gourd_count = this.gourd_count + parseInt(value["countof"]);
          this.gourd_total = this.gourd_total + parseFloat(value["total"]);
        } else if (value["class"] == "other") {
          this.other_count = this.other_count + parseInt(value["countof"]);
          this.other_total = this.other_total + parseFloat(value["total"]);
        }
      }
      this.grand_count =
        this.pumpkin_count + this.gourd_count + this.other_count;
      this.grand_total =
        this.pumpkin_total + this.gourd_total + this.other_total;
      this.$store.state.final_total = this.grand_total;
      console.log(this.pumpkin_count);
    },
    resetTable: function() {
      this.confirmReset = false;
      EventBus.$emit("rowreset");
    },
    donation_made: function() {
      console.log("donation made");
      console.log(this.$store.state.donation);
      this.$store.state.final_total =
        this.grand_total +
        parseFloat(this.$store.state.donation) +
        parseFloat(this.$store.state.bakesale);
    }
  },
  mounted() {
    var self = this;
    EventBus.$on("totalchanged", function() {
      self.compute_totals(self);
    });
  },

  data: () => ({
    pumpkin_count: 0,
    pumpkin_total: 0,
    gourd_count: 0,
    gourd_total: 0,
    other_count: 0,
    other_total: 0,
    grand_count: 0,
    grand_total: 0,

    showDialog: false,
    confirmReset: false
  })
};
</script>
