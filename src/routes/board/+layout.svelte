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
<div class="flex flex-row w-full h-screen"> <!-- container -->
    <div class='w-56 bg-gray-300 shadow-md flex'>  <!-- left bar -->
        <div class='bg-[#3f3d39] text-white py-4 w-full flex justify-center'> <!-- nav -->
            <nav class="flex flex-col items-center justify-between h-full">
            <img src="/logo-white-version.png" alt="logo" class="w-37 h-25 my-4">
            <ul class="list-none m-0 p-0 flex flex-col">
                <li class="flex items-center my-4 mx-6  ">
                <a href="/board/accueil" class="nav-button flex items-center bg-[#3f3d39] text-white p-5 rounded cursor-pointer no-underline h-1/2 hover:bg-[#4a4a4a]"
                data-sveltekit-reload>
                    <div class="vertical-hr bg-white h-12 w-12 mr-4 hidden rounded"></div>
                    <img src="/accueil.png" alt="Accueil logo" class="w-6 h-6 mr-3">Accueil
                </a>
                </li>
                <li class="flex items-center my-4 mx-6 ">
                <a href="/board/joueur" class="nav-button flex items-center bg-[#3f3d39] text-white p-5 rounded cursor-pointer no-underline h-1/2 hover:bg-[#4a4a4a]"
                data-sveltekit-reload>
                    <div class="vertical-hr bg-white h-4 w-1 mr-4 hidden rounded"></div>
                    <img src="/joueur-de-rugby.png" alt="Joueur logo" class="w-6 h-6 mr-3">Joueurs
                </a>
                </li>
                <li class="flex items-center my-4 mx-6 ">
                <a href="/board/match" class="nav-button flex items-center bg-[#3f3d39] text-white p-5 rounded cursor-pointer no-underline h-1/2 hover:bg-[#4a4a4a]"
                data-sveltekit-reload>
                    <div class="vertical-hr bg-white h-4 w-1 mr-4 hidden rounded"></div>
                    <img src="/match.png" alt="Matchs logos" class="w-6 h-6 mr-3">Matchs
                </a>
                </li>
                <li class="flex items-center my-4 mx-6 ">
                <a href="/board/selection" class="nav-button flex items-center bg-[#3f3d39] text-white p-5 rounded cursor-pointer no-underline h-1/2 hover:bg-[#4a4a4a]"
                data-sveltekit-reload>
                    <div class="vertical-hr bg-white h-4 w-1 mr-4 hidden rounded"></div>
                    <img src="/selection.png" alt="Selection logo" class="w-6 h-6 mr-3">Selection
                </a>
                </li>
            </ul>
            <div class="logout-div">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <a id="logout-button" class="logout-button flex items-center bg-[#555555] text-white p-4 rounded cursor-pointer no-underline h-3/4 my-2 mx-6 hover:bg-[#636262]"
                data-sveltekit-reload onclick={() => deconnexion()}>
                <img src="/logout.png" alt="Log-Out logo" class="w-5 h-5 mr-3">Log-Out
                </a>
            </div>
            </nav>
        </div>
    </div>
    <div class='flex-grow bg-white flex flex-col items-center'> <!-- rigth content-->
        <div class='w-full h-24 -mt-5'> <!-- top bar-->
            <h1>Admin</h1>
        </div>
        <div class='w-full mt-5 h-full'> <!-- main content-->
            {@render children()}
        </div>
        <!-- footer after -->
    </div>
</div>
