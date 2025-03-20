<script>
	import Form from '$lib/components/Form.svelte';
    import Table from '$lib/components/Table.svelte';
    import { preRequest } from '$lib/utils';

    const api_app = 'https://lestitansdesete.alwaysdata.net/R401/r401-App/api/endpointJoueur.php';
    
    function resquestdata() {
        const token = preRequest('token'); // Correctly get the token
        console.log(token);
        fetch(api_app, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    }

	let example = [
		{
			ID_Joueur: 1,
			Licence: 'L001',
			Nom: 'Dupont',
			Prénom: 'Jean',
			Taille: 180,
			Poids: 75,
			Date_Naissance: '1990-01-01',
			Statut: 'Actif'
		},
		{
			ID_Joueur: 2,
			Licence: 'L002',
			Nom: 'Martin',
			Prénom: 'Paulo',
			Taille: 175,
			Poids: 70,
			Date_Naissance: '1992-02-02',
			Statut: 'Actif'
		},
		{
			ID_Joueur: 3,
			Licence: 'L003',
			Nom: 'Durand',
			Prénom: 'Pierre',
			Taille: 185,
			Poids: 80,
			Date_Naissance: '1991-03-03',
			Statut: 'Actif'
		},
		{
			ID_Joueur: 4,
			Licence: 'L004',
			Nom: 'Lefevre',
			Prénom: 'Jacques',
			Taille: 178,
			Poids: 72,
			Date_Naissance: '1993-04-04',
			Statut: 'Actif'
		},
		{
			ID_Joueur: 5,
			Licence: 'L005',
			Nom: 'Moreau',
			Prénom: 'Louis',
			Taille: 182,
			Poids: 78,
			Date_Naissance: '1994-05-05',
			Statut: 'Actif'
		},
		{
			ID_Joueur: 6,
			Licence: 'L006',
			Nom: 'Simon',
			Prénom: 'Henri',
			Taille: 177,
			Poids: 74,
			Date_Naissance: '1995-06-06',
			Statut: 'Actif'
		},
		{
			ID_Joueur: 7,
			Licence: 'L007',
			Nom: 'Michel',
			Prénom: 'Georges',
			Taille: 183,
			Poids: 76,
			Date_Naissance: '1996-07-07',
			Statut: 'Actif'
		},
		{
			ID_Joueur: 56,
			Licence: '123',
			Nom: 'TOTO',
			Prénom: 'Toto',
			Taille: 12356,
			Poids: 123564,
			Date_Naissance: '2000-01-01',
			Statut: 'Actif'
		}
	];

	let _type = '';
	let fieldsType = 'Joueur';

	function handleSubmit(data, type) {
		console.log(data);
		console.log(type);
		_type = type;
		console.log(_type);
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

<Table data={example} />
<Form {fieldsType} onSubmit={(data, type='Ajouter') => handleSubmit(data, type)} title="{_type} un {fieldsType.toLowerCase()}"/>
<Form {fieldsType} onSubmit={(data, type='Modifier') => handleSubmit(data, type)} title="{_type} un {fieldsType.toLowerCase()}"/>
<button on:click={resquestdata}>Get data</button>

