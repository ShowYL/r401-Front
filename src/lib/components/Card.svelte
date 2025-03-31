<script>
    import { onMount } from 'svelte';
    import { API_APP_BASE } from '$lib/utils';

    let {data, total, won , draw, lost} = $props();


    // Calculate percentages
    let wonPercentage = data ? ((won / total) * 100).toFixed(2) : "0.00";
    let drawPercentage = data ? ((draw / total) * 100).toFixed(2) : "0.00";
    let lostPercentage = data ? ((lost / total) * 100).toFixed(2) : "0.00";
</script>

<div class="stats-container">
    <h2 class="card-title">Statistique du club</h2>
    <div class="cards-container">
        <div class="card">
            <h3>Total de matchs</h3>
            <p>{total}</p>
        </div>
        <div class="card">
            <h3>Matchs gagnés</h3>
            <p>{won } ({wonPercentage}%)</p>
        </div>
        <div class="card">
            <h3>Matchs nuls</h3>
            <p>{draw} ({drawPercentage}%)</p>
        </div>
        <div class="card">
            <h3>Matchs perdus</h3>
            <p>{lost} ({lostPercentage}%)</p>
        </div>
    </div>
</div>

<style>
    .stats-container {
        padding: 1rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .card-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    .cards-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }

    .card {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        width: 200px;
        text-align: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .card h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }

    .card p {
        font-size: 1rem;
        color: #555;
    }
</style>