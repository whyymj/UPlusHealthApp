<template>
    <div>
        <h1>睡眠状况测试</h1>
        <bar></bar>
        <list></list>
    </div>
</template>

<script>
    import bar from './progressBar';
    import list from './questionsList';
    export default {
        name: 'sleepTest',
        components: {
            bar,
            list
        }
    }
</script>

<style scoped>

</style>