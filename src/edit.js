import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import "./editor.scss";
const Edit = () => {
	return (
		<div {...useBlockProps()}>
			<InnerBlocks allowedBlocks={["core/image"]} />
		</div>
	);
};

export default Edit;
