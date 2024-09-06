<template>
    <div class="test">
        <h1 class="original">Original page</h1>

        <UI-First />
        <UI-Second />
        <Third/>

        <nuxt-link to="/test">test page from Lib</nuxt-link>
    </div>
</template>

<script setup>

definePageMeta({
 layout: 'main',
});

useTest();

log();
</script>

<style scoped>
.test {
    padding: 20px;
}

h1 {
    color: red;
    font-size: 20px;
    text-align: center;
}
</style>