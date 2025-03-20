<script>

	let { data = null } = $props();

	const headers = data && data.length > 0 ? Object.keys(data[0]) : [];
    const body = () => {
        let res = []
        data.forEach(element => {
            res.push(Object.values(element))
        });
        return res
    }

</script>

<div class="m-2">
	<table class="table-auto border border-collapse">
		<thead>
			<tr>
				{#each headers as header}
					<th class="border p-2">{header}</th>
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
