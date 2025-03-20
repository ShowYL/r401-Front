<script>
	import Form from '$lib/components/Form.svelte';
    import Table from '$lib/components/Table.svelte';
    import { preRequest } from '$lib/utils';
	import { onMount } from 'svelte';


    const api_app = 'https://lestitansdesete.alwaysdata.net/R401/r401-App/api/endpointJoueur.php';
    
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
            .then((donnee) => data = donnee)
            .catch((err) => console.error(err));
    }

	onMount(() => {
		resquestdata()
	})

	function handleSubmit(data) {
		console.log(data);
	}
</script>

<Table data={data} bind:dataSelected={dataSelected}/>
<Form fieldsType={'Joueur'} onSubmit={handleSubmit} title="Ajouter un joueur"/>
