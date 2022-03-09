import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Icon } from "@wordpress/components";

export default function Save({ attributes }) {
	const { title, description, url, alt, id, socialLinks } = attributes;
	return (
		<div {...useBlockProps.save()}>
			{url && (
				<img src={url} alt={alt} className={id ? `wp-image-${id}` : null} />
			)}
			{title && <RichText.Content tagName="h4" value={title} />}
			{description && <RichText.Content tagName="p" value={description} />}
			{socialLinks.length > 0 && (
				<div className="wp-block-block-template-single-block-social-links">
					<ul>
						{socialLinks.map((item, index) => {
							return (
								<li key={index} data-icon={item.icon}>
									<a href={item.link}>
										<Icon icon={item.icon} />
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
