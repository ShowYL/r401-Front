<script>
    let { fieldsType, title, selectedData = null, resquestdata = null} = $props();

    import { preRequest, API_APP_BASE } from '$lib/utils';

    let fields = $state([]);
    let showModal = $state(false);
    let apiEndpoint = '';
    let actionType = $state('');
    let modalBool = $state(true);


    switch (fieldsType) { 
        case 'Joueur':
            fields = [
                { label: "ID Joueur", type: 'number', name: 'Id_Joueur', required: false, hidden: true },
                { label: "Licence", type: 'text', name: 'licence', required: true },
                { label: 'Nom', type: 'text', name: 'nom', required: true },
                { label: 'Prénom', type: 'text', name: 'prenom', required: true },
                { label: 'Taille (cm)', type: 'number', name: 'taille', required: true },
                { label: 'Poids (kg)', type: 'number', name: 'poids', required: true },
                { label: 'Date de naissance', type: 'date', name: 'date_naissance', required: true },
                { label: 'Statut', type: 'select', name: 'statut', required: true, options: [
                    { value: 'Actif', label: 'Actif' },
                    { value: 'Blessé', label: 'Blessé' },
                    { value: 'Absent', label: 'Absent' },
                    { value: 'Suspendu', label: 'Suspendu' }
                ]},
                { label: 'Commentaire', type: 'textarea', name: 'commentaire', required: false }
            ];
            apiEndpoint = API_APP_BASE+'endpointJoueur.php';
            title = title || 'Gérer un Joueur';
            break;
        case 'Match':
            fields = [
                { label: "ID Match", type: 'number', name: 'Id_Match', required: false, hidden: true },
                { label: "Date", type: 'date', name: 'Date_Match', required: true },
                { label: 'Heure', type: 'time', name: 'Heure_Match', required: true },
                { label: 'Adversaire', type: 'text', name: 'Equipe_Adverse', required: true },
                { label: 'Lieu', type: 'select', name: 'Lieu', required: true, options: [
                    { value: 'Domicile', label: 'Domicile' },
                    { value: 'Exterieur', label: 'Exterieur' }
                ]},
                { label: 'Résultat', type: 'select', name: 'Résultat', required: false, options: [
                    { value: 'Victoire', label: 'Victoire' },
                    { value: 'Défaite', label: 'Défaite' },
                    { value: 'Match nul', label: 'Match nul' }
                ]}
            ];
            apiEndpoint = API_APP_BASE+'endpointMatch.php';
            title = title || 'Gérer un Match';
            break;
        case 'Selection':
            let allJoueurs = [];
            fetch(API_APP_BASE+'endpointJoueur.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': preRequest('token'),
                },
            })
                .then((res) => res.json())
                .then((donnee) => { 
                    allJoueurs = donnee.data.map(joueur => ({
                        value: joueur.ID_Joueur,
                        label: `${joueur.Nom} ${joueur.Prénom}`
                    }));
                    fields = fields.map(field => 
                        field.name === 'Id_Joueur' ? { ...field, options: allJoueurs } : field
                    );
                    console.log(allJoueurs);
                });
                fields = [
                    {label : "ID Selection", type: 'number', name: 'Id_Selection', required: false, hidden: true},
                    {label : "ID Joueur", type: 'select', name: 'Id_Joueur', required: true, options: allJoueurs},
                    {label : "ID Match", type: 'text', name: 'ID_Match', required: true},
                    {label : "Titulaire", type: 'select', name: 'Titulaire', required: true, options: [
                        { value: '1', label: 'Oui' },
                        { value: '0', label: 'Non' }
                    ]},
                    {label : "Poste", type: 'select', name: 'Poste', required: true, options: [
                        { value: 'Pilier Gauche', label: 'Pilier Gauche' },
                        { value: 'Pilier Droit', label: 'Pilier Droit' },
                        { value: 'Talon', label: 'Talon' },
                        { value: 'Demi de mêlée', label: 'Demi de mêlée' },
                        { value: 'Centre', label: 'Centre' },
                        { value: 'Ailier Gauche', label: 'Ailier Gauche' },
                        { value: 'Ailier Droit', label: 'Ailier Droit' },
                    ]},
                    {label : "Note", type: 'textarea', name: 'Note', required: false}
                ];
            apiEndpoint = API_APP_BASE+'endpointSelection.php';
            title = title || 'Gérer une Sélection';
            break;
        default:
            fields = [];
            apiEndpoint = '';
            break;
    }

    // Pré-remplir les champs si des données sont sélectionnées
    function works() {
        switch (actionType) {
            case 'Ajouter':
                fields.forEach((field) => {
                    field.value = '';
                    field.readonly = false; // Rendre les champs modifiables
                });
                showModal = true;
                break;
                case 'Modifier':
                    if (selectedData && selectedData.length === 1) {
                        const firstRow = selectedData[0];
                        if (firstRow) {
                            fields.forEach((field, index) => {
                                // Vérifier si firstRow est un tableau (ancien format) ou un objet (format de Details.svelte)
                                if (Array.isArray(firstRow)) {
                                    // Comportement original pour un tableau (utilisé dans joueur/+page.svelte et match/+page.svelte)
                                    field.value = firstRow[index];
                                } else {
                                    // Nouveau comportement pour un objet (utilisé dans Details.svelte)
                                    if (firstRow[field.name] !== undefined) {
                                        field.value = firstRow[field.name];
                                    }
                                }
                                field.readonly = false; // Rendre les champs modifiables
                            });
                        }
                        showModal = true;
                    } else {
                        alert('Veuillez sélectionner une ligne à modifier');
                    }
                    break;
                    case 'Supprimer':
                        if (selectedData && selectedData.length === 1) {
                            // Si une seule ligne est sélectionnée, pré-remplir les champs avec les données de cette ligne
                            const firstRow = selectedData[0];
                            if (firstRow) {
                                fields.forEach((field) => {
                                    // Affiche uniquement les champs pertinents pour chaque type
                                    if (fieldsType === 'Joueur' && ['Id_Joueur', 'licence', 'nom', 'prenom'].includes(field.name)) {
                                        if (Array.isArray(firstRow)) {
                                            // Pour les tableaux
                                            const fieldIndex = fields.findIndex(f => f.name === field.name);
                                            field.value = firstRow[fieldIndex];
                                        } else {
                                            // Pour les objets
                                            if (firstRow[field.name] !== undefined) {
                                                field.value = firstRow[field.name];
                                            }
                                        }
                                        field.readonly = true; // Rendre les champs non modifiables
                                    } else if (fieldsType === 'Match' && ['Id_Match', 'Date_Match', 'Equipe_Adverse'].includes(field.name)) {
                                        if (Array.isArray(firstRow)) {
                                            const fieldIndex = fields.findIndex(f => f.name === field.name);
                                            field.value = firstRow[fieldIndex];
                                        } else {
                                            if (firstRow[field.name] !== undefined) {
                                                field.value = firstRow[field.name];
                                            }
                                        }
                                        field.readonly = true;
                                    } else if (fieldsType === 'Selection' && ['Id_Selection', 'Id_Joueur', 'ID_Match'].includes(field.name)) {
                                        if (Array.isArray(firstRow)) {
                                            const fieldIndex = fields.findIndex(f => f.name === field.name);
                                            field.value = firstRow[fieldIndex];
                                        } else {
                                            if (firstRow[field.name] !== undefined) {
                                                field.value = firstRow[field.name];
                                            }
                                        }
                                        field.readonly = true;
                                    } else {
                                        field.hidden = true; // Cache les autres champs
                                    }
                                });
                            }
                            showModal = true;
                        } else {
                            alert('Veuillez sélectionner une ligne à supprimer');
                        }
                        break;
            default:
                break;
        }
    }



    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        console.log(`Action: ${actionType}`);
        console.log(data);

        let method = '';
        switch (actionType) {
            case 'Ajouter':
                method = 'POST';
                break;
            case 'Modifier':
                method = 'PUT';
                break;
            case 'Supprimer':
                method = 'DELETE';
                break;
            default:
                return;
        }

        console.log(method);
        console.log(data);

        fetch(apiEndpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': preRequest('token'),
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((response) => {

                console.log(response);
                showModal = false;
                resquestdata();
            })
            .catch((err) => console.error(err));
    }

    function deleteDirectly() {
        if (selectedData) {
            const firstRow = selectedData[0]; // Récupère la première ligne sélectionnée
            if (firstRow) {
                let dataToDelete = {};
                if (Array.isArray(firstRow)) {
                    // Si firstRow est un tableau, on suppose que l'ID est à l'index 0
                    dataToDelete = { [fields[0].name]: firstRow[0] };
                } else {
                    // Si firstRow est un objet, on utilise le nom du champ correspondant
                    dataToDelete = { [fields[0].name]: firstRow[fields[0].name] };
                }
                fetch(apiEndpoint, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': preRequest('token'),
                    },
                    body: JSON.stringify(dataToDelete),
                })
                    .then((res) => res.json())
                    .then((response) => {
                        console.log('Suppression réussie:', response);
                        showModal = false;
                        alert('Donnée supprimée avec succès');
                        resquestdata();
                    })
                    .catch((err) => console.error('Erreur lors de la suppression:', err));
            }
        } 
    }


</script>

<div class="fixed z-10 inset-0 overflow-y-auto" style="display: {showModal ? 'block' : 'none'};">
    <div class="flex items-center justify-center min-h-screen bg-opacity-20">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <button type="button" class="text-gray-500 hover:text-gray-900 float-right text-2xl font-bold" onclick={() => showModal = false} aria-label="Close">&times;</button>
            <h2 class="text-xl font-bold mb-4">{title}</h2>
            <form onsubmit={handleSubmit}>
                {#each fields as field}
                    <div class="mb-4" style="display: {field.hidden === true ? 'none' : 'block'};">
                        <label for={field.name} class="block text-sm font-medium text-gray-700 mb-1" style="display: {field.hidden === true ? 'none' : 'block'};">{field.label}</label>
                        {#if field.type === 'textarea'}
                            <textarea id={field.name} name={field.name} required={field.required} readonly={field.readonly} class="w-full p-2 border border-gray-300 rounded-md">{field.value || ''}</textarea>
                        {:else if field.type === 'select'}
                            <select id={field.name} name={field.name} required={field.required} disabled={field.readonly} class="w-full p-2 border border-gray-300 rounded-md">
                                {#each field.options as option}
                                    <option value={option.value} selected={option.value === field.value}>{option.label}</option>
                                {/each}
                            </select>
                        {:else}
                            <input type={field.type} id={field.name} name={field.name} required={field.required} value={field.value || ''} readonly={field.readonly} class="w-full p-2 border border-gray-300 rounded-md" />
                        {/if}
                    </div>
                {/each}
                {#if actionType === 'Supprimer'}
                    <button type="button" onclick={deleteDirectly} class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Confirmer la suppression</button>
                {:else}
                    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">{actionType}</button>
                {/if}   
            </form>
        </div>
    </div>
</div>

<div class="flex gap-4 mt-5">
    <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onclick={() => { actionType = 'Ajouter'; works() }}>Ajouter {fieldsType}</button>
    <button class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600" onclick={() => { actionType = 'Modifier'; works() }}>Modifier {fieldsType}</button>
    <button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onclick={() => { actionType = 'Supprimer'; works(); }}>Supprimer {fieldsType}</button>
</div>
