import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pumpkins: [
      ["@ $6.00 is", "6", "0"],
      ["@ $8.00 is", "8", "0"],
      ["@ $10.00 is", "10", "0"],
      ["@ $12.00 is", "12", "0"],
      ["@ $14.00 is", "14", "0"],
      ["@ $16.00 is", "16", "0"],
      ["@ $18.00 is", "18", "0"],
      ["@ $20.00 is", "20", "0"],
      ["@ $24.00 is", "24", "0"],
      ["@ $30.00 is", "30", "0"]
    ],
    gourds: [
      ["large @ $1.00 is", "1", "0"],
      ["small @ $0.75 is ", "0.75", "0"],
      ["large winged @ $1.50 is", "1.5", "0"],
      ["small winded @ $1.00 is", "1", "0"],
      ["gizmo @ $3.00 is", "3", "0"]
    ],
    other: [
      ["$0.50 pumpkin face sticker is ", "0.5", "0"],
      ["$0.25 tealight candle is", "0.25", "0"],
      ["$0.50 spider kit is ", "0.5", "0"],
      ["small mum @ $5.00 is", "5", "0"],
      ["large mum @ $12.00 is", "12", "0"]
    ],
    invoice: new Map(),

    final_total: 0,

    donation: 0,

    bakesale: 0,

    paymenttype: "cash"
  },
  mutations: {},
  actions: {}
});
