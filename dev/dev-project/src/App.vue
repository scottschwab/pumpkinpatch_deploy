<template>
  <div id="app">
    <div id="nav">
      <!--router-link to="/">Order Entry</router-link-->
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.paybill {
  align-items: right;
}

.sumtotal {
  font-size: 14pt;
  margin-bottom: 18px;
}
.donation {
  font-size: 14pt;
  margin-bottom: 10px;
}
.bakesale {
  font-size: 14pt;
  margin-bottom: 10px;
}
.grandtotal {
  font-size: 18pt;
  font-weight: bold;
  color: darkblue;
}

.amountdue {
  font-size: 18pt;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 5px;
  color: darkred;
}

.paywrap {
  align-content: center;
}
.payinside {
  margin: 35px;
  display: inline-block;
}
.paydialog {
  width: 350px;
  height: 550px;
}

.numinput {
  width: 40px;
}

.hidden {
  visibility: hidden;
}
</style>
