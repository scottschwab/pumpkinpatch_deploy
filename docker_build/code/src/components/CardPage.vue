<template>
  <div class="card-expansion">
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Pumpkins</div>
      </md-card-header>
      <md-card-content>
        <Pumpkins />
      </md-card-content>
    </md-card>
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Gourds</div>
      </md-card-header>
      <md-card-content>
        <Gourds />
      </md-card-content>
    </md-card>
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Other</div>
      </md-card-header>
      <md-card-content>
        <Other />
      </md-card-content>
    </md-card>
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Total</div>
      </md-card-header>
      <md-card-content>
        <Total />
      </md-card-content>
    </md-card>

    <md-dialog :md-active.sync="loginDialog" class="logindialog">
      <md-dialog-title>Password</md-dialog-title>
      <md-input v-model="password" v-on:keyup.enter="checkLogin"></md-input>
      <div class="loginbutton">
        <md-button class="md-primary" @click="checkLogin">Login</md-button>
      </div>
    </md-dialog>
  </div>
</template>


<style lang="css" scoped>
.md-card {
  width: 480px;
  height: 360px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
}
</style>

<script>
import Pumpkins from "./Pumpkins.vue";
import Gourds from "./Gourds.vue";
import Other from "./Other.vue";
import Total from "./Total.vue";

const crypto = require("crypto");

export default {
  name: "CardPage",
  components: {
    Pumpkins,
    Gourds,
    Other,
    Total
  },
  methods: {
    checkLogin() {
      var orgPassword = this.password;
      var password1 = orgPassword.trim();
      var password2 = password1.toLowerCase();

      let md5sum = crypto.createHash("md5");
      md5sum.update(password2);
      let hash = md5sum.digest("hex");
      console.log("hash is " + hash);
      if (this.validLogin1 == hash || this.validLogin2 == hash) {
        this.loginDialog = false;
      }
    }
  },

  mounted: function() {
    this.$nextTick(function() {
      this.loginDialog = true;
    });
  },

  beforeMount: function() {
    for (let item of this.$store.state.pumpkins) {
      this.$store.state.invoice.set(item[3], {
        class: "pumpkin",
        count: item[2],
        total: 0.0
      });
    }
    for (let item of this.$store.state.gourds) {
      this.$store.state.invoice.set(item[3], {
        class: "gourd",
        count: item[2],
        total: 0.0
      });
    }
    for (let item of this.$store.state.other) {
      this.$store.state.invoice.set(item[3], {
        class: "other",
        count: item[2],
        total: 0.0
      });
    }
  },

  props: {},

  data: () => ({
    loginDialog: false,
    password: "",
    validLogin1: "46eca36d89819445ca6369a6c2465bcf",
    validLogin2: "35e1c35490a4d068d6c949c6243ccda7"
  })
};
</script>
