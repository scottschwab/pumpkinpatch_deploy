import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pumpkins: [
      ["@ $6.00 is", "6", "0", "pumpkin_6"],
      ["@ $8.00 is", "8", "0", "pumpkin_8"],
      ["@ $10.00 is", "10", "0", "pumpkin_10"],
      ["@ $12.00 is", "12", "0", "pumpkin_12"],
      ["@ $14.00 is", "14", "0", "pumpkin_14"],
      ["@ $16.00 is", "16", "0", "pumpkin_16"],
      ["@ $18.00 is", "18", "0", "pumpkin_18"],
      ["@ $20.00 is", "20", "0", "pumpkin_20"],
      ["@ $24.00 is", "24", "0", "pumpkin_24"],
      ["@ $30.00 is", "30", "0", "pumpkin_30"]
    ],
    gourds: [
      ["large @ $1.00 is", "1", "0", "gourd_large"],
      ["small @ $0.75 is ", "0.75", "0", "gourd_small"],
      ["large winged @ $1.50 is", "1.5", "0", "winged_large"],
      ["small winged @ $1.00 is", "1", "0", "winged_small"],
      ["gizmo @ $3.00 is", "3", "0", "gizmo"]
    ],
    other: [
      ["$0.50 pumpkin face sticker is ", "0.5", "0", "sticker"],
      ["$0.25 tealight candle is", "0.25", "0", "candle"],
      ["$0.50 spider kit is ", "0.5", "0", "spider"],
      ["small mum @ $5.00 is", "5", "0", "small_mum"],
      ["large mum @ $12.00 is", "12", "0", "large_mum"]
    ],
    invoice: new Map(),

    final_total: 0,

    donation: 0,

    bakesale: 0,

    paymenttype: "cash",

    uploadurl:
      "https://pumpkinpatchazure3.azurewebsites.net/api/storepurchase?code=zkVphItVtUHdjU54JQIRa24klaSzLKl6Ol3BHIRuka8PmS4WWQ7kwA==",
    downloadurl:
      "https://pumpkinpatchazure3.azurewebsites.net/api/downloadpurchase?code=Di7Tr1tFaabAKaEasBeR9kueV8Yujlge8MnyBKI6DEgRUqu//OcR6g=="
  },
  mutations: {},
  actions: {}
});
