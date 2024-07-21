<script>
	import DarkMode from '$lib/components/general/dark-mode.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	const { children } = $props();
</script>

<ModeWatcher />
<div class="fixed right-0 top-0 m-5">
	<DarkMode />
</div>
{@render children()}
