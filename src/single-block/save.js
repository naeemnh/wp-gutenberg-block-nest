import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { title, description, url, alt, id } = attributes;
	return (
		<div {...useBlockProps.save()}>
			{url && (
				<img src={url} alt={alt} className={id ? `wp-image-${id}` : null} />
			)}
			<RichText.Content tagName="h4" value={title} />
			<RichText.Content tagName="p" value={description} />
		</div>
	);
}
