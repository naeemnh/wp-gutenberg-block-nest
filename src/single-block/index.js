import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
import Save from "./save";

registerBlockType("block-template/single-block", {
	title: __("Block Template", "block-nest"),
	description: __("A Single Block item", "block-nest"),
	icon: "admin-users",
	parent: ["block-template/block-nest"],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		title: {
			type: "string",
			source: "html",
			selector: "h4",
		},
		description: {
			type: "string",
			source: "html",
			selector: "p",
		},
		id: {
			type: "number",
		},
		alt: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt",
			default: "",
		},
		url: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
		},
		socialLinks: {
			type: "array",
			default: [],
			source: "query",
			selector: ".wp-block-block-template-single-block-social-links ul li",
			query: {
				icon: {
					source: "attribute",
					attribute: "data-icon",
				},
				link: {
					source: "attribute",
					selector: "a",
					attribute: "href",
				},
			},
		},
	},
	edit: Edit,
	save: Save,
});
