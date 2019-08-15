<template>
	<div class="screen" @click="birdJump">
		<div class="scoreboard" @click.stop>
			<span>
				Score actual: {{$root.scores.actual}}
			</span>

			<span @click="$emit('lastScores')">
				Ver los ultimos scores
			</span>

			<span @click="$emit('bestScores')">
				Ver los mejores scores
			</span>
		</div>

		<div class="clouds"></div>

		<div class="field">

			<Bird ref="bird" @died="stopCounting" @counting="startCounting"></Bird>
			
			<Pipe 
				:up="true" 
				v-for="(value, idx) in pipesTop" 
				:key="value"
				:idx="idx"
				:bird="$refs.bird"
				@destroy="destroyPipe(true, value)"></Pipe>
			<Pipe 
				:up="false" 
				v-for="(value, idx) in pipesBottom" 
				:key="value"
				:idx="idx"
				:bird="$refs.bird"
				@destroy="destroyPipe(false, value)"></Pipe>
		</div>
	
		<div class="floor"></div>

	</div>
</template>

<style scoped>
	.screen {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #03c5c5;
		overflow: hidden;
	}

	.scoreboard {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;
		height: 10%;
		user-select: none;
		z-index: 2;
	}

	.scoreboard span {
		color: #ececec;
		transition: all 1s;
		font-size: 20px;
		font-weight: 800;
		-webkit-text-stroke-width: 1px;
   		-webkit-text-stroke-color: black;
	}

	.scoreboard span:hover {
		color: white;
	}

	.scoreboard span:nth-child(2),
	.scoreboard span:nth-child(3) {
		cursor: pointer;
	}

	.floor {
		width: 5000%;
		height: 20%;
		position: absolute;
		bottom: 0;
		z-index: 1;
		background-image: url("/assets/img/floor.png");
		background-repeat: repeat-x;
		background-size: contain;
		animation: slide 100s linear infinite;
	}

	.clouds {
		width: 5000%;
		height: 80%;
		position: absolute;
		top: 0;
		background-image: url("/assets/img/clouds.png");
	    background-repeat: round;
		animation: slide 500s linear infinite;
	}

	@keyframes slide {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(-80%, 0, 0);
		}
	}
</style>

<script type="text/javascript">
	import Bird from "./Bird";
	import Pipe from "./Pipe";

	export default {
	  name: "Screen",
	  components: {Bird, Pipe},
	  data () {
	  	return {
	  		flyInterval: null,
	  		pipesTop: [],
	  		pipesBottom: [],
	  		pipeGeneratorInterval: null
	  	}
	  },
	  methods: {
	  	destroyPipe (top, pipe) {

	  		const search = top ? "pipesTop" : "pipesBottom";
	  		
	  		this[search] = this[search].filter(value => {
  				return value != pipe
  			});
	  	},
	  	pipeGenerator () {
	  		this.pipeGeneratorInterval = setInterval(() => {

	  			let onTop = Math.floor(Math.random() * 2) + 1 == 2;
	  			let onBottom = Math.floor(Math.random() * 2) + 1 == 2;

	  			if (onTop) {
	  				this.pipesTop.push(this.pipeId());
	  			}

	  			if (onBottom) {
	  				this.pipesBottom.push(this.pipeId());
	  			}

	  		}, 1000);
	  	},
	  	pipeId () {

	  		const key = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789-_";
	  		let str = "";

	  		while(str.length < 10) {

	  			let char = Math.floor(Math.random() * (key.length -1));
	  			str += key.charAt(char);
	  		}

	  		return str;
	  	},
	  	startCounting () {
	  		this.flyInterval = setInterval(() => this.$root.scores.actual += 1, 350);
	  	},
	  	stopCounting () {

	  		if(!this.flyInterval) {
	  			return;
	  		}

	  		if (this.pipeGeneratorInterval) {
	  			clearInterval(this.pipeGeneratorInterval);
	  			this.pipeGeneratorInterval = null;
	  		}

	  		console.log("Deteniendo contadores.")

	  		clearInterval(this.flyInterval);
	  		this.$root.scores.lasts.unshift(this.$root.scores.actual);
	  		this.$root.scores.actual = 0;
	  	},
	  	birdJump () {

	  		if(this.$refs.bird.isDead) {
	  			this.$refs.bird.resurrect();
	  			return;
	  		}

	  		if(!this.pipeGeneratorInterval) {
	  			this.pipeGenerator();
	  		}

	  		this.$refs.bird.jump();
	  	}
	  }
	};
</script>