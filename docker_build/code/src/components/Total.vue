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
      <div class="otheroptions">
        <div>
          <md-button @click="uploadData">Upload Orders</md-button>
          <md-button @click="downloadDialog=true">Download Orders</md-button>
        </div>
      </div>
    </md-content>

    <md-dialog :md-active.sync="downloadDialog" class="downloaddialog">
      <div>
        <md-dialog-title>Download Orders</md-dialog-title>
      </div>
      <div>
        <md-datepicker id="fromDate" v-model="dateFrom">
          <label>Starting</label>
        </md-datepicker>
      </div>
      <div>
        <md-datepicker id="toDate" v-model="dateTo">
          <label>Through</label>
        </md-datepicker>
      </div>
      <div>
        <md-button @click="downloadingData">Get Link</md-button>
        <md-button @click="downloadDialog=false">Cancel</md-button>
      </div>
    </md-dialog>

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
                v-on:keydown.enter="donation_made"
                type="number"
                min="0"
                @input="donation_made"
              ></md-input>
            </div>
            <div class="bakesale">
              <label>Bake Sale&nbsp;$&nbsp;</label>
              <md-input
                v-model="$store.state.bake_sale"
                v-on:keydown.enter="bake_sale_made"
                type="number"
                min="0"
                @input="bake_sale_made"
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
                  <label>Name on the Credit Card</label>
                  <md-input v-model="name" :disabled="this.$store.state.paymenttype != 'credit'"></md-input>
                </md-field>
                <md-field>
                  <label>Phone for Credit Card</label>
                  <md-input v-model="phone" :disabled="this.$store.state.paymenttype != 'credit'"></md-input>
                </md-field>
              </md-content>
            </div>
            <div class="paybill">
              <md-button class="md-primary" @click="upload_record">Pay</md-button>
              <md-button @click="showDialog=false">Back</md-button>
            </div>
          </div>
        </div>
      </div>
    </md-dialog>

    <md-dialog-alert
      :md-active.sync="invalidDateRange"
      md-title="Date Error"
      md-content="Invalid date range"
      md-confirm-text="Okay"
    />

    <md-dialog-alert
      :md-active.sync="download_link_dialog"
      md-title="Follow the link"
      :md-content="download_link"
      md-confirm-text="Okay"
    />

    <md-dialog-confirm
      :md-active.sync="confirmReset"
      md-title="Cancel Order"
      md-content="Please confirm you wish to clear the existing order."
      md-confrim-text="Confirm"
      md-cancel-text="Back"
      @md-confirm="resetTable"
      @md-cancel="confirmReset=false"
    />

    <md-snackbar :md-duration="10000" :md-active.sync="showSnackbar">
      <span>Previous paid for order has been deleted</span>
      <md-button @click="showSnackbar=false">Close</md-button>
    </md-snackbar>

    <md-snackbar :md-duration="20000" :md-active.sync="orderSuccessSnackbar">
      <span>The order has been successfully recorded</span>
      <md-button @click="orderSuccessSnackbar=false">Close</md-button>
    </md-snackbar>

    <md-snackbar :md-duration="30000" :md-active.sync="orderFailureSnackbar">
      <span>There has been a problem and the order was not recorded, please use the paper form</span>
      <md-button @click="orderFailureSnackbar=false">Close</md-button>
    </md-snackbar>

    <md-snackbar :md-duration="30000" :md-active.sync="downloadFailure">
      <span>Download has failed, try again.</span>
      <md-button @click="orderFailureSnackbar=false">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { EventBus } from "../main.js";

const https = require("https");

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
        if (value["class"] == "pumpkin") {
          this.pumpkin_count = this.pumpkin_count + parseInt(value["count"]);
          this.pumpkin_total = this.pumpkin_total + parseFloat(value["total"]);
        } else if (value["class"] == "gourd") {
          this.gourd_count = this.gourd_count + parseInt(value["count"]);
          this.gourd_total = this.gourd_total + parseFloat(value["total"]);
        } else if (value["class"] == "other") {
          this.other_count = this.other_count + parseInt(value["count"]);
          this.other_total = this.other_total + parseFloat(value["total"]);
        }
      }
      this.grand_count =
        this.pumpkin_count + this.gourd_count + this.other_count;
      this.grand_total =
        this.pumpkin_total +
        this.gourd_total +
        this.other_total +
        parseFloat(this.$store.state.donation) +
        parseFloat(this.$store.state.bake_sale);
      this.$store.state.final_total = this.grand_total;

      console.log("leaving update");
    },
    resetTable: function() {
      this.confirmReset = false;
      this.$store.state.donation = 0;
      this.$store.state.bake_sale = 0;
      EventBus.$emit("rowreset");
    },
    donation_made: function() {
      console.log("donation made");
      console.log(this.$store.state.donation);
      this.update();
      // this.$store.state.final_total =
      //   this.grand_total + parseFloat(this.$store.state.donation);
    },

    bake_sale_made: function() {
      console.log("bake sale made");
      console.log(this.$store.state.bake_sale);
      this.update();
      // this.$store.state.final_total =
      //   this.grand_total + parseFloat(this.$store.state.bake_sale);
    },

    upload_record: function() {
      let r = {};
      this.$store.state.invoice.forEach(function(value, key, map) {
        let amount_label = key + "_total";
        let count_label = key + "_count";
        r[count_label] = value.count;
        r[amount_label] = value.total;
      });

      let d = new Date();
      if (this.$store.state.paymenttype === "cash") {
        r["cash_payment"] = this.grand_total;
        r["check_payment"] = 0;
        r["credit_payment"] = 0;
      } else if (this.$store.state.paymenttype === "check") {
        r["cash_payment"] = 0;
        r["check_payment"] = this.grand_total;
        r["credit_payment"] = 0;
      } else {
        r["cash_payment"] = 0;
        r["check_payment"] = 0;
        r["credit_payment"] = this.grand_total;
      }
      r["pumpkinusa_total"] =
        this.pumpkin_total + this.gourd_total + this.$store.state.sticker_total;
      r["total_pumpkin_count"] = this.pumpkin_count;
      r["total_pumpkin_total"] = this.pumpkin_total;
      r["total_gourd_count"] = this.gourd_count;
      r["total_gourd_total"] = this.gourd_total;
      r["total_other_count"] = this.other_count;
      r["total_other_total"] = this.other_total;
      r["grand_count"] = this.grand_count;
      r["bake_sale"] = this.$store.state.bake_sale;
      r["grand_total"] = this.grand_total;
      r["donation"] = this.$store.state.donation;
      r["timestamp"] = Date.now();
      r["deleted"] = "F";
      r["time"] = d.toLocaleTimeString();
      r["date"] = d.toDateString();
      r["phone"] = this.phone;
      r["name"] = this.name;
      r["payment_type"] = this.$store.state.paymenttype;
      r["pumpkinusa_total"] =
        r["total_pumpkin_total"] + r["total_gourd_total"] + r["sticker_total"];
      console.log(r);

      let upload_body = JSON.stringify(r);

      localStorage.setItem(Date.now().toString(), upload_body);

      this.resetTable();
      this.$store.state.donation = 0;
      this.$store.state.bake_sale = 0;
      this.phone = "";
      this.name = "";
      this.showDialog = false;
    },
    downloadingData: function() {
      this.dateTo = this.dateTo + 23 * 59 * 60 * 1000; // almost end of day
      console.log("from date ");
      console.log(this.dateFrom);
      console.log("todate");
      console.log(this.dateTo);

      if (this.dateFrom > this.dateTo) {
        this.invalidDateRange = true;
      } else {
        this.download_link =
          '<a href="' +
          "https://" +
          this.$store.state.host +
          this.$store.state.download +
          this.$store.state.downloadCode +
          "&start=" +
          this.dateFrom.toString() +
          "&end=" +
          this.dateTo.toString() +
          '">Download File</a>';

        this.downloaddialog = false;
        this.download_link_dialog = true;
      }
    },

    uploadRecord: function(rec) {
      let rc = true;
      var options = {
        host: this.$store.state.host,
        method: "POST",
        port: 443,
        path: this.$store.state.purchase + this.$store.state.purchaseCode,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(rec)
        }
      };

      const req = https.request(options, res => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding("utf8");
        res.on("data", chunk => {
          console.log(`BODY: ${chunk}`);
        });
        res.on("end", () => {
          console.log("No more data in response.");
        });
      });

      req.on("error", e => {
        console.error(`problem with request: ${e.message}`);
        rc = false;
        this.orderFailureSnackbar = true;
      });

      // Write data to request body
      req.write(rec);
      req.end();
      return rc;
    },

    uploadData: function() {
      let removeItemList = [];
      console.log(localStorage.length);
      for (let x = 0; x < localStorage.length; x++) {
        let k = localStorage.key(x);
        console.log(localStorage.getItem(k));
        if (this.uploadRecord(localStorage.getItem(k))) {
          removeItemList.push(k);
        }
      }
      for (let y = 0; y < removeItemList.length; y++) {
        localStorage.removeItem(removeItemList[y]);
      }
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

    phone: "",
    name: "",

    dateFrom: Date.now(),
    dateTo: Date.now(),

    invalidDateRange: false,
    downloadDialog: false,
    showDialog: false,
    confirmReset: false,

    showSnackbar: false,
    orderSuccessSnackbar: false,
    orderFailureSnackbar: false,
    downloadFailure: false,

    download_link: "",
    download_link_dialog: false
  })
};
</script>
