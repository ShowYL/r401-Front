<script>
	let { data = null } = $props();

	const headers = Object.keys(data[1]);
</script>

<div>
	<table>
		<thead>
			<tr>
				{#each headers as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody> </tbody>
	</table>
</div>
