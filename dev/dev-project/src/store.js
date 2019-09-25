import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pumpkins: [
      ["@ $1.00 mimi is ", "1", "0", "mini", "10"],
      ["@ $5.00 snowball is ", "5", "0", "snowball", "11"],
      ["@ $6.00 is", "6", "0", "pumpkin_6", "12"],
      ["@ $8.00 is", "8", "0", "pumpkin_8", "13"],
      ["@ $10.00 is", "10", "0", "pumpkin_10", "14"],
      ["@ $12.00 is", "12", "0", "pumpkin_12", "15"],
      ["@ $14.00 is", "14", "0", "pumpkin_14", "16"],
      ["@ $16.00 is", "16", "0", "pumpkin_16", "17"],
      ["@ $18.00 is", "18", "0", "pumpkin_18", "18"],
      ["@ $20.00 is", "20", "0", "pumpkin_20", "19"],
      ["@ $24.00 is", "24", "0", "pumpkin_24", "20"],
      ["@ $30.00 is", "30", "0", "pumpkin_30", "21"]
    ],
    gourds: [
      ["large @ $1.00 is", "1", "0", "gourd_large", "30"],
      ["small @ $0.75 is ", "0.75", "0", "gourd_small", "31"],
      ["large winged @ $1.50 is", "1.5", "0", "winged_large", "32"],
      ["small winged @ $1.00 is", "1", "0", "winged_small", "33"],
      ["gizmo @ $3.00 is", "3", "0", "gizmo", "34"]
    ],
    other: [
      ["$0.50 pumpkin face sticker is ", "0.5", "0", "sticker", "50"],
      ["$0.25 tealight candle is", "0.25", "0", "candle", "51"],
      ["$0.50 spider kit is ", "0.5", "0", "spider", "52"],
      ["small mum @ $5.00 is", "5", "0", "small_mum", "53"],
      ["large mum @ $12.00 is", "12", "0", "large_mum", "54"]
    ],
    invoice: new Map(),

    final_total: 0,

    donation: 0,

    bake_sale: 0,

    paymenttype: "cash",

    host: "pumpkinpatchjan22.azurewebsites.net",
    purchase: "/api/storepurchase",
    purchaseCode:
      "?code=ycWIkBB3L3ravHAfkLoaoBONWXef4bakeqpB1bGOLI02KBqGPYtnKA==",

    download: "/api/downloadpurchase",
    downloadCode:
      "?code=jjGU9ZVa7vTW/5P9XvKFDfkXXhxI7/3eBJJJP6h7Ez1YLgWlRIlS8g=="
  },
  mutations: {},
  actions: {}
});
