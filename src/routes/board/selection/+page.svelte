<script>
	import Details from '$lib/components/Details.svelte';
	import { preRequest } from '$lib/utils';
	import { onMount } from 'svelte';
	import { API_APP_BASE } from '$lib/utils';

	const api_app_selection = API_APP_BASE + 'endpointSelection.php';
	const api_app_match = API_APP_BASE + 'endpointMatch.php';
	const api_app_joueur = API_APP_BASE + 'endpointJoueur.php';

	let dataSelection = $state(null);
	let dataMatch = $state([]);
	let dataJoueur = $state([]);
	let dataDetails = $state([]);

	async function resquestDataSelection() {
		const token = preRequest('token');
		try {
			const res = await fetch(api_app_selection, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}
			});
			const donnee = await res.json();
			dataSelection = donnee.data;
			return donnee.data;
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	async function requestAllMatches() {
		const token = preRequest('token');
		try {
			const res = await fetch(api_app_match, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				}
			});
			const data = await res.json();
			dataMatch = data.data;
		} catch (err) {
			console.error(err);
		}
	}

	async function requestDataJoueur(listIDJoueur) {
		const token = preRequest('token');

		await Promise.all(
			listIDJoueur.map(async (element) => {
				try {
					const res = await fetch(api_app_joueur + `?Id_Joueur=${element}`, {
						headers: {
							'Content-Type': 'application/json',
							Authorization: token
						}
					});
					const data = await res.json();
					dataJoueur = [...dataJoueur, ...[data.data]];
				} catch (err) {
					console.error(err);
				}
			})
		);
	}

	onMount(async () => {
		await requestAllMatches();
		const selection = await resquestDataSelection();
		if (selection && selection.length > 0) {
			await requestDataJoueur([...new Set(selection.map((item) => item.ID_Joueur))]);
		}
		format();
	});

	function format() {
		for (let index = 0; index < dataMatch.length; index++) {
			let joueurMatchID = [];
			let selectionJoueur = [];

			for (let selec of dataSelection || []) {
				if (selec.ID_Match === dataMatch[index].ID_Match) {
					joueurMatchID.push(selec.ID_Joueur);
					selectionJoueur.push(selec);
				}
			}

			let joueurMatchData = [...dataJoueur.filter((e) => joueurMatchID.includes(e.ID_Joueur))];

			dataDetails[index] = {
				match: dataMatch[index],
				joueurs: joueurMatchData,
				selection: selectionJoueur
			};
		}
	}
</script>

<div class="">
	{#each dataDetails as selection}
		<Details match={selection.match} selection={selection.selection} joueurs={selection.joueurs} />
	{/each}
</div>
