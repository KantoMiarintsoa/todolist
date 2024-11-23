document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Ajouter une tâche
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = ''; // Réinitialise l'input après ajout
        }
    });

    // Fonction pour ajouter une tâche
    function addTask(taskText) {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.classList.add('task-text');

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('task-actions');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Éditer';
        editBtn.classList.add('edit-btn');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.classList.add('delete-btn');

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(actionsDiv);

        // Marquer comme terminé
        taskSpan.addEventListener('click', () => {
            taskSpan.classList.toggle('completed');
        });

        // Éditer une tâche
        editBtn.addEventListener('click', () => {
            const newTaskText = prompt('Modifier la tâche :', taskSpan.textContent);
            if (newTaskText) {
                taskSpan.textContent = newTaskText;
            }
        });

        // Supprimer une tâche
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        taskList.appendChild(li);
    }
});
