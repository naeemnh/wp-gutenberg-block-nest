import { __ } from "@wordpress/i18n";

import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const save = ({ attributes }) => {
	const { columns } = attributes;
	return (
		<div
			{...useBlockProps.save({
				className: `has-col-${columns}`,
			})}
		>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
