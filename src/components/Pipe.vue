<template>
	<div ref="pipeline" :class="['pipe', {reverse: up, normal: !up}]" :style="style">
		<img src="/assets/img/pipe.png">
	</div>
</template>

<style scoped>
	.pipe {
	    width: 17vh;
		position: absolute;
		z-index: 0;
	}
	img {
		position: relative;
	    height: 100%;
	    width: 100%;
	}
	.reverse {
		transform: rotate(180deg);
		margin-top: -10vh;
	}
	.normal {
		bottom: 10vh;
	}
</style>


<script type="text/javascript">
	export default {
		name: "Pipe",
		props: {
			up: Boolean,
			bird: Object,
			idx: Number
		},
		data () {
			return {
				size: 0,
				sizeList: [
					15, 
					20, 
					25, 
					30, 
					35, 
					40, 
					45],
				styles: {
					right: "-18vh"
				},
				movementInterval: null
			}
		},
		computed: {
			style () {

				let style = `height: ${this.size}vh; `;

				for(let field in this.styles) {
					style += `${field}: ${this.styles[field]}; `
				}

				return style;
			}
		},
		methods: {
			detectCollision () {

				const bird = this.bird.$el.getBoundingClientRect();
				const self = this.$el.getBoundingClientRect();

				let collided = !(
			      bird.top > (self.bottom - 15) ||
			      bird.right < (self.left + 15) ||
			      bird.bottom < (self.top + 15) ||
			      bird.left > (self.right - 15)
			    );

			    if(!collided) {
			    	return;
			    }

			    this.bird.die();
			},
			destroyIfOutside (position) {

				if(position < 440) {
					return;
				}

				this.$emit("destroy");
			}
		},
		mounted () {

			this.size = this.sizeList[Math.floor(Math.random() * (this.sizeList.length - 1))];

			/**/
			this.movementInterval = setInterval(() => {
				
				let movement = Number(this.styles.right.replace(/[^\d.-]/g, ''));
				movement += 1;
				
				this.styles.right = `${movement}vh`;

				if (this.idx <= 2) {
					this.detectCollision();
				}
				
				this.destroyIfOutside(movement);
			}, 15);
			/**/
		},
		beforeDestroy () {
			clearInterval(this.movementInterval);
		}
	}
</script>