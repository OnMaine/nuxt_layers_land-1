<template>
    <div class="test">
        <h1 class="original">Original page on <b>Site 1</b></h1>

        <UI-First class="first" />
        <UI-Second class="second" />
        <Third class="third" />

        <div>
            <h2>Show value from composable: </h2>
            <p>{{ test }}</p>
        </div>

        <nuxt-link to="/test" class="link">test page from Lib</nuxt-link>
    </div>
</template>

<script setup>

definePageMeta({
 layout: 'main',
});

const test = useTest();

log();
</script>

<style scoped>
.test {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    color: red;
    font-size: 20px;
    text-align: center;
}

.first {
    padding: 3px;
    background: #35495e;
    color: white;
}

.link {
    margin: 20px;
}
</style>