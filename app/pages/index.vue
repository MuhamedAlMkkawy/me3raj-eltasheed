<template>
  <div
    class="homepage-view  w-full min-w-0 overflow-x-clip bg-[#1F2A30] font-['IBM_Plex_Sans_Arabic'] text-[#333333]"
    dir="rtl"
  >
    <!-- 1. HERO — full-width, fixed background -->
    <section
      class="hero-bg hero-full-bleed relative isolate flex items-center overflow-hidden bg-[#1F2A30] text-white"
      :style="{ backgroundImage: `url('${heroImage}')` }"
    >
      <!-- Overlays -->
      <div class="absolute inset-0 bg-[#1F2A30]/75"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#1F2A30] via-[#1F2A30]/50 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-l from-[#0F6F9E]/25 via-transparent to-transparent"></div>

      <div class="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="max-w-3xl space-y-7">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 rounded-full border border-[#2AA9E3]/40 bg-[#2AA9E3]/15 px-4 py-2 text-xs font-semibold text-[#2AA9E3] backdrop-blur-sm"
          >
            <i class="pi pi-verified text-sm"></i>
            <span>{{ homepage?.heroBadge || 'ريادة في المقاولات والبناء في المملكة العربية السعودية' }}</span>
          </div>

          <!-- Title -->
          <h1 class="font-display text-4xl font-bold leading-[1.2] text-white sm:text-5xl lg:text-6xl">
            {{ homepage?.heroTitle || 'نبني مستقبلاً مستداماً' }}
            <span class="mt-2 block text-[#2AA9E3]">
              {{ homepage?.heroHighlight || 'بإتقان هندسي رفيع' }}
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="max-w-2xl text-sm leading-loose text-[#C7D8E1] sm:text-base">
            {{ homepage?.heroSubtitle || 'شركة معراج التشييد تقدم حلولاً إنشائية ومعمارية متكاملة ترتقي بالمشاريع السكنية والتجارية والصناعية وفق كود البناء السعودي وأعلى معايير الجودة العالمية.' }}
          </p>

          <!-- Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-3">
            <NuxtLink :to="homepage?.heroCtaLink || '/projects'" class="btn-primary">
              <span class="btn-label">{{ homepage?.heroCtaText || 'استكشف مشاريعنا' }}</span>
              <span class="btn-dot"><i class="pi pi-arrow-left text-xs"></i></span>
            </NuxtLink>

            <NuxtLink :to="homepage?.heroSecondaryCtaLink || '/contact'" class="btn-ghost">
              <i class="pi pi-send text-xs"></i>
              <span>{{ homepage?.heroSecondaryCtaText || 'طلب عرض سعر' }}</span>
            </NuxtLink>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-3 pt-10 sm:grid-cols-4 sm:gap-4">
            <div
              v-for="st in (homepage?.stats || defaultStats)"
              :key="st.id"
              class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors duration-300 hover:border-[#2AA9E3]/50 hover:bg-white/10"
            >
              <div class="font-display flex items-center text-2xl font-bold text-[#2AA9E3] sm:text-3xl">
                <span>{{ st.number }}</span>
                <span>{{ st.suffix || '+' }}</span>
              </div>
              <div class="mt-1 text-xs font-medium text-[#C7D8E1]">{{ st.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom accent line -->
      <div class="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-l from-[#2AA9E3] via-[#0F6F9E] to-[#1F2A30]"></div>
    </section>

    <!-- 2. ABOUT -->
    <section class="bg-white py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <!-- Text -->
          <div class="space-y-6">
            <span class="section-pill">{{ homepage?.aboutBadge || 'من نحن' }}</span>

            <h2 class="font-display text-3xl font-bold leading-snug text-[#1F2A30] lg:text-4xl">
              {{ homepage?.aboutTitle || 'شريكك الهندسي الموثوق لتحويل الرؤى إلى منجزات شامخة' }}
            </h2>

            <p class="text-sm leading-loose text-[#44505A]">
              {{ homepage?.aboutDescription || 'تأسست شركة معراج التشييد للمقاولات العامة ككيان وطني سعودي متخصص في تنفيذ أضخم المشاريع الإنشائية والتطويرية. نجمع بين الكفاءة الهندسية المتقدمة والتنفيذ الاحترافي الملتزم بالجداول الزمنية والميزانيات المحددة.' }}
            </p>

            <div class="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              <div
                v-for="h in highlights"
                :key="h.text"
                class="group flex items-center gap-3 rounded-2xl border border-[#C7D8E1] bg-[#F5F9FB] p-3 transition-all duration-300 hover:border-[#2AA9E3] hover:bg-white hover:shadow-[0_10px_25px_-12px_rgba(42,169,227,0.35)]"
              >
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2AA9E3] ring-1 ring-[#C7D8E1] transition-colors group-hover:bg-[#2AA9E3] group-hover:text-[#1F2A30] group-hover:ring-[#2AA9E3]"
                >
                  <i :class="h.icon"></i>
                </span>
                <span class="text-xs font-bold text-[#1F2A30]">{{ h.text }}</span>
              </div>
            </div>

            <div class="pt-4">
              <NuxtLink to="/about" class="btn-outline">
                <span>المزيد عن مسيرتنا ورؤيتنا</span>
                <i class="pi pi-arrow-left text-xs"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- Image -->
          <div class="relative">
            <div
              class="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border-2 border-[#2AA9E3]/40"
            ></div>
            <div class="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(31,42,48,0.45)]">
              <img
                :src="homepage?.aboutImage1 || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80'"
                alt="تنفيذ هندسي لمشروع إنشائي"
                class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div
              class="absolute -bottom-6 -left-4 flex items-center gap-4 rounded-2xl bg-[#1F2A30] p-5 text-white shadow-xl ring-1 ring-[#2AA9E3]/60 sm:-left-6"
            >
              <div class="font-display text-4xl font-bold text-[#2AA9E3]">
                {{ homepage?.aboutYearsExperience || 15 }}+
              </div>
              <div class="text-xs font-medium leading-tight text-[#C7D8E1]">
                عاماً من الريادة<br />في التشييد والبناء
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. SERVICES -->
    <section class="border-y border-[#C7D8E1]/70 bg-[#F5F9FB] py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto mb-14 max-w-3xl space-y-4 text-center">
          <span class="section-pill">خدماتنا المعتمدة</span>
          <h2 class="font-display text-3xl font-bold text-[#1F2A30] lg:text-4xl">
            حلول مقاولات متكاملة بمواصفات قياسية
          </h2>
          <span class="mx-auto block h-1 w-12 rounded-full bg-[#2AA9E3]"></span>
          <p class="text-sm leading-loose text-[#44505A]">
            نقدم باقة واسعة من الخدمات الإنشائية المتخصصة التي تلبي تطلعات القطاعين الحكومي والخاص بأعلى مستويات الحرفية.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(srv, i) in services"
            :key="srv.id"
            class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#C7D8E1] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2AA9E3] hover:shadow-[0_25px_45px_-20px_rgba(15,111,158,0.35)]"
          >
            <!-- Faded index -->
            <span
              class="font-display pointer-events-none absolute left-5 top-3 text-6xl font-bold text-[#EAF6FC] transition-colors duration-300 group-hover:text-[#2AA9E3]/20"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <div class="relative space-y-4">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF6FC] text-2xl text-[#0F6F9E] ring-1 ring-[#2AA9E3]/20 transition-colors duration-300 group-hover:bg-[#2AA9E3] group-hover:text-[#1F2A30]"
              >
                <i :class="srv.icon || 'pi pi-briefcase'"></i>
              </div>

              <h3 class="font-display text-xl font-bold text-[#1F2A30] transition-colors group-hover:text-[#0F6F9E]">
                {{ srv.title }}
              </h3>

              <p class="text-[13px] leading-loose text-[#44505A]">
                {{ srv.shortDescription }}
              </p>

              <ul v-if="srv.features && srv.features.length > 0" class="space-y-2 pt-1">
                <li
                  v-for="(feat, fIdx) in srv.features.slice(0, 3)"
                  :key="fIdx"
                  class="flex items-center gap-2.5 text-xs text-[#44505A]"
                >
                  <span
                    class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2AA9E3]/15 text-[#2AA9E3]"
                  >
                    <i class="pi pi-check text-[8px]"></i>
                  </span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <div class="relative mt-6 border-t border-[#C7D8E1]/70 pt-5">
              <NuxtLink
                :to="`/services/${srv.slug}`"
                class="group/link flex items-center justify-between text-xs font-bold text-[#0F6F9E] transition-colors hover:text-[#1F2A30]"
              >
                <span>تفاصيل الخدمة والمواصفات</span>
                <span
                  class="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F9FB] transition-all group-hover/link:-translate-x-1 group-hover/link:bg-[#2AA9E3]"
                >
                  <i class="pi pi-arrow-left text-[10px]"></i>
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/services" class="btn-outline">
            <span>استعراض كافة الخدمات الهندسية</span>
            <i class="pi pi-arrow-left text-xs"></i>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. PROJECTS -->
    <section class="bg-white py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div class="space-y-4">
            <span class="section-pill">سجل الإنجازات</span>
            <h2 class="font-display text-3xl font-bold text-[#1F2A30] lg:text-4xl">أحدث المشاريع المشيّدة</h2>
            <p class="max-w-xl text-sm leading-loose text-[#44505A]">
              نماذج من منجزاتنا في مختلف مناطق المملكة تبرهن على التزامنا بالجودة، المتانة، والدقة المعمارية.
            </p>
          </div>

          <NuxtLink to="/projects" class="btn-outline shrink-0">
            <span>عرض معرض المشاريع كاملاً</span>
            <i class="pi pi-arrow-left text-xs"></i>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="prj in featuredProjects"
            :key="prj.id"
            class="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#C7D8E1] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2AA9E3] hover:shadow-[0_25px_45px_-20px_rgba(15,111,158,0.35)]"
          >
            <div>
              <div class="relative aspect-[16/10] overflow-hidden bg-[#F5F9FB]">
                <img
                  :src="prj.coverImage || '/logo.png'"
                  :alt="prj.title"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#1F2A30]/50 via-transparent to-transparent"></div>

                <span
                  class="absolute right-3 top-3 rounded-full bg-[#1F2A30]/85 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm"
                >
                  {{ prj.category }}
                </span>
                <span
                  class="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold text-white"
                  :class="prj.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'"
                >
                  {{ prj.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ' }}
                </span>
              </div>

              <div class="space-y-2.5 p-6">
                <div class="flex items-center gap-2 text-[11px] text-[#44505A]">
                  <i class="pi pi-map-marker text-[#2AA9E3]"></i>
                  <span>{{ prj.location }}</span>
                  <span class="text-[#C7D8E1]">&bull;</span>
                  <span>{{ prj.year }}</span>
                </div>

                <h3 class="font-display text-lg font-bold leading-snug text-[#1F2A30] transition-colors group-hover:text-[#0F6F9E]">
                  {{ prj.title }}
                </h3>

                <p class="line-clamp-2 text-xs leading-loose text-[#44505A]">
                  {{ prj.description }}
                </p>
              </div>
            </div>

            <div class="mx-6 mb-6 flex items-center justify-between border-t border-[#C7D8E1]/70 pt-4">
              <span class="text-xs font-bold text-[#0F6F9E]">
                {{ prj.area ? `المساحة: ${prj.area}` : prj.client }}
              </span>
              <NuxtLink :to="`/projects/${prj.id}`" class="btn-chip">
                <span>تفاصيل المشروع</span>
                <i class="pi pi-arrow-left text-[10px]"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. WHY US -->
    <section class="relative overflow-hidden bg-[#1F2A30] py-20 text-white lg:py-28">
      <div class="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#2AA9E3]/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#0F6F9E]/20 blur-3xl"></div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto mb-14 max-w-3xl space-y-4 text-center">
          <span class="section-pill section-pill-dark">قيمنا وتميزنا</span>
          <h2 class="font-display text-3xl font-bold text-white lg:text-4xl">
            لماذا يختار العملاء معراج التشييد؟
          </h2>
          <span class="mx-auto block h-1 w-12 rounded-full bg-[#2AA9E3]"></span>
          <p class="text-sm leading-loose text-[#C7D8E1]">
            نضع الشفافية والموثوقية في صميم علاقتنا مع كل عميل، مدعومين برصيد موثوق من الالتزام والخبرة الهندسية.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="item in (homepage?.whyUs || defaultWhyUs)"
            :key="item.id"
            class="group space-y-4 rounded-3xl border border-[#44505A]/50 bg-[#2B3238] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2AA9E3] hover:bg-[#182025]"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full bg-[#2AA9E3] text-xl text-[#1F2A30] ring-4 ring-[#2AA9E3]/20 transition-transform duration-300 group-hover:scale-110"
            >
              <i :class="item.icon || 'pi pi-check'"></i>
            </div>
            <h3 class="font-display text-lg font-bold text-white">{{ item.title }}</h3>
            <p class="text-[13px] leading-loose text-[#C7D8E1]">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. PROCESS -->
    <section class="bg-white py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto mb-14 max-w-3xl space-y-4 text-center">
          <span class="section-pill">منهجية العمل</span>
          <h2 class="font-display text-3xl font-bold text-[#1F2A30] lg:text-4xl">كيف نُدير ونُنفّذ مشروعك؟</h2>
          <span class="mx-auto block h-1 w-12 rounded-full bg-[#2AA9E3]"></span>
          <p class="text-sm leading-loose text-[#44505A]">
            نتبع خطة عمل هندسية محكمة من الاستشارة الأولية وحتى التسليم النهائي والضمان.
          </p>
        </div>

        <div class="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <!-- Connector line (desktop) -->
          <div
            class="pointer-events-none absolute inset-x-[12%] top-[2.9rem] hidden border-t-2 border-dashed border-[#C7D8E1] lg:block"
          ></div>

          <div
            v-for="proc in (homepage?.process || defaultProcess)"
            :key="proc.step"
            class="group relative rounded-3xl border border-[#C7D8E1] bg-[#F5F9FB] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2AA9E3] hover:bg-white hover:shadow-[0_25px_45px_-20px_rgba(15,111,158,0.3)]"
          >
            <div
              class="font-display relative mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1F2A30] text-sm font-bold text-[#2AA9E3] ring-4 ring-white transition-colors duration-300 group-hover:bg-[#2AA9E3] group-hover:text-[#1F2A30]"
            >
              0{{ proc.step }}
            </div>
            <h3 class="font-display mb-2 text-lg font-bold text-[#1F2A30]">{{ proc.title }}</h3>
            <p class="text-[13px] leading-loose text-[#44505A]">{{ proc.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. TESTIMONIALS -->
    <section class="border-t border-[#C7D8E1]/70 bg-[#F5F9FB] py-20 lg:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto mb-14 max-w-3xl space-y-4 text-center">
          <span class="section-pill">آراء العملاء</span>
          <h2 class="font-display text-3xl font-bold text-[#1F2A30] lg:text-4xl">شهادات نعتز بها من شركاء النجاح</h2>
          <span class="mx-auto block h-1 w-12 rounded-full bg-[#2AA9E3]"></span>
          <p class="text-sm leading-loose text-[#44505A]">
            ثقة عملائنا وشركائنا التجاريين والمؤسسيين هي المقياس الحقيقي لتميزنا.
          </p>
        </div>

        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <div
            v-for="test in (homepage?.testimonials || defaultTestimonials)"
            :key="test.id"
            class="relative space-y-5 overflow-hidden rounded-3xl border border-[#C7D8E1] bg-white p-8 transition-all duration-300 hover:border-[#2AA9E3] hover:shadow-[0_25px_45px_-20px_rgba(15,111,158,0.3)]"
          >
            <i class="pi pi-quote-right pointer-events-none absolute left-6 top-6 text-5xl text-[#EAF6FC]"></i>

            <div class="relative flex items-center gap-1 text-amber-400">
              <i v-for="s in test.rating" :key="s" class="pi pi-star-fill text-xs"></i>
            </div>

            <p class="relative text-[13px] leading-loose text-[#333333]">
              "{{ test.content }}"
            </p>

            <div class="relative flex items-center gap-3 border-t border-[#C7D8E1] pt-5">
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2AA9E3]/20 font-bold text-[#0F6F9E] ring-2 ring-[#2AA9E3]/30"
              >
                {{ test.clientName[0] }}
              </div>
              <div>
                <span class="block text-xs font-bold text-[#1F2A30]">{{ test.clientName }}</span>
                <span class="text-[11px] text-[#44505A]">{{ test.role }} - {{ test.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. CTA — same fixed background as hero -->
    <section
      class="hero-bg relative overflow-hidden bg-[#1F2A30] py-24 text-white"
      :style="{ backgroundImage: `url('${heroImage}')` }"
    >
      <div class="absolute inset-0 bg-[#1F2A30]/85"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#1F2A30] via-[#1F2A30]/60 to-[#2B3238]/80"></div>

      <div class="relative mx-auto max-w-4xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
        <span class="section-pill section-pill-dark">ابدأ معنا</span>

        <h2 class="font-display text-3xl font-bold leading-snug text-white lg:text-5xl">
          {{ homepage?.ctaTitle || 'جاهز للبدء في تشييد مشروعك القادم؟' }}
        </h2>

        <p class="mx-auto max-w-2xl text-sm leading-loose text-[#C7D8E1]">
          {{ homepage?.ctaSubtitle || 'تواصل مع مستشارينا الهندسيين اليوم للحصول على دراسة فنية وعرض سعر مخصص لمشروعك.' }}
        </p>

        <div class="pt-2">
          <NuxtLink :to="homepage?.ctaButtonLink || '/contact'" class="btn-primary">
            <span class="btn-label">{{ homepage?.ctaButtonText || 'تواصل معنا الآن' }}</span>
            <span class="btn-dot"><i class="pi pi-send text-xs"></i></span>
          </NuxtLink>
        </div>
      </div>

      <div class="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#2AA9E3] via-[#0F6F9E] to-[#1F2A30]"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useApiMethods } from "~/composables/useApiMethods";
import { API_ENDPOINTS } from "~/config/endpoints";
import type { HomepageContent, Service, Project } from "~/types";

definePageMeta({ key: (r) => r.fullPath });

const { getMethod } = useApiMethods();

const homepage = ref<HomepageContent | null>(null);
const services = ref<Service[]>([]);
const projects = ref<Project[]>([]);

const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80";

const heroImage = computed(() => homepage.value?.heroBackgroundImage || DEFAULT_HERO);

const highlights = [
  { icon: "pi pi-check-circle", text: "مطابقة كود البناء السعودي" },
  { icon: "pi pi-shield", text: "ضمانات شاملة على الهيكل" },
  { icon: "pi pi-clock", text: "التزام دقيق بالجدول الزمني" },
  { icon: "pi pi-users", text: "كوادر هندسية وإشراف ميداني" },
];

const defaultStats = [
  { id: "1", number: 140, suffix: "+", label: "مشروع منجز بنجاح" },
  { id: "2", number: 15, suffix: "+", label: "عاماً من الخبرة" },
  { id: "3", number: 450, suffix: "+", label: "مهندس وفني متخصص" },
  { id: "4", number: 99, suffix: "%", label: "نسبة رضا عملائنا" },
];

const defaultWhyUs = [
  { id: "1", title: "الالتزام الدقيق بالمواعيد", description: "ندير مشاريعنا بجداول زمنية صارمة تضمن التسليم في الموعد.", icon: "pi pi-clock" },
  { id: "2", title: "أعلى معايير الجودة والسلامة", description: "نطبق كود البناء السعودي ومعايير ISO في إدارة الجودة والسلامة.", icon: "pi pi-shield" },
  { id: "3", title: "كوادر هندسية نخبوية", description: "فريق من المهندسين ذوي التجربة الميدانية الواسعة في مشاريع كبرى.", icon: "pi pi-verified" },
  { id: "4", title: "عقود واضحة وضمانات معتمدة", description: "شفافية كاملة في التسعير مع تقديم ضمانات رسمية معتمدة.", icon: "pi pi-file-check" },
];

const defaultProcess = [
  { step: 1, title: "الدراسة والاستشارة", description: "تحليل المخططات الهندسية وتحديد المتطلبات الفنية بدقة." },
  { step: 2, title: "التخطيط والميزانية", description: "إعداد الجدول الزمني المفصل وتحديد التكلفة الإجمالية بشفافية." },
  { step: 3, title: "التنفيذ والإشراف", description: "بدء الأعمال الإنشائية مع إشراف هندسي يومي وتقارير دورية." },
  { step: 4, title: "التسليم والضمان", description: "فحص الجودة النهائي وتقديم شهادات الضمان المعتمدة." },
];

const defaultTestimonials = [
  {
    id: "1",
    clientName: "م. فهد بن عبدالعزيز العتيبي",
    role: "الرئيس التنفيذي",
    company: "شركة الاستثمار العقاري المتقدمة",
    content: "تعاملنا مع شركة معراج التشييد في مشروع مجمع واحة الأعمال، وكان الالتزام بالمعايير الفنية وسرعة الإنجاز نموذجاً يحتذى به.",
    rating: 5,
  },
  {
    id: "2",
    clientName: "أ. سلطان الشمري",
    role: "مدير المشاريع",
    company: "مجموعة المطورين المتحدة",
    content: "دقة التنفيذ والاهتمام بأدق التفاصيل المعمارية والإنشائية في مشروع الفلل السكنية جعلت معراج التشييد شريكنا الاستراتيجي الدائم.",
    rating: 5,
  },
];

const featuredProjects = computed(() => {
  const feat = projects.value.filter((p) => p.featured);
  return feat.length > 0 ? feat.slice(0, 3) : projects.value.slice(0, 3);
});

onMounted(async () => {
  try {
    const [homeRes, srvRes, prjRes] = await Promise.all([
      getMethod(API_ENDPOINTS.PUBLIC.HOMEPAGE),
      getMethod(API_ENDPOINTS.PUBLIC.SERVICES),
      getMethod(API_ENDPOINTS.PUBLIC.PROJECTS),
    ]);

    if (homeRes?.data) homepage.value = homeRes.data;
    if (srvRes?.data) services.value = srvRes.data;
    if (prjRes?.data) projects.value = prjRes.data;
  } catch (error) {
    console.error("Failed to load homepage data:", error);
  }
});
</script>

<style scoped>
/* Prevent viewport-breakout sections (100vw) from creating horizontal page scrolling.
   `clip` avoids creating a new scrolling container, so sticky positioning keeps working. */
:global(html),
:global(body),
:global(#__nuxt) {
  max-width: 100%;
  overflow-x: clip;
}

/*
 * Escape the application's constrained content shell without moving the
 * homepage above the header. The header remains in normal document flow
 * (sticky, not fixed), and the hero starts immediately after it.
 * Inner content stays centered in its own max-w-7xl container.
 */
.homepage-view {
  position: relative;
  display: flow-root;
  width: 100vw;
  max-width: 100vw;
  min-width: 0;
  margin-inline: calc(50% - 50vw);
  overflow-x: clip;
}

.homepage-view > section {
  position: relative;
  width: 100%;
  max-width: none;
  margin-inline: 0;
}

/* Desktop header: 40px utility bar + 82px navigation. */
.hero-full-bleed {
  position: relative;
  z-index: 0;
  inset-block-start: 0;
  margin-block-start: 0;
  min-height: max(620px, calc(100svh - 122px));
}

/* Mobile header has no utility bar and is 82px high. */
@media (max-width: 767px) {
  .hero-full-bleed {
    min-height: max(620px, calc(100svh - 82px));
  }
}

.font-display {
  font-family: 'Reem Kufi', 'IBM Plex Sans Arabic', sans-serif;
}

/* Fixed (parallax-style) background for hero + CTA.
   iOS/touch browsers don't support background-attachment: fixed, so fall back to scroll there. */
.hero-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

@media (max-width: 1023px), (hover: none) {
  .hero-bg {
    background-attachment: scroll;
  }
}

/* Section label pill */
.section-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(42, 169, 227, 0.3);
  background: rgba(42, 169, 227, 0.12);
  padding: 0.4rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f6f9e;
}
.section-pill::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #2aa9e3;
}
.section-pill-dark {
  color: #2aa9e3;
  background: rgba(42, 169, 227, 0.15);
  border-color: rgba(42, 169, 227, 0.4);
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 9999px;
  background: #2aa9e3;
  color: #1f2a30;
  padding: 0.375rem 0.375rem 0.375rem 1.5rem;
  padding-right: 1.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 8px 20px -8px rgba(42, 169, 227, 0.55);
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: #2298cf;
  transform: translateY(-2px);
  box-shadow: 0 14px 28px -10px rgba(42, 169, 227, 0.65);
}
.btn-dot {
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: #1f2a30;
  color: #2aa9e3;
  transition: transform 0.3s ease;
}
.btn-primary:hover .btn-dot {
  transform: translateX(-3px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  padding: 0.95rem 1.6rem;
  font-size: 0.875rem;
  font-weight: 700;
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;
}
.btn-ghost:hover {
  border-color: #2aa9e3;
  background: rgba(42, 169, 227, 0.15);
  color: #2aa9e3;
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 9999px;
  border: 1px solid #c7d8e1;
  background: #fff;
  color: #0f6f9e;
  padding: 0.75rem 1.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  transition: all 0.3s ease;
}
.btn-outline:hover {
  border-color: #2aa9e3;
  background: #eaf6fc;
  transform: translateY(-2px);
}
.btn-outline i {
  transition: transform 0.3s ease;
}
.btn-outline:hover i {
  transform: translateX(-3px);
}

.btn-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 9999px;
  background: #1f2a30;
  color: #f5f9fb;
  padding: 0.5rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  transition: all 0.3s ease;
}
.btn-chip:hover {
  background: #2aa9e3;
  color: #1f2a30;
}

@media (prefers-reduced-motion: reduce) {
  .homepage-view *,
  .homepage-view *::before,
  .homepage-view *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
  .hero-bg {
    background-attachment: scroll;
  }
}
</style>