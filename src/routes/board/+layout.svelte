<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	import { eraseCookie } from '$lib/utils';
	import { goto } from '$app/navigation';

	let { children } = $props();

	function deconnexion() {
		eraseCookie('token');
		goto("/");
	}
</script>

<div class="flex h-screen w-full flex-row">
	<!-- container -->
	<div class="flex w-48 bg-gray-300 shadow-md">
		<!-- left bar -->
		<div class="flex w-full justify-center bg-gray-800 py-2 text-white">
			<!-- nav -->
			<nav class="flex h-full flex-col items-center justify-between">
				<img src="/logo-white-version.png" alt="logo" class="h-10 w-3/4" />
				<ul class="m-0 flex h-1/2 list-none flex-col p-0">
					<li class="mx-4 my-2 flex items-center">
						<a
							href="/board/accueil"
							class="nav-button flex h-1/2 cursor-pointer items-center rounded bg-gray-800 p-2 text-white no-underline"
							data-sveltekit-reload
						>
							<div class="vertical-hr mr-3 hidden h-3/2 w-1 rounded bg-gray-600"></div>
							<img src="/accueil.png" alt="Accueil logo" class="mr-2 h-5/6 w-1/4" />Accueil
						</a>
					</li>
					<li class="mx-4 my-2 flex items-center">
						<a
							href="/board/joueur"
							class="nav-button flex h-1/2 cursor-pointer items-center rounded bg-gray-800 p-2 text-white no-underline"
							data-sveltekit-reload
						>
							<div class="vertical-hr mr-3 hidden h-3/2 w-1 rounded bg-gray-600"></div>
							<img src="/joueur-de-rugby.png" alt="Joueur logo" class="mr-2 h-5/6 w-1/4" />Joueurs
						</a>
					</li>
					<li class="mx-4 my-2 flex items-center">
						<a
							href="/board/match"
							class="nav-button flex h-1/2 cursor-pointer items-center rounded bg-gray-800 p-2 text-white no-underline"
							data-sveltekit-reload
						>
							<div class="vertical-hr mr-3 hidden h-3/2 w-1 rounded bg-gray-600"></div>
							<img src="/match.png" alt="Matchs logos" class="mr-2 h-5/6 w-1/4" />Matchs
						</a>
					</li>
					<li class="mx-4 my-2 flex items-center">
						<a
							href="/board/selection"
							class="nav-button flex h-1/2 cursor-pointer items-center rounded bg-gray-800 p-2 text-white no-underline"
							data-sveltekit-reload
						>
							<div class="vertical-hr mr-3 hidden h-3/2 w-1 rounded bg-gray-600"></div>
							<img src="/selection.png" alt="Selection logo" class="mr-2 h-5/6 w-1/4" />Selection
						</a>
					</li>
				</ul>
				<div class="logout-div">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_interactive_supports_focus -->
					<a
						id="logout-button"
						class="logout-button mx-4 my-1 flex h-1/2 cursor-pointer items-center rounded bg-gray-700 p-2 text-white no-underline"
						role="button"
						data-sveltekit-reload
						onclick={() => deconnexion()}
					>
						<img src="/logout.png" alt="Log-Out logo" class="mr-2 h-5/6 w-1/4" />Log-Out
					</a>
				</div>
			</nav>
		</div>
	</div>
	<div class="flex flex-grow flex-col items-center bg-gray-400">
		<!-- rigth content-->
		<div class="-mt-5 h-24 w-full">
			<!-- top bar-->
			<h1>Admin</h1>
		</div>
		<div class="mt-5 h-full w-full">
			<!-- main content-->
			{@render children()}
		</div>
		<!-- footer after -->
	</div>
</div>
