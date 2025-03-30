<script>
	import Table from '$lib/components/Table.svelte';
	import { fly } from 'svelte/transition';
	import Form from './form.svelte';

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

<Form fieldsType="Selection" selectedData={dataForForm} />
{#if selectionDisplay}
	<details
		transition:fly={{ duration: 1000 }}
		class="group m-4 ml-6 origin-top cursor-default rounded border-2 border-gray-400 p-1"
	>
		<summary class="relative cursor-default list-none">
			<span
				class="absolute -left-5 transform transition-transform duration-200 ease-in-out
			           group-open:rotate-45">+</span
			>
			match du {match.Date_Match} contre {match.Equipe_Adverse}
		</summary>
		<div transition:fly={{ y: -5, duration: 200 }}>
			<Table data={selectionDisplay} bind:dataSelected />
		</div>
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
