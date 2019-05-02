var offer_contents = (await OfferContent.find())

async function updateOfferContents (type, pageTypeNum) {
	for (var i = 0; i < offer_contents.length; i++) {
		var oc = offer_contents[i];
		if (oc.contentType !== type) { continue; }; // I divided polls and quizzes to two separate calls
		var content = JSON.parse(oc.content);
		content.pages.forEach(page => {
			if (page.type !== pageTypeNum) { return false; }
			page.rewardText = page.description.replace(/ \${amount}.*/, '');
			page.rewardValue = '${amount}';
			page.description = '';
		});
		oc.content = JSON.stringify(content);
		await oc.save();
	}
}

updateOfferContents('poll', 0);
updateOfferContents('quiz', 3);