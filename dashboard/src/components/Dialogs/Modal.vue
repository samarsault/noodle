<template>
<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<p>{{ title }}</p>
						<a href="#" @click="$emit('close')">
							<CloseIcon :size="24" />
						</a>
					</div>

					<div class="modal-body">
						<slot></slot>
					</div>

					<div class="modal-footer">
							<slot name="footer">
									<button type="button" class="secondary" @click="$emit('ok')">OK</button>
							</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close';

export default {
		name: "Modal",
		props: {
			title: String
		},
		components: {
			CloseIcon
		}
}
</script>

<style lang="scss">
@import '../../../../styles/include/vars';
// Modal
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
	color: $black;
}

.modal-container {
	width: 400px;
	margin: 0px auto;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	overflow: hidden;
}

.modal-header,
.modal-footer {
	background-color:$gray;
	padding: 15px 20px;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	p {
		margin: 0;
		text-transform: capitalize;
	}
	svg {
		fill: #555;
		transition: fill 0.3s;
		&:hover {
			cursor: pointer;
			fill: #111;
		}
	}
}
.modal-body {
	margin: 20px 0;
	padding: 0 20px;
}

//
// Modal Transition
//
.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
