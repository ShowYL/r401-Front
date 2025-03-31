<script>
    import { onMount } from 'svelte';
    import { API_APP_BASE } from '$lib/utils';

    let {data, total, won , draw, lost} = $props();


    // Calculate percentages
    let wonPercentage = data ? ((won / total) * 100).toFixed(2) : "0.00";
    let drawPercentage = data ? ((draw / total) * 100).toFixed(2) : "0.00";
    let lostPercentage = data ? ((lost / total) * 100).toFixed(2) : "0.00";
</script>

<div class="p-4 bg-gray-100 rounded-lg shadow-md">
    <h2 class="text-xl mb-4 text-center">Statistique du club</h2>
    <div class="flex flex-wrap gap-4 justify-center">
        <div class="bg-white border border-gray-300 rounded-lg p-4 w-48 text-center shadow-sm">
            <h3 class="text-lg mb-2">Total de matchs</h3>
            <p class="text-base text-gray-700">{total}</p>
        </div>
        <div class="bg-white border border-gray-300 rounded-lg p-4 w-48 text-center shadow-sm">
            <h3 class="text-lg mb-2">Matchs gagnés</h3>
            <p class="text-base text-gray-700">{won} ({wonPercentage}%)</p>
        </div>
        <div class="bg-white border border-gray-300 rounded-lg p-4 w-48 text-center shadow-sm">
            <h3 class="text-lg mb-2">Matchs nuls</h3>
            <p class="text-base text-gray-700">{draw} ({drawPercentage}%)</p>
        </div>
        <div class="bg-white border border-gray-300 rounded-lg p-4 w-48 text-center shadow-sm">
            <h3 class="text-lg mb-2">Matchs perdus</h3>
            <p class="text-base text-gray-700">{lost} ({lostPercentage}%)</p>
        </div>
    </div>
</div>
