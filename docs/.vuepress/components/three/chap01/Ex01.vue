<template>
    <div class="example">
        <div id="dom" style="width:100%; height:100%"></div>
    </div>
</template>

<script setup>
import { ThreeLayer } from '../ThreeLayer'
import { onMounted, ref } from 'vue';

onMounted(()=>{
    const container = document.getElementById('dom');
    if(!container)
        return;

    const threeLayer = new ThreeLayer('chap01-ex01', container);
})
</script>

<style>
.example {
    position: relative;
    width: 100%;
    height: 300px;
    padding: 0px;
}

.dg {
    position: absolute !important;
    right: 0px;
}

</style>
