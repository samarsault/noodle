module.exports = () => {
	const curDate = new Date(Date.now());
	const curMonth = curDate.getMonth();
	const curSem = curMonth < 7 ? 2 : 1; // 7 meaning August
	const curYear =
		curSem === 2 ? curDate.getFullYear() - 1 : curDate.getFullYear();
	return [curYear, curSem];
};
