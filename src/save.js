import { __ } from "@wordpress/i18n";

import { useBlockProps } from "@wordpress/block-editor";

const save = () => {
	return (
		<div {...useBlockProps.save()}>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
