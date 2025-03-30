<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let { data = null, dataSelected = $bindable() } = $props();

	let previousIndex = $state(null);

	let headers = $derived(data && data.length > 0 ? Object.keys(data[0]) : []);

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
		<table class="table-auto border-2" transition:fly={{ duration: 1000 }}>
			<thead>
				<tr>
					{#each headers as header}
						<th class="cursor-default border-2 bg-slate-300 p-2">
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
								<td class="border bg-gray-400 p-2" onclick={() => select(row, index)}>{donnee}</td>
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
	<div>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path
				fill="none"
				stroke="currentColor"
				stroke-dasharray="16"
				stroke-dashoffset="16"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3c4.97 0 9 4.03 9 9"
				><animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					dur="0.2s"
					values="16;0"
				/><animateTransform
					attributeName="transform"
					dur="1.5s"
					repeatCount="indefinite"
					type="rotate"
					values="0 12 12;360 12 12"
				/></path
			></svg
		>
	</div>
{/if}
