<script>    
    import { onMount } from 'svelte';
    import { API_APP_BASE } from '$lib/utils';
    import { preRequest } from '$lib/utils';
    import Form from '$lib/components/Form.svelte';
    import Table from '$lib/components/Table.svelte';
    import Card from '$lib/components/Card.svelte';


    const api_app = API_APP_BASE + 'endpointStats.php';
    const endpointJoueur = API_APP_BASE + 'endpointJoueur.php';

    let data = $state(null);
    let alldata = $state(null);


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
            .then((donnee) => (data = donnee.data))
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
            .then((donnee) => (data = donnee.data))
            .catch((err) => console.error(err));
    }

    function getDataJoueur() {
        const token = preRequest('token');
        let joueursData = [];  // Variable pour stocker les données des joueurs

        // Fetch player IDs
        fetch(endpointJoueur, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
        .then((res) => res.json())
        .then((response) => {            
            // Vérifier si la réponse contient une propriété data
            const joueurs = response.data || response;
            
            if (Array.isArray(joueurs)) {
                // Stocker les données des joueurs
                joueursData = joueurs;
                
                // Fetch stats for each player ID
                return Promise.all(
                    joueurs.map((joueur, index) => {
                        const joueurId = joueur.ID_Joueur || joueur[0]; // Adapter selon votre format
                        return fetch(`${api_app}?Id_Joueur=${joueurId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: token
                            }
                        })
                        .then((res) => res.json())
                        .then(statData => {
                            // Renvoyer à la fois les stats et l'index du joueur
                            return {
                                stats: statData.data,
                                joueurIndex: index
                            };
                        });
                    })
                );
            } else {
                console.error("Format de réponse inattendu:", joueurs);
            }
        })
        .then((statResults) => {
            // Formater les données pour le composant Table
            const formattedData = statResults.map(result => {
                const joueur = joueursData[result.joueurIndex];
                const joueurStat = result.stats;
                
                return {
                    "ID Joueur": joueur.ID_Joueur || joueur[0],
                    "Nom": joueur.Nom || joueur[2],
                    "Prénom": joueur.Prénom || joueur[3],
                    "Sélections consécutives": joueurStat.consecutive_selections,
                    "Position préférée": joueurStat.preferred_position,
                    "Évaluation moyenne": joueurStat.player_stats?.moyenne_evaluations || "N/A",
                    "% Matchs gagnés": (joueurStat.player_stats?.pourcentage_matchs_gagnes || "0") + "%",
                    "Titularisations": joueurStat.player_stats?.titularisations || 0,
                    "Remplacements": joueurStat.player_stats?.remplacements || 0,
                };
            });
            
            alldata = formattedData;
        })
        .catch((err) => console.error(err));
    }

    onMount(() => {
        resquestdata();
        getDataJoueur(); 
    });

    onMount(() => {
        resquestdata();
    });
</script>


{#if data}
    <Card data={data} total={data.total} won={data.won} draw={data.draw} lost={data.lost} />
{:else}
    <div class="loading">Chargement des statistiques...</div>
{/if}
{#if alldata}
    <Table data={alldata} />
{:else}
    <div class="loading">Chargement des données des joueurs...</div>
{/if}

