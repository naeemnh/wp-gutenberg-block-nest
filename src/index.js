import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
/**
 * Change: block-boilerplate
 */
registerBlockType("create-block/block-boilerplate", {
	edit: Edit,

	save,
});
