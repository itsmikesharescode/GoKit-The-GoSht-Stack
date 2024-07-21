<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card';
	import { flip } from 'svelte/animate';

	const { data } = $props();
</script>

<div class="mx-auto mt-[10dvh] p-[1rem] sm:max-w-[450px]">
	<h4 class="p-[10px] text-center text-[1.5rem] font-semibold">GO + SvelteKit + Bun Adapter</h4>
	<form method="post" action="?/sendTodo" use:enhance class="flex items-center gap-[5px]">
		<Input name="myTodo" placeholder="Enter todo" />
		<Button type="submit">Send</Button>
	</form>

	<div class="mt-[20px] grid gap-[10px]">
		{#each data.todos ?? [] as todo (todo.id)}
			<div class="" animate:flip={{ duration: 1000 }}>
				<Card.Root>
					<Card.Header>
						<Card.Title>{todo.id}</Card.Title>
						<Card.Description>{todo.title}</Card.Description>
					</Card.Header>

					<Card.Footer class="flex items-center justify-end gap-[5px]">
						<form
							method="post"
							action="?/updateTodo"
							use:enhance
							class="flex items-center gap-[5px]"
						>
							<input name="todoSerial" type="hidden" value={JSON.stringify(todo)} />
							<Input name="updatedTitle" placeholder="Update todo" />
							<Button type="submit">Update</Button>
						</form>

						<form method="post" action="?/deleteTodo" use:enhance>
							<input name="todoId" type="hidden" value={todo.id} />
							<Button type="submit">Delete</Button>
						</form>
					</Card.Footer>
				</Card.Root>
			</div>
		{/each}
	</div>
</div>
