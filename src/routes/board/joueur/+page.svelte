<script> 
    import Form from '$lib/components/Form.svelte';
    import { preRequest } from '$lib/utils';


    const api_app = 'https://lestitansdesete.alwaysdata.net/R401/r401-App/api/endpointJoueur.php';
    
    
    function resquestdata() {
        const token = preRequest('token'); // Correctly get the token
        console.log(token);
        fetch(api_app, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    }

    let fields = [
        { label: "Licence", type: 'text', name: 'licence', required: true },
        { label: 'Nom', type: 'text', name: 'nom', required: true },
        { label: 'Prénom', type: 'text', name: 'prenom', required: false },
        { label: 'Taille', type: 'number', name: 'taille', required: true},
        { label: 'Poids', type: 'number', name: 'poids', required: true},
        { label: 'Date de naissance', type: 'date', name: 'date_naissance', required: true },
        { label: 'Statut', type: 'select', name: 'statut', required: true, options: [
            { value: 'Actif', label: 'Actif' },
            { value: 'Blessé', label: 'Blessé' },
            { value: 'Absent', label: 'Absent' },
            { value: 'Suspendu', label: 'Suspendu' }
        ]},           
        { label: 'Commentaire', type: 'textarea', name: 'commentaire', required: false }   
    ];

    function handleSubmit(data) {
        console.log(data);
    }
</script>

<Form {fields} onSubmit={handleSubmit} title="Ajouter un joueur"/>

<button on:click={resquestdata}>Get data</button>