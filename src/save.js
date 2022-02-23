import { __ } from "@wordpress/i18n";

import { useBlockProps } from "@wordpress/block-editor";
/**
 * @change Block-boilerplate
 */

export default function save() {
	return (
		<p {...useBlockProps.save()}>
			{__(
				"Block Boilerplate – hello from the saved content!",
				"block-boilerplate"
			)}
		</p>
	);
}
