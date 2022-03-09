import { registerBlockType } from "@wordpress/blocks";
import "./single-block";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
registerBlockType("block-template/block-nest", {
	edit: Edit,
	save,
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/gallery"],
				transform: ({ images, columns }) => {
					const innerBlocks = images.map(({ url, id, alt }) => {
						return createBlock("block-template/single-block", {
							alt,
							id,
							url,
						});
					});
					return createBlock(
						"block-template/block-nest",
						{
							columns: columns || 2,
						},
						innerBlocks
					);
				},
			},
			{
				type: "block",
				blocks: ["core/image"],
				isMultiBlock: true,
				transform: (attributes) => {
					const innerBlocks = attributes.map(({ url, id, alt }) => {
						return createBlock("block-template/single-block", {
							alt,
							id,
							url,
						});
					});
					return createBlock(
						"block-template/block-nest",
						{
							columns: attributes.length > 3 ? 3 : attributes.length,
						},
						innerBlocks
					);
				},
			},
		],
	},
});
