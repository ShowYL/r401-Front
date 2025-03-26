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

	let _type = 'Modifier';
	let fieldsType = 'Joueur';

	function handleSubmit(data, type) {
		console.log(data);
		console.log(type);
		switch (type) {
			case 'Ajouter':
				ajouter(data);
				break;
			case 'Modifier':
				modifier(data);
				break;
			case 'Supprimer':
				supprimer(data);
				break;
			default:
				break;
		}
	}

	function ajouter(data) {
		fetch(api_app, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': preRequest('token'),
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	}

	function modifier(data) {
		fetch(api_app, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': preRequest('token'),
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	}

	function supprimer(data) {
		fetch(api_app, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': preRequest('token'),
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	}



</script>

<Table data={data} bind:dataSelected={dataSelected}/>
<Form {fieldsType} onSubmit={(data, type='Ajouter') => handleSubmit(data, type)} title="{_type} un {fieldsType.toLowerCase()}"/>
<Form {fieldsType} onSubmit={(data, type='Modifier') => handleSubmit(data, type)} title="{_type} un {fieldsType.toLowerCase()}"/>
<button onclick={resquestdata}>Get data</button>
