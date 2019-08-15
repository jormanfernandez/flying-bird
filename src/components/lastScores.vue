<template>
	<div>
		<p>
			Ultimos Scores
		</p>
		
		<hr>

		<div v-if="scores.length < 1">
			<p>
				No has jugado ninguna partida
			</p>
		</div>
		<div v-else>
			<table>
				<tr v-for="(value, idx) in scores" :key="idx+''+value">
					<td>
						<p>
							{{idx + 1}}.
						</p>
					</td>
					<td>
						<span>
							{{value}} pts
						</span>
					</td>
				</tr>
			</table>
		</div>

		<br>
	</div>
</template>

<style scoped>
	hr {
		border-top: 1px dotted #8c8b8b;
	}
	table {
		width: 50%;
	    margin-left: 20%;
	    border-collapse: collapse;
	    text-align: left;
	}
	table tr {
		border-bottom: 1px solid #FFB75E;
		border-bottom: 1px solid -webkit-linear-gradient(to right, #ED8F03, #FFB75E);
		border-bottom: 1px solid linear-gradient(to right, #ED8F03, #FFB75E);
	}
	table tr td:nth-child(1) {
	    min-width: 10%;
	    width: auto;
	}
	table tr td:nth-child(1) p {
		background: #FFB75E;
		background: -webkit-linear-gradient(to right, #ED8F03, #FFB75E);
		background: linear-gradient(to right, #ED8F03, #FFB75E);
		color: white;
	}
	table tr td:nth-child(2) span {
		margin-left: 10px;
	}
</style>

<script type="text/javascript">
	export default {
		name: "lastScores",
		props: {
			scores: Array
		}
	}
</script>