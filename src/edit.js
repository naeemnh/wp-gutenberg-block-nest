import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

import "./editor.scss";
const Edit = () => {
	return (
		<div {...useBlockProps()}>
			<InnerBlocks allowedBlocks={["block-template/single-block"]} />
		</div>
	);
};

export default Edit;
