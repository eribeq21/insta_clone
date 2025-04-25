<script>
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '../app.css'; // Import global styles
	let { children } = $props(); // Access child content
</script>
<!-- Render child components inside this layout -->
{@render children()}
