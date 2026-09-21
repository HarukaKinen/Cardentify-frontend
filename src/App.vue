<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const destination = "https://cards.no2.ac";
const countdownFrom = 8;
const secondsLeft = ref(countdownFrom);
let timer;

const progress = computed(() =>
	Math.max(0, ((countdownFrom - secondsLeft.value) / countdownFrom) * 100),
);

function redirectNow() {
	window.location.href = destination;
}

onMounted(() => {
	timer = window.setInterval(() => {
		secondsLeft.value -= 1;

		if (secondsLeft.value <= 0) {
			window.clearInterval(timer);
			redirectNow();
		}
	}, 1000);
});

onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
	<main class="retirement-page">
		<div class="ambient ambient-one" aria-hidden="true"></div>
		<div class="ambient ambient-two" aria-hidden="true"></div>
		<div class="noise" aria-hidden="true"></div>

		<nav class="nav" aria-label="主导航">
			<a class="brand" href="/" aria-label="Cardentify 首页">
				<span class="brand-mark" aria-hidden="true">
					<span></span><span></span><span></span>
				</span>
				<span>Cardentify</span>
			</a>
			<span class="status"><i></i> 服务已迁移</span>
		</nav>

		<section class="hero" aria-labelledby="page-title">
			<div class="eyebrow"><span>EST.</span> 2021 — 2025</div>
			<h1 id="page-title">
				旧站已完成它的使命，<br />
				<span>下一站见。</span>
			</h1>
			<p class="intro">
				感谢每一次浏览、分享与贡献。Cardentify 已迁移至新地址，
				所有精彩内容将在那里继续。
			</p>

			<div class="redirect-card">
				<div class="card-glow" aria-hidden="true"></div>
				<div class="card-content">
					<div class="countdown" :style="{ '--progress': `${progress}%` }">
						<span class="countdown-number">{{ secondsLeft }}</span>
						<span class="countdown-label">秒</span>
					</div>

					<div class="redirect-copy">
						<p class="redirect-label">正在为你跳转</p>
						<a :href="destination" class="destination">
							cards.no2.ac
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M5 12h14M13 6l6 6-6 6" />
							</svg>
						</a>
						<p class="redirect-hint">倒计时结束后将自动前往新站</p>
					</div>

					<button class="go-button" type="button" @click="redirectNow">
						立即前往
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M5 12h14M13 6l6 6-6 6" />
						</svg>
					</button>
				</div>
				<div class="progress-track" aria-hidden="true">
					<span :style="{ width: `${progress}%` }"></span>
				</div>
			</div>

			<p class="fallback">
				没有自动跳转？请点击上方按钮，或访问
				<a :href="destination">https://cards.no2.ac</a>
			</p>
		</section>

		<div class="card-stack" aria-hidden="true">
			<div class="visual-card card-back">
				<span class="mini-logo">C</span>
				<span class="card-dots">•••• &nbsp; •••• &nbsp; ••••</span>
			</div>
			<div class="visual-card card-front">
				<div class="chip"><i></i><i></i><i></i></div>
				<div class="contactless">
					<span></span><span></span><span></span>
				</div>
				<div class="card-name">CARDENTIFY</div>
				<div class="card-line"></div>
				<div class="card-footer">
					<span>ARCHIVE</span><strong>∞</strong>
				</div>
			</div>
		</div>

		<footer>
			<span>© 2021–2025 Cardentify</span>
			<span class="footer-dot">✦</span>
			<span>See you on the other side</span>
		</footer>
	</main>
</template>
