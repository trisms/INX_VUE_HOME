<template>
  <div id="header" class="header navbar navbar-transparent navbar-fixed-top navbar-expand-lg">
    <!-- begin container -->
    <div class="container" id="container" style="max-width: 1950px;">
      <!-- begin navbar-brand -->
      <a href="index.html" class="navbar-brand">
        <span class="brand-logo"></span>
        <span class="brand-text">
          <span class="text-theme">INX</span>
					</span>
      </a>
      <!-- end navbar-brand -->
      <!-- begin navbar-toggle -->
      <button type="button" class="navbar-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#header-navbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!-- end navbar-header -->

      <!-- begin navbar-collapse -->
      <div class="collapse navbar-collapse" id="header-navbar">

        <ul class="nav navbar-nav navbar-end ">
          <li class="nav-item"><a class="nav-link" href="#about" data-click="scroll-to-target">프로젝트</a></li>
          <li class="nav-item"><a class="nav-link" href="#team" data-click="scroll-to-target">문의하기</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link active" href="#home" data-click="scroll-to-target" data-scroll-target="#home">회사소개서 <i class="fa fa-download"></i>

            </a>
          </li>
        </ul>
      </div>
      <!-- end navbar-collapse -->
    </div>
    <!-- end container -->
  </div>
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style scoped>
.header {
  background-color: rgb(240, 243, 246);
}
#container  {
  z-index: 9999;
  align-content: stretch;
  background-color: rgb(240, 243, 246);
}

#container .css-8y81po {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 28px 16px;
}
#container .css-8y81po {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 28px 16px;
}
#container .css-86reuw {
  left: 0px;
  right: 0px;
  top: 0px;
}
#container .css-8y81po {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 28px 16px;
}
#container .css-fw14c {
  z-index: 9999;
  align-content: stretch;
  background-color: #f0f3f6;
}
#container .css-86reuw {
  left: 0px;
  right: 0px;
  top: 0px;
}
</style>
