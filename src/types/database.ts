export type AlbumDatabase = {
    id: number,
    title?: string,
    artist?: string,
    genre?: string,
    album?: string,
    label?: String,
    track?: number,
    disk?: number,
    duration: number
    bitrate: number,
    numberOfChannels?: number,
    played: number,
    reated: number,
    folder: string,
    path: string,
    lyrics?: string,
    year?: number,
    created_at?: typeof Date
}

export type AlbumsDatabase = AlbumDatabase[]