<script> 
    import Form from '$lib/components/Form.svelte';

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