<script>
    let { fieldsType, title, selectedData = null} = $props();

    import { preRequest, API_APP_BASE } from '$lib/utils';

    let fields = $state([]);
    let showModal = $state(false);
    let apiEndpoint = '';
    let actionType = $state('');


    switch (fieldsType) {
        case 'Joueur':
            fields = [
                { label: "ID Joueur", type: 'number', name: 'ID_Joueur', required: false, hidden: true },
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
            title = title || 'Gérer un joueur';
            break;
        case 'Match':
            fields = [];
            break;
        case 'Selection':
            fields = [];
            break;
        default:
            fields = [];
    }

    // Pré-remplir les champs si des données sont sélectionnées
    // svelte-ignore state_referenced_locally
    if (selectedData && actionType === 'Modifier') {
        // svelte-ignore state_referenced_locally
        fields.forEach((field) => {
            if (selectedData[field.name] !== undefined) {
                field.value = selectedData[field.name];
            }
        });
    }
    
    // svelte-ignore state_referenced_locally
    if (selectedData && actionType === 'Supprimer') {
        // svelte-ignore state_referenced_locally
        let _id = fields.find((field) => field.name === 'ID_Joueur'); // trouver le champ ID
        let id = _id.value; // récupérer la valeur de l'ID
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
            })
            .catch((err) => console.error(err));
    }

</script>

<div class="modal" style="display: {showModal ? 'block' : 'none'};">
    <div class="modal-content">
        <button type="button" class="close" onclick={() => showModal = false} aria-label="Close">&times;</button>
        <h2>{title}</h2>
        <form onsubmit={handleSubmit}>
            {#each fields as field}
                <div class="form-group" style="display: {field.hidden === true ? 'none' : 'block'};">
                    <label for={field.name} style="display: {field.hidden === true ? 'none' : 'block'};">{field.label}</label>
                    {#if field.type === 'textarea'}
                        <textarea id={field.name} name={field.name} required={field.required}></textarea>
                    {:else if field.type === 'select'}
                        <select id={field.name} name={field.name} required={field.required}>
                            {#each field.options as option}
                                <option value={option.value}>{option.label}</option>
                            {/each}
                        </select>
                    {:else}
                        <input type={field.type} id={field.name} name={field.name} required={field.required} />
                    {/if}
                </div>
            {/each}
            <button type="submit">{actionType}</button>
        </form>
    </div>
</div>

<div class="actions">
    <button onclick={() => { actionType = 'Ajouter'; showModal = true; }}>Ajouter un {fieldsType.toLowerCase()}</button>
    <button onclick={() => { actionType = 'Modifier'; showModal = true; }}>Modifier un {fieldsType.toLowerCase()}</button>
    <button onclick={() => { actionType = 'Supprimer'; showModal = true; }}>Supprimer un {fieldsType.toLowerCase()}</button>
</div>



<style>
    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-content {
        background-color: #fff;
        margin: 5% auto;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 60%;
        max-width: 600px;
    }
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
    .form-group {
        margin-bottom: 15px;
    }
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .form-group textarea {
        resize: none;
        height: 120px;
    }
    button[type="submit"] {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    button[type="submit"]:hover {
        background-color: #45a049;
    }
</style>