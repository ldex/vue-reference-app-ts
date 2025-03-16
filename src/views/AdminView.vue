<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
    <div>
        <h2>Admin Page</h2>
        <div>
            Hello {{ userStore.username }}
        </div>
    </div>
</template>

<style lang="css" scoped>
</style>