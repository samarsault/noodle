<template>
  <div class="error-container">
    <img src="./assets/bpgc.png" style="width:480px;marign: auto"/>
    <h2 align="center">Please Log In with your BITS Account</h2>
    <p style="text-align:left">The following email accounts are allowed - </p>
    <ul id="emails">
      <li>@goa.bits-pilani.ac.in</li>
      <li>@pilani.bits-pilani.ac.in</li>
      <li>@hyderabad.bits-pilani.ac.in</li>
      <li>@alumni.bits-pilani.ac.in</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
  text-align: center;
  padding: 5px 20px;
}
#emails{
  text-align: left;
  li {
    margin: 5px 0;
  }
}
</style>
