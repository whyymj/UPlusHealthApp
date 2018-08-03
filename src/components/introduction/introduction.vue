<template>

  <div class="page introduction">
    <!-- <h-header title="海尔健康"></h-header> -->
    <div class="container">
      <div class="introduction-bg">
        <img src="../../assets/introduction-bg.jpg" alt="">
      </div>
      <div class="introduction-container">
        <div class="create-archives card-container text-center">
          <p>在体验海尔健康之前，<br/>
            先创建一份您专属的档案信息吧</p>
          <button class="default-btn" @click="createArchives">创建档案</button>
        </div>
        <div class="create-process card-container text-center">
          <div class="title">业务介绍</div>
          <div class="introduction-step">
            <img src="../../assets/introduction.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">

  export default {
    name: 'introduction',
    created () {
    },
    mounted () {
    },
    methods: {
      createArchives() {
        // this.$router.push({path: '/createCharacter'});
         this.$router.push({path: '/healthEntryMy'});
      }
    }
  }

</script>

<style lang="scss" scoped>
  .introduction {
    .introduction-bg {
      margin: 0 -.75rem;
    }
    .introduction-container {
      margin-top: -2rem;
      position: relative;
      padding-bottom: .25rem;
      .card-container {
      	box-shadow: 0 1px 5px 0 rgba(32,135,208,.15);
      }
      .create-archives {
        height: 7rem;
        border-radius: 5px;
        p {
          padding: 1.25rem 3.7rem;
          font-size: .7rem;
          color: #888888;
        }
        .default-btn {
          width: 14rem;
          height: 2rem;
          border-radius: 2px;
          font-size: .8rem;
          line-height: 2rem;
        }
      }
      .create-process {
        margin-top: .75rem;
        border-radius: 5px;
        padding: 0 1rem;
        .title {
          padding: .75rem 0 .5rem 0;
          font-size: .7rem;
          color: #888888;
          border-bottom: 1px solid #D7D8D6;
        }
      }
      .introduction-step {
        margin-top: 1.5rem;
      }
    }
  }
</style>
