<template>
	<div class="overlay" @click.self="$emit('close')">		
		<div class="layout shadow">
			<span title="Cerrar esta ventana" class="exit" @click="$emit('close')">x</span>
			<hr class="hidden">
			<div class="body">
				<slot name="body">
					<p>Overlay</p>
				</slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.overlay {
	    width: 100%;
	    height: 100%;
	    background-color: #00000040;
	    z-index: 4;
	    position: fixed;
	    overflow: hidden;
	}
	.layout hr.hidden {
		visibility: hidden;
	}
	.layout {
		overflow-y: auto;
	    width: 50%;
	    text-align: center;
	    height: auto;
	    max-height: 500px;
	    left: 0;
	    top: 20%;
	    margin: auto;
	    position: relative;
	    padding-bottom: 11px;
	    background-color: white;
	    border-radius: 3px;
	}
	.shadow {
		-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
		box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
	}
	.exit {
		user-select: none;
	    cursor: pointer;
	    font-size: 12px;
	    padding-left: 6px;
	    padding-right: 6px;
	    border-radius: 3px;
	    border: 1px solid black;
	    transition: all 0.2s;
	    position: relative;
	    margin-left: 93%;
	    top: 5px;
	    background-color: #C00;
	    color: white;
	    -webkit-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.6);
	    -moz-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.6);
	    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.6);
	}
	.exit:active {
		font-size: 10px;
		background-color: red;
	}
	.body {
		padding-bottom: 5px !important;
	}
</style>

<script type="text/javascript">
	export default {
		name: "Overlay"
	}
</script>