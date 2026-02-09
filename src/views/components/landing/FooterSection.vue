<template>
  <footer class="footer" aria-label="Footer">
    <section class="section" aria-label="Footer Section">
      <!-- Background -->
      <div class="section__bg" aria-hidden="true">
        <div class="base"></div>
        <!-- <img :src="bgImg" alt="" /> -->
      </div>

      <!-- LEFT: BRAND -->
      <section class="brand" aria-label="Brand">
        <div class="mock" aria-hidden="true">
          <img :src="inxCard" alt="" />
        </div>

        <div class="brandmsg" aria-label="Brand message">
          <div class="msgline">
            <div class="leftpad">
              <div class="badge" aria-hidden="true">I</div>
              <div class="word">nsight driven</div>
            </div>
          </div>

          <div class="msgline">
            <div class="leftpad">
              <div class="badge n" aria-hidden="true">N</div>
              <div class="word">avigated by emphathy</div>
            </div>
          </div>

          <div class="msgline">
            <div class="word single">e</div>
            <div class="badge x" aria-hidden="true">X</div>
            <div class="word">perience shaped</div>
          </div>
        </div>
      </section>

      <!-- RIGHT: INFOS -->
      <aside class="infos" aria-label="Infos">
        <div class="infos__contact" aria-label="INX Contact">
          <!-- ✅ 같이 움직일 레이어: captions + paper -->
          <div class="contact-float" aria-hidden="true">
            <!-- captions -->
            <div class="caption tel">
              <span class="icon" aria-hidden="true"> <img src="@/assets/img/inx/icon/Tel.png"></span>
              <p>Tel.</p>
            </div>

            <div class="caption fax">
              <span class="icon" aria-hidden="true"> <img src="@/assets/img/inx/icon/Fax.png"></span>
              <p>Fax</p>
            </div>

            <div class="caption email">
              <span class="icon" aria-hidden="true"> <img src="@/assets/img/inx/icon/Email.png"></span>
              <p>Email</p>
            </div>

            <div class="caption ig">
              <span class="icon" aria-hidden="true"> <img src="@/assets/img/inx/icon/Instagram.png"></span>
              <p>Instagram</p>
            </div>

            <!-- paper overlay -->
            <div class="paper" aria-hidden="true">
              <div class="subtract">
                <img :src="cardImg" alt="" />
              </div>
            </div>
          </div>

          <!-- ✅ 고정 레이어: 텍스트 박스(전화/메일/인스타) -->
          <div class="info-info">
            <div class="telfax">
              <div class="tel">
                <div class="textbox">
                  <div class="pad"><p>02-6223-6003</p></div>
                </div>
              </div>

              <div class="fax">
                <div class="textbox">
                  <div class="pad"><p>02-6223-6004</p></div>
                </div>
              </div>
            </div>

            <div class="email">
              <div class="row-link">
                <div class="textbox" style="flex: 1 0 0">
                  <div class="pad"><p>inx@i-nx.com</p></div>
                </div>
                <a
                    class="openpage"
                    href="https://www.instagram.com/inx_design_consulting/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open INX Instagram (new tab)"
                >
                  <div class="openlink" aria-hidden="true">
                    <img src="@/assets/img/inx/icon/OpenLink.png">
                  </div>
                </a>
              </div>
            </div>

            <div class="instagram">
              <div class="row-link">
                <div class="textbox" style="flex: 1 0 0">
                  <div class="pad"><p>@inx_design_consulting</p></div>
                </div>
                <a
                    class="openpage"
                    href="https://www.instagram.com/inx_design_consulting/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open INX Instagram (new tab)"
                >
                  <div class="openlink" aria-hidden="true">
                    <img src="@/assets/img/inx/icon/OpenLink.png">
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Address panel -->
        <div class="infos__address" aria-label="INX Address">
          <div class="add">
            <div class="caption-inline">
              <span class="icon" aria-hidden="true">
                <i class="fa fa-address"></i>
              </span>
              <span>Address</span>
            </div>

            <div class="addr">
              <p class="kor">
                07237 서울특별시 영등포구 여의나루로 53-1,<br />
                대오빌딩 505호
              </p>

              <p class="eng" aria-label="English address">
                <span>505 Daeo Building</span><i aria-hidden="true"></i>
                <span>53-1 Yeouinaru-ro</span><i aria-hidden="true"></i>
                <span>Yeongdeungpo-gu, Seoul</span><i aria-hidden="true"></i>
                <span>Republic of Korea</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </footer>
</template>

<script setup lang="ts">
const inxCard = new URL('@/assets/img/inx/INX-card.png', import.meta.url).href
const cardImg = new URL('@/assets/img/inx/cardImg.png', import.meta.url).href
// const bgImg = new URL('@/assets/img/inx/footer-bg.png', import.meta.url).href
</script>
