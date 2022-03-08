import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { Spinner } from "@wordpress/components";
import { isBlobURL, withNotices } from "@wordpress/blob";

export default function Edit({
	attributes,
	setAttributes,
	noticeOperations,
	noticeUI,
}) {
	const { name, bio, url, alt } = attributes;
	const onChangeTitle = (title) => {
		setAttributes({ title });
	};
	const onChangeDesc = (description) => {
		setAttributes({ description });
	};
	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ url: undefined, id: undefined, alt: "" });
			return;
		}
		setAttributes({ url: image.url, id: image.id, alt: image.alt });
	};
	const onSelectURL = (newURL) => {
		setAttributes({
			url: newURL,
			id: undefined,
			alt: "",
		});
	};
	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};
	return (
		<div {...useBlockProps()}>
			{url && (
				<div
					className={`wp-block-block-template-single-block-img${
						isBlobURL(url) ? " is-loading" : ""
					}`}
				>
					<img src={url} alt={alt} />
					{isBlobURL(url) && <Spinner />}
				</div>
			)}
			<MediaPlaceholder
				icon="admin-users"
				onSelect={onSelectImage}
				onSelectURL={onSelectURL}
				onError={onUploadError}
				accept="image/*"
				allowedTypes={["image"]}
				disableMediaButtons={url}
				notices={noticeUI}
			/>
			<RichText
				placeholder={__("Title", "single-block")}
				tagName="h4"
				onChange={onChangeTitle}
				value={name}
				allowedFormats={[]}
			/>
			<RichText
				placeholder={__("Description", "single-block")}
				tagName="p"
				onChange={onChangeDesc}
				value={bio}
				allowedFormats={[]}
			/>
		</div>
	);
}
