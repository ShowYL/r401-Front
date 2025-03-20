<script>
	let { data = null } = $props();

	const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

	const body = () => {
		if (!data || data.length === 0) return [];

		let res = [];
		data.forEach((element) => {
			res.push(Object.values(element));
		});

		return res
	};


</script>

<div class="m-2">
	<table class="table-auto border-2">
		<thead>
			<tr>
				{#each headers as header}
					<th class="cursor-pointer border p-2">
						{header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each body() as row}
				<tr>
					{#each row as donnee}
						<td class="border p-2">{donnee}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
