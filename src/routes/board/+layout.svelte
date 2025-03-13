<script>
    import '../app.css';
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

<div class='navi'>
    <nav>
        <img src="/images/logo-white-version.png" alt="logo" class="logo">
        <ul>
            <li><a href="/accueil" class="nav-button"><div class="vertical-hr"></div><img src="" class="nav-image">Accueil</a></li>
            <li><a href="/joueur" class="nav-button"><div class="vertical-hr"></div><img src="" class="nav-image">Joueurs</a></li>
            <li><a href="/match" class="nav-button"><div class="vertical-hr"></div><img src="" class="nav-image">Matchs</a></li>
            <li><a href="/selection" class="nav-button"><div class="vertical-hr"></div><img src="" class="nav-image">Selection</a></li>
        </ul>
        <div class="logout-div">
            <a id="logout-button" class="logout-button"><img src="" class="nav-image">Log-Out</a>
        </div>
    </nav>
</div>

{@render children()}