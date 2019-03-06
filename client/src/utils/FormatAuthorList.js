function formatAuthors(authorList) {
    // Takes in authors in an array of strings, returns a string based on num of authors.
    if (authorList === undefined) return 'Unknown Author';
    switch (authorList.length) {
        case 1: return authorList[0];
        case 2: return authorList[0] + ' & ' + authorList[1];
        default: return `${authorList[0]}, ${authorList[1]} & ${authorList.length - 2} more`;
    }
}

export default formatAuthors;