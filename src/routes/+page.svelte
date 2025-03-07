<script>
	let pageConnexion = $state(true);
</script>

<section
	class="h-4/5 max-h-[500px] min-h-[400px] w-[400px] max-w-[400px] overflow-hidden rounded-lg bg-white shadow-2xl"
>
	<h1 class="flex h-1/6 items-center justify-center text-2xl">
		{pageConnexion ? 'Connexion' : 'Inscription'}
	</h1>
	<form class="h-5/8 w-full p-8 text-base">
		<table class="h-full w-full">
			<tbody
				><tr><td><label for="nomUtilisateur">Nom d'utilisateur :</label></td></tr>
				<tr
					><td
						><input
							class="rounded-lg"
							type="text"
							name="nomUtilisateur"
							id="username"
							placeholder="Nom d'utilisateur"
							required
						/></td
					></tr
				><tr><td><label for="password">Mot de passe :</label></td></tr>
				<tr
					><td
						><input
							class="rounded-lg"
							type="text"
							name="password"
							id="password"
							placeholder="Mot de passe"
							required
						/></td
					></tr
				><tr
					><td
						><button
							class="t-[2%] mt-4 w-4 min-w-full cursor-pointer rounded-xl border p-1 hover:bg-gray-700 hover:text-white"
							>{pageConnexion ? 'Connexion' : 'Inscription'}</button
						></td
					></tr
				><tr
					><td
						><p class="inline max-w-full font-thin whitespace-nowrap">
							{pageConnexion ? "Vous n'avez pas de compte ? " : 'Vous avez un compte ? '}<button
								class="cursor-pointer text-blue-500 underline"
								onclick={() => (pageConnexion = !pageConnexion)}
								>{pageConnexion ? 'Créez - en un !' : 'Connectez-vous !'}</button
							>
						</p></td
					></tr
				></tbody
			>
		</table>
	</form>
</section>

<style>
	td {
		@apply p-[2%];
	}
	input {
		@apply h-[25%] w-full;
	}
</style>
