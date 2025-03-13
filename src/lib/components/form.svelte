<script>
    export let title = '';
    export let fields = [];
    export let onSubmit = () => {};

    let showModal = false;

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        onSubmit(data);
        showModal = false;
    }
</script>


<div class="modal" style="display: {showModal ? 'block' : 'none'};">
    <div class="modal-content">
        <button type="button" class="close" on:click={() => showModal = false} aria-label="Close">&times;</button>
        <h2>{title}</h2>
        <form on:submit={handleSubmit}>
                {#each fields as field}
                    <div class="form-group">
                        <label for={field.name}>{field.label}</label>
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
                <button type="submit">Submit</button>
            </form>
    </div>
</div>

<button on:click={() => showModal = true}>Open Form</button> 

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