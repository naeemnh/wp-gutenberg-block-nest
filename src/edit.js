import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";
import "./editor.scss";
const Edit = ({ attributes, setAttributes }) => {
	const { columns } = attributes;
	const onChangeColumns = (columns) => {
		setAttributes({ columns });
	};
	return (
		<div
			{...useBlockProps({
				className: `has-col-${columns}`,
			})}
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__("Columns", "block-nest")}
						min={1}
						max={6}
						onChange={onChangeColumns}
						value={columns}
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={["block-template/single-block"]}
				orientation="horizontal"
				template={[
					["block-template/single-block"],
					["block-template/single-block"],
					["block-template/single-block"],
				]}
			/>
		</div>
	);
};

export default Edit;
