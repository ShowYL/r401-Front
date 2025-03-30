<script>
	import Table from '$lib/components/Table.svelte';
	import { fly } from 'svelte/transition';

	let { match, selection, joueurs } = $props();

	let dataSelected = $state(null);

	let selectionDisplay = $state(null);

	let dataForForm = $state(null);

	$effect(() => {
		if (selection) {
			selectionDisplay = selection.map((player) => {
				let playerId = player.ID_Joueur;
				let playerObj = joueurs.filter((e) => e.ID_Joueur === playerId);

				return {
					ID_Selection: player.ID_Selection,
					Nom: playerObj[0].Nom,
					Prénom: playerObj[0].Prénom,
					Poste: player.Poste,
					Titulaire: player.Titulaire
				};
			});
		}
	});

	$effect(() => {
		if (dataSelected) {
			dataForForm = dataSelected.map((player) => {
				let selectionId = player[0];
				let playerObj = selection.filter((e) => e.ID_Selection === selectionId);

				return {
					ID_Selection: playerObj[0].ID_Selection,
					ID_Match: playerObj[0].ID_Match,
					ID_Joueur: playerObj[0].ID_Joueur,
					Poste: playerObj[0].Poste,
					Titulaire: playerObj[0].Titulaire
				};
			});
		} else {
			dataForForm = null;
		}
	});
</script>

{#if selectionDisplay}
	<details transition:fly={{ duration:1000 }} class="cursor-default">
		<summary>match du {match.Date_Match} contre {match.Equipe_Adverse}</summary>
		<Table data={selectionDisplay} bind:dataSelected />
	</details>
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
