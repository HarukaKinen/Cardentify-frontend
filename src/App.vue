<!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
<script setup>
import { ref, onMounted, nextTick, watchEffect } from "vue";
import {
	Tab,
	Sticky,
	Ripple,
	Collapse,
	Dropdown,
	Tooltip,
	initTE,
} from "tw-elements";

import { fetchBankData, fetchCardsData, countCountry } from "./plugins/data.js";
import { getName } from "country-list";

const bank = ref([]);
const cards = ref([]);
const countryList = ref([]);
const getCountryName = (code) => getName(code);
const activeIndex = ref(0); // Track the currently active accordion item

// When an accordion item is toggled, watch for changes to `activeIndex`
watchEffect(() => {
	const index = activeIndex.value;
	if (index !== null) {
		// Use Vue's nextTick to wait for the DOM to update
		nextTick(() => {
			const element = document.getElementById(`flush-collapse-${index}`);
			if (element) {
				const offset = 100; // Adjust this offset as needed
				const elementPosition =
					element.getBoundingClientRect().top +
					window.scrollY -
					offset;
				window.scrollTo({ top: elementPosition, behavior: "smooth" });
			}
		});
	}
});

// Call this function when an accordion heading is clicked
const toggleAccordion = (index) => {
	activeIndex.value = index === activeIndex.value ? null : index;
};

onMounted(async () => {
	bank.value = await fetchBankData();
	cards.value = await fetchCardsData();
	countryList.value = await countCountry(bank.value, cards.value);

	await nextTick();
	initTE({ Tab, Sticky, Ripple, Collapse, Dropdown, Tooltip });
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
				<a
					href="https://github.com/HarukaKinen/Cardentify"
					target="_blank"
				>
					<button
						type="button"
						class="inline-block rounded px-3 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg motion-reduce:transition-none"
						style="background-color: #333"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg></button
				></a>
			</div>
			<div class="border-b border-gray-700"></div>
		</div>
	</nav>

	<header>
		<div class="bg-gray-900 py-4 px-4 sm:px-6 lg:px-8">
			<!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
			<!--Tabs navigation-->
			<div class="container mx-auto">
				<ul
					class="flex list-none flex-row flex-wrap border-b-0 pl-0"
					role="tablist"
					data-te-nav-ref
				>
					<li role="presentation">
						<a
							href="#tabs-home"
							class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
							data-te-toggle="pill"
							data-te-target="#tabs-home"
							data-te-nav-active
							role="tab"
							aria-controls="tabs-home"
							aria-selected="true"
							>须知</a
						>
					</li>
					<li role="presentation">
						<a
							href="#tabs-profile"
							class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
							data-te-toggle="pill"
							data-te-target="#tabs-profile"
							role="tab"
							aria-controls="tabs-profile"
							aria-selected="false"
							>透过 Apple Pay 获取卡面</a
						>
					</li>
				</ul>

				<!--Tabs content-->
				<div class="font-bold tracking-tight text-white">
					<div
						class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
						id="tabs-home"
						role="tabpanel"
						aria-labelledby="tabs-home-tab"
						data-te-tab-active
					>
						<p class="text-sm">
							本站提供嘅高清卡面，仅供学习交流使用，严禁用于商业用途。
						</p>
						<br />
						<h1 class="text-2xl">你也可以贡献你的高清卡面</h1>
						<p class="text-m">
							透过 Github 进行 Pull Request 或 Issue
							来提交你的卡面文件，你可以在网站右上角找到 Github
							仓库的入口。
						</p>
						<br />
						<p class="text-xl">本站仅收录来自以下服务提供的卡面</p>
						<p class="text-sm">（优先度从高到低排序）</p>
						<p class="text-m">
							Tier 0 - Apple Pay <br />
							Tier 1 - Paypal，Google Pay <br />
							Tier 2 - Samsung Pay，Mi Pay，HUAWEI Pay <br />
							Tier 3 - 云闪付 <br />
						</p>
						<br />
						<h1 class="text-l">另请参见</h1>
						<p class="text-sm">
							1. Chao's
							<a
								href="https://dynalist.io/d/ldKY6rbMR3LPnWz4fTvf_HCh"
								target="_blank"
								class="text-blue-500"
								>Apple Pay High Res (Or Paypal Low Res) Card
								Backgrounds</a
							>
							Collection
						</p>
					</div>
					<div
						class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
						id="tabs-profile"
						role="tabpanel"
						aria-labelledby="tabs-profile-tab"
					>
						<div>
							<h2 class="text-xl">
								如果你拥有配备 Touch ID 的 Mac
							</h2>
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
								如果你拥有配备 Touch ID 或 Face ID 的 iPhone 或
								iPad
							</h2>
							<p class="text-sm">
								尝试获取 root 权限（比如越狱），进入
								<code>/var/mobile/Library/Passes/Cards</code>
								目录找到卡面。<br />请注意，其中
								<code>pass.json</code>
								存放着关于其卡片的所有隐私信息，包括
								CVV；请务必在处理该文件副本时小心谨慎，不要发送给除你之外的任何人。
							</p>
						</div>
					</div>
				</div>
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
								:aria-controls="`flush-collapse-${index}`"
								:aria-expanded="
									activeIndex === index ? 'true' : 'false'
								"
								data-te-ripple-init
								data-te-ripple-color="light"
								@click="toggleAccordion(index)"
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
								'!visible': activeIndex === index,
								'!visible hidden': activeIndex !== index,
							}"
							data-te-collapse-item
							:data-te-collapse-show="index === 0 ? true : null"
							:aria-labelledby="`flush-heading-${index}`"
							data-te-parent="#accordion"
						>
							<div class="py-4 px-4">
								<div
									class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
								>
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
													class="relative overflow-hidden rounded-lg bg-cover bg-no-repeat"
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
															<div
																class="h-full flex flex-col justify-between items-center"
															>
																<span></span>
																<span></span>
																<span
																	>透过 Github
																	打开原文件</span
																>
																<span
																	>来自
																	{{
																		card.source
																	}}</span
																>
																<span></span>
															</div>
														</div>
													</a>
												</div>
												<div class="p-6">
													<h5
														class="mb-4 text-xl font-medium leading-tight text-gray-200"
													>
														{{ card.description }}
													</h5>
													<div
														class="border-b border-gray-200"
													></div>
													<a
														:href="`${card.issuer.url}`"
														target="_blank"
														data-te-toggle="tooltip"
														title="进入发卡行官网"
													>
														<div
															class="border border-gray-400 rounded-lg relative p-2 my-4"
														>
															<span
																class="block text-xs w-full text-right"
															>
																发行
															</span>
															<p
																class="text-base text-gray-200"
															>
																<span
																	v-if="
																		card
																			.issuer
																			.native_name ===
																		card
																			.issuer
																			.english_name
																	"
																>
																	{{
																		card
																			.issuer
																			.english_name
																	}}
																</span>
																<span v-else>
																	{{
																		card
																			.issuer
																			.native_name
																	}}
																	-
																	{{
																		card
																			.issuer
																			.english_name
																	}}
																</span>
															</p>
														</div></a
													>
													<a
														v-if="card.manager"
														:href="`${card.manager.url}`"
														target="_blank"
														data-te-toggle="tooltip"
														title="进入结算行官网"
													>
														<div
															class="border border-gray-400 rounded-lg relative p-2 my-4"
														>
															<span
																class="block text-xs w-full text-right"
															>
																进行资金结算
															</span>
															<p
																class="text-base text-gray-200"
															>
																<span>
																	<span
																		v-if="
																			card
																				.manager
																				.native_name ===
																			card
																				.manager
																				.english_name
																		"
																	>
																		{{
																			card
																				.manager
																				.english_name
																		}}
																	</span>
																	<span
																		v-else
																	>
																		{{
																			card
																				.manager
																				.native_name
																		}}
																		-
																		{{
																			card
																				.manager
																				.english_name
																		}}
																	</span>
																</span>
															</p>
														</div></a
													>
													<div class="mt-4">
														<span
															v-if="card.bin"
															class="px-1"
														>
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
															class="px-1"
														>
															<span
																class="inline-block whitespace-nowrap rounded-full bg-secondary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800"
															>
																{{
																	card.card
																		.type
																}}
															</span>
														</span>
														<span
															v-if="
																card.card.level
															"
															class="px-1"
														>
															<span
																class="inline-block whitespace-nowrap rounded-full bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700"
															>
																{{
																	card.card
																		.level
																}}
															</span></span
														>
														<span
															v-if="
																card.card.brand
															"
															class="px-1"
															><span
																class="inline-block whitespace-nowrap rounded-full bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700"
															>
																{{
																	card.card
																		.brand
																}}
															</span></span
														>
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
		class="bg-gray-900 \text-neutral-200 bottom-0 w-full lg:py-2"
		id="footer"
	>
		<div class="grid grid-cols-2">
			<div class="mx-2 my-1 text-left lg:mb-0 lg:mt-0 px-3">
				<span> © 2021 - 2023 Haruka Hong Kong </span>
			</div>
		</div>
	</footer>
</template>
