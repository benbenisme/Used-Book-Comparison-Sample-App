export type VolumeInfo = {
    volumeResponse: {
        volumeInfo: {
            title: string,
            description: string,
            authors: string,
            imageLinks: {
                thumbnail: string | undefined
            }
        }
    }
}