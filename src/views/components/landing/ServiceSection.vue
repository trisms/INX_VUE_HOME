<template>
  <section class="bg-[#111217] py-[25px] px-[15px] text-white">
    <div class="max-w-[1280px] mx-auto">

      <!-- TODO: 서비스 카드 -->
      <section class="svc-wrap" data-name="Service">

        <!-- Header Text -->
        <div class="text-center">
          <p class="text-[#9763f0]  text-[18px] tracking-[-0.54px]">SERVICE</p>
          <p class=" text-[40px] tracking-[-1.2px] font-bold">INX의 서비스</p>
        </div>

        <!-- Content Blocks -->
        <div class="svc-blocks" data-name="서비스">

          <!-- ===== Row 1 ===== -->
          <div class="svc-row" data-name="contents">
            <!-- Left Quote Text -->
            <div class="svc-quote" data-name="text">
              <div class="relative w-full">
                <div class="content-stretch flex gap-[4px] items-start py-[8px] relative shrink-0 w-full justify-center ">
                  <div aria-hidden="true" class="absolute border-[#353841] border-b border-solid border-t inset-0 pointer-events-none"></div>

                  <!-- double quote left (빈 path 유지) -->
                  <div class="relative shrink-0 size-[24px]" aria-hidden="true">
<!--                    <svg class="block size-full" viewBox="0 0 24 24" fill="none">
                      <path d="" fill="white"></path>
                    </svg>-->
                    <img src="@/assets/img/inx/ri_double-quotes-l.png">
                  </div>

                  <p class="css-ew64yg svc-quote-text font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[#c9ff7e] text-[19px] text-center tracking-[-0.6px]">
                    클라이언트가 기술은 있는데
                  </p>
                </div>
              </div>

              <div class="relative w-full">
                <div aria-hidden="true" class="absolute border-[#353841] border-b border-solid inset-0 pointer-events-none"></div>
                <div class="content-stretch flex gap-[4px] items-start py-[8px] relative w-full svc-indent pl-[27px] justify-center">
                  <p class="css-ew64yg svc-quote-text font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[#c9ff7e] text-[19px] text-center tracking-[-0.6px]">
                    고객들에게 노출되는 서비스가 없을 때
                  </p>
                  <!-- double quote right (빈 path 유지) -->
                  <div class="relative shrink-0 size-[24px]" aria-hidden="true">
<!--                    <svg class="block size-full" viewBox="0 0 24 24" fill="none">
                      <path d="" fill="white"></path>
                    </svg>-->
                    <img src="@/assets/img/inx/ri_double-quotes-r.png">
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Service Cards (3) -->
            <div class="svc-cards" data-name="제공서비스">

              <!-- Card 1 -->
              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]" data-name="제공서비스">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="content-stretch flex flex-col items-start relative w-full">

                    <!-- Image -->
                    <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative shrink-0 w-full">
                      <div class="absolute inset-[-10px_-14px]">
                        <img src="@/assets/img/inx/service/img.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                        <div class="absolute bg-[#353841] inset-0 mix-blend-color"></div>
                        <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                      </div>
                      <!--                                        <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                                  <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                      Journey<br />Map
                                                                  </p>
                                                              </div>-->
                    </div>

                    <!-- Text -->
                    <div class=" relative w-full">
                      <div class="content-stretch flex flex-col gap-[4px] items-start p-[16px] w-full">
                        <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[18px] text-white tracking-[-0.54px] w-full text-center sm:text-left">
                          고객 여정 설계
                        </p>
                        <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] leading-[1.6] text-[#f0f3f6] text-[16px] tracking-[-0.32px] w-full text-center sm:text-left">
                          고객이 우리 서비스를 어떻게 만나고 구매하는지 단계별 경험 지도
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute border border-[rgba(255,255,255,0.2)] inset-0 pointer-events-none rounded-[8px]"></div>
              </div>

              <!-- Card 2 -->
              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]" data-name="제공서비스">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="content-stretch flex flex-col items-start relative w-full">
                    <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative shrink-0 w-full">
                      <div class="absolute inset-[-10px_-14px]">
                        <img src="@/assets/img/inx/service/img2.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                        <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                        <div class="absolute bg-black inset-0 mix-blend-hue"></div>
                      </div>
                      <!--                                        <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                                  <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                      Service<br />Strategy
                                                                  </p>
                                                              </div>-->
                    </div>

                    <div class=" relative w-full">
                      <div class="content-stretch flex flex-col gap-[4px] items-start p-[16px] w-full">
                        <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[18px] text-white tracking-[-0.54px] w-full text-center sm:text-left">
                          서비스 전략
                        </p>
                        <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] leading-[1.6] text-[#f0f3f6] text-[16px] tracking-[-0.32px] w-full text-center sm:text-left">
                          누구에게, 무엇을, 어떻게 팔 것인지 핵심 방향 수립
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute border border-[rgba(255,255,255,0.2)] inset-0 pointer-events-none rounded-[8px]"></div>
              </div>

              <!-- Card 3 -->
              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]" data-name="제공서비스">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="content-stretch flex flex-col items-start relative w-full">
                    <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative shrink-0 w-full">
                      <div class="absolute inset-[-10px_-14px]">
                        <img src="@/assets/img/inx/service/img3.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                        <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                      </div>
                      <!--                                        <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                                  <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                      Business<br />Modeling
                                                                  </p>
                                                              </div>-->
                    </div>

                    <div class=" relative w-full">
                      <div class="content-stretch flex flex-col gap-[4px] items-start p-[16px] w-full">
                        <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[18px] text-white tracking-[-0.54px] w-full text-center sm:text-left">
                          비즈니스 모델링
                        </p>
                        <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] leading-[1.6] text-[#f0f3f6] text-[16px] tracking-[-0.32px] w-full text-center sm:text-left">
                          수익 구조와 운영 방식을지속가능하게 설계
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute border border-[rgba(255,255,255,0.2)] inset-0 pointer-events-none rounded-[8px]"></div>
              </div>

            </div>
          </div>

          <!-- ===== Row 2 ===== -->
          <div class="svc-row" data-name="contents">

            <div class="svc-quote">
              <div class="relative w-full">
                <div class="content-stretch flex gap-[4px] items-start py-[8px] relative w-full justify-center ">
                  <div aria-hidden="true" class="absolute border-[#353841] border-b border-solid border-t inset-0 pointer-events-none"></div>
                  <div class="relative shrink-0 size-[24px]" aria-hidden="true">
                    <img src="@/assets/img/inx/ri_double-quotes-l.png">
                  </div>
                  <p class="css-ew64yg svc-quote-text font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[#c9ff7e] text-[19px] text-center tracking-[-0.6px]">
                    서비스가 있기는 한데
                  </p>
                </div>
              </div>

              <div class="relative w-full">
                <div aria-hidden="true" class="absolute border-[#353841] border-b border-solid inset-0 pointer-events-none"></div>
                <div class="content-stretch flex gap-[4px] items-start py-[8px] relative w-full svc-indent pl-[27px] justify-center ">
                  <p class="css-ew64yg svc-quote-text font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[#c9ff7e] text-[19px] text-center tracking-[-0.6px]">
                    사용자가 어떻게 쓰는지 이해하지 못할 때
                  </p>
                  <div class="relative shrink-0 size-[24px]" aria-hidden="true">
                    <img src="@/assets/img/inx/ri_double-quotes-r.png">
                  </div>
                </div>
              </div>
            </div>

            <div class="svc-cards" data-name="제공서비스">
              <!-- 4 cards -->
              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img4.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                UX<br />Planning
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">UX 기획</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">고객이 쉽고 편하게 쓰도록 경로 설계</p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>

              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img5.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                UI System<br />Definition
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">UI 시스템 정의</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">우리만의 통일된 디자인 규칙 만들기</p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>

              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img6.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                Prototyping
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">프로토타이핑</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">개발 전 미리 만들어보고 테스트</p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>

              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img7.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.4)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                Policy<br />Development
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">정책 만들기·정리</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">서비스 운영에 필요한 약관·규정 정리</p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>
            </div>
          </div>

          <!-- ===== Row 3 ===== -->
          <div class="svc-row" data-name="contents">
            <div class="svc-quote">
              <div class="relative w-full">
                <div class="content-stretch flex gap-[4px] items-start py-[8px] relative w-full justify-center ">
                  <div aria-hidden="true" class="absolute border-[#353841] border-b border-solid border-t inset-0 pointer-events-none"></div>
                  <div class="relative shrink-0 size-[24px]" aria-hidden="true">
                    <img src="@/assets/img/inx/ri_double-quotes-l.png">
                  </div>
                  <p class="css-ew64yg svc-quote-text font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[#c9ff7e] text-[19px] tracking-[-0.6px]">정부 지원 과제가 있는데</p>
                </div>
              </div>
              <div class="relative w-full">
                <div aria-hidden="true" class="absolute border-[#353841] border-b border-solid inset-0 pointer-events-none"></div>
                <div class="content-stretch flex gap-[4px] items-start py-[8px] relative w-full svc-indent pl-[27px] justify-center ">
                  <p class="css-ew64yg svc-quote-text font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[#c9ff7e] text-[19px] tracking-[-0.6px]">
                    자사 제품/기술로 무엇을 만들지 막막할 때
                  </p>
                  <div class="relative shrink-0 size-[24px]" aria-hidden="true"> <img src="@/assets/img/inx/ri_double-quotes-r.png"></div>
                </div>
              </div>
            </div>

            <div class="svc-cards">
              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img8.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                Grant<br />Consulting
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">지원사업 컨설팅</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">
                        과제 목표에 맞는 결과물 기획부터 보고서 작성까지 전 과정 지원
                      </p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>

              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img9.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                Networking
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">협력사·고객 네트워크 만들기</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">
                        기술을 활용할 파트너·고객 발굴하고 지속 가능한 협력 구조 만들기
                      </p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>
            </div>
          </div>

          <!-- ===== Row 4 ===== -->
          <div class="svc-row" data-name="contents">
            <div class="svc-quote">
              <div class="relative w-full">
                <div class="content-stretch flex gap-[4px] items-start py-[8px] relative w-full justify-center ">
                  <div aria-hidden="true" class="absolute border-[#353841] border-b border-solid border-t inset-0 pointer-events-none"></div>
                  <div class="relative shrink-0 size-[24px]" aria-hidden="true"> <img src="@/assets/img/inx/ri_double-quotes-l.png"></div>
                  <p class="css-ew64yg svc-quote-text font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[#c9ff7e] text-[19px] tracking-[-0.6px]">현장 운영은 돌아가는데</p>
                </div>
              </div>
              <div class="relative w-full">
                <div aria-hidden="true" class="absolute border-[#353841] border-b border-solid inset-0 pointer-events-none"></div>
                <div class="content-stretch flex gap-[4px] items-start py-[8px] relative w-full svc-indent pl-[27px] justify-center ">
                  <p class="css-ew64yg svc-quote-text font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[#c9ff7e] text-[19px] tracking-[-0.6px]">
                    직원, 관리자에게 보이는 시스템이 없을 때
                  </p>
                  <div class="relative shrink-0 size-[24px]" aria-hidden="true"> <img src="@/assets/img/inx/ri_double-quotes-r.png"></div>
                </div>
              </div>
            </div>

            <div class="svc-cards">
              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img10.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                Management<br />System
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">내부 관리 시스템</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">
                        업무 흐름을 디지털로 옮겨 실시간 확인·관리 가능하게
                      </p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>

              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img11.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                Dashboard
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">대시보드</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">
                        핵심 지표를 한눈에 보고 빠르게 의사결정할 수 있도록
                      </p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>

              <div class="svc-card relative rounded-[8px] bg-[rgba(255,255,255,0.2)]">
                <div class="overflow-hidden rounded-[inherit]">
                  <div class="bg-[#111217] svc-img h-[178px] overflow-hidden relative">
                    <div class="absolute inset-[-10px_-14px]">
                      <img src="@/assets/img/inx/service/img12.png" alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div class="absolute bg-[rgba(0,0,0,0.2)] inset-0"></div>
                    </div>
                    <!--                                    <div class="absolute left-[16px] right-[16px] top-1/2 -translate-y-1/2 flex items-center justify-center lg:justify-start">
                                                            <p class="css-ew64yg font-['Roboto_Serif:Medium',sans-serif] font-medium leading-[1.4] text-[28px] text-center text-white tracking-[-0.84px]">
                                                                Team Tools
                                                            </p>
                                                        </div>-->
                  </div>
                  <div class="">
                    <div class="p-[16px] flex flex-col gap-[4px]">
                      <p class="css-4hzbpn svc-card-title font-['Pretendard:Bold',sans-serif] text-[18px] text-white tracking-[-0.54px] text-center sm:text-left">조직운영 도구 설계</p>
                      <p class="css-4hzbpn svc-card-desc font-['Pretendard:Regular',sans-serif] text-[16px] text-[#f0f3f6] tracking-[-0.32px] leading-[1.6] text-center sm:text-left">
                        우리 회사 방식에 맞춘 직원 소통·협업 시스템 구축
                      </p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" class="absolute inset-0 border border-[rgba(255,255,255,0.2)] rounded-[8px] pointer-events-none"></div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const svc1 = new URL('@/assets/img/inx/service/img.png', import.meta.url).href
const dq = new URL('@/assets/img/inx/ri_double-quetes-l.png', import.meta.url).href
const dr = new URL('@/assets/img/inx/ri_double-quetes-r.png', import.meta.url).href
// const svc2 = new URL('@/assets/img/inx/service/img-2.png', import.meta.url).href
// ...
</script>
