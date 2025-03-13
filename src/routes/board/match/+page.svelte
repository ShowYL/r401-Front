<script> 
    import Form from '$lib/components/Form.svelte';

    let fields = [
        { label: "Date", type: 'date', name: 'date', required: true },
        { label: 'Heure', type: 'time', name: 'heure', required: true },
        { label: 'Adversaire', type: 'text', name: 'adversaire', required: false },
        { label: 'Lieu', type: 'select', name: 'lieu', required: false, options: [
            { value: 'Domicile', label: 'Domicile' },
            { value: 'Extérieur', label: 'Extérieur' }
        ]},
        { label: 'Résultat', type: 'select', name: 'resultat', required: true, options: [
            { value: 'Victoire', label: 'Victoire' },
            { value: 'Défaite', label: 'Nul' }
        ]}
    ];

    function handleSubmit(data) {
        console.log(data);
    }
</script>

<Form {fields} onSubmit={handleSubmit} title="Ajouter un match" />