export const parseVolumeInformationForIdentifiers = (volumeInformation) => {
    const industryIdentifiers = volumeInformation.volumeInfo.industryIdentifiers;
    return {
        isbn_13: industryIdentifiers[industryIdentifiers.map(e => e.type).indexOf('ISBN_13')].identifier,
        isbn_10: industryIdentifiers[industryIdentifiers.map(e => e.type).indexOf('ISBN_10')].identifier,
        title: volumeInformation.volumeInfo.title,
        publisher: volumeInformation.volumeInfo.publisher,
        publishedDate: volumeInformation.volumeInfo.publishedDate,
    }
}