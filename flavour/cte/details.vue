<template>
	<main>
		<aside class="flex-centre">
			<h1>Welcome</h1>
			<p>Please complete the following info to complete your sign up. It is required that you input the correct information for hassle-free registration.</p>
		</aside>
		<section>
			<form method="POST" @submit.prevent="updateInfo">
				<label for="bits_id">BITS ID</label>
				<input name="bits_id" v-model="bits_id" type="text" placeholder="Your 13 digit BITS ID. For example, 2018A8PS0414G" pattern='\d{4}[ABH](A|[0-9])(PS|([ABH]|[0-9])(A|[0-9]))\d{4}G' required>
				<label for="phone">Phone</label>
				<input name="phone" v-model="phone" type="number" placeholder="10 Digit Phone" pattern="\\d{10}" minlength="10" required>
				<button class="primary icon-button"><span class="icon-right">Let's Go</span><Go :size="28"/></button>
			</form>
		</section>
	</main>
</template>

<script>
import axios from "axios";
import { mutations, getters } from "@/utils/store";
 
import Go from 'vue-material-design-icons/AccountArrowRight';

export default {
	components: {
		Go
  },
  data() { 
    return {
      bits_id: null,
      phone: null
    }
  },
  methods: {
    async updateInfo() {
      const user = getters.user();
      const { status } = await axios.post("/api/user/update", {
        bits_id : this.bits_id,
        phone: this.phone
      });

      mutations.setUser({
        ...user,
        bits_id: this.bits_id,
        phone: this.phone
      });

      if (status === 200) {
        this.$router.go(-1);
      } else {
        alert("Error updating details");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
	max-width: 540px;
	padding: 20px;
	margin: auto;
	margin-top: 60px;
	@media screen and (max-width: 640px) {
		margin-top:20px;
		padding: 40px 20px;
	}
	input {
		width: 100%;
	}
}
main {
	display: flex;
	@media screen and (max-width: 640px) {
		flex-direction: column;
	}
}
section {
	max-width: 600px;
	flex-basis: 40%;
	@media screen and (min-width: 640px) and (max-width: 880px){
		flex-basis: 50%;
	}
}
@media screen and (max-width: 640px) {
	section, aside {
		flex-basis: 100%;
	}
}
aside {
	flex-basis: 60%;
	@media screen and (min-width: 640px) and (max-width: 880px) {
		flex-basis: 50%
	}

	@media screen  and (max-width: 640px) {
		min-height: 480px;
	}
	background-image: url('/images/welcome.svg');
	background-size: cover;
	display: flex;
	flex-direction: column;
	background-repeat: no-repeat;
	min-height: 600px;
	h1 {
		margin: 0;
		padding-top: 10px;
	}
	p {
		max-width: 400px;
		text-align: center;
		margin-bottom: 80px;
	}
}
.flex-centre {
	display: flex;
	justify-content: center;
	align-items: center;
}
button {
	margin-top: 20px;
}
</style>
