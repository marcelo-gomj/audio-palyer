import { ListAlbums } from "./Albums"
import { ListAlbum } from "./Album";
import { SearchItems } from "./SearchItems";
import { SelectFolderButton } from "../Modal/SelectFolders";

type getContentProps = {
	path: string,
	id: string
}

function getAlbums(path: string, id: string) {
	if (id) {
		return <ListAlbum path={path} id={id} />
	}

	return <ListAlbums path={path} />
}

export function getContent({ path, id }: getContentProps) {

	switch (path) {
		case "":
			return ""
		case "album":
			return getAlbums(path, id);

		case "artist":
		case "genre":
			if (id) return <ListAlbums path={"album"} where={{ [path]: id }} />;
			return;

		case "search":
			return (
				<div>
					<SelectFolderButton />
				</div>
			)

		case "folder":
			if (id) {
				return <ListAlbum path={path} id={id} />
			}

			return null
		case "playlist":
			return null;

		default:
			return null
	}
}
