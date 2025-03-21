<script>
	import Form from '$lib/components/Form.svelte';
    import Table from '$lib/components/Table.svelte';
    import { preRequest } from '$lib/utils';
	import { onMount } from 'svelte';
    import { API_APP_BASE } from '$lib/utils'


    const api_app = API_APP_BASE+'endpointJoueur.php';
    
	let data = $state(null)
    let dataSelected = $state(null)
    
    function resquestdata() {
        const token = preRequest('token'); // Correctly get the token
        console.log(token)
        fetch(api_app, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((res) => res.json())
            .then((donnee) => data = donnee)
            .catch((err) => console.error(err));
    }

	onMount(() => {
		resquestdata()
	})



</script>

<Table data={data} bind:dataSelected={dataSelected}/>
<Form fieldsType="Joueur" selectedData={dataSelected ? dataSelected[0] : null} />
<button onclick={resquestdata}>Get data</button>
