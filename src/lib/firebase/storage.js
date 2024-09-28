import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./clientApp";

export async function uploadImage(jobId, image) {
	const filePath = `images/${jobId}/${image.name}`;;
	const newImageRef = ref(storage, filePath);
	await uploadBytesResumable(newImageRef, image);
	return await getDownloadURL(newImageRef);
}
