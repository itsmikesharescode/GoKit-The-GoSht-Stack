import type { Todo } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const res = await fetch('http:///localhost:3000/api/todos');

		return {
			todos: (await res.json()) as { id: string; title: string; done: boolean }[] | null
		};
	} catch (error) {
		return {
			todos: null
		};
	}
};

export const actions: Actions = {
	sendTodo: async ({ request, fetch }) => {
		const myTodo = (await request.formData()).get('myTodo') as string;

		try {
			const res = await fetch('/api/todos', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: myTodo
				})
			});

			console.log(await res.json());
		} catch (error) {
			console.log(error);
		}
	},

	deleteTodo: async ({ request, fetch }) => {
		const todoId = (await request.formData()).get('todoId') as string;

		try {
			const res = await fetch(`/api/todos/${Number(todoId)}`, {
				method: 'delete'
			});

			console.log(await res.json());
		} catch (error) {
			console.log(error);
		}
	},

	updateTodo: async ({ request, fetch }) => {
		const formData = await request.formData();
		const todoSerial = formData.get('todoSerial') as string;
		const todo = JSON.parse(todoSerial) as Todo;
		const updatedTitle = formData.get('updatedTitle') as string;

		try {
			const res = await fetch(`/api/todos/${Number(todo.id)}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: todo.id,
					title: updatedTitle,
					done: todo.done
				})
			});

			console.log(await res.json());
		} catch (error) {
			console.log(error);
		}
	}
};
