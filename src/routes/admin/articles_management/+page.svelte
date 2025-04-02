<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	let { data } = $props();
</script>
<section class="flex-1 ">

  <!-- Main Content -->
  <div class="flex-grow p-6 bg-black text-white  shadow-lg mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-extrabold">All Articles</h1>
      <a href="/admin/articles_management/new" class="text-blue-400 hover:underline text-lg font-medium">Upload a new Article</a>
    </div>

    <div class="space-y-4">
      {#each data.articles as article (article.id)}
        <div class="flex p-4 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 transition-transform transform hover:scale-105" transition:slide>
          <!-- Image Section -->
          <div class="flex-shrink-0 mr-4">
            <img src={article.image} alt="" class="w-24 h-24 object-cover rounded-lg border border-zinc-700 shadow-md" />
          </div>

          <!-- Details Section -->
          <div class="flex-grow">
            <p class="text-gray-500 text-xs mt-1">Article ID: {article.id}</p>
            <p class="text-white font-semibold text-xl mt-1">{article.author}</p>
            <p class="text-gray-300 text-base mt-2 leading-relaxed">{article.description}</p>
          </div>

          <!-- Delete Button -->
          <form action="?/deleteArticle" method="POST" use:enhance class="flex justify-end items-center">
            <input type="hidden" name="id" value={article.id} />
            <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200">Delete</button>
          </form>
        </div>
      {/each}
    </div>
  </div>
  </section>