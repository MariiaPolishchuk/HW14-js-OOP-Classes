class TodoList {
    constructor(el) {
        this.todos = [];
        this.list = el.children.list;
        this.input = el.children[0].children[0];
        el.addEventListener('click', (e) => {
            switch (e.target.dataset.action) {
                case 'status':
                    this.changeStatus(e.target.parentElement.dataset.id)
                    break;
                case 'delete':
                    this.removeTodo(e.target.parentElement.dataset.id)
                    break;
                case 'create':
                    if (this.input.value.length > 0) {
                        this.addTodo(new Task(input.value, false))
                    }
                    break;
                case 'find':
                    if (this.input.value.length > 0) {
                        this.findTasks(this.input.value);
                    }
                    break;
            }
        });
    }

    addTodo(todo) {
        if (this.checkDuplicate(todo.value)) {
            alert('Element exists');
            return;
        }

        this.todos.push(todo);
        this.render(this.todos);
    }

    removeTodo(id) {
        this.todos = this.todos.filter(el => el.id !== id);
        this.render(this.todos);
    }

    getTodos() {
        return this.todos;
    }

    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = !this.todos[index].status;
        this.render(this.todos);
    }

    checkDuplicate(value) {
        return this.todos.some(item => item.value === value);
    }

    findTasks(value) {
        this.render(
            this.todos.filter(item => item.value.includes(value))
        );
    }


    render(tasks = []) {
        let lis = '';
        for (let el of tasks) {
            if (!el) {
                return;
            }
            lis += `<li class="${el.status ? 'done' : 'in-progress'}" data-id="${el.id}">
                    ${el.value} <button class="btn btn-secondary btn-sm set-status" data-action="status">Change status</button> 
                    <button class="btn btn-danger btn-sm delete-task" data-action="delete">Delete</button>
                    <button class="btn btn-light btn-sm" data-action="up">Up</button>
                    <button class="btn btn-light btn-sm" data-action="down">Down</button>
                    </li>`;
        }
        this.list.innerHTML = lis;
    }
}

class Task {
    constructor(value, status) {
        this.value = value;
        this.status = status;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

const todoBlock = document.getElementById('todo');
const todo1 = new TodoList(todoBlock);

todo1.addTodo(new Task('Go shopping', true));
todo1.addTodo(new Task('Buy some food', false));
todo1.addTodo(new Task('Read a book', false));
todo1.addTodo(new Task('Take a rest', false));

todo1.render(todo1.getTodos());