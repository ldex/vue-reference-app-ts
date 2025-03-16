<script setup lang="ts">
interface Props {
  message?: string;
}

defineProps<Props>();
</script>

<template>
    <div>
        <h2>
            Error!
        </h2>
        <p>
            {{ message }}
        </p>
    </div>
</template>