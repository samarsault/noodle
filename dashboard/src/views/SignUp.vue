<template>
	<main>
		<aside class="flex-centre">
			<h1>Welcome</h1>
			<p>Please complete the following info to complete your sign up. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iure similique dolorem voluptatum unde</p>
		</aside>
		<section>
			<form method="POST" action="/auth/update">
				<label for="bits_id">BITS ID</label>
				<input name="bits_id" type="text" placeholder="Your 13 digit BITS ID. For example, 2018A8PS0414G" pattern='\d{4}[ABH](A|[0-9])(PS|([ABH]|[0-9])(A|[0-9]))\d{4}G' required>
				<label for="phone">Phone</label>
				<input name="phone" type="number" placeholder="10 Digit Phone" pattern="\\d{10}" required>
				<button class="primary icon-button"><span class="icon-right">Let's Go</span><Go :size="28"/></button>
			</form>	
		</section>
	</main>
</template>

<script>
import Go from 'vue-material-design-icons/AccountArrowRight';
export default {
	components: {
		Go
	}
}
</script>

<style lang="scss" scoped>
form {
	max-width: 540px;
	padding: 20px;
	margin: auto;
	margin-top: 60px;
	input {
		width: 100%;
	}
}
main {
	display: flex;
}
section {
	max-width: 600px;
	flex-basis: 40%;
}
aside {
	flex-basis: 60%;
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
