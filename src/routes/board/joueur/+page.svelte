<script>
	import Form from '$lib/components/Form.svelte';
    import Table from '$lib/components/Table.svelte';

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

	function handleSubmit(data) {
		console.log(data);
	}
</script>

<Table data={example} />
