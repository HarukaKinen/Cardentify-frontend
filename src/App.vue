<!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Sticky, Ripple, Collapse, Dropdown, initTE } from "tw-elements";

import { fetchBankData, fetchCardsData, countCountry } from "./plugins/data.js";
import { getName } from "country-list";

const bank = ref([]);
const cards = ref([]);
const countryList = ref([]);
const getCountryName = (code) => getName(code);

onMounted(async () => {
	bank.value = await fetchBankData();
	cards.value = await fetchCardsData();
	countryList.value = await countCountry(bank.value, cards.value);

	await nextTick();
	initTE({ Sticky, Ripple, Collapse, Dropdown });
});
</script>

<template>
	<nav
		class="bg-gray-900"
		data-te-sticky-init
		data-te-sticky-boundary="#accordion"
		data-te-sticky-direction="both"
	>
		<div class="mx-auto px-4">
			<div class="flex h-16 items-center justify-between">
				<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
				<a
					href="https://cards.haruka.hk"
					class="bg-gray-700 text-white rounded-md px-3 py-2 text-base font-medium"
					aria-current="page"
					>Cardentify</a
				>
				<button
					type="button"
					class="inline-block rounded px-3 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg motion-reduce:transition-none"
					style="background-color: #333"
				>
					<a
						href="https://github.com/HarukaKinen/Cardentify"
						target="_blank"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/></svg
					></a>
				</button>
			</div>
			<div class="border-b border-gray-700"></div>
		</div>
	</nav>

	<header>
		<div class="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
			<div class="container mx-auto font-bold tracking-tight text-white">
				<p class="text-sm">
					本站提供嘅高清卡面，仅供学习交流使用，严禁用于商业用途。
				</p>
				<br />
				<h1 class="text-2xl">获取 Apple Pay 高清卡面</h1>
				<br />
				<h2 class="text-xl">如果你拥有配备 Touch ID 的 Mac</h2>
				<p class="text-sm">
					请参见美卡论坛的<a
						href="https://www.uscardforum.com/t/topic/29408"
						target="_blank"
						class="text-blue-500"
						>这篇帖子</a
					>，你也可以在帖子中找到更多由论坛坛友提供的高清卡面。
				</p>
				<br />
				<h2 class="text-xl">
					如果你拥有配备 Touch ID 或 Face ID 的 iPhone 或 iPad
				</h2>
				<p class="text-sm">
					尝试获取 root 权限（比如越狱），进入
					<code>/var/mobile/Library/Passes/Cards</code>
					目录找到卡面。<br />请注意，其中
					<code>pass.json</code> 存放着关于其卡片的所有隐私信息，包括
					CVV；请务必在处理该文件副本时小心谨慎，不要发送给除你之外的任何人。
				</p>
				<br />
			</div>
		</div>
	</header>

	<main class="mb-10">
		<!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
		<div
			class="container mx-auto"
			data-te-sticky-init
			data-te-sticky-boundary="true"
			data-te-sticky-direction="both"
			data-te-sticky-offset="75"
			data-te-sticky-delay="75"
			data-te-sticky-z-index="auto"
		>
			<section>
				<div id="accordion">
					<div
						v-for="(country, index) in countryList"
						:key="index"
						class="rounded-none"
					>
						<h2 class="mb-0" :id="`flush-heading-${index}`">
							<button
								class="group relative flex w-full items-center rounded-none py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary-400 [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
								type="button"
								data-te-collapse-init
								:data-te-collapse-collapsed="
									index !== 0 ? true : null
								"
								:data-te-target="`#flush-collapse-${index}`"
								aria-expanded="false"
								:aria-controls="`flush-collapse-${index}`"
								data-te-ripple-init
								data-te-ripple-color="light"
							>
								<span
									class="bg-gray-500 text-white rounded-full py-auto px-auto px-2 text-base font-medium"
									>{{ country.count }}</span
								>
								<span class="px-2">{{
									getCountryName(country.country)
								}}</span>
								<span
									class="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#8FAEE0] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#eee] motion-reduce:transition-none"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
									>
										<path
											fill-rule="evenodd"
											d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
										/>
									</svg>
								</span>
							</button>
						</h2>
						<div
							:id="`flush-collapse-${index}`"
							:class="{
								'!visible': index === 0,
								'!visible hidden': index !== 0,
							}"
							data-te-collapse-item
							:data-te-collapse-show="index === 0 ? true : null"
							:aria-labelledby="`flush-heading-${index}`"
							data-te-parent="#accordion"
						>
							<div class="py-4 px-4">
								<div class="grid grid-cols-4 gap-4">
									<!-- Each <div> is a single column.
									Place some content inside to see the effect. -->
									<template v-for="(card, index) in cards">
										<div
											v-if="
												card.issuer.country ==
												country.country
											"
											:key="index"
										>
											<div
												class="block rounded-lg bg-gradient-to-r from-gray-500 to-gray-600"
											>
												<div
													class="relative overflow-hidden bg-cover bg-no-repeat"
													data-te-ripple-init
													data-te-ripple-color="light"
												>
													<img
														class="rounded-t-lg"
														:src="`${card.image}`"
														alt=""
													/>
													<a
														:href="`${card.url}`"
														target="_blank"
													>
														<div
															class="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center overflow-hidden bg-[hsla(0,0%,0%,0.6)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"
														>
															<span
																class="text-center text-white"
																>查看原图</span
															>
														</div>
													</a>
												</div>
												<div class="p-6">
													<h5
														class="mb-2 text-xl font-medium leading-tight text-gray-200"
													>
														{{ card.description }}
													</h5>
													<p
														class="mb-4 text-base text-gray-200"
													>
														{{ card.issuer.name }}
													</p>
													<div>
														<span v-if="card.bin">
															<span
																v-for="(
																	bin, index
																) in card.bin"
																:key="index"
																class="inline-block whitespace-nowrap rounded-full bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700"
															>
																{{ bin }}
															</span>
														</span>
														<span
															v-if="
																card.card.type
															"
															class="inline-block whitespace-nowrap rounded-full bg-secondary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800"
														>
															{{ card.card.type }}
														</span>
														<span
															v-if="
																card.card.level
															"
															class="inline-block whitespace-nowrap rounded-full bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700"
														>
															{{
																card.card.level
															}}
														</span>
														<span
															v-if="
																card.card.brand
															"
															class="inline-block whitespace-nowrap rounded-full bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700"
														>
															{{
																card.card.brand
															}}
														</span>
													</div>
												</div>
											</div>
										</div>
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</main>

	<!-- Footer -->
	<footer
		class="fixed bg-gray-900 \text-neutral-200 bottom-0 w-full lg:py-2"
		id="footer"
	>
		<div class="grid grid-cols-2">
			<div class="mx-2 my-1 text-left lg:mb-0 lg:mt-0 px-3">
				<span> © 2021 - 2023 Haruka Hong Kong </span>
			</div>
		</div>
	</footer>
</template>