<script>
	import Form from '$lib/components/Form.svelte';
    import Table from '$lib/components/Table.svelte';
    import { preRequest } from '$lib/utils';
	import { onMount } from 'svelte';
    import { API_APP_BASE } from '$lib/utils'


    const api_app = API_APP_BASE+'endpointMatch.php';
    
	let data = $state(null)
    let dataSelected = $state(null)
    
    function resquestdata() {
        const token = preRequest('token'); // Correctly get the token
        fetch(api_app, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((res) => res.json())
            .then((donnee) => data = donnee.data)
            .catch((err) => console.error(err));
    }

	onMount(() => {
		resquestdata()
	})



</script>

<Form fieldsType="Match" selectedData={dataSelected} {resquestdata} />
<Table data={data} bind:dataSelected={dataSelected}/>
