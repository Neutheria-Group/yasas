<template>
  <div class="has-text-centered has-text-danger">
    Authorization required
  </div>
  <div class="columns m-6">
    <div class="column is-10 is-4-widescreen is-5-desktop mx-auto">
      <div class="card">
        <div class="card-content">
          <div class="field">
            <label class="label" for="username">Username</label>
            <div class="control">
              <input type="text" id="username" class="input">
            </div>
          </div>
          <div class="field">
            <label class="label" for="password">Password</label>
            <div class="control">
              <input type="text" id="password" class="input">
            </div>
          </div>
          <button class="button is-primary is-fullwidth">
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    setup () {

    }
  });
</script>

<style>
</style>