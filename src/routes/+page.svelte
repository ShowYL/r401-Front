<script>
	import { goto } from '$app/navigation';
	import { postRequest } from '$lib/utils';

	let pageConnexion = $state(true);
	let username = $state('');
	let password = $state('');

	const api_auth = 'https://chatr410.alwaysdata.net/R401/r401-Auth/api/endpoint.php';

	function handleClick() {
		if (pageConnexion && username !== '' && password !== '') {
			let data = JSON.stringify({
				username: username,
				password: password
			});
			fetch(api_auth, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.status_code === 200) { 
                        postRequest(data.data);
                        goto('/board/accueil');
                    }
				})
				.catch((err) => console.error(err));
		} else if (username !== '' && password !== '') {
			let data = JSON.stringify({
				username: username,
				password: password
			});
			fetch(api_auth, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
			})
				.then((res) => res.json())
				.then(() => {
					password = '';
					pageConnexion = !pageConnexion;
				})
				.catch((err) => console.error(res));
		}
	}
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
							onkeydown={(event) => {
								if (event.key === 'Enter') {
									handleClick();
								}
							}}
							bind:value={username}
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
							onkeydown={(event) => {
								if (event.key === 'Enter') {
									handleClick();
								}
							}}
							bind:value={password}
							class="rounded-lg"
							type="password"
							name="password"
							id="password"
							placeholder="Mot de passe"
							required
						/></td
					></tr
				><tr
					><td
						><button
							type="button"
							class="t-[2%] mt-4 w-4 min-w-full cursor-pointer rounded-xl border p-1 hover:bg-gray-700 hover:text-white"
							onclick={() => handleClick()}>{pageConnexion ? 'Connexion' : 'Inscription'}</button
						></td
					></tr
				><tr
					><td
						><p class="inline max-w-full font-thin whitespace-nowrap">
							{pageConnexion ? "Vous n'avez pas de compte ? " : 'Vous avez un compte ? '}<button
								type="button"
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
