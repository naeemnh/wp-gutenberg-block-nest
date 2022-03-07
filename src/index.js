import { registerBlockType } from "@wordpress/blocks";
import "./single-block";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
registerBlockType("block-template/block-nest", {
	edit: Edit,

	save,
});
