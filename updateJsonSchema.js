var offer_contents = (await OfferContent.find())

async function updatePolls () {
	for (var i = 0; i < offer_contents.length; i++) {
		var oc = offer_contents[i];
		var pageTypeNum = 0;
		if (oc.contentType !== 'poll') { continue; }; // I divided polls and quizzes to two separate calls
		var content = JSON.parse(oc.content);
		content.pages.forEach(page => {
			if (page.type !== pageTypeNum) { return false; }
			page.rewardText = page.title.replace(/ \${amount}.*/, '');
			page.rewardValue = '${amount}';
			page.title = '';
		});
		oc.content = JSON.stringify(content);
		await oc.save();
	}
}

async function updateQuizzes () {
	for (var i = 0; i < offer_contents.length; i++) {
		var oc = offer_contents[i];
		var pageTypeNum = 3;
		if (oc.contentType !== 'quiz') { continue; }; // I divided polls and quizzes to two separate calls
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

await updatePolls();
await updateQuizzes();