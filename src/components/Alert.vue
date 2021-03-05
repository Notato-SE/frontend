<template>
    <div class="m-4">
      <v-alert v-if="success" type="success">
        {{message}}
      </v-alert>
      <v-alert v-if="error" type="error">
         {{message}}
      </v-alert>
    </div>
    
</template>
<script>
export default {
    name: 'Alert',
    props: ['success', 'message', 'error']
}
</script>