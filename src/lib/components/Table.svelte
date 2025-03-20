<script>
	import { onMount } from 'svelte';

	let { data = null, dataSelected = $bindable() } = $props();
	$inspect(data)

	let previousIndex = $state(null);

	let headers = $derived(data && data.length > 0 ? Object.keys(data[0]) : [])

	const body = () => {
		if (!data || data.length === 0) return [];

		let res = [];
		data.forEach((element) => {
			res.push(Object.values(element));
		});

		return res;
	};


	function isRowSelected(row, index) {
		if (!dataSelected) return false;

		return previousIndex && previousIndex.some((idx) => idx === index);
	}

	function select(row, index) {
		if (previousIndex && previousIndex.some((idx) => idx === index)) {
			dataSelected = null;
			previousIndex = null;
			return;
		}
		previousIndex = previousIndex === null ? [index] : [index, ...previousIndex];
		dataSelected = dataSelected === null ? [row] : [row, ...dataSelected];
	}
</script>

{#if data}
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
				{#each body() as row, index}
					<tr>
						{#each row as donnee}
							{#if isRowSelected(row, index)}
								<td class="border bg-blue-500 p-2" onclick={() => select(row, index)}>{donnee}</td>
							{:else}
								<td class="border p-2" onclick={() => select(row, index)}>{donnee}</td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<div>fetching</div>
{/if}
