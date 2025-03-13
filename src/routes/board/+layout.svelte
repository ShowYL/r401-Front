<script>
    import '../../app.css';
    import { onMount } from 'svelte';

    let { children } = $props();

    onMount(() => {
        const logoutButton = document.getElementById("logout-button");

        const currentPage = window.location.pathname.split("/").pop();
        const navButtons = document.querySelectorAll(".nav-button");

        navButtons.forEach(button => {
            const buttonHref = button.getAttribute("href").split("/").pop();
            if (buttonHref === currentPage) {
                button.onclick = (e) => e.preventDefault();
                button.classList.add('disabled-hover');
                const verticalHr = button.querySelector(".vertical-hr");
                if (verticalHr) {
                    verticalHr.style.display = 'block';
                }
            }
        });
    });
</script>
<div class="flex flex-row w-full h-screen"> <!-- container -->
    <div class='w-48 bg-gray-300 shadow-md flex'>  <!-- left bar -->
        <div class='bg-gray-800 text-white py-2 w-full flex justify-center'> <!-- nav -->
            <nav class="flex flex-col items-center justify-between h-full">
                <img src="/logo-white-version.png" alt="logo" class="w-3/4 h-10">
                <ul class="list-none m-0 p-0 flex flex-col h-1/2">
                    <li class="flex items-center my-2 mx-4">
                        <a href="accueil" class="nav-button flex items-center bg-gray-800 text-white p-2 rounded cursor-pointer no-underline h-1/2">
                            <div class="vertical-hr bg-gray-600 h-3/2 w-1 mr-3 hidden rounded"></div>
                            <img src="/accueil.png" alt="Accueil logo" class="w-1/4 h-5/6 mr-2">Accueil
                        </a>
                    </li>
                    <li class="flex items-center my-2 mx-4">
                        <a href="joueur" class="nav-button flex items-center bg-gray-800 text-white p-2 rounded cursor-pointer no-underline h-1/2">
                            <div class="vertical-hr bg-gray-600 h-3/2 w-1 mr-3 hidden rounded"></div>
                            <img src="/joueur-de-rugby.png" alt="Joueur logo" class="w-1/4 h-5/6 mr-2">Joueurs
                        </a>
                    </li>
                    <li class="flex items-center my-2 mx-4">
                        <a href="match" class="nav-button flex items-center bg-gray-800 text-white p-2 rounded cursor-pointer no-underline h-1/2">
                            <div class="vertical-hr bg-gray-600 h-3/2 w-1 mr-3 hidden rounded"></div>
                            <img src="/match.png" alt="Matchs logos" class="w-1/4 h-5/6 mr-2">Matchs
                        </a>
                    </li>
                    <li class="flex items-center my-2 mx-4">
                        <a href="selection" class="nav-button flex items-center bg-gray-800 text-white p-2 rounded cursor-pointer no-underline h-1/2">
                            <div class="vertical-hr bg-gray-600 h-3/2 w-1 mr-3 hidden rounded"></div>
                            <img src="/selection.png" alt="Selection logo" class="w-1/4 h-5/6 mr-2">Selection
                        </a>
                    </li>
                </ul>
                <div class="logout-div">
                    <a id="logout-button" class="logout-button flex items-center bg-gray-700 text-white p-2 rounded cursor-pointer no-underline h-1/2 my-1 mx-4">
                        <img src="/logout.png" alt="Log-Out logo" class="w-1/4 h-5/6 mr-2">Log-Out
                    </a>
                </div>
            </nav>
        </div>
    </div>
    <div class='flex-grow bg-gray-400 flex flex-col items-center'> <!-- rigth content-->
        <div class='w-full h-24 -mt-5'> <!-- top bar-->
            <h1>Admin</h1>
        </div>
        <div class='w-full mt-5 h-full'> <!-- main content-->
            {@render children()}
        </div>
        <!-- footer after -->
    </div>
</div>

<style>
    .nav-button.disabled-hover:hover {
        background-color: #403d39;
        cursor: default;
    }
</style>