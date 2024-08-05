<template>
  <footer>
    <div class="container">
      <div id="copy">&copy; CTE BPGC 2024</div>
      <div id="social-icons">
        <a href="https://www.facebook.com/ctebpgc/"><FB :size="32"/></a>
        <a href="https://instagram.com/ctebpgc"><Insta :size="32"/></a>
        <a href="https://www.linkedin.com/company/center-for-technical-education-bits-goa"><LinkedIn :size="32"/></a>
      </div>
    </div>
  </footer>
</template>

<script>
import FB from "vue-material-design-icons/FacebookBox";
import Insta from "vue-material-design-icons/Instagram";
import LinkedIn from "vue-material-design-icons/LinkedinBox";
export default {
  components: { FB, Insta, LinkedIn }
}
</script>

<style lang="scss">
footer {
  background-color: darken($gray, 2%);
  padding: 20px 0;
  a {
    color:inherit;
    &:hover {
      color: #111;
    }
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #social-icons >  a{
    padding: 4px;
  }
}
</style>
