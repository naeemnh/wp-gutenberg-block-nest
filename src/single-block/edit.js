import {
	Icon,
	Button,
	Spinner,
	Tooltip,
	PanelBody,
	TextControl,
	withNotices,
	SelectControl,
	ToolbarButton,
	TextareaControl,
} from "@wordpress/components";
import {
	RichText,
	BlockControls,
	useBlockProps,
	MediaPlaceholder,
	MediaReplaceFlow,
	InspectorControls,
	store as blockEditStore,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { usePrevious } from "@wordpress/compose";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import { useEffect, useState, useRef } from "@wordpress/element";

const Edit = ({
	noticeUI,
	attributes,
	isSelected,
	setAttributes,
	noticeOperations,
}) => {
	// =====================================================================
	// Props and States
	// =====================================================================
	const { name, bio, url, alt, id } = attributes;
	const [blobURL, setBlobURL] = useState();
	const [selectedLink, setSelectedLink] = useState();

	const prevURL = usePrevious(url);
	const prevIsSelected = usePrevious(isSelected);

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
	const addNewSocialItem = () => {
		setAttributes({
			socialLinks: [...socialLinks, { icon: "wordpress", link: "" }],
		});
		setSelectedLink(socialLinks.length);
	};
	const updateSocialItem = (type, value) => {
		const socialLinksCopy = [...socialLinks];
		socialLinksCopy[selectedLink][type] = value;
		setAttributes({ socialLinks: socialLinksCopy });
	};
	const removeSocialItem = () => {
		setAttributes({
			socialLinks: [
				...socialLinks.slice(0, selectedLink),
				...socialLinks.slice(selectedLink + 1),
			],
		});
		setSelectedLink();
	};

	// =====================================================================
	// Life Cycle Methods
	// =====================================================================

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return id ? getMedia(id) : null;
		},
		[id]
	);

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

	useEffect(() => {
		if (prevIsSelected && !isSelected) {
			setSelectedLink();
		}
	}, [isSelected, prevIsSelected]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Image Settings", "block-nest")}>
					{id && (
						<SelectControl
							label={__("Image Size", "block-nest")}
							options={getImageSizeOptions()}
							value={url}
							onChange={onChangeImageSize}
						/>
					)}
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__("Alt text", "block-nest")}
							value={alt}
							onChange={onChangeAlt}
							help={__(
								"Alternative text describes your image to people who can't see it. Add a short description with its key details.",
								"block-nest"
							)}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__("Replace Image", "block-nest")}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={["image"]}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={removeImage}>
						{__("Remove Image", "block-nest")}
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
				<div className="wp-block-block-template-single-block-social-links">
					<ul>
						{socialLinks.map((item, index) => {
							return (
								<li
									key={index}
									className={selectedLink === index ? "is-selected" : null}
								>
									<button
										aria-label={__("Edit Social Link", "block-nest")}
										onClick={() => setSelectedLink(index)}
									>
										<Icon icon={item.icon} />
									</button>
								</li>
							);
						})}
						{isSelected && (
							<li className="wp-block-block-template-single-block-member-add-icon-li">
								<Tooltip text={__("Add Social Link", "block-nest")}>
									<button
										aria-label={__("Add Social Link", "block-nest")}
										onClick={addNewSocialItem}
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						)}
					</ul>
				</div>
				{selectedLink !== undefined && (
					<div className="wp-block-block-template-single-block-member-link-form">
						<TextControl
							label={__("Icon", "text-members")}
							value={socialLinks[selectedLink].icon}
							onChange={(icon) => {
								updateSocialItem("icon", icon);
							}}
						/>
						<TextControl
							label={__("URL", "text-members")}
							value={socialLinks[selectedLink].link}
							onChange={(link) => {
								updateSocialItem("link", link);
							}}
						/>
						<br />
						<Button isDestructive onClick={removeSocialItem}>
							{__("Remove Link", "text-members")}
						</Button>
					</div>
				)}
			</div>
		</>
	);
};

export default withNotices(Edit);
