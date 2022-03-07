import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
	const { name, bio } = attributes;
	const onChangeTitle = (title) => {
		setAttributes({ title });
	};
	const onChangeDesc = (description) => {
		setAttributes({ description });
	};
	return (
		<div {...useBlockProps()}>
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
