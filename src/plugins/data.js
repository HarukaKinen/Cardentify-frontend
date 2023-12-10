import axios from "axios";

export async function fetchCardsData() {
	const response = await axios.get(
		`https://raw.githubusercontent.com/HarukaKinen/Cardentify/data/data.json`
	);
	return response.data;
}

export async function fetchBankData() {
	const response = await axios.get(
		`https://raw.githubusercontent.com/HarukaKinen/Cardentify/data/bank.json`
	);
	return response.data;
}

export async function countCountry(banks, cards) {
	let countMap = new Map();

	// 初始化国家计数
	banks.forEach((bank) => {
		if (!countMap.has(bank.country)) {
			countMap.set(bank.country, { country: bank.country, count: 0 });
		}
	});

	// 计数cards
	cards.forEach((card) => {
		if (countMap.has(card.issuer.country)) {
			countMap.get(card.issuer.country).count++;
		}
	});

	let count = Array.from(countMap.values());

	return count;
}

export function countryFlag(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 0x1f1e6 - "A".charCodeAt(0) + char.charCodeAt());

	return twemoji.parse(String.fromCodePoint(...codePoints), {
		folder: "svg",
		ext: ".svg",
	});
}
