export default (dateInp) => {
	const date = new Date(dateInp);
	const month = date.getMonth();
	const sem = (month<7) ? 2 : 1; // 7 meaning August 
	const year = (sem===2) ? date.getFullYear() -1 : date.getFullYear();
	return [ year, sem ];
}
