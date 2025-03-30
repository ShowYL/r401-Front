<script>    
    import { onMount } from 'svelte';
    import { API_APP_BASE } from '$lib/utils';
    import { preRequest } from '$lib/utils';

    const api_app = API_APP_BASE + 'endpointStats.php';


    function resquestdata() {
        const token = preRequest('token'); // Correctly get the token
        fetch(api_app, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then((res) => res.json())
            .then((donnee) => (data = donnee))
            .catch((err) => console.error(err));
    }

    function getData() {
        const token = preRequest('token'); // Correctly get the token
        fetch(api_app, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then((res) => res.json())
            .then((donnee) => (console.log(data = donnee )))
            .catch((err) => console.error(err));
    }
    let data = $state(null);

    onMount(() => {
        resquestdata();
    });
</script>
<div class="stats-container">
    <h2 class="card-title "> Statistique du club </h2>
    <div class="cards-container">
        <div class="card">
            <h3>Total de matchs</h3>
            <p>{data}</p>
        </div>
        <div class="card">
            <h3>Matchs gagnés</h3>
            <p>2 (50.00%)</p>
        </div>
        <div class="card">
            <h3>Matchs nuls</h3>
            <p>1 (25.00%)</p>
        </div>
        <div class="card">
            <h3>Matchs perdus</h3>
            <p>1 (25.00%)</p>
        </div>
    </div>
</div>
<button onclick={getData} class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
    Get Data
</button>