import { useEffect, useState } from "@wordpress/element";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { Spinner, withNotices } from "@wordpress/components";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";

const Edit = ({ attributes, setAttributes, noticeOperations, noticeUI }) => {
	// =====================================================================
	// Props and States
	// =====================================================================
	const { name, bio, url, alt, id } = attributes;
	const [blobURL, setBlobURL] = useState();

	// =====================================================================
	// Prop and State functions
	// =====================================================================
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

	// =====================================================================
	// Life Cycle Methods
	// =====================================================================
	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes({
				url: undefined,
				alt: "",
			});
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL();
		}
	}, [url]);

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
};

export default withNotices(Edit);
