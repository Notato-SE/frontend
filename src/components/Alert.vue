<template>
    <div>
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
    data: () => {
      return {
         success: false,
         error: false
      }
    },
    props: ['message'],
    methods: 
    {
      alertSuccess()
      {
        this.success = true;
        this.error = false;
      },
      alertError()
      {
        this.error = true;
        this.success = false;
      }
    }
}
</script>