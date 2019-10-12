import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pumpkins: [
      ["@ $0.75 mini is ", "0.75", "0", "mini", "10"],
      ["@ $1.00 weebes is ", "1.00", "0", "weebes", "11"],
      ["@ $2.00 spookies is ", "2", "0", "spookies", "12"],
      ["@ $2.00 snowflake is ", "2", "0", "snowflake", "13"],
      ["@ $4.00 snowball is ", "4", "0", "snowball", "14"],
      ["@ $4.00 is", "4", "0", "pumpkin_4", "15"],
      ["@ $6.00 is", "6", "0", "pumpkin_6", "16"],
      ["@ $8.00 is", "8", "0", "pumpkin_8", "17"],
      ["@ $10.00 is", "10", "0", "pumpkin_10", "18"],
      ["@ $12.00 is", "12", "0", "pumpkin_12", "19"],
      ["@ $14.00 is", "14", "0", "pumpkin_14", "20"],
      ["@ $16.00 is", "16", "0", "pumpkin_16", "21"],
      ["@ $18.00 is", "18", "0", "pumpkin_18", "22"],
      ["@ $20.00 is", "20", "0", "pumpkin_20", "23"],
      ["@ $25.00 is", "25", "0", "pumpkin_25", "24"],
      ["@ $30.00 is", "30", "0", "pumpkin_30", "25"],
      ["@ $35.00 is", "35", "0", "pumpkin_35", "26"]
    ],
    gourds: [
      ["small elf house @ $1.50 is", "1.5", "0", "small_elf_house", "30"],
      ["large elf house @ $3.00 is", "3", "0", "large_elf_house", "31"],
      ["large @ $1.00 is", "1", "0", "gourd_large", "33"],
      ["small @ $0.75 is ", "0.75", "0", "gourd_small", "34"],
      ["large winged @ $1.50 is", "1.5", "0", "winged_large", "35"],
      ["small winged @ $1.00 is", "1", "0", "winged_small", "36"],
      ["gizmo @ $4.00 is", "4", "0", "gizmo", "37"],
      ["swan @ $8.00 is", "8", "0", "swan", "38"]
    ],
    other: [
      ["$0.50 pumpkin face sticker is ", "0.5", "0", "sticker", "50"],
      ["$0.25 tealight candle is", "0.25", "0", "candle", "51"],
      ["small mum @ $7.00 is", "7", "0", "small_mum", "53"],
      ["large mum @ $14.00 is", "14", "0", "large_mum", "54"]
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
