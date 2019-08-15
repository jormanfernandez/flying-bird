<template>
	<div :class="['bird', {fade: isDead, jumping: isJumping, falling: !isJumping && fallingInterval}]" :style="position">
	</div>
</template>

<style scoped>
	.bird {
		background-image: url("/assets/img/bird.png");
		background-repeat: no-repeat;
		background-size: contain;
		width: 14vh;
		height: 10vh;
		position: absolute;
		margin-left: 15%;
		transition: top ease 0.1s, width ease 0.2s, height ease 0.2s, opacity ease 0.4s, transform ease 0.1s;
	}

	.fade {
		width: 0%;
		height: 0%;
		opacity: 0;
	}

	.jumping {
		transform: rotate(-45deg);
	}

	.falling {
		transform: rotate(45deg);
	}
</style>

<script type="text/javascript">
	export default {
		name: "Bird",
		data () {
			return {
				top: 30,
				jumpStrength: 20,
				limit: {
					top: 5,
					bottom: 75
				},
				isDead: false,
				isJumping: false,
				fallingInterval: null
			}
		},
		methods: {
			jump () {
				if(!this.fallingInterval) {
					this.$emit("counting");
					this.fall();
				}

				if(this.isJumping || this.isDead)
					return;

				this.isJumping = true;
				this.top = this.top - this.jumpStrength;
				setTimeout(() => this.isJumping = false, 250)
			},
			fall () {
				this.fallingInterval = setInterval(() => {
					
					if (this.isDead) {
						clearInterval(this.fallingInterval);
						this.fallingInterval = null;
						return;
					}

					if (this.isJumping)
						return;

					this.top = this.top + 3;
				}, 50);
			},
			resurrect () {
				this.top = 30;
				this.isJumping = false;
				this.isDead = false;
			},
			die () {

				if(this.isDead) {
					return;
				}

				this.isDead = true;
				this.$emit("died");
			}
		},
		computed: {
			position () {
				return `top: ${this.top}%`;
			}
		},
		watch: {
			top (value) {
				if (value >= this.limit.bottom) {
					setTimeout(this.die, 100);
					return;
				}

				if (value <= (this.limit.top - this.jumpStrength) * 0.55) {
					console.log(`Last: ${value} | Limit: ${this.limit.top}`);
					this.top = this.limit.bottom;
					return;
				}
			}
		}
	}
</script>