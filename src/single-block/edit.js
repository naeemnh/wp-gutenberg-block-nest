import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
} from "@wordpress/components";
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditStore,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { usePrevious } from "@wordpress/compose";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import { useEffect, useState, useRef } from "@wordpress/element";

const Edit = ({ attributes, setAttributes, noticeOperations, noticeUI }) => {
	// =====================================================================
	// Props and States
	// =====================================================================
	const { name, bio, url, alt, id } = attributes;
	const [blobURL, setBlobURL] = useState();

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return id ? getMedia(id) : null;
		},
		[id]
	);

	const prevURL = usePrevious(url);

	const titleRef = useRef();

	// =====================================================================
	// Prop and State functions
	// =====================================================================
	const onChangeTitle = (title) => {
		setAttributes({ title });
	};
	const onChangeDesc = (description) => {
		setAttributes({ description });
	};
	const onChangeAlt = (alt) => {
		setAttributes({ alt });
	};
	const onChangeImageSize = (url) => {
		setAttributes({ url });
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
	const removeImage = () => {
		setAttributes({
			url: undefined,
			alt: "",
			id: undefined,
		});
	};

	// =====================================================================
	// Life Cycle Methods
	// =====================================================================

	const imageSizes = useSelect((select) => {
		return select(blockEditStore).getSettings().imageSizes;
	}, []);

	const getImageSizeOptions = () => {
		if (!imageObject) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for (const size in sizes) {
			const { source_url } = sizes[size];
			const { name } = imageSizes.find((s) => s.slug === key);
			if ({ name }) {
				options.push({
					label: name,
					value: source_url,
				});
			}
		}
		return options;
	};

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

	useEffect(() => {
		if (url && !prevURL) {
			titleRef.current.focus();
		}
	}, [url, prevURL]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Image Settings", "single-block")}>
					{id && (
						<SelectControl
							label={__("Image Size", "single-block")}
							options={getImageSizeOptions()}
							value={url}
							onChange={onChangeImageSize}
						/>
					)}
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__("Alt text", "single-block")}
							value={alt}
							onChange={onChangeAlt}
							help={__(
								"Alternative text describes your image to people who can't see it. Add a short description with its key details.",
								"single-block"
							)}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__("Replace Image", "team-members")}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={["image"]}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={removeImage}>
						{__("Remove Image", "single-block")}
					</ToolbarButton>
				</BlockControls>
			)}
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
					ref={titleRef}
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
		</>
	);
};

export default withNotices(Edit);
